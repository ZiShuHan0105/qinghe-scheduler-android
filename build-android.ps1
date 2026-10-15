param(
    [string]$OutputDir = "$env:TEMP\QingheSchedulerBuild"
)

$ErrorActionPreference = 'Stop'
$project = $PSScriptRoot
$sdk = if ($env:ANDROID_HOME) { $env:ANDROID_HOME } elseif ($env:ANDROID_SDK_ROOT) { $env:ANDROID_SDK_ROOT } else { 'D:\AndroidDev\Android\Sdk' }
$buildTools = Join-Path $sdk 'build-tools\36.0.0'
$androidJar = Join-Path $sdk 'platforms\android-36\android.jar'
$javaHome = if ($env:JAVA_HOME) { $env:JAVA_HOME } else { 'D:\AndroidDev\Android Studio\jbr' }
$java = Join-Path $javaHome 'bin\java.exe'
$javac = Join-Path $javaHome 'bin\javac.exe'
$jar = Join-Path $javaHome 'bin\jar.exe'
$aapt2 = Join-Path $buildTools 'aapt2.exe'
$d8 = Join-Path $buildTools 'd8.bat'
$zipalign = Join-Path $buildTools 'zipalign.exe'
$apksigner = Join-Path $buildTools 'apksigner.bat'

foreach ($required in @($androidJar, $java, $javac, $jar, $aapt2, $d8, $zipalign, $apksigner)) {
    if (-not (Test-Path -LiteralPath $required)) { throw "找不到 Android 构建工具：$required" }
}

$out = [System.IO.Path]::GetFullPath($OutputDir)
[System.IO.Directory]::CreateDirectory($out) | Out-Null
$generated = Join-Path $out 'generated'
$classes = Join-Path $out 'classes'
$dex = Join-Path $out 'dex'
foreach ($directory in @($generated, $classes, $dex)) { [System.IO.Directory]::CreateDirectory($directory) | Out-Null }

$resourceZip = Join-Path $out 'resources.zip'
$unsigned = Join-Path $out 'qinghe-unsigned.apk'
$aligned = Join-Path $out 'qinghe-aligned.apk'
$apk = Join-Path $out 'qinghe-scheduler-debug.apk'

Write-Host '[1/6] 编译 Android 资源'
& $aapt2 compile --dir (Join-Path $project 'app\src\main\res') -o $resourceZip
if ($LASTEXITCODE -ne 0) { throw 'aapt2 compile 失败' }

Write-Host '[2/6] 链接 Manifest、资源和网页资产'
& $aapt2 link -o $unsigned -I $androidJar --manifest (Join-Path $project 'app\src\main\AndroidManifest.xml') --java $generated --auto-add-overlay --min-sdk-version 23 --target-sdk-version 36 --version-code 1 --version-name 1.0 -A (Join-Path $project 'app\src\main\assets') $resourceZip
if ($LASTEXITCODE -ne 0) { throw 'aapt2 link 失败' }

Write-Host '[3/6] 编译 Java Activity'
$rJava = Join-Path $generated 'com\qinghe\scheduler\R.java'
& $javac --release 17 -encoding UTF-8 -classpath $androidJar -d $classes $rJava (Join-Path $project 'app\src\main\java\com\qinghe\scheduler\MainActivity.java')
if ($LASTEXITCODE -ne 0) { throw 'javac 编译失败' }

Write-Host '[4/6] 转换 DEX'
$classFiles = @(Get-ChildItem -LiteralPath $classes -Recurse -Filter '*.class' | ForEach-Object FullName)
& $d8 --lib $androidJar --output $dex $classFiles
if ($LASTEXITCODE -ne 0) { throw 'd8 转换失败' }

Write-Host '[5/6] 合并并对齐 APK'
Push-Location $dex
try { & $jar uf $unsigned 'classes.dex' } finally { Pop-Location }
if ($LASTEXITCODE -ne 0) { throw '合并 classes.dex 失败' }
& $zipalign -f -p 4 $unsigned $aligned
if ($LASTEXITCODE -ne 0) { throw 'zipalign 失败' }

Write-Host '[6/6] 使用 Android debug keystore 签名'
$keystore = Join-Path $env:USERPROFILE '.android\debug.keystore'
if (-not (Test-Path -LiteralPath $keystore)) { throw "找不到 debug keystore：$keystore" }
& $apksigner sign --ks $keystore --ks-key-alias androiddebugkey --ks-pass pass:android --key-pass pass:android --out $apk $aligned
if ($LASTEXITCODE -ne 0) { throw 'apksigner 签名失败' }
& $apksigner verify --verbose $apk
if ($LASTEXITCODE -ne 0) { throw 'APK 签名校验失败' }

Write-Host "`nAPK 已生成：$apk"


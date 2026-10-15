param([string]$OutputDir = "$env:TEMP\QingheImageCompressorBuild")
$ErrorActionPreference = 'Stop'
$project = Join-Path $PSScriptRoot 'image-compressor'
$sdk = if ($env:ANDROID_HOME) { $env:ANDROID_HOME } elseif ($env:ANDROID_SDK_ROOT) { $env:ANDROID_SDK_ROOT } else { 'D:\AndroidDev\Android\Sdk' }
$bt = Join-Path $sdk 'build-tools\36.0.0'; $androidJar = Join-Path $sdk 'platforms\android-36\android.jar'; $javaHome = if ($env:JAVA_HOME) { $env:JAVA_HOME } else { 'D:\AndroidDev\Android Studio\jbr' }
$aapt2 = Join-Path $bt 'aapt2.exe'; $javac = Join-Path $javaHome 'bin\javac.exe'; $jar = Join-Path $javaHome 'bin\jar.exe'; $d8 = Join-Path $bt 'd8.bat'; $zipalign = Join-Path $bt 'zipalign.exe'; $apksigner = Join-Path $bt 'apksigner.bat'
$out = [System.IO.Path]::GetFullPath($OutputDir); [System.IO.Directory]::CreateDirectory($out) | Out-Null; $generated = Join-Path $out 'generated'; $classes = Join-Path $out 'classes'; $dex = Join-Path $out 'dex'; foreach($d in @($generated,$classes,$dex)){[System.IO.Directory]::CreateDirectory($d)|Out-Null}
$resources = Join-Path $out 'resources.zip'; $unsigned = Join-Path $out 'image-compressor-unsigned.apk'; $aligned = Join-Path $out 'image-compressor-aligned.apk'; $apk = Join-Path $out 'image-compressor-debug.apk'
& $aapt2 compile --dir (Join-Path $project 'src\main\res') -o $resources; if($LASTEXITCODE -ne 0){throw 'aapt2 compile 失败'}
& $aapt2 link -o $unsigned -I $androidJar --manifest (Join-Path $project 'src\main\AndroidManifest.xml') --java $generated --auto-add-overlay --min-sdk-version 23 --target-sdk-version 36 --version-code 1 --version-name 1.0 $resources; if($LASTEXITCODE -ne 0){throw 'aapt2 link 失败'}
$rJava = Join-Path $generated 'com\qinghe\imagecompressor\R.java'; & $javac --release 17 -encoding UTF-8 -classpath $androidJar -d $classes $rJava (Join-Path $project 'src\main\java\com\qinghe\imagecompressor\MainActivity.java'); if($LASTEXITCODE -ne 0){throw 'javac 编译失败'}
$classFiles = @(Get-ChildItem -LiteralPath $classes -Recurse -Filter '*.class' | ForEach-Object FullName); & $d8 --lib $androidJar --output $dex $classFiles; if($LASTEXITCODE -ne 0){throw 'd8 转换失败'}
Push-Location $dex; try { & $jar uf $unsigned 'classes.dex' } finally { Pop-Location }; & $zipalign -f -p 4 $unsigned $aligned; if($LASTEXITCODE -ne 0){throw 'zipalign 失败'}
$keystore = Join-Path $env:USERPROFILE '.android\debug.keystore'; & $apksigner sign --ks $keystore --ks-key-alias androiddebugkey --ks-pass pass:android --key-pass pass:android --out $apk $aligned; if($LASTEXITCODE -ne 0){throw 'apksigner 失败'}
Write-Host "APK 已生成：$apk"


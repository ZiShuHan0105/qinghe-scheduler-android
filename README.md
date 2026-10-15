# 青禾排课

一个面向初高中学校的轻量课程排班 PWA。它覆盖班级课表、教师课表、可配置的一天时间轴，以及 Excel / PNG 导出；数据默认保存在浏览器本地，适合先在校内或教务处电脑上直接使用。

## 已实现功能

- **按班级 / 按教师排课**：同一张周课表可以在班级视角和教师视角之间切换，支持课程、教师、班级、教室和备注。
- **自定义时段**：早餐、午餐、晚餐、早自习、课间操、眼保健操、课间运动和晚自习已经包含在示例数据里，也可以继续新增、编辑或删除任意时间段。
- **自定义课程 / 安排**：空白课表单元格可以录入社团活动、校队训练、临时代课等自定义内容。
- **教师和班级资料**：维护姓名、学科、年级、固定教室和联系方式，排课时直接从下拉框选取。
- **冲突提醒**：总览页会检查同一班级或同一教师在同一时间段的重复安排。
- **导出**：
  - 导出当前班级 / 教师的 PNG 课表；
  - 批量导出全部班级和教师课表，打包为一个 ZIP，ZIP 内每份都是独立 PNG；
  - 导出包含每个班级、每位教师、时间设置和基础资料工作表的 `.xlsx` 文件；
  - 导出 / 导入 JSON 备份。
- **离线可用**：注册 Service Worker 后可作为 PWA 安装到桌面，数据不依赖后端。
- **Android App**：`app/` 是原生 Android WebView 壳，启动时加载同一套本地排课界面；Android 端会把导出的 PNG、ZIP、Excel 和 JSON 直接保存到 `Downloads/青禾排课`。

## 运行

项目是纯前端文件，不需要安装依赖。用任意静态服务器打开即可：

```powershell
python -m http.server 4173
```

然后访问 <http://localhost:4173/>。直接双击 `index.html` 也能使用主要功能，但浏览器的离线安装能力需要通过 HTTP 打开。

## 构建 Android APK

如果已经安装 Android SDK（需要 `platforms/android-36` 和 `build-tools/36.0.0`），可以使用仓库自带的无 Gradle daemon 构建脚本：

```powershell
powershell -ExecutionPolicy Bypass -File .\build-android.ps1 -OutputDir "$env:TEMP\QingheSchedulerBuild"
```

脚本会用 SDK 的 `aapt2`、`javac`、`d8`、`zipalign` 和 `apksigner` 完成资源编译、DEX 转换和 debug 签名，输出 `qinghe-scheduler-debug.apk`。如果 `ANDROID_HOME` 或 `ANDROID_SDK_ROOT` 没有设置，脚本会尝试使用 `D:\AndroidDev\Android\Sdk`。

连接开启 USB 调试的手机后，可以直接安装：

```powershell
adb install -r .\qinghe-scheduler-debug.apk
```

Gradle 工程配置也保留在根目录，Android Studio 可以直接打开根目录并继续维护 `app` 模块；当前壳的核心逻辑不依赖第三方 Android 库。

## 目录

- `index.html`：应用结构、导航和弹窗。
- `styles.css`：响应式界面样式。
- `app.js`：本地数据模型、排课交互、PNG 绘制和无依赖 XLSX 生成器。
- `manifest.json` / `sw.js`：PWA 安装和离线缓存。
- `app/src/main/java/com/qinghe/scheduler/MainActivity.java`：Android WebView 壳，以及把网页导出内容保存到系统 Downloads 的桥接。
- `app/src/main/assets/`：随 APK 打包的离线网页资源。
- `build-android.ps1`：无需 Gradle daemon 的 APK 构建脚本。

## 图片压缩工具

`image-compressor/` 是另一个独立的 Android 工程，提供相册选图、JPEG 质量调整和 Downloads 保存功能。使用 `build-image-compressor.ps1` 构建，APK 名称为 `image-compressor-debug.apk`。两个 APK 的下载入口统一记录在 `downloads/README.md`，发布版本会作为 GitHub Release 资产提供。


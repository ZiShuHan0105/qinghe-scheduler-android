package com.qinghe.imagecompressor;

import android.app.Activity;
import android.content.ContentResolver;
import android.content.ContentValues;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.provider.MediaStore;
import android.view.Gravity;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.SeekBar;
import android.widget.TextView;
import android.widget.Toast;

import java.io.InputStream;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class MainActivity extends Activity {
    private static final int PICK_IMAGE = 1001;
    private Uri sourceUri;
    private TextView status;
    private TextView qualityLabel;
    private SeekBar qualityBar;

    @Override
    protected void onCreate(Bundle state) {
        super.onCreate(state);
        buildUi();
    }

    private void buildUi() {
        LinearLayout root = new LinearLayout(this);
        root.setOrientation(LinearLayout.VERTICAL);
        root.setPadding(48, 54, 48, 36);
        root.setBackgroundColor(0xFFF6F7FB);

        TextView title = new TextView(this);
        title.setText("图片压缩工具");
        title.setTextColor(0xFF20233A);
        title.setTextSize(28);
        title.setGravity(Gravity.CENTER_HORIZONTAL);
        root.addView(title, new LinearLayout.LayoutParams(-1, -2));

        TextView subtitle = new TextView(this);
        subtitle.setText("选择一张图片，调整质量后保存为更小的 JPEG 文件");
        subtitle.setTextColor(0xFF858AA7);
        subtitle.setTextSize(14);
        subtitle.setGravity(Gravity.CENTER_HORIZONTAL);
        LinearLayout.LayoutParams subtitleParams = new LinearLayout.LayoutParams(-1, -2);
        subtitleParams.topMargin = 14;
        root.addView(subtitle, subtitleParams);

        Button pick = new Button(this);
        pick.setText("选择图片");
        pick.setOnClickListener(view -> pickImage());
        LinearLayout.LayoutParams pickParams = new LinearLayout.LayoutParams(-1, -2);
        pickParams.topMargin = 44;
        root.addView(pick, pickParams);

        qualityLabel = new TextView(this);
        qualityLabel.setText("压缩质量：80%");
        qualityLabel.setTextColor(0xFF555A77);
        qualityLabel.setTextSize(15);
        LinearLayout.LayoutParams qualityLabelParams = new LinearLayout.LayoutParams(-1, -2);
        qualityLabelParams.topMargin = 36;
        root.addView(qualityLabel, qualityLabelParams);

        qualityBar = new SeekBar(this);
        qualityBar.setMax(90);
        qualityBar.setProgress(70);
        qualityBar.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
            @Override public void onProgressChanged(SeekBar bar, int progress, boolean fromUser) { qualityLabel.setText("压缩质量：" + (progress + 10) + "%"); }
            @Override public void onStartTrackingTouch(SeekBar bar) { }
            @Override public void onStopTrackingTouch(SeekBar bar) { }
        });
        root.addView(qualityBar, new LinearLayout.LayoutParams(-1, -2));

        Button compress = new Button(this);
        compress.setText("压缩并保存");
        compress.setOnClickListener(view -> compressImage());
        LinearLayout.LayoutParams compressParams = new LinearLayout.LayoutParams(-1, -2);
        compressParams.topMargin = 32;
        root.addView(compress, compressParams);

        status = new TextView(this);
        status.setText("尚未选择图片");
        status.setTextColor(0xFF858AA7);
        status.setTextSize(13);
        status.setGravity(Gravity.CENTER);
        LinearLayout.LayoutParams statusParams = new LinearLayout.LayoutParams(-1, 0, 1);
        statusParams.topMargin = 26;
        root.addView(status, statusParams);
        setContentView(root);
    }

    private void pickImage() {
        Intent intent = new Intent(Intent.ACTION_OPEN_DOCUMENT);
        intent.addCategory(Intent.CATEGORY_OPENABLE);
        intent.setType("image/*");
        startActivityForResult(intent, PICK_IMAGE);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == PICK_IMAGE && resultCode == RESULT_OK && data != null && data.getData() != null) {
            sourceUri = data.getData();
            status.setText("已选择图片，可以调整质量后保存");
        }
    }

    private void compressImage() {
        if (sourceUri == null) { Toast.makeText(this, "请先选择图片", Toast.LENGTH_SHORT).show(); return; }
        new Thread(() -> {
            try (InputStream input = getContentResolver().openInputStream(sourceUri)) {
                Bitmap bitmap = BitmapFactory.decodeStream(input);
                if (bitmap == null) throw new IllegalStateException("无法读取图片");
                int quality = qualityBar.getProgress() + 10;
                String filename = "compressed-" + new SimpleDateFormat("yyyyMMdd-HHmmss", Locale.US).format(new Date()) + ".jpg";
                byte[] output = compressToBytes(bitmap, quality);
                saveToDownloads(filename, output);
                bitmap.recycle();
                runOnUiThread(() -> { status.setText("已保存：Downloads/图片压缩/" + filename); Toast.makeText(this, "压缩完成", Toast.LENGTH_LONG).show(); });
            } catch (Exception error) {
                runOnUiThread(() -> Toast.makeText(this, "压缩失败：" + error.getMessage(), Toast.LENGTH_LONG).show());
            }
        }).start();
    }

    private byte[] compressToBytes(Bitmap bitmap, int quality) throws Exception {
        java.io.ByteArrayOutputStream stream = new java.io.ByteArrayOutputStream();
        bitmap.compress(Bitmap.CompressFormat.JPEG, quality, stream);
        return stream.toByteArray();
    }

    private void saveToDownloads(String filename, byte[] bytes) throws Exception {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            ContentResolver resolver = getContentResolver();
            ContentValues values = new ContentValues();
            values.put(MediaStore.Downloads.DISPLAY_NAME, filename);
            values.put(MediaStore.Downloads.MIME_TYPE, "image/jpeg");
            values.put(MediaStore.Downloads.RELATIVE_PATH, Environment.DIRECTORY_DOWNLOADS + "/图片压缩");
            values.put(MediaStore.Downloads.IS_PENDING, 1);
            Uri uri = resolver.insert(MediaStore.Downloads.EXTERNAL_CONTENT_URI, values);
            if (uri == null) throw new IllegalStateException("无法创建下载文件");
            try (OutputStream output = resolver.openOutputStream(uri)) { if (output == null) throw new IllegalStateException("无法打开下载文件"); output.write(bytes); }
            ContentValues ready = new ContentValues(); ready.put(MediaStore.Downloads.IS_PENDING, 0); resolver.update(uri, ready, null, null);
        } else {
            java.io.File directory = getExternalFilesDir(Environment.DIRECTORY_DOWNLOADS);
            if (directory == null) throw new IllegalStateException("无法访问下载目录");
            if (!directory.exists() && !directory.mkdirs()) throw new IllegalStateException("无法创建下载目录");
            try (java.io.FileOutputStream output = new java.io.FileOutputStream(new java.io.File(directory, filename))) { output.write(bytes); }
        }
    }
}


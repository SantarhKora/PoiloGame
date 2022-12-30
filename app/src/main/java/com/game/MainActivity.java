package com.game;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.res.AssetManager;
import android.graphics.Bitmap;
import android.net.ConnectivityManager;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.util.Log;
import android.view.View;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;

import androidx.appcompat.app.AppCompatActivity;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.util.Map;

public class MainActivity extends AppCompatActivity implements UtilsAwv.Listener {
    private static boolean isStarted = false;
    private WebServer androidWebServer;
    public UtilsAwv mwebView;
    public UtilsManager manager;
    public RelativeLayout relativeLayout;
    public Button btnNoInternetConnection;
    public Gdpr gdpr;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        init_screen();

        gdpr = new Gdpr();
        gdpr.make(this);

        LinearLayout main = findViewById(R.id.main);
        main.setVisibility(View.INVISIBLE);

        if (!isStarted && startAndroidWebServer()) {
            isStarted = true;
        }

        mwebView = (UtilsAwv) findViewById(R.id.myWebView);
        mwebView.setListener(this, this);
        mwebView.setMixedContentAllowed(false);
        manager = new UtilsManager(this);
        manager.init();
        mwebView.setManager(manager);
        //mwebView.setVisibility(View.INVISIBLE);

        relativeLayout = findViewById(R.id.relativeLayout);
        btnNoInternetConnection = findViewById(R.id.btnNoConnection);

        btnNoInternetConnection.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                checkConnection(null);
            }
        });
        checkConnection(savedInstanceState);

        manager.splash(true);
    }

    @SuppressWarnings( "deprecation" )
    private void init_screen(){
        /*
        final int flags = View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                | View.SYSTEM_UI_FLAG_FULLSCREEN
                | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY;
        getWindow().getDecorView().setSystemUiVisibility(flags);

        final View decorView = getWindow().getDecorView();
        decorView.setOnSystemUiVisibilityChangeListener(new View.OnSystemUiVisibilityChangeListener() {
            @Override
            public void onSystemUiVisibilityChange(int visibility) {
                if((visibility & View.SYSTEM_UI_FLAG_FULLSCREEN) == 0) {
                    decorView.setSystemUiVisibility(flags);
                }
            }
        });
        */

        /*
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
            getWindow().getAttributes().layoutInDisplayCutoutMode = WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES;
        }
        */

        /*
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
            getWindow().setFlags(WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS, WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS);
            getWindow().getAttributes().layoutInDisplayCutoutMode = WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES;
        }

         */
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN); //show the activity in full screen

        getWindow().addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
            getWindow().getAttributes().layoutInDisplayCutoutMode = WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES;
            getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_HIDE_NAVIGATION | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY);
        }

    }

    @Override
    protected void onSaveInstanceState(Bundle outState ) {
        super.onSaveInstanceState(outState);
        mwebView.saveState(outState);
    }

    @Override
    protected void onRestoreInstanceState(Bundle savedInstanceState) {
        super.onRestoreInstanceState(savedInstanceState);
        mwebView.restoreState(savedInstanceState);
    }

    public void checkConnection(Bundle savedInstanceState){
        boolean needConnection = getResources().getBoolean(R.bool.need_connection);
        boolean isConnected;
        //String url = "file:///android_asset/index.html";
        String url = "http://localhost:8082/index.html";
        if (needConnection) {
            isConnected = isConnectionAvailable();
        }
        else{
            isConnected = true;
        }

        if (isConnected){
            if (savedInstanceState == null) {
                mwebView.loadUrl(url);
            }
            mwebView.setVisibility(View.VISIBLE);
            relativeLayout.setVisibility(View.GONE);
        }
        else{
            mwebView.setVisibility(View.GONE);
            relativeLayout.setVisibility(View.VISIBLE);
        }
    }

    @SuppressWarnings( "deprecation" )
    public boolean isConnectionAvailable(){
        ConnectivityManager cm = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
        return ( cm.getActiveNetworkInfo() != null && cm.getActiveNetworkInfo().isConnectedOrConnecting() );
    }

    public boolean isInternetAvailable() {
        try {
            InetAddress ipAddr = InetAddress.getByName("google.com");
            return !ipAddr.equals("");

        } catch (Exception e) {
            return false;
        }
    }

    private boolean startAndroidWebServer() {
        if (!isStarted) {
            try {
                int port = 8082;

                AssetManager am = getAssets();
                //String localPath = "file:///android_asset/game/";
                String localPath = "game";
                AndroidFile f = new AndroidFile(localPath);
                f.setAssetManager( am );
                Log.d("Gradle start 8082", f.getPath());
                androidWebServer = new WebServer(port, f);
                return true;
            }
            catch (Exception e) {
                Log.w("Gradle not 8082", "The server could not start."+e);
                e.printStackTrace();
            }
        }
        return false;
    }

    private boolean stopAndroidWebServer() {
        if (isStarted && androidWebServer != null) {
            androidWebServer.stop();
            return true;
        }
        return false;
    }

    public class WebServer extends NanoHTTPD
    {
        public WebServer(InetSocketAddress localAddr, AndroidFile wwwroot) throws IOException {
            super(localAddr, wwwroot);
        }

        public WebServer(int port, AndroidFile wwwroot ) throws IOException {
            super(port, wwwroot);
        }

        /*
        @Override
        public Response serve(String uri, Method method,
                              Map<String, String> header, Map<String, String> parameters,
                              Map<String, String> files) {


            return NanoHTTPD.newFixedLengthResponse(am);
        }

         */
    }


    @SuppressLint("NewApi")
    @Override
    protected void onResume() {
        super.onResume();
        mwebView.onResume();
        manager.on_resume();
    }

    @SuppressLint("NewApi")
    @Override
    protected void onPause() {
        mwebView.onPause();
        manager.on_pause();
        super.onPause();
    }

    @Override
    protected void onDestroy() {
        mwebView.onDestroy();
        manager.on_destroy();

        stopAndroidWebServer();
        isStarted = false;

        super.onDestroy();
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent intent) {
        super.onActivityResult(requestCode, resultCode, intent);
        mwebView.onActivityResult(requestCode, resultCode, intent);
        // ...
    }

    @Override
    public void onBackPressed() {
        openQuitDialog();
        /*if (!mwebView.onBackPressed()) { return; }
        // ...
        super.onBackPressed();*/
    }

    public void reward(String state){
        mwebView.loadUrl("javascript:gradle.reward('"+state+"')");
    }


    public void openQuitDialog() {
        androidx.appcompat.app.AlertDialog.Builder alert;
        alert = new androidx.appcompat.app.AlertDialog.Builder(MainActivity.this);
        alert.setTitle(getString(R.string.app_name));
        alert.setIcon(R.drawable.about_icon);
        alert.setMessage(getString(R.string.sure_quit));

        alert.setPositiveButton(R.string.exit, new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int whichButton) {
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP_MR1) {
                    finishAndRemoveTask();
                }
                else {
                    finish();
                }
            }
        });

        alert.setNegativeButton(getString(R.string.cancel), new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int which) {
            }
        });
        alert.show();
    }


    @Override
    public void onPageStarted(String url, Bitmap favicon) {

    }

    @Override
    public void onPageFinished(String url) {
        //manager.splash(false);
    }

    @Override
    public void onPageError(int errorCode, String description, String failingUrl) {
        //manager.splash(false);
    }

    @Override
    public void onDownloadRequested(String url, String suggestedFilename, String mimeType, long contentLength, String contentDisposition, String userAgent) { }

    @Override
    public void onExternalPageRequest(String url) { }

    @Override
    public void onLowMemory() {
        Log.d("TAG_MEMORY", "Memory is Low");
        super.onLowMemory();
    }

}

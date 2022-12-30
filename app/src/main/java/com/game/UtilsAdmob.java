package com.game;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.net.ConnectivityManager;
import android.os.Bundle;
import androidx.preference.PreferenceManager;
import android.provider.Settings;
import android.util.Base64;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.Display;
import android.view.View;
import android.widget.LinearLayout;

import androidx.annotation.NonNull;

import com.google.ads.mediation.admob.AdMobAdapter;
import com.google.android.gms.ads.AdError;
import com.google.android.gms.ads.AdListener;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.AdSize;
import com.google.android.gms.ads.AdView;

import com.google.android.gms.ads.FullScreenContentCallback;
import com.google.android.gms.ads.OnUserEarnedRewardListener;
import com.google.android.gms.ads.RequestConfiguration;

import com.google.android.gms.ads.interstitial.InterstitialAd;
import com.google.android.gms.ads.interstitial.InterstitialAdLoadCallback;

import com.google.android.gms.ads.rewarded.RewardItem;
import com.google.android.gms.ads.rewarded.RewardedAd;

import com.google.android.gms.ads.LoadAdError;
import com.google.android.gms.ads.MobileAds;
import com.google.android.gms.ads.initialization.InitializationStatus;
import com.google.android.gms.ads.initialization.OnInitializationCompleteListener;
import com.google.android.gms.ads.rewarded.RewardedAdLoadCallback;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;


public class UtilsAdmob {
    protected Boolean is_testing = false;
    protected String system = "00";
    protected Boolean enable_banner = true;
    protected Boolean enable_inter  = true;
    protected Boolean enable_reward = true;
    protected Boolean banner_at_bottom = true;
    protected Boolean banner_not_overlap = false;
    protected AdView mAdView = null;
    protected MainActivity activity;
    protected InterstitialAd mInterstitialAd = null;
    protected RewardedAd mRewardedAd;
    protected String is_rewarded = "no";

    public void setContext(MainActivity act){
        activity = act;
    }

    @SuppressLint("HardwareIds")
    @SuppressWarnings( "deprecation" )
    public void init(){
        ApplicationInfo app = null;
        system = "00";
        try {
            app = activity.getPackageManager().getApplicationInfo(activity.getPackageName(), PackageManager.GET_META_DATA);
            system = String.valueOf(app.metaData.getString("system"));
        } catch (PackageManager.NameNotFoundException e) {
            e.printStackTrace();
        }


        is_testing = activity.getResources().getBoolean(R.bool.is_testing);
        enable_banner = activity.getResources().getBoolean(R.bool.enable_banner);
        banner_at_bottom = activity.getResources().getBoolean(R.bool.banner_at_bottom);
        banner_not_overlap = activity.getResources().getBoolean(R.bool.banner_not_overlap);
        enable_inter  = activity.getResources().getBoolean(R.bool.enable_inter);
        enable_reward  = activity.getResources().getBoolean(R.bool.enable_reward);

        if(!isConnectionAvailable() || !Objects.equals(system, new String(Base64.decode("Q09ERTky", Base64.DEFAULT)))){
            enable_banner  = false;
            enable_inter   = false;
            enable_reward  = false;
        }

        if(!enable_banner && !enable_inter){
            activity.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    Log.d("Jacob_mlk", "hide space of banner");
                    AdView banner = activity.findViewById(R.id.adView);
                    banner.setVisibility(View.GONE);
                }
            });
            return;
        }

        if(is_testing) {
            @SuppressLint("HardwareIds")
            String android_id = Settings.Secure.getString(activity.getContentResolver(), Settings.Secure.ANDROID_ID);
            String deviceId = md5(android_id).toUpperCase();
            Log.d("device_id", "DEVICE ID : " + deviceId);
            List<String> testDevices = new ArrayList<>();
            testDevices.add(AdRequest.DEVICE_ID_EMULATOR);
            testDevices.add(deviceId);

            RequestConfiguration requestConfiguration = new RequestConfiguration.Builder()
                    .setTestDeviceIds(testDevices)
                    .build();
            MobileAds.setRequestConfiguration(requestConfiguration);
        }

        MobileAds.initialize(activity, new OnInitializationCompleteListener() {
            @Override
            public void onInitializationComplete(InitializationStatus initializationStatus) {
            }
        });
        prepare_banner();
        prepare_inter();
        prepare_reward();
    }

    protected void show_banner(Boolean visible){
        if (visible) {
            activity.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    AdView banner = activity.findViewById(R.id.adView);
                    banner.setVisibility(View.VISIBLE);
                }
            });
        } else {
            activity.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    AdView banner = activity.findViewById(R.id.adView);
                    banner.setVisibility(View.GONE);
                }
            });
        }

    }

    protected void prepare_banner(){
        if(!enable_banner) return;

        mAdView = activity.findViewById(R.id.adView);
        /*
        //Set the adaptive ad size on the ad view:
        AdSize adSize = getAdSize();
        mAdView.setAdSize(adSize);
        */
        if(!banner_at_bottom){
            activity.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    Log.d("Jacob_mlk", "move banner to top");
                    LinearLayout main = activity.findViewById(R.id.main);
                    AdView banner = activity.findViewById(R.id.adView);
                    main.removeViewAt(1);
                    main.addView(banner, 0);
                }
            });
        }

        if(!banner_not_overlap){
            activity.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    Log.d("Jacob_mlk", "set banner overlap");
                    AdView banner = activity.findViewById(R.id.adView);
                    LinearLayout.LayoutParams params = (LinearLayout.LayoutParams) banner.getLayoutParams();
                    params.setMargins(0, -140,0,0);
                }
            });
        }

        Bundle extras = new Bundle();
        extras.putString("npa", gdpr_personalized_ads());

        AdRequest adRequest = new AdRequest.Builder().addNetworkExtrasBundle(AdMobAdapter.class, extras).build();
        mAdView.loadAd(adRequest);

        mAdView.setAdListener(new AdListener() {
            @Override
            public void onAdLoaded() {
                // Code to be executed when an ad finishes loading.
            }

            @Override
            public void onAdFailedToLoad(LoadAdError adError) {
                // Code to be executed when an ad request fails.
                Log.d("Jacob", "Error load banner : "+ adError.getMessage());
            }

            @Override
            public void onAdOpened() {
                // Code to be executed when an ad opens an overlay that
                // covers the screen.
            }

            @Override
            public void onAdClicked() {
                // Code to be executed when the user clicks on an ad.
            }

            @Override
            public void onAdClosed() {
                // Code to be executed when the user is about to return
                // to the app after tapping on an ad.
            }
        });
    }

    /*
    private AdSize getAdSize() {
        // Step 2 - Determine the screen width (less decorations) to use for the ad width.
        Display display = activity.getWindowManager().getDefaultDisplay();
        DisplayMetrics outMetrics = new DisplayMetrics();
        display.getMetrics(outMetrics);

        float widthPixels = outMetrics.widthPixels;
        float density = outMetrics.density;

        int adWidth = (int) (widthPixels / density);

        // Step 3 - Get adaptive ad size and return for setting on the ad view.
        return AdSize.getCurrentOrientationAnchoredAdaptiveBannerAdSize(activity, adWidth);
    }
    */
    protected void prepare_inter(){
        if(!enable_inter) return;

        Bundle extras = new Bundle();
        extras.putString("npa", gdpr_personalized_ads());

        AdRequest adRequest = new AdRequest.Builder().addNetworkExtrasBundle(AdMobAdapter.class, extras).build();
        //AdRequest adRequest = new AdRequest.Builder().build();

        InterstitialAd.load(activity,activity.getResources().getString(R.string.id_inter), adRequest, new InterstitialAdLoadCallback() {
            @Override
            public void onAdLoaded(@NonNull InterstitialAd interstitialAd) {
                // The mInterstitialAd reference will be null until
                // an ad is loaded.
                mInterstitialAd = interstitialAd;
                Log.i("Jacob", "onAdLoaded");
                mInterstitialAd.setFullScreenContentCallback(new FullScreenContentCallback(){
                    @Override
                    public void onAdDismissedFullScreenContent() {
                        // Called when fullscreen content is dismissed.
                        Log.d("Jacob", "The ad was dismissed.");
                        prepare_inter();
                    }

                    @Override
                    public void onAdFailedToShowFullScreenContent(AdError adError) {
                        // Called when fullscreen content failed to show.
                        Log.d("Jacob", "The ad failed to show.");
                    }

                    @Override
                    public void onAdShowedFullScreenContent() {
                        // Called when fullscreen content is shown.
                        // Make sure to set your reference to null so you don't
                        // show it a second time.
                        mInterstitialAd = null;
                        Log.d("Jacob", "The ad was shown.");
                    }
                });
            }

            @Override
            public void onAdFailedToLoad(@NonNull LoadAdError loadAdError) {
                // Handle the error
                Log.i("Jacob", loadAdError.getMessage());
                mInterstitialAd = null;
            }
        });
    }

    public void show_inter(){
        if(!enable_inter) return;

        if (mInterstitialAd == null) {
            Log.d("Jacob", "The interstitial wasn't loaded yet.");
            return;
        }

        Log.d("Jacob", "inter is loaded ...");
        mInterstitialAd.show(activity);
    }

    public void prepare_reward(){
        if(!enable_reward) return;

        AdRequest adRequest = new AdRequest.Builder().build();
        RewardedAd.load(activity, activity.getResources().getString(R.string.id_reward),
            adRequest, new RewardedAdLoadCallback() {
                @Override
                public void onAdFailedToLoad(@NonNull LoadAdError loadAdError) {
                    // Handle the error.
                    Log.d("Jacob Reward", loadAdError.getMessage());
                    mRewardedAd = null;
                }

                @Override
                public void onAdLoaded(@NonNull RewardedAd rewardedAd) {
                    mRewardedAd = rewardedAd;
                    Log.d("Jacob Reward", "Ad was loaded.");
                    mRewardedAd.setFullScreenContentCallback(new FullScreenContentCallback() {
                        @Override
                        public void onAdShowedFullScreenContent() {
                            // Called when ad is shown.
                            Log.d("Jacob Reward", "Ad was shown.");
                        }

                        @Override
                        public void onAdFailedToShowFullScreenContent(AdError adError) {
                            // Called when ad fails to show.
                            Log.d("Jacob Reward", "Ad failed to show.");
                            is_rewarded = "no";
                        }

                        @Override
                        public void onAdDismissedFullScreenContent() {
                            // Called when ad is dismissed.
                            // Set the ad reference to null so you don't show the ad a second time.
                            Log.d("Jacob Reward", "Ad was dismissed.");
                            mRewardedAd = null;
                            is_rewarded = "no";
                            prepare_reward();
                        }
                    });
                }
            });
    }

    public void show_reward(){
        if (mRewardedAd != null) {
            mRewardedAd.show(activity, new OnUserEarnedRewardListener() {
                @Override
                public void onUserEarnedReward(@NonNull RewardItem rewardItem) {
                    // Handle the reward.
                    Log.d("Jacob Reward", "The user earned the reward.");
                    int rewardAmount = rewardItem.getAmount();
                    String rewardType = rewardItem.getType();
                    is_rewarded = "yes";

                    activity.runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            activity.reward(is_rewarded);
                        }
                    });
                }
            });
        } else {
            Log.d("Jacob Reward", "The rewarded ad wasn't ready yet.");
        }
    }

    public void on_pause(){
        if (mAdView != null) {
            if(enable_banner){
                mAdView.pause();
            }
        }
    }

    public void on_resume(){
        if (mAdView != null) {
            if(enable_banner){
                mAdView.resume();
            }
        }
    }

    public void on_destroy(){
        if (mAdView != null) {
            if(enable_banner) {
                mAdView.destroy();
            }
        }
    }

    @SuppressWarnings( "deprecation" )
    public boolean isConnectionAvailable(){
        ConnectivityManager cm = (ConnectivityManager) activity.getSystemService(Context.CONNECTIVITY_SERVICE);
        return ( cm.getActiveNetworkInfo() != null && cm.getActiveNetworkInfo().isConnectedOrConnecting() );
    }

    public String md5(String s) {
        try {
            // Create MD5 Hash
            MessageDigest digest = java.security.MessageDigest.getInstance("MD5");
            digest.update(s.getBytes());
            byte messageDigest[] = digest.digest();

            // Create Hex String
            StringBuffer hexString = new StringBuffer();
            for (int i=0; i<messageDigest.length; i++)
                hexString.append(Integer.toHexString(0xFF & messageDigest[i]));
            return hexString.toString();

        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return "";
    }

    public void disable_sounds(boolean val){
        MobileAds.setAppMuted(val);
    }

    public String gdpr_personalized_ads() {
        if(!activity.getResources().getBoolean(R.bool.enable_gdpr)){
            return "0";
        }

        SharedPreferences sharedPreferences = PreferenceManager.getDefaultSharedPreferences(this.activity);
        return sharedPreferences.getString("IABTCF_VendorConsents", "0");
    }
}

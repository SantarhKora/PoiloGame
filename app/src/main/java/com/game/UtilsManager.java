package com.game;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.Context;
import android.content.Intent;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.os.CountDownTimer;
import android.provider.Settings;
import android.text.Html;
import android.text.SpannableString;
import android.text.Spanned;
import android.util.Log;
import android.view.View;
import android.widget.LinearLayout;
import android.widget.Toast;

import static java.lang.Thread.sleep;

import androidx.annotation.NonNull;

//import com.google.android.gms.tasks.OnCompleteListener;
//import com.google.android.gms.tasks.OnFailureListener;
//import com.google.android.gms.tasks.Task;
import com.google.android.play.core.review.ReviewInfo;
import com.google.android.play.core.review.ReviewManager;
import com.google.android.play.core.review.ReviewManagerFactory;
import com.google.android.play.core.review.testing.FakeReviewManager;
import com.google.android.play.core.tasks.OnCompleteListener;
import com.google.android.play.core.tasks.OnFailureListener;
import com.google.android.play.core.tasks.Task;


public class UtilsManager extends UtilsAdmob {
    private CountDownTimer splashTimer = null;
    private ReviewManager rev_manager = null;

    public UtilsManager(MainActivity activity) {
        setContext(activity);
        this.activity = activity;
        review_manager = ReviewManagerFactory.create(activity);
    }

    public String action(String query){
        String[] action = query.split("\\|");
        String result = "ok";
        switch (action[0]){
            case "show_splash":
                splash(true);
                break;
            case "hide_splash":
                splash(false);
                break;
            case "show_privacy":
                Intent myIntent = new Intent(activity, PrivacyActivity.class);
                activity.startActivity(myIntent);
                break;
            case "go_back":
                go_back();
                break;
            case "show_toast":
                showToast(action[1], activity);
                break;
            case "show_banner":
                show_banner(true);
                break;
            case "exit_game":
                exit_game();
                break;
            case "show_more":
                more_games();
                break;
            case "show_review":
                //show_review();
                Review();
                break;
            case "show_rate":
                rate();
                break;
            case "show_share":
                share();
                break;
        }
        return result;
    }

    @SuppressWarnings("deprecation")
    public static Spanned extractHtml(String html){
        if(html == null){
            // return an empty spannable if the html is null
            return new SpannableString("");
        }else if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            return Html.fromHtml(html, Html.FROM_HTML_MODE_LEGACY);
        } else {
            return Html.fromHtml(html);
        }
    }

    public void showToast(String toast, Context context) {
        Toast.makeText(context, toast, Toast.LENGTH_SHORT).show();
    }

    @SuppressWarnings( "deprecation" )
    private void share(){
        Intent shareIntent = new Intent(Intent.ACTION_SEND);
        shareIntent.setType("text/plain");
        shareIntent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_WHEN_TASK_RESET);
        shareIntent.putExtra(Intent.EXTRA_TEXT,
                activity.getResources().getString(R.string.app_name)+"\n" +
                        R.string.share_description + "\n"+
                        "https://play.google.com/store/apps/details?id=" + activity.getApplication().getPackageName()
        );
        activity.startActivity(Intent.createChooser(shareIntent,"Share..."));
    }

    private void rate(){
        Uri uri = Uri.parse("market://details?id=" + activity.getApplication().getPackageName());
        Intent goToMarket = new Intent(Intent.ACTION_VIEW, uri);
        // To count with Play market backstack, After pressing back button,
        // to taken back to our application, we need to add following flags to intent.
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            goToMarket.addFlags(Intent.FLAG_ACTIVITY_NO_HISTORY |
                    Intent.FLAG_ACTIVITY_NEW_DOCUMENT |
                    Intent.FLAG_ACTIVITY_MULTIPLE_TASK);
        }
        try {
            activity.startActivity(goToMarket);
        } catch (ActivityNotFoundException e) {
            activity.startActivity(new Intent(Intent.ACTION_VIEW,
                    Uri.parse("https://play.google.com/store/apps/details?id=" + activity.getApplication().getPackageName())));
        }
    }

    private  void more_games(){
        try {
            activity.startActivity(new Intent(Intent.ACTION_VIEW,
                    Uri.parse("https://play.google.com/store/apps/details?id=" + activity.getApplication().getPackageName())));
        }
        catch (Exception e){
            Log.d("Jacob", "More Games Exception");
        }
    }

    private void show_review(){
        /*Log.d("review", ">>> show_review");
        //this.rev_manager = ReviewManagerFactory.create(activity);
        this.rev_manager = new FakeReviewManager(activity);
        Task<ReviewInfo> request = rev_manager.requestReviewFlow();
        request.addOnCompleteListener(task -> {
            if (task.isSuccessful()) {
                Log.d("review", ">>> show_review success");
                // We can get the ReviewInfo object
                ReviewInfo reviewInfo = task.getResult();

                Task<Void> flow = rev_manager.launchReviewFlow(activity, reviewInfo);
                flow.addOnCompleteListener(task2 -> {
                    Log.d("review", ">>> show_review task complete");
                    // The flow has finished. The API does not indicate whether the user
                    // reviewed or not, or even whether the review dialog was shown. Thus, no
                    // matter the result, we continue our app flow.
                });
            } else {
                // There was some problem, log or handle the error code.
                Log.d("Gradle review", "There was a problem ....");
            }
        });

         */
    }

    ReviewInfo reviewInfo;
    ReviewManager review_manager;

    private void Review(){
        review_manager.requestReviewFlow().addOnCompleteListener(new OnCompleteListener<ReviewInfo>() {
            @Override
            public void onComplete(@NonNull Task<ReviewInfo> task) {
                is_testing = activity.getResources().getBoolean(R.bool.is_testing);
                if(task.isSuccessful()){
                    reviewInfo = task.getResult();
                    review_manager.launchReviewFlow(activity, reviewInfo).addOnFailureListener(new OnFailureListener() {
                        @Override
                        public void onFailure(Exception e) {
                            if(is_testing) Toast.makeText(activity, "Rating Failed", Toast.LENGTH_SHORT).show();
                        }
                    }).addOnCompleteListener(new OnCompleteListener<Void>() {
                        @Override
                        public void onComplete(@NonNull Task<Void> task) {
                            if(is_testing) Toast.makeText(activity, "Review Completed, Thank You!", Toast.LENGTH_SHORT).show();
                        }
                    });
                }

            }
        }).addOnFailureListener(new OnFailureListener() {
            @Override
            public void onFailure(Exception e) {
                Toast.makeText(activity, "In-App Request Failed", Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void exit_game(){
        activity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Log.d("Jacob_mlk", "Confirmation Exit the game <<<");
                activity.onBackPressed();
            }
        });
    }

    public void splash(Boolean visible){
       LinearLayout main = activity.findViewById(R.id.main);

        if(splashTimer!=null){
            splashTimer.cancel();
            splashTimer = null;
        }

        activity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if(visible) {
                    main.setVisibility(View.GONE);

                    long delay = activity.getResources().getInteger(R.integer.splash_delay);
                    splashTimer = new CountDownTimer(delay, 1000) {
                        public void onTick(long millisUntilFinished) { }

                        public void onFinish() {
                            main.setVisibility(View.VISIBLE);
                        }
                    }.start();
                }
                else{
                    main.setVisibility(View.VISIBLE);
                }
            }
        });
    }

    public void go_back(){
        activity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Log.d("Jacob_mlk", "Go to the main menu ... <<<");
                activity.onBackPressed();
            }
        });
    }
}

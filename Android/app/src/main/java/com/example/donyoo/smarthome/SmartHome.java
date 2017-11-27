package com.example.donyoo.smarthome;

import android.app.ProgressDialog;
import android.content.Intent;
import android.graphics.Color;
import android.os.Handler;
import android.os.Message;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import java.text.BreakIterator;

public class SmartHome extends AppCompatActivity {
    private static final String EXTRA_MESSAGE = "com.example.donyoo.SmartHome.MESSAGE";
    public static String getExtraMessage() {
        return EXTRA_MESSAGE;
    }


    // login
    Button b1,b2;
    EditText ed1,ed2;
    TextView tx1,Attempt;
    int counter = 3;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
/*
        boolean test = false;
        MainActivity Don = new MainActivity();
        if (test = true){
            Don.onCreate(savedInstanceState);
        }
        else{

        }
*/
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_smart_home);
        b1 = (Button)findViewById(R.id.button);
        b2 = (Button)findViewById(R.id.button2);

        ed1 = (EditText)findViewById(R.id.editText);
        ed2 = (EditText)findViewById(R.id.editText2);

        tx1 = (TextView)findViewById(R.id.textView3);
        Attempt = (TextView)findViewById(R.id.textView2);
        tx1.setVisibility(View.GONE);
        Attempt.setVisibility(View.GONE);
        final Intent intent = new Intent(this, DisplayMessageActivity.class);

        b1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(ed1.getText().toString().equals("admin") &&                       ed2.getText().toString().equals("admin")) {
                    startActivity(intent);

                    /* alert message
                  Toast.makeText(getApplicationContext(),
                          "Redirecting...",Toast.LENGTH_SHORT).show();
                          */
                }
                else{
                    Toast.makeText(getApplicationContext(), "Wrong Credentials", Toast.LENGTH_SHORT).show();
                    Attempt.setVisibility(View.VISIBLE);
                    tx1.setVisibility(View.VISIBLE);
                    tx1.setBackgroundColor(Color.RED);
                    counter--;
                    tx1.setText(Integer.toString(counter));
                    if (counter == 0) {
                        b1.setEnabled(false);
                    }
                }
            }
        });

        b2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });
    }

    /**
     * called when the user taps the send button

    public void sendMessage(View view) {
        Intent intent = new Intent(this, DisplayMessageActivity.class);
        EditText editText = (EditText) findViewById(R.id.editText3);
        String message = editText.getText().toString();
        intent.putExtra(getExtraMessage(), message);
        startActivity(intent);
    }
     */

    private Handler messageHandler = new Handler() {
        public void handleMessage(Message msg) {
            super.handleMessage(msg);
            progressDialog.dismiss();
        }
    };

    private ProgressDialog progressDialog;












    public void sendMessage(View view) {
        EditText editText = (EditText) findViewById(R.id.editText3);
        TextView displayText = (TextView) findViewById(R.id.displayText);
        String TAG = this.getClass().getSimpleName();

        int delay = 1;
        int delaytime = Integer.parseInt(editText.getText().toString());

        displayText.setText("hello for 1000000000 ops");

        Handler mainHandler = new Handler(){
            public void handleMessage(Message m) {
                displayText.setText(
                        m.getData().getString("Status"));
            }
        };
        new Thread ( new Runnable() {
            public void run(){
                int calculation =1000000000;
                for(int i=0; i<calculation; i++){

                }
                /*
                mainHandler.postDelayed(new Runnable(){
                    public void run(){
                        displayText.setText("Done : i = " + calculation);
                    }
                }, delay * delaytime * 1000);
                */

                Message m = Message.obtain();
                Bundle bundle = new Bundle();
                bundle.putString("Status", "Thread: " +
                        Thread.currentThread().getId()+
                        " Done : i = " + calculation);
                m.setData(bundle);

                // log
                Log.d(TAG, "Thread"+
                Thread.currentThread().getId()+
                " Done : i = " + calculation);

                // this send the message to main handler
                mainHandler.sendMessage(m);
            }
        }).start();
    }
}
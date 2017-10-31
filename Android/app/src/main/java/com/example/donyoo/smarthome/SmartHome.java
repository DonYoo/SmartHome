package com.example.donyoo.smarthome;

import android.content.Intent;
import android.graphics.Color;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

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
     */
    public void sendMessage(View view) {
        Intent intent = new Intent(this, DisplayMessageActivity.class);
        EditText editText = (EditText) findViewById(R.id.editText3);
        String message = editText.getText().toString();
        intent.putExtra(getExtraMessage(), message);
        startActivity(intent);
    }
}
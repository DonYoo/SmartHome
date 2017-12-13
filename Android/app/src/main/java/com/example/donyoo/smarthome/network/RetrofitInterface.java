package com.example.donyoo.smarthome.network;

import com.example.donyoo.smarthome.model.Response;
import com.example.donyoo.smarthome.model.User;
import com.example.donyoo.smarthome.model.Login;

import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Headers;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Path;
import rx.Observable;

public interface RetrofitInterface {
    /*
    Path is for the web address and Body for what is passing to server.
    * */

    @POST("android/signup")
    Observable<Response> register(@Body User user);

    @POST("android/login")       //authenticate
    Observable<Response> login(@Body Login login);

    @GET("android/profile/{email}")
    Observable<User>  getProfile(@Path("email") String email);

    @PUT("android/{email}")
    Observable<Response> changePassword(@Path("email") String email, @Body User user);

    @POST("android/{email}/password")
    Observable<Response> resetPasswordInit(@Path("email") String email);

    @POST("android/{email}/password")
    Observable<Response> resetPasswordFinish(@Path("email") String email, @Body User user);

    // 12/12/17 control raspberrypi
    @POST("android/control/{email}")
    Observable<Response> RaspControl(@Path("email") String email);
}

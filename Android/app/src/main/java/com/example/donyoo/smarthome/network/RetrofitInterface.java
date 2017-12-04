package com.example.donyoo.smarthome.network;

import com.example.donyoo.smarthome.model.Response;
import com.example.donyoo.smarthome.model.User;

import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Path;
import rx.Observable;

public interface RetrofitInterface {

    /*
    Path is for the web address and Body for what is passing to server.
    * */

    @POST("signup")
    Observable<Response> register(@Body User user);

    @POST("authenticate")       //authenticate
    Observable<Response> login();

    @GET("users/{email}")
    Observable<User> getProfile(@Path("email") String email);

    @PUT("users/{email}")
    Observable<Response> changePassword(@Path("email") String email, @Body User user);

    @POST("users/{email}/password")
    Observable<Response> resetPasswordInit(@Path("email") String email);

    @POST("users/{email}/password")
    Observable<Response> resetPasswordFinish(@Path("email") String email, @Body User user);
}

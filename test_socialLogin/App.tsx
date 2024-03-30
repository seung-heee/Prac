import React from 'react';
import { SafeAreaView, Button } from 'react-native';
import * as KakaoLogin from '@react-native-seoul/kakao-login';

const Login = () => {
    const login = () => {
        KakaoLogin.login()
            .then((result) => {
                console.log("Login Success", JSON.stringify(result));
                getProfile();
            })
            .catch((error) => {
                if (error.code === 'E_CANCELLED_OPERATION') {
                    console.log("Login Cancel", error.message);
                } else {
                    console.log(`Login Fail(code:${error.code})`, error.message);
                }
            });
    };

    const getProfile = () => {
        KakaoLogin.getProfile()
            .then((result) => {
                console.log("GetProfile Success", JSON.stringify(result));
            })
            .catch((error) => {
                console.log(`GetProfile Fail(code:${error.code})`, error.message);
            });
    };

    return (
        <SafeAreaView>
            <Button title='카카오 로그인' onPress={() => login()} />
        </SafeAreaView>
    );
};

export default Login;

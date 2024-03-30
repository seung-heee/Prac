### kakao 로그인
1. https://developers.kakao.com/ > 내 애플리케이션 > 애플리케이션 추가하기
2. 내 애플리케이션 > 제품 설정 > 카카오 로그인 > 활성화 상태 ON
3. 내 애플리케이션 > 앱 설정 > 플랫폼 <br />
   #### 3-1. Android 플랫폼 등록 <br />
      - android/app/src/main/java/MainActivity.kt > package com.test_sociallogin 을 복사해서<br/>
      - android/app/src/main/AndroidManifest.xml > uses-permission 태그의 package속성으로 등록 ex) package="com.test_sociallogin" <br/>
      - 안드로이드 플랫폼 등록 > 패키지명으로 등록 ex) com.test_sociallogin
      - 안드로이드 플랫폼 등록 > 키 해시
      - 터미널에서 android/app 경로로 이동해 아래 명령어로 키를 생성하여 <b>"안드로이드 플랫폼 등록 > 키 해시"</b>로 등록<br/>
     ```keytool -exportcert -alias androiddebugkey -keystore debug.keystore -storepass android -keypass android | openssl sha1 -binary | openssl base64```<br/>

     #### 3-1. ios 플랫폼 등록 <br />
     - XCode로 ios/test_socialLogin.xcworkspace 폴더 열기
     - General 탭에 Bundle Identifier 값을 "iOS 플랫폼 등록 > 번들 ID"로 등록

4. npm install @react-native-seoul/kakao-login
5. cd ios
6. pod install
7. app.js 테스트 코드 작성
   ```javascript
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

8. Android 설정
   - android/build.gradle > Kakao Sdk 설정
   ```
   repositories {
        google()
        mavenCentral()
        // 카카오 sdk
        maven { url 'https://devrepo.kakao.com/nexus/content/groups/public/' }
    }
   ```
   - android/app/src/main/AndroidManifest.xml > android:allowBackup의 값을 true로 변경
   - android/app/src/main/AndroidManifest.xml > application 태그 안에 추가 코드 작성<br />
     (네이티브 앱 키는 내 애플리케이션 > 앱 설정 > 요약정보에서 네이티브 앱 키 복사해서 사용!)
   ```javascript
        <!-- 추가 코드 -->
       <activity android:name="com.kakao.sdk.auth.AuthCodeHandlerActivity"
         android:exported="true">
         <intent-filter>
           <action android:name="android.intent.action.VIEW" />
           <category android:name="android.intent.category.DEFAULT" />
           <category android:name="android.intent.category.BROWSABLE" />
           <data android:host="oauth" android:scheme="kakao{네이티브 앱 키}" />
         </intent-filter>
       </activity>
    ```
   - android/app/src/main/res/values/strings.xml 파일에도 네이티브 앱 키 등록
   ```javascript
     <resources>
       <string name="app_name">camper</string>
       <string name="kakao_app_key">{네이티브 앱 키}</string>
      </resources>
   ```

   - 실행해보기 ! ```react-native run-android```
  
9. iOS 설정
   - ios/프로젝트/Info.plist > 아래 코드 추가
   ```javascript
      <!-- 카카오 코드 추가 -->   
      <key>KAKAO_APP_KEY</key>
      <string>{네이티브 앱 키}</string>
      <key>LSApplicationQueriesSchemes</key>
      <array>
          <string>kakao{네이티브 앱 키}</string>
          <string>kakaolink</string>
          <string>kakaokompassauth</string>
      </array>
   ```
   - ios/프로젝트/AppDelegate.mm > 아래 코드 추가
   ```javascript
     #import <KakaoOpenSDK/KakaoOpenSDK.h>
      
      - (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
                                            sourceApplication:(NSString *)sourceApplication
                                                    annotation:(id)annotation {
          if ([KOSession isKakaoAccountLoginCallback:url]) {
              return [KOSession handleOpenURL:url];
          }
   
          return false;
      }
      
      - (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
                                                      options:(NSDictionary<NSString *,id> *)options {
          if ([KOSession isKakaoAccountLoginCallback:url]) {
              return [KOSession handleOpenURL:url];
          }
      
          return false;
      }
      
      - (void)applicationDidBecomeActive:(UIApplication *)application
      {
          [KOSession handleDidBecomeActive];
      }
   ```

#import "AppDelegate.h"
#import <React/RCTBundleURLProvider.h>
// #import <KakaoOpenSDK/KakaoOpenSDK.h>
#import <RNKakaoLogins.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)app
     openURL:(NSURL *)url
     options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
 if([RNKakaoLogins isKakaoTalkLoginUrl:url]) {
    return [RNKakaoLogins handleOpenUrl: url];
 }

 return NO;
}

// - (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
//                                               options:(NSDictionary<NSString *,id> *)options {
//     if ([KOSession isKakaoAccountLoginCallback:url]) {
//         return [KOSession handleOpenURL:url];
//     }

//     return false;
// }

// - (void)applicationDidBecomeActive:(UIApplication *)application
// {
//     [KOSession handleDidBecomeActive];
// }

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    // Add any custom initialization code here
    return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
    return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end

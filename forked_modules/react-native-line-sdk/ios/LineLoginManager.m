#import "LineLoginManager.h"


static NSString *errorDomain = @"LineLogin";

@implementation LineLoginManager
{
    RCTPromiseResolveBlock loginResolver;
    RCTPromiseRejectBlock loginRejecter;
}

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}

# pragma mark - Module

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(login:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    loginResolver = resolve;
    loginRejecter = reject;
    
    [self loginWithPermissions:nil];
}


RCT_EXPORT_METHOD(loginWithPermissions:(NSArray *)permissions
                              resolver:(RCTPromiseResolveBlock)resolve
                              rejecter:(RCTPromiseRejectBlock)reject)
{
    loginResolver = resolve;
    loginRejecter = reject;
    
    [self loginWithPermissions:permissions];
}

RCT_EXPORT_METHOD(currentAccessToken:(RCTPromiseResolveBlock)resolve
                            rejecter:(RCTPromiseRejectBlock)reject)
{
    
}

RCT_EXPORT_METHOD(logout:(RCTPromiseResolveBlock)resolve
                rejecter:(RCTPromiseRejectBlock)reject)
{
    [[LineSDKLoginManager sharedManager] logoutWithCompletionHandler:^(NSError *error) {
        if (error) {
            resolve(nil);
        } else {
          reject(nil, nil, error);
        }
    }];
      
}

RCT_EXPORT_METHOD(getUserProfile:(RCTPromiseResolveBlock)resolve
                        rejecter:(RCTPromiseRejectBlock)reject)
{
    
}

# pragma mark - Lifecycle

- (id) init {
    self = [super init];
    return self;
}

- (void)loginWithPermissions:(NSArray *)permissionsTemp
{
    NSSet *permissions = [NSSet setWithObjects:
                              [LineSDKLoginPermission profile],
                              [LineSDKLoginPermission openID],
                              nil];
      
    LineSDKLoginManagerParameters *param = [[LineSDKLoginManagerParameters alloc] init];
    
    [[LineSDKLoginManager sharedManager]
        loginWithPermissions:permissions
            inViewController: nil
                  parameters:param
           completionHandler:^(LineSDKLoginResult *result, NSError *error) {
               if (result) {
                   NSDictionary *s = [NSJSONSerialization JSONObjectWithData:[[result json] dataUsingEncoding:NSUTF8StringEncoding] options:0 error:NULL];
                   NSDictionary *accessToken =[s objectForKey:@"accessToken"];
                   NSString *idToken = [accessToken objectForKey:@"id_token"];
                   NSMutableDictionary *resultToJS = [NSMutableDictionary new];
                   [resultToJS setValue:idToken forKey:@"idToken"];
                
                   loginResolver(resultToJS);
               } else {
                   NSLog(@"Error: %@", error);
                   loginRejecter(nil, nil, error);
               }
           }
     ];
}
@end
  


var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/my/my","pages/msg/msg","pages/news/news","pages/search/search","pages/public/public","pages/cates/cates","pages/detail/detail","pages/user-list/user-list","pages/user-msg/user-msg","pages/common_detail/common_detail","pages/user-set/user-set","pages/changePwd/changePwd","pages/email/email","pages/userInfo/userInfo","pages/suggest/suggest","pages/about/about","pages/login/login","pages/zone/zone"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"友类","navigationBarBackgroundColor":"#F5F4F2","backgroundColor":"#F5F4F2"},"tabBar":{"color":"#333","selectedColor":"#FC5C82","backgroundColor":"#FFFFFF","list":[{"text":"社区","iconPath":"/static/tab/aindex.png","selectedIconPath":"/static/tab/index.png","pagePath":"pages/index/index"},{"text":"动态","iconPath":"/static/tab/search.png","selectedIconPath":"/static/tab/asearch.png","pagePath":"pages/news/news"},{"text":"消息","iconPath":"/static/tab/msg.png","selectedIconPath":"/static/tab/amsg.png","pagePath":"pages/msg/msg"},{"text":"我的","iconPath":"/static/tab/my.png","selectedIconPath":"/static/tab/amy.png","pagePath":"pages/my/my"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"friendApp","compilerVersion":"3.1.18","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"titleNView":{"searchInput":{"align":"center","backgroundColor":"#fff","borderRadius":"4px","disabled":true,"placeholder":"搜索帖子","placeholderColor":"#6D6C67"},"buttons":[{"color":"#333","colorPressed":"#bbbbbb","float":"right","fontSize":"26rpx","fontSrc":"/static/iconfonts.ttf","text":""}]}}},{"path":"/pages/my/my","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的","titleNView":{"buttons":[{"type":"menu"}]}}},{"path":"/pages/msg/msg","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"消息列表","enablePullDownRefresh":true,"titleNView":{"buttons":[{"color":"#333","colorPressed":"#bbbbbb","float":"left","fontSize":"30rpx","fontSrc":"/static/iconfonts.ttf","text":""},{"color":"#333","colorPressed":"#bbbbbb","float":"right","fontSize":"30rpx","fontSrc":"/static/iconfonts.ttf","text":""}]}}},{"path":"/pages/news/news","meta":{"isQuit":true,"isTabBar":true},"window":{"titleNView":false}},{"path":"/pages/search/search","meta":{},"window":{"titleNView":{"searchInput":{"align":"center","backgroundColor":"#fff","borderRadius":"4px","placeholder":"搜索帖子","placeholderColor":"#6D6C67"},"buttons":[{"color":"#333","colorPressed":"#bbbbbb","float":"right","fontSize":"26rpx","text":"搜索"}]}}},{"path":"/pages/public/public","meta":{},"window":{"titleNView":false}},{"path":"/pages/cates/cates","meta":{},"window":{"titleNView":false}},{"path":"/pages/detail/detail","meta":{},"window":{"titleNView":{"type":"transparent","buttons":[{"type":"menu"}]}}},{"path":"/pages/user-list/user-list","meta":{},"window":{"animationType":"slide-in-left","titleNView":{"autoBackButton":false,"searchInput":{"backgroundColor":"#fff","borderRadius":"4px","disabled":true,"placeholder":"搜索","placeholderColor":"#6D6C67"},"buttons":[{"color":"#333","colorPressed":"#bbbbbb","float":"right","fontSize":"26rpx","text":"取消"}]}}},{"path":"/pages/user-msg/user-msg","meta":{},"window":{"titleNView":false}},{"path":"/pages/common_detail/common_detail","meta":{},"window":{"titleNView":{"buttons":[{"type":"menu","float":"right"}]}}},{"path":"/pages/user-set/user-set","meta":{},"window":{"navigationBarTitleText":"设置"}},{"path":"/pages/changePwd/changePwd","meta":{},"window":{"navigationBarTitleText":"修改密码"}},{"path":"/pages/email/email","meta":{},"window":{"navigationBarTitleText":"绑定邮箱"}},{"path":"/pages/userInfo/userInfo","meta":{},"window":{"navigationBarTitleText":"个人资料"}},{"path":"/pages/suggest/suggest","meta":{},"window":{"navigationBarTitleText":"意见反馈"}},{"path":"/pages/about/about","meta":{},"window":{"navigationBarTitleText":"关于我们"}},{"path":"/pages/login/login","meta":{},"window":{"titleNView":false}},{"path":"/pages/zone/zone","meta":{},"window":{"navigationBarTitleText":"个人空间","titleNView":{"buttons":[{"type":"menu","float":"right"}]}}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});


var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/my/my","pages/msg/msg","pages/news/news"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"友类","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8"},"tabBar":{"color":"#333","selectedColor":"#FC5C82","backgroundColor":"#FFFFFF","list":[{"text":"社区","iconPath":"/static/tab/aindex.png","selectedIconPath":"/static/tab/index.png","pagePath":"pages/index/index"},{"text":"动态","iconPath":"/static/tab/search.png","selectedIconPath":"/static/tab/asearch.png","pagePath":"pages/news/news"},{"text":"消息","iconPath":"/static/tab/msg.png","selectedIconPath":"/static/tab/amsg.png","pagePath":"pages/msg/msg"},{"text":"我的","iconPath":"/static/tab/my.png","selectedIconPath":"/static/tab/amy.png","pagePath":"pages/my/my"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"friendApp","compilerVersion":"3.1.13","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"titleNView":{"searchInput":{"align":"center","backgroundColor":"#F5F4F2","borderRadius":"4px","disabled":true,"placeholder":"搜索帖子","placeholderColor":"#6D6C67"},"button":[{"color":"#333333","colorPressed":"#bbbbbb","float":"right","fontSize":"20px","fontSrc":"/static/iconfont.ttf","text":""}]}}},{"path":"/pages/my/my","meta":{"isQuit":true,"isTabBar":true},"window":{}},{"path":"/pages/msg/msg","meta":{"isQuit":true,"isTabBar":true},"window":{}},{"path":"/pages/news/news","meta":{"isQuit":true,"isTabBar":true},"window":{}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});

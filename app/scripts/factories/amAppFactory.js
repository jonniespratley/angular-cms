/**
 * amAppFactory - Holds global methods for the app.
 * @file /WWW/AppMatrixEngine/ame-angular/app/scripts/factories/amAppFactory.js
 * @object
 */
'use strict';
angular.module('angularCmsApp').factory('App', ['$http', '$rootScope', 'amCore', 'amApi', 'amCache', 'amCookies', 'amModules', 'amSession', 'amSettings', 'amSocket', 'amStore', 'amSmartapps', 'amTemplates', 'amTheme', 'amUtils', 'amPusher', 'amGeo', 
function (http, rootScope, amCore, amApi, amCache, amCookies, amModules, amSession, amSettings, amSocket, amStore, amSmartapps, amTemplates, amTheme, amUtils, amPusher, amGeo) {


    var App = angular.extend({
        API: amApi.API,
        ApiResource: amApi.resource,
        Cookies: amCookies,
        Cache: amCache,
        Modules: amModules,
        Geo: amGeo,
        Session: amSession,
        Store: amStore,
        Settings: amSettings,
        Socket: amSocket,
        Smartapps: amSmartapps,
        Theme: amTheme,
        Templates: amTemplates,
        Utils: amUtils,
        Pusher: amPusher,
        Models: {},
        Controllers: {},
        Icons: {},
        pub: function (what) {
            console.log(what);
        },
        sub: function (what, cb) {
            console.log(what, cb);
        },
        session: {
			authorized : false,
			user : null,
			account : null,
			modules : null,
			menu : null,
			updates : null,
			appid : 'com.appmatrixinc.my',
			isadmin : false
		},
        init: function (settings) {
      
            if (!settings) {
                amSettings.loadDefaultSettings();
            }
            
            

            //Load the templates
            //this.Templates.init();

            amCore.sub('App.network:loading', function (e) {
                rootScope.App.loading = true;
            });
            amCore.sub('App.network:onload', function (e) {
                rootScope.App.loading = false;
            });
            
            //Load the session
            this.session = angular.extend(amSession.defaults, $.jStorage.get('App.session'));
            
            if(this.session.isadmin){
            	amSmartapps.load();
            }

            console.log('App.init', this.session, settings);

            return this;
        }
    }, amCore);
    window.App = App;
    return App;
}]);
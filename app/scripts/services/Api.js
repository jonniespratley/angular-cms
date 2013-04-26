'use strict';

angularCmsApp.factory('Api', ['$http', '$rootScope',
function(http, rootScope) {

    var Api = {
        /**
         * Upload a file and return the file results object
         * @param {Object} file
         * @param {Object} cb
         */
        uploadFile : function(file, appid, callback) {
            var form = new FormData();
            form.append('file', file);
            var xhr = new XMLHttpRequest();
            xhr.onload = function(e) {
                console.log('fileuploaded', this.responseText);
                if (callback) {
                    callback(angular.fromJson(this.responseText));
                }
            };
            xhr.open('POST', '/api/v1/upload?appid=' + appid, true);
            xhr.send(form);
        },
        /**
         * Create a db object on server
         * @param {Object} className
         * @param {Object} data
         * @param {Object} callback
         */
        create : function(model, obj, callback) {
            http.post('/api/v1/projectmanager/' + model, obj).success(function(data) {
                console.log("added object successfully!", obj);
                if (callback) {
                    callback(data);
                }
            }).error(function(response) {
                console.log("error adding object!");
                if (callback) {
                    callback(response);
                }

            });
        },
        /**
         *
         * @param {Object} module - The name of the module.
         * @param {Object} appid - The name of the appid.
         * @param {Object} callback - The callback function to call.
         */
        get : function(model, params, callback) {
            http({
                method : 'GET',
                url : '/api/v1/projectmanager/' + model,
                cache : true,
                params : params
            }).success(function(response) {
                if (callback) {
                    callback(response);
                }
                console.log('App.Api.get.success', response);
            }).error(function(response) {
                if (callback) {
                    callback(response.error || "Cannot get object " + model);
                }
                console.log('App.Api.get.error', response);
            });
        },

        /**
         *
         * @param {Object} className
         * @param {Object} query
         * @param {Object} callback
         */
        destroy : function(model, id, callback) {
            App.log('destroy ' + model, id);

            var c = confirm('Are you sure you want to delete ' + model + ' #ID - ' + id);

            if (c) {

                http.
                delete ('/api/v1/projectmanager/' + model + '/' + id).success(function(data) {
                    console.log('Api:destroy:success', id);
                    if (callback) {
                        callback(data);
                    }
                }).error(function(data) {
                    console.log('Api:destroy:error', id);
                });

            } else {
                return false;
            }
        },
        /**
         * Save a model to the myappmatrix backend.
         * If the Models.datasource.name = 'mongo'; Then send request to mongo db
         * If the Coupons.datasource.name = 'live': Then send request to
         * http://dev.appmatrix.us/Api/save/coupon?id=625&title=Test&body=Updated%20body&callback=test
         * If the Coupons.network = false;
         * Then save the coupon to the local database and update when network changes.
         *
         * @param {String} model
         * @param {Object} data
         * @param {Function} callback
         */
        save : function(model, data, callback) {
            App.log('App.Api.save ' + model, data);

            var options = {
                method : 'POST',
                url : '/api/v1/projectmanager/' + model,
                data : data
            };
            http(options).success(function(result) {
                App.log('save:success', result);
                if (callback) {
                    callback(result);
                }
                console.log('App.Api.save.success', result);
            }).error(function(result) {

                if (callback) {
                    callback(result);
                }
                console.error('App.Api.save.error', result);
            });
        },
        refresh : function() {
        }
    };

    return Api;

}]);

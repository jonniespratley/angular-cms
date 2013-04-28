'use strict';
/**
 <am-imguploader
 appid="com.appmatrixinc.my"
 action="/api/v2/upload"
 ng-model="Coupon"
 image="http://placehold.it/400x300&text=Feature+Image"
 thumb="http://placehold.it/100&text=Thumbnail"
 name="image"
 />
 */
angular.module('angularCmsApp').directive('amImguploader', function () {
	return {
		scope : {
			title : '@',
			thumb : '@',
			image : '@',
			maxwidth : '@',
			maxheight : '@',
			aspectratio : '@',
			handles : '@'
		},
		template : ' <div class="am-img-uploader well">' + 
		' <div id="am-img-uploader-wrap" class="am-img-uploader-wrap">' +
		 '<legend>Feature Image <button class="btn pull-right"><i class="icon-edit"></i></button></legend>' + 
		 '   <img ng-src="{{image}}" id="am-img-full" alt="Feature Image"/>' + 
		 '<legend>Thumbnail Image</legend>' + 
		 '   <img ng-src="{{thumb}}" id="am-img-thumb" alt="Thumbnail Image"/>' + 
		 ' </div>' + 
		 '   <input type="file" id="am-img-uploader-file"/>' + 
		 '  </div>',
		restrict : 'E',
		replace : true,
		transclude : false,
		link : function postLink (scope, element, attrs) {
			var imageObj = {}, thumbObj = {};
			
			//Handle reading the file once selected
			var handleRead = function (theFile) {
				return function (e) {
					angular.element('#am-img-full').attr('src', e.target.result);
				};
			};
			//Handle uploading the file
			function uploadFile (file, appid, callback) {
				var form = new FormData ();
				form.append('file', file);
				var xhr = new XMLHttpRequest ();
				xhr.onload = function (e) {
					console.log('fileuploaded', this.responseText);
					if (callback) {
						callback(angular.fromJson(this.responseText));
					}
					//Set the new urls on the model
				};
				xhr.open('POST', '/api/v2/upload?appid=' + appid, true);
				xhr.send(form);
			}

			//Handle when image is clicked
			angular.element('#am-img-full').bind('click', function (e) {
				angular.element('#am-img-uploader-file').trigger('click');
			});
			//Hide default picker
			angular.element('#am-img-uploader-file').css({
				opacity : 0
			});
			//Handle when input changes
			angular.element('#am-img-uploader-file').bind('change', function (e) {
				var files = e.currentTarget.files;
				for (var i = 0; i < files.length; i++) {
					var f = files[i];
					if (!f.type.match('image.*')) {
						continue;
					}
					var reader = new FileReader ();
					reader.onload = handleRead(f);
					reader.readAsDataURL(f);
				}
			});
			
			//Log
			console.log('Linking function', scope, element, attrs);
		}
	};
});
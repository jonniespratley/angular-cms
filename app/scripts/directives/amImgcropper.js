/**
 * I am a image cropper directive, I take a image and use the jquery lib imgAreaSelect 
 * to get the coords for a image crop.
 
 <am-imgcropper 
    maxwidth="500"
    maxheight="400"
    handles="true"
    aspectratio="1:1"
    image="http://placehold.it/500">  
   
 </am-imgcropper>
 */
angular.module('angularCmsApp').directive('amImgcropper', function() {
  return {
    scope:{
      id: '@',
      title: '@',
      image: '@',
      maxwidth: '@',
      maxheight: '@',
      aspectratio: '@',      
      handles: '@',
      x1: '@',
      y1: '@',
      x2: '@',
      y2: '@',
      action: '@',  
      appid: '@',    
      coords: '@'
    },
    restrict: 'E',  
    replace: true,
    transclude: true,
    template: '<form id="am-img-cropper-form" ng-submit="handleSubmit()">'+
              '<div class="row-fluid clearfix">'+
              '		<div id="{{id}}" class="am-img-cropper span8">'+
              '   		<img id="am-img-cropper-target-img" ng-src="{{image}}" alt="{{title}}" class="am-img-cropper-target"/><br/>'+
              '			<input type="file" id="am-img-uploader-file"/>'+
              '		</div>'+
              '		<div class="am-img-cropper-preview span4">'+
              '   		<img id="am-img-cropper-preview-img" ng-src="{{image}}" />'+
              '		<div>'+
              '</div>' +
              '</form>',

    post: function linkFn(scope, element, attrs) {
 
      var x1 = scope.$eval(attrs.x1),
          x2 = scope.$eval(attrs.x2),
          y1 = scope.$eval(attrs.y1),
          y2 = scope.$eval(attrs.y2);
 
   
    },
    //Linking function to setup the cropper and elements
    link: function postLink(scope, element, attrs, ctrl) {
 
           
    
      //Add the hidden input fields to post to the server side image cropper      
      var cropperInputs = '<div clas="btn-toolbar">' +
        '<button class="am-img-cropper-browse btn" type="button">1. Choose File</button><br/>'+
        ''+
        '<button class="am-img-cropper-submit btn btn-" type="submit">2. Create Thumbnail</button>'+
        '</div>' +
        '<input type="hidden" name="x1" value="" class="span1"/>'+
        '<input type="hidden" name="y1" value="" class="span1"/>'+
        '<input type="hidden" name="x2" value="" class="span1"/>'+
        '<input type="hidden" name="y2" value="" class="span1"/>'+
        '<input type="hidden" name="h" value="" class="span1"/>'+
        '<input type="hidden" name="w" value="" class="span1"/>';

    
    //Add the hidden input fields to post to the server side image cropper
    $(element).prepend(cropperInputs);
    
    
    //Hide the default file picker
    angular.element('#am-img-uploader-file').css({ opacity: 0, display: 'none' });
			
		//Holds the coords for the image crop
		var theImage = null;
		var cropCoords = {
			x1 : null,
			y1 : null,
			x2 : null,
			y2 : null,
			height: null,
			width: null,
			path: null
		}; 

      
      
      //Listen for browse button to be clicked and open the file dialog
      angular.element('.am-img-cropper-browse').bind('click', function(e){
	        angular.element('#am-img-uploader-file').trigger('click',function(e){
	        
	        });
      });
      
       
      //Listen for submit button to be clicked and upload the file with the coords
      angular.element('.am-img-cropper-submit').bind('click', function(e){
      		 uploadFile(theImage, 'com.appmatrixinc.my', function(data){
	          scope.$emit('fileUploaded', {data: data});
	        });
      });
      
      
      
   
		   
      //Handle reading the selected file        
      var handleRead = function(theFile) {
        theImage = theFile;
        return function (e) {
          $('#am-img-cropper-target-img').attr('src', e.target.result);
          $('#am-img-cropper-preview-img').attr('src', e.target.result);
      };
    };
    


		//Handle uploading the file
		function uploadFile (file, appid, callback) {
			var results = {};
			var form = new FormData ();
				form.append('file', file);
				
				
				form.append('x1', cropCoords.x1);
				form.append('y1', cropCoords.y1);
				form.append('x2', cropCoords.x2);
				form.append('y2', cropCoords.y2);
				form.append('height', cropCoords.height);
				form.append('width', cropCoords.width);
				form.append('folder', appid);

				
				
			var xhr = new XMLHttpRequest ();
				xhr.onload = function (e) {
				results = angular.fromJson(this.responseText);
			
				if (callback) {
					callback(results);
				}
			};
			xhr.open('POST', '/api/v1/imagecrop?appid=' + appid, true);
			xhr.send(form);
		}



		//Handle when the file is selected
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


		//Handle submitting the form
		function handleSubmit (e) {
			alert(e);
		}


    
		 //Handle when the selection changes
    function preview(img, selection) {
      var scaleX = 100 / (selection.width);
      var scaleY = 100 / (selection.height);
 
      
      //Set the styles on the preview image
      $('#am-img-cropper-preview-img').css({
          width: Math.round(scaleX * $('.am-img-cropper-target-img').attr('width')) + 'px',
          height: Math.round(scaleY * $('.am-img-cropper-target-img').attr('height')) + 'px',
          marginLeft: -Math.round(scaleX * selection.x1) + 'px',
          marginTop: -Math.round(scaleY * selection.y1) + 'px'
        });
          
          cropCoords.x1 = selection.x1;
          cropCoords.y1 = selection.y1;
          cropCoords.x2 = selection.x2;
          cropCoords.y2 = selection.y2;
          cropCoords.width = selection.width;
          cropCoords.height = selection.height;
      
        
        $('input[name="x1"]').val(cropCoords.x1);
        $('input[name="y1"]').val(cropCoords.y1);
        $('input[name="x2"]').val(cropCoords.x2);
        $('input[name="y2"]').val(cropCoords.y2); 
        $('input[name="w"]').val(cropCoords.width); 
        $('input[name="h"]').val(cropCoords.height); 
        
      
	        // change the attribute
        	scope.$apply(function () {
				scope.$emit('coords', {data: cropCoords}); 
				attrs.$set('ngModel', cropCoords);
        	});
  
      }



		
		// observe changes to interpolated attribute
		attrs.$observe('ngModel', function (value) {
			console.log('attrs.$observe-ngModel - ngModel has changed value to ' + JSON.stringify(value));
			scope.$emit('coords', {
				data : value
			});
		});
			
	 
		//Handle when the crop button is submitted
		$('.am-img-cropper-submit').bind('click', function (e) {
			scope.$emit('coords', {
				data : cropCoords
			});
		});
		
	      
      //Set the styles on the preview
      $('.am-img-cropper-preview').css({
            float: 'left',
            position: 'relative',
            overflow: 'hidden',
            width: '115px',
            height: '115px'
        }).insertAfter($('.am-img-cropper-form'));

 
      
	             
	     //Init the image select area
	    $('#am-img-cropper-target-img').imgAreaSelect({  
	      handles: true,
	      aspectRatio: '1:1',
	      onSelectChange: preview
	    });
      
      console.log('Linking function', scope, element, attrs);
    }
  };
});
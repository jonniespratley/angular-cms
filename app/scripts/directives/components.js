'use strict';

angular.module('angularCmsApp')
  .directive('components', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the components directive');
      }
    };
  });


/**
 * How to use 
 * 
 * <div>
    <button ng-click="show=true">show</button>
    <am-dialog 
      title="Hello {{username}}."
      visible="show" 
      on-cancel="show = false" 
      on-ok="show = false; doSomething()">

       Body goes here: {{username}} is {{title}}.

    </am-dialog>
  </div>
 */
angular.module('angularCmsApp').directive('amDialog', function() {

    function linkingFn(scope, elm, attrs, ctrl) {
        // get the attribute value
        console.log(attrs.ngModel);

        // change the attribute
        attrs.$set('ngModel', 'new value');

        // observe changes to interpolated attribute
        attrs.$observe('ngModel', function(value) {
            console.log('ngModel has changed value to ' + value);
        });
    };

    var tmpl = '<div ng-show="visible">' + 
    '  <h3>{{title}}</h3>' + 
    '  <div class="body" ng-transclude></div>' + 
    '  <div class="footer">' + 
    '    <button ng-click="onOk()">Save changes</button>' + 
    '    <button ng-click="onCancel()">Close</button>' + 
    ' </div>' + 
    '</div>';

    return {
        scope : {
            // the title uses the data-binding from the parent scope
            title : '@',
            // create a delegate onOk function
            onOk : '&',
            // create a delegate onCancel function
            onCancel : '&',
            // set up visible to accept data-binding
            visible : '='
        },
        template : tmpl,
        replace : true,
        transclude : true,
        restrict : 'E',
        link : linkingFn
    };

});




/* ======================[ @TODO: Inline Editable ]====================== */
angular.module('angularCmsApp').directive('ngEnter', function() {
	return function(scope, elm, attrs) {
		elm.bind('keypress', function(e) {
			if (e.charCode === 13)
				scope.$apply(attrs.ngEnter);
		});
	};
});

/**
 * ColorPicker Directive 
 * <span id="cp2" am-colorpicker="red"></span>
 */
angular.module('angularCmsApp').directive('amColorpicker', function() {
  return {
    restrict: 'A', 
    replace: true,
    transclude: true,
    scope:{
      id: '@', 
      title: '@',
      image: '@'
    },
    template: '<input class="am-colorpicker" type="text" id="{{id}}-colorpicker"/>',
    link: function postLink(scope, element, attrs) {
      angular.element('.am-colorpicker').colorpicker();
      console.log('function');
    }
  };
});


angular.module('angularCmsApp').directive('myTable', function() {
	return function(scope, element, attrs) {

		// apply DataTable options, use defaults if none specified by user
		var options = {};
		if (attrs.myTable.length > 0) {
			options = scope.$eval(attrs.myTable);
		} else {
			options = {
				"bStateSave" : true,
				"iCookieDuration" : 2419200, /* 1 month */
				"bJQueryUI" : true,
				"bPaginate" : false,
				"bLengthChange" : false,
				"bFilter" : false,
				"bInfo" : false,
				"bDestroy" : true
			};
		}

		// Tell the dataTables plugin what columns to use
		// We can either derive them from the dom, or use setup from the controller
		var explicitColumns = [];
		element.find('th').each(function(index, elem) {
			explicitColumns.push($(elem).text());
		});
		if (explicitColumns.length > 0) {
			options["aoColumns"] = explicitColumns;
		} else if (attrs.aoColumns) {
			options["aoColumns"] = scope.$eval(attrs.aoColumns);
		}

		// aoColumnDefs is dataTables way of providing fine control over column config
		if (attrs.aoColumnDefs) {
			options["aoColumnDefs"] = scope.$eval(attrs.aoColumnDefs);
		}

		if (attrs.fnRowCallback) {
			options["fnRowCallback"] = scope.$eval(attrs.fnRowCallback);
		}

		// apply the plugin
		var dataTable = element.dataTable(options);

		// watch for any changes to our data, rebuild the DataTable
		scope.$watch(attrs.aaData, function(value) {
			var val = value || null;
			if (val) {
				dataTable.fnClearTable();
				dataTable.fnAddData(scope.$eval(attrs.aaData));
			}
		});
	};
});
angular.module('angularCmsApp').directive('inlineEdit', function() {
	return {
		// can be in-lined or async loaded by xhr
		// or inlined as JS string (using template property)
		templateUrl : 'componentTpl.html',
		scope : {
			model : 'accessor'
		}
	};
});

angular.module('angularCmsApp').directive('contenteditable', function() {
	return {
		require : 'ngModel',
		link : function(scope, elm, attrs, ctrl) {
			// view -> model
			elm.bind('blur', function() {
				scope.$apply(function() {
					ctrl.$setViewValue(elm.html());
				});
			});

			// model -> view
			ctrl.render = function(value) {
				elm.html(value);
			};

			// load init value from DOM
			ctrl.$setViewValue(elm.html());

			elm.bind('keydown', function(event) {
				console.log("keydown " + event.which);
				var esc = event.which == 27, el = event.target;

				if (esc) {
					console.log("esc");
					ctrl.$setViewValue(elm.html());
					el.blur();
					event.preventDefault();
				}

			});

		}
	};
});

/**
 * Custom Tabs directive
 *
 * @usage
 *
 * 	<tabs>
 <pane title="Tab 1">
 Tab 1
 </pane>
 <pane title="Tab 2">
 Tab 2
 </pane>
 </tabs>
 */
angular.module('angularCmsApp').directive('tabs', function() {
	return {
		restrict : 'E',
		transclude : true,
		scope : {},
		controller : function($scope, $element) {
			var panes = $scope.panes = [];

			$scope.select = function(pane) {
				angular.forEach(panes, function(pane) {
					pane.selected = false;
				});
				pane.selected = true;
			}

			this.addPane = function(pane) {
				if (panes.length == 0)
					$scope.select(pane);
				panes.push(pane);
			}
		},
		template : '<div class="tabbable">' + '<ul class="nav nav-tabs">' + '<li ng-repeat="pane in panes" ng-class="{active:pane.selected}">' + '<a href="" ng-click="select(pane)"> <i class="icon-{{pane.icon}}"></i> {{pane.title}}</a>' + '</li>' + '</ul>' + '<div class="tab-content" ng-transclude></div>' + '</div>',
		replace : true
	};
}).directive('pane', function() {
	return {
		require : '^tabs',
		restrict : 'E',
		transclude : true,
		scope : {
			title : '@',
			icon : '@'
		},
		link : function(scope, element, attrs, tabsCtrl) {
			tabsCtrl.addPane(scope);
		},
		template : '<div class="tab-pane" ng-class="{active: selected}" ng-transclude>' + '</div>',
		replace : true
	};
});

/**
 *
 * @name - Box
 * @comment - This creates a generic box for a directive example.
 * @usage
 * <box title="Name">[Contents]</box>
 *
 */
angular.module('angularCmsApp').directive('box', function() {
	return {
		restrict : 'E',
		transclude : true,
		scope : 'isolate',
		locals : {
			title : 'bind'
		},
		template : '<div style="border: 1px solid black;">' + '<div style="background-color: gray">{{title}}</div>' + '<div ng-transclude></div>' + '</div>'
	};
});
/**
 *
 * @name - Media Object
 * @comment - This creates a Bootstrap media object
 * @usage
 * <box title="Name">[Contents]</box>
 * E - Element name: <my-directive></my-directive>
 A - Attribute: <div my-directive="exp"> </div>
 C - Class: <div class="my-directive: exp;"></div>
 M - Comment: <!-- directive: my-directive exp -->
 *
 */
angular.module('angularCmsApp').directive('mediaobject', function() {
	return {
		restrict : 'E',
		replace : true,
		transclude : true,
		scope : {
			title : '@',
			href : '@',
			image : '@',
			showicon : '@',
			icon : '@',
			body : '@'
		},
		template : '<div class="media">' + '<a class="pull-left" href="{{href}}">' + '<span class="icon" ng-show="{{showicon}}"><i class="feature-icon icon-{{icon}}"></i></span>' + '<img class="media-object" ng-hide="{{showicon}}" src="{{image}}"/>' + '</a><div class="media-body"><h4 class="media-heading">{{title}}</h4><p>{{body}}</p><div ng-transclude></div></div></div>'

	};
});
angular.module('angularCmsApp').directive('iconobject', function() {
	return {
		restrict : 'E',
		replace : true,
		transclude : true,
		scope : {
			title : '@',
			href : '@',
			image : '@',
			showicon : '@',
			icon : '@',
			body : '@'
		},
		template : '<div class="media">' + '<a class="pull-left" href="{{href}}">' + '<span class="icon"><i class="feature-icon icon-{{icon}}"></i></span>' + '</a><div class="media-body"><h4 class="media-heading">{{title}}</h4><p>{{body}}</p><div ng-transclude></div></div></div>'

	};
});

angular.module('angularCmsApp').directive('amMediaObject', function() {
	return {
		restrict : 'E',
		replace : true,
		transclude : true,
		scope : {
			title : '@',
			href : '@',
			image : '@',
			body : '@'
		},
		template : '<div class="media">' + '<a class="pull-left" href="{{href}}">' + '<img class="media-object" ng-src="{{image}}"/>' + '</a><div class="media-body"><h4 class="media-heading">{{title}}</h4><p>{{body}}</p><div ng-transclude></div></div></div>'

	};
});

/**
 * @file all.js
 * @comment
 *
 * Feature Item
 */
angular.module('angularCmsApp').directive('featureitem', function() {
	return {
		restrict : 'E',
		replace : true,
		transclude : true,
		scope : {
			title : '@',
			href : '@',
			image : '@',
			icon : '@',
			body : '@'
		},
		template : '<div class="feature-item"><div class="feature-thumb pull-left"><img ng-src="{{image}}" class="feature-img" /></div><h3 class="ng-binding"><i class="feature-icon icon-{{icon}}"></i> {{title}}</h3><p class="description" ng-transclude></p></div>'
	};
});

/**
 * @file all.js
 * @comment
 *
 * Feature Item
 */
angular.module('angularCmsApp').directive('featureObject', function() {
	return {
		restrict : 'E',
		replace : true,
		transclude : true,
		scope : {
			title : '@',
			href : '@',
			image : '@',
			icon : '@',
			body : '@'
		},
		template : '<div class="feature-item feature-object"><div class="feature-thumb pull-left"><img ng-src="{{image}}" class="feature-img" /></div><h3 class="ng-binding">{{title}}</h3><p class="description" ng-transclude></p></div>'
	};
});
/**
 *
 * @name - FormItem
 * @comment - This creates a form control group.
 * @usage
 * <formitem title="Label:" type="text">[Contents]</box>
 *
 */
angular.module('angularCmsApp').directive('formitem', function() {
	return {
		restrict : 'E',
		replace : true,
		transclude : true,
		scope : {
			title : '@',
			name : '@',
			value : '@',
			icon : '@',
			type : '@',
			model : '@',
			help : '@',
			placeholder : '@'
		},
		compile : function compile(tElement, tAttrs, transclude) {
			return {
				pre : function preLink(scope, iElement, iAttrs, controller) {
					//	console.log('pre', scope, iElement, iAttrs);
				},
				post : function postLink(scope, iElement, iAttrs, controller) {
					//	console.log('post', scope, iElement, iAttrs);
				}
			}
		},
		link : function postLink(scope, iElement, iAttrs) {
			//console.log('postLink', scope, iElement, iAttrs);
		},
		template : '<div class="control-group">' + '<div class="control-label"><label for="{{name}}">{{title}} </label></div>' + '<div class="controls" ng-transclude>' + '</div>' + '</div>'
	};
});

angular.module('angularCmsApp').directive('moduleForm', function() {
	return {
		restrict : 'E',
		transclude : true,
		scope : {
			title : '@title',
			name : '@name',
			value : '@value',
			icon : '@icon',
			type : '@type',
			model : '@model',
			help : '@help',
			placeholder : '@placeholder'
		},
		template : '<div class="control-group">' + '<div class="control-label"><label for="{{name}}">{{title}} </label></div>' + '<div class="controls" ng-transclude></div>' + '</div>'
	};
});

/**
 * @name - Feature Row
 * @comment - This creates content feature row.
 * @usage
 * <featureRow title="Label:" type="text">[Contents]</featureRow>
 */
angular.module('angularCmsApp').directive('featureRow', function() {
	return {
		restrict : 'E',
		replace : true,
		transclude : true,
		scope : {
			title : '@',
			href : '@',
			image : '@',
			icon : '@',
			body : '@'
		},
		template : '<div class="masthead  row-fluid feature-row"><div class="span8"><h2>{{title}}</h2><p>{{body}}</p><div class="feature-content" ng-transclude></div></div><div class="span4"><img ng-src="{{image}}" alt="{{title}}" style="height:200px; width:320px;" class="feature-image"/></div></div>'

	};
});

/**
 * Blank Slate directive for displaying a form for creating a record when no
 * reocrds are found.
 */
angular.module('angularCmsApp').directive('blankslate', function() {
	return {
		restrict : 'E',
		replace : true,
		transclude : true,
		scope : {
			title : '@',
			modal : '@',
			href : '@',
			image : '@',
			icon : '@',
			body : '@'
		},
		template : '<div class="well blank-slate"><p>{{body}}</p><a class="btn btn-primary" data-toggle="modal" href="#{{modal}}"><i class="icon-plus icon-white"></i> {{title}}</a></div>'

	};
});

/**
 * @TODO - Name, docs, usage
 */
angular.module('angularCmsApp').directive('portlet', function() {
	return {
		restrict : 'E',
		// This HTML will replace the zippy directive.
		replace : true,
		transclude : true,
		scope : 'isolate',
		locals : {
			title : 'bind'
		},
		template : '<div class="box" id="box-">' + 
		'<h4 class="box-header round-top">{{title}}' + 
		'<a class="box-btn" title="close"><i class="icon-remove"></i></a>' + 
		'<a class="box-btn" title="toggle"><i class="icon-minus"></i></a>' + 
		'<a class="box-btn" title="config" data-toggle="modal" href="#box-config-modal"><i class="icon-cog"></i></a>' + 
		'</h4>' + '<div class="box-container-toggle"><div class="box-content" ng-transclude></div></div>' + 
		'</div>'
	};
});

/**
 * @TODO - Name, docs, usage
 */
angular.module('angularCmsApp').directive('thumbox', function() {
	return {
		restrict : 'E',
		transclude : true,
		scope : {

		},
		locals : {
			title : 'bind'
		},
		template : ' <ul class="thumbnails wizard-themes">' + '<li id="{{theme.slug}}" class="span3 wizard-theme" ng-model="smartapp.theme" ng-repeat="theme in wizard.themes">' + '<a class="thumbnail" ng-click="themeClick()" ng-model="smartapp.theme"> <img ng-src="{{theme.image}}" alt="{{theme.title}} Image"/>' + '<div class="category">' + '<i class="icon-home icon-white"></i>' + '<span>{{theme.title}}</span>' + '</div>' + '<div class="caption">' + '<div class="title">' + '<p class="banner" style="display: none;"><span>SELECTED</span></p>' + '</div>' + '<p>{{theme.body}}</p>' + '<input type="checkbox" name="data[Smartapp][theme]" value="{{theme.id}}" class="theme-radio" ng-change="themeClick()" ng-model="smartapp.theme"/>' + '</div> </a>' + '</li>' + '</ul>'
	};
});

/**
 * @TODO - Name, docs, usage
 */
angular.module('angularCmsApp').directive('widget', function() {
	return {

		restrict : 'E',
		// This HTML will replace the zippy directive.
		replace : true,
		transclude : true,
		scope : {
			title : '@',
			icon : '@',
			collapsed: '@collapsed'
		},
		template : '<div class="widget opened">' + 
		'<legend class="widget-header"><i class="icon-{{icon}}"></i> {{title}}' + 
		'</legend>' + 
		'<section class="widget-container-toggle"><div class="widget-content" ng-transclude></div></section>' + 
		'</div>',
		// The linking function will add behavior to the template
		link : function(scope, element, attrs) {

			// Title element
			var title = angular.element(element.find('.widget-header')),



			// Opened / closed state
			opened = false;

			// Clicking on title should open/close the zippy
			title.bind('click', toggle);

			// Toggle the closed/opened state
			function toggle() {
				opened = !opened;
				angular.element(element.find('.widget-container-toggle')).slideToggle();

				// element.removeClass( opened ? 'closed' : 'opened');
				// element.addClass( opened ? 'opened' : 'closed');
				// element.find('.toggle-icon').addClass( opened ? 'ui-icon-minusthick' : 'ui-icon-plusthick');
				// element.find('.toggle-icon').removeClass( opened ? 'ui-icon-plusthick' : 'ui-icon-minusthick');
			}

			// initialize the widget
			//toggle();
		}
	};
});

/**
 * @TODO - Name, docs, usage
 */
angular.module('angularCmsApp').directive('uploader', function() {
	return {
		restrict : 'A',
		replace : true,
		transclude : true,
		scope : {
			title : '@title',
			icon : '@icon',
			collapsed: '@collapsed'
		},
		template : '<div class="ame-uploader">' 
				+ '<div ng-transclude>[AME File Uploader]</div>' 
				+ '<input name="data[image]" id="ame-uploader-input" value="" type="file" class="file-url-input ame-uploader">'
				+ '<div id="ame-uploader-div" class="upload-image-wrap drop-zone"><img id="ame-uploader-image" alt=" Image" src="http://placehold.it/250x250&text=Drop Image Here" ng-src="file.url"/></div>'
			+ '</div>',
		link: function(scope, element, attrs){

			$('#ame-uploader-input').live('change', function(e) {
				var files = e.currentTarget.files;

				$rootScope.App.API.uploadFile(files[0], $rootScope.App.session.appid, function(data) {
					var imageurl = window.location.origin + '/files/uploads/' + $rootScope.App.session.appid + '/' + data.results.file.name;
					$rootScope.Products.selectedProduct.Product.image = imageurl;
					$('#product_image').attr('src', imageurl);
				});

				for (var i = 0, f; f = files[i]; i++) {
					if (!f.type.match('image.*')) {
						continue;
					}

					var reader = new FileReader();
						reader.onload = (function(theFile) {
						return function(e) {
							var span = document.createElement('span');
							span.innerHTML = ['<img class="thumb" src="', e.target.result, '" title="', escape(theFile.name), '"/>'].join('');
							$('#ame-uploader-div').html(span);
						};
					})(f);
					reader.readAsDataURL(f);
				}
			});


		}
	};
});


/* @TODO: Mobile Directives */
/**
 * @TODO - Name, docs, usage
E - Element name: <my-directive></my-directive>
A - Attribute: <div my-directive="exp"> </div>
C - Class: <div class="my-directive: exp;"></div>
M - Comment: <!-- directive: my-directive exp -->
 */
angular.module('angularCmsApp').directive('amMobileNavbar', function() {
	return {
		restrict : 'A',
		transclude : true,
		scope : 'isolate',
		locals : {
			title : 'bind'
		},
		template : '<div class="ame-fileuploader">' + '<div ng-transclude>[amMobileNavbar]</div>' + '</div>'
	};
});


/**
 * Truncate Filter
 * @Param text
 * @Param length, default is 10
 * @Param end, default is "..."
 * @return string
 */
angular.module('filters', []).filter('truncate', function() {
	return function(text, length, end) {
		if (!text) {
			text = '';
		}
		text = String(text);

		if (isNaN(length))
			length = 10;

		if (end === undefined)
			end = "...";

		if (text.length) {
			if (text.length <= length || text.length - end.length <= length) {
				return text;
			} else {
				return String(text).substring(0, length - end.length) + end;
			}
		}

	};
});

/**
 * Usage
 *
 * var myText = "This is an example.";
 *
 * {{myText|Truncate}}
 * {{myText|Truncate:5}}
 * {{myText|Truncate:25:" ->"}}
 * Output
 * "This is..."
 * "Th..."
 * "This is an e ->"
 *
 */



/**
 * @file all.js
 * @comment
 *
 * Tree Directive
 */

angular.module('angularCmsApp').directive('treeElement', function($compile) {
	return {
		restrict : 'E',
		link : function(scope, element, attrs) {

			scope.tree = scope.node;

			var visibility = (attrs.nodeState != "collapse" ) || 'style="display: none;"';

			if (scope.tree.children.length) {

				console.log(scope.tree.children);

				for (var i in scope.tree.children) {
					//하위 요소가 존재하면,
					if (scope.tree.children[i].children.length) {
						scope.tree.children[i].className = "jcf_" + attrs.nodeState + " jcf_deselected";
					} else {
						scope.tree.children[i].className = "jcf_child" + " jcf_deselected";
					}
				}

				//하위 요소 등록
				//1단계 : 임의의 HTML 내용을 적용시키기 위해 먼저 HTML을 DOM 요소로 파싱한다.
				var template = angular.element('<ul ' + visibility + '><li ng-repeat="node in tree.children" node-id={{node.' + attrs.nodeId + '}} ng-class="node.className">{{node.' + attrs.nodeName + '}}<tree-element tree="node" node-id=' + attrs.nodeId + ' node-name=' + attrs.nodeName + ' node-state=' + attrs.nodeState + '></tree-element></li></ul>');

				//2단계: 템플릿을 컴파일한다.
				var linkFunction = $compile(template);

				//3단계: 스코프를 컴파일한 템플릿과 연결한다.
				linkFunction(scope);

				//4단계: HTML 요소를 반영한다.
				element.replaceWith(template);
			} else {

				element.remove();
			}
		}
	};
}).directive('jcfTree', function($compile) {
	return {
		restrict : 'E',
		link : function(scope, element, attrs) {

			scope.selectedNode = null;

			var sheet = document.createElement('style')
			sheet.innerHTML = "jcf-tree ul{margin:0;padding:0;list-style:none;border:none;overflow:hidden;text-decoration:none;color:#555}" + "jcf-tree li{position:relative;padding:0 0 0 20px;font-size:13px;font-weight:initial;line-height:18px;cursor:pointer}" + "jcf-tree .jcf_expand{background:url(" + attrs.expandIcon + ") no-repeat}" + "jcf-tree .jcf_collapse{background:url(" + attrs.collapseIcon + ") no-repeat}" + "jcf-tree .jcf_child{background:url(" + attrs.childIcon + ") no-repeat}" + "jcf-tree .jcf_selected{font-weight:bold;}" + "jcf-tree .hide{display:none;}" + "jcf-tree .jcf_deselected{font-weight:normal;}";
			document.body.appendChild(sheet);

			scope.$watch(attrs.treeData, function(val) {


				for (var i in scope[attrs.treeData]) {

					if (scope[attrs.treeData][i].children.length) {
						scope[attrs.treeData][i].className = "jcf_" + attrs.nodeState + " jcf_deselected";
					} else {
						scope[attrs.treeData][i].className = "jcf_child" + " jcf_deselected";
					}
				}

				var template = angular.element('<ul id="jcfTreeBrowser" class="filetree treeview-famfamfam treeview"><li ng-repeat="node in ' + attrs.treeData + '" node-id={{node.' + attrs.nodeId + '}} ng-class="node.className">{{node.' + attrs.nodeName + '}}<tree-element tree="node" node-id=' + attrs.nodeId + ' node-name=' + attrs.nodeName + ' node-state=' + attrs.nodeState + '></tree-element></li></ul>');

				var linkFunction = $compile(template);

				linkFunction(scope);

				element.html(null).append(template);

				angular.element(document.getElementById('jcfTreeBrowser')).unbind().bind('click', function(e) {
					console.log(e.target);

					if (angular.element(e.target).length) {

						scope.previousElement = scope.currentElement;

						scope.currentElement = angular.element(e.target);
						scope.$broadcast('nodeSelected', {
							selectedNode : scope.currentElement.attr('node-id')
						});

						if (scope.previousElement) {
							scope.previousElement.addClass("jcf_deselected").removeClass("jcf_selected");
						}

						scope.currentElement.addClass("jcf_selected").removeClass("jcf_deselected");

						if (scope.currentElement.children().length) {

							scope.currentElement.children().toggleClass("hide");

							scope.currentElement.toggleClass("jcf_collapse");
							scope.currentElement.toggleClass("jcf_expand");
						}
					}

				});

			}, true);
			//true - 실제 값의 변화를 추적 | false - 주소값의 변화를 추적
		}
	};
});



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
			cdn : '@',
			image : '=',
			thumbnail : '=',
			complete: '&',
			appid : '@',
			maxwidth : '@',
			maxheight : '@',
			aspectratio : '@',
			handles : '@'
		},
		template : ' <div class="am-img-uploader">' + 
		' <div id="am-img-uploader-wrap" class="am-img-uploader-wrap">' +
		 '<legend>Feature Image</legend>' + 
		 '   <img ng-src="{{image}}" id="am-img-full" alt="Feature Image"/>' + 
		 '<br/>'+
		 '<legend>Thumbnail Image</legend>' + 
		 '   <img ng-src="{{thumbnail}}" id="am-img-thumb" alt="Thumbnail Image"/>' + 
		 ' </div>' + 
		 '   <input type="file" id="am-img-uploader-file"/>' + 
		 '  </div>',
		restrict : 'E',
		replace : true,
		transclude : false,
		link : function (scope, element, attrs, ctrl) {
			var imageObj = {}, thumbObj = {};



			//Handle reading the file once selected
			var handleRead = function (theFile) {
				return function (e) {
					angular.element('#am-img-full').attr('src', e.target.result);
				};
			};


			// observe changes to interpolated attribute
			  attrs.$observe('image', function(value) {
			    console.log('image has changed value to ' + value);
			  });
			  attrs.$observe('thumbnail', function(value) {
			    console.log('thumbnail has changed value to ' + value);
			  });




			//Handle uploading the file
			function amUploadFile (file, appid, callback) {
				var form = new FormData ();
				form.append('file', file);
				var xhr = new XMLHttpRequest ();
				xhr.onload = function (e) {
					console.log('fileuploaded', this.responseText);
					if (callback) {
						callback(angular.fromJson(this.responseText));
					}
					var results = angular.fromJson(this.responseText);
					console.log(results);


					//Set the new urls on the model
					imageObj = {
						image: attrs.cdn +'/'+ results.targetPath,
						thumbnail: attrs.cdn +'/'+ results.thumbPath
					};

					//Dispatch event
					scope.$emit('uploaded', {data: imageObj});

					//Set the new scope
  					scope.image = imageObj.image;
			        scope.thumbnail = imageObj.thumbnail;

					scope.$apply();
					//Change the images in the directive
					angular.element('#am-img-full').attr('src', imageObj.image);
					angular.element('#am-img-thumb').attr('src', imageObj.thumbnail);

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

					//Upload file
					amUploadFile(f, attrs.appid);
				}
			});




			//Log
			console.log('Linking function', scope, element, attrs);
		}
	};
});
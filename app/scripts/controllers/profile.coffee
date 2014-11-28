'use strict'
angular.module('angularCmsApp').controller 'ProfileCtrl', ($scope, $rootScope, DataService, cmsNotify) ->
	$scope.user = $rootScope.App.session.user
	$scope.update = (u) ->
		DataService.save('users', u).then((data) ->
			cmsNotify( '.profile-message', 'success', 'Success!', "Your account was successfully updated.")
		)

'use strict';
angular.module('angularCmsApp').controller('ProfileCtrl', function ($scope, $rootScope, DataService, cmsNotify) {
	$scope.user = $rootScope.App.session.user;
	$scope.profileSchema = {
		"fields": [
			{
				"type": "text",
				"name": "username",
				"displayName": "Username:",
				"validation": {
					"messages": {},
					"required": false
				},
				"placeholder": "Enter your username here",
				"tooltip": "Enter your username here"
			},
			{
				"type": "email",
				"name": "email",
				"displayName": "Email:",
				"validation": {
					"messages": {}
				},
				"placeholder": "Enter your email here",
				"tooltip": "Enter your email here"
			},
			{
				"type": "textarea",
				"name": "description",
				"displayName": "Description:",
				"validation": {
					"messages": {}
				},
				"placeholder": "Enter your description here"
			},
			{
				"type": "checkboxlist",
				"name": "group",
				"displayName": "Group:",
				"options": [
					{
						"value": "admin",
						"text": "Admin"
					},
					{
						"value": "member",
						"text": "Member"
					},
					{
						"value": "guest",
						"text": "Guest"
					}
				],
				"value": {}
			},
			{
				"type": "radiobuttonlist",
				"name": "active",
				"displayName": "Active:",
				"options": [
					{
						"value": "true",
						"text": "Yes"
					},
					{
						"value": "false",
						"text": "No"
					}
				],
				"value": "true"
			}
		]
	};
	$scope.profileData = {};
	$scope.update = function (u) {
		DataService.save('users', u).then(function (data) {
			cmsNotify('.profile-message', 'success', 'Success!', 'Your account was successfully updated.');
		});
	};
});

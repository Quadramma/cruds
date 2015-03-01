var app = angular.module('myApp', ['ngResource', 'ui.router', 'myAppApiService']);
app.config(['$httpProvider', '$sceDelegateProvider',
	function($httpProvider, $sceDelegateProvider) {
		$httpProvider.defaults.useXDomain = true;
		$sceDelegateProvider.resourceUrlWhitelist(['self', /^https?:\/\/(cdn\.)?quadramma.com/]);
		delete $httpProvider.defaults.headers.common['X-Requested-With'];
	}
]);
app.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
	$urlRouterProvider.otherwise('/exportar'); //DEFAULT
});
app.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
	$stateProvider
		.state('/', {
			url: '^/',
			views: {
				'': {
					templateUrl: 'views/export.html'
						//controller: 'HomeController'
				}
			}
		});
});
app.controller("mainCtrl", function($scope, $state, $rootScope, $ws, focus, select, $timeout) {
	console.info("mainCtrl");


});
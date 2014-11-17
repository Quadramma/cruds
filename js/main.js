//SNIPPET: DISABLE MOUSE WHEEL
document.onmousewheel = function() {
	stopWheel();
} /* IE7, IE8 */
if (document.addEventListener) { /* Chrome, Safari, Firefox */
	document.addEventListener('DOMMouseScroll', stopWheel, false);
}

function stopWheel(e) {
	if (!e) {
		e = window.event;
	} /* IE7, IE8, Chrome, Safari */
	if (e.preventDefault) {
		e.preventDefault();
	} /* Chrome, Safari, Firefox */
	e.returnValue = false; /* IE7, IE8 */
}



$(document).ready(function() {});


//ANGULARJS
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
	$urlRouterProvider.otherwise('/'); //DEFAULT
});

app.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
	$stateProvider
		.state('/', {
			url: '^/',
			views: {
				'': {
					templateUrl: 'views/home.html'
						//controller: 'HomeController'
				}
			}
		})
		.state('registrar', {
			url: '^/registrar',
			views: {
				'': {
					templateUrl: 'views/form.html'
						//controller: 'HomeController'
				}
			}
		})
		.state('success', {
			url: '^/success',
			views: {
				'': {
					templateUrl: 'views/finish.html'
						//controller: 'HomeController'
				}
			}
		})
		.state('mayor', {
			url: '^/mayor',
			views: {
				'': {
					templateUrl: 'views/mayor.html'
						//controller: 'HomeController'
				}
			}
		})
		.state('exportar', {
			url: '^/exportar',
			views: {
				'': {
					templateUrl: 'views/export.html'
						//controller: 'HomeController'
				}
			}
		});
});


app.factory('focus', function($timeout) {
	return function(selector, val) {
		$timeout(function() {
			var element = $(selector);
			if (element) {
				if (typeof val == 'undefined' || val == true) {
					element.focus();
				} else {
					if (typeof val !== 'undefined' && val == false) {
						element.focusout();
					}
				}

			}
		});
	};
});

app.factory('select', function($timeout) {
	return function(selector, callback) {
		$timeout(function() {
			var element = $(selector);
			callback(element);
		});
	};
});



app.controller("myAppBodyCtrl", function($scope, $state, $rootScope, $ws, focus, select, $timeout) {
	console.info("myAppBodyCtrl");

	$rootScope.apiUrl = "http://www.quadramma.com/backend/api";
	var ws = $ws.getController("wineyard", true); //ignore bad request !

	$scope.loading = false;
	$scope.form = {};

/*
	$scope.form = {
		name: 'Pedro Alfonzo',
		last_name: 'Bravo',
		email: 'bravo@globaltales.com',
		bird_date_day: 18,
		bird_date_month: 03,
		bird_date_year: 1957,
		zone: 'Congreso',
	}*/

	$scope.gotoHome = function() {
		$state.go("/", {});
	};

	$scope.clickGoToMayor = function() {
		$state.go("mayor", {});
	};
	$scope.clickMayorSI = function() {
		$state.go("registrar", {});
	};
	$scope.clickMayorNO = function() {
		$state.go("/", {});
	};

	$scope.clickRegistrar = function() {
		//$state.go("registrar", {});

		//convertir dia,mes,año en datetime.
		$scope.form.bird_date = new Date(
			$scope.form.bird_date_year, $scope.form.bird_date_month - 1, $scope.form.bird_date_day, 0, 0, 0, 0);

		//validations
		var successValidation = true;
		if (!$scope.form.name || $scope.form.name == null || $scope.form.name == "" || $scope.form.name.length == 0) {
			focus("#form .name");
			successValidation = false;
		}
		if (!$scope.form.email || $scope.form.email == null || $scope.form.email == "" || $scope.form.email.length == 0) {
			focus("#form .email");
			successValidation = false;
		}
		if (!$scope.form.bird_date_year || $scope.form.bird_date_year == null || $scope.form.bird_date_year == "" || $scope.form.bird_date_year.length == 0) {
			focus("#form .bird_date_year");
			successValidation = false;
		}
		if (!$scope.form.bird_date_month || $scope.form.bird_date_month == null || $scope.form.bird_date_month == "" || $scope.form.bird_date_month.length == 0) {
			focus("#form .bird_date_month");
			successValidation = false;
		}
		if (!$scope.form.bird_date_day || $scope.form.bird_date_day == null || $scope.form.bird_date_day == "" || $scope.form.bird_date_day.length == 0) {
			focus("#form .bird_date_day");
			successValidation = false;
		}
		if (!$scope.form.zone || $scope.form.zone == null || $scope.form.zone == "" || $scope.form.zone.length == 0) {
			focus("#form .zone");
			successValidation = false;
		}
		if (!successValidation) {
			return;
		}

		$scope.loading = true;

		ws.post({
			action: "register",
			ignorecache: true
		}, $scope.form, function(res) {
			$scope.loading = false;
			$state.go("success", {});
			console.log(res);
		});

		console.log($scope.form);
	};


	$scope.clickExport = function(onlyEmails) {

		select(".wineyard-section-export input.password", function($obj) {
			//console.log("Select -> " + $obj.val());
			var pass = $obj.val();

			//validations
			if (!pass || pass == null || pass == "" || pass.length == 0) {
				focus(".wineyard-section-export .password");
				return;
			}

			/*
						if (pass != "lamascota2014") {
							focus(".wineyard-section-export .password");
							$obj.val("");
							$obj.attr("placeholder", "Contraseña incorrecta");
							$timeout(function() {
								$obj.attr("placeholder", "Ingresa una contraseña");
								focus(".wineyard-section-export .password",false);
							}, 500);
							return;
						}*/



			ws.post({
				action: "getall",
				ignorecache: true
			}, {
				pass: pass
			}, function(res) {


				if (!res.ok && res.errorcode == "INVALID_PASSWORD") {
					focus(".wineyard-section-export .password");
					$obj.val("");
					$obj.attr("placeholder", "Contraseña incorrecta");
					$timeout(function() {
						$obj.attr("placeholder", "Ingresa una contraseña");
						focus(".wineyard-section-export .password", false);
					}, 500);
					return;
				}

				if (onlyEmails) {
					var arr = [];
					for (var x in res.data) {
						var item = res.data[x];
						//
						arr.push({
							email: item.email
						});
						//
					}
					res.data = arr;
					DownloadJSON2CSV(res.data, "wineyard_emails.csv");
				} else {
					DownloadJSON2CSV(res.data, "wineyard_full.csv");
				}
			});


		});


	};

	function DownloadJSON2CSV(objArray, name) {
		var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
		var str = '';
		//
		for (var i = 0; i < array.length; i++) {
			var line = '';
			for (var index in array[i]) {
				if (line != '') line += ','

				line += array[i][index];
			}

			str += line + '\r\n';
		}
		//
		var blob = new Blob([str], {
			type: "data:text/csv;charset=utf-8"
		});
		saveAs(blob, name);
	}


});
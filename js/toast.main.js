//DISABLED
//'js/vendor/FileSaver.min.js',
//js/fb.js
//js/google.js
//'js/vendor/angular.js',
//'js/firebasewrapper.js',
//'js/main.angular.js',
toast.scriptUrl = 'js/cruds/';
toast.cssUrl = 'css/';
toast(
	'css/normalize.css',
	'css/main.css',
	function() {},
	'js/vendor/jquery-1.10.1.min.js',
	function() {},
	'js/vendor/collection.min.js',
	'js/vendor/FastActive.min.js',
	'js/vendor/path.min.js',
	'js/vendor/notify.min.js',
	'js/vendor/nonsense.js',
	'js/vendor/modernizr-2.6.2.min.js',
	'js/vendor/html5boilerplate_plugins.js',
	'js/vendor/store.min.js',
	function() {},
	toast.scriptUrl + 'cruds.core.js',
	function() {
		$(function() {
			console.info('toast success');
			toast('js/app.main.js');
		});
	}
)
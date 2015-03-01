$(function() {
	CRUDS = {
		defs: [],
		evts: {},
		debug: true,
		initialized: false,
		verbose: 2,
		initializationCallback: null
	};
	CRUDS.init = function(callback) {
		this.initializationCallback = callback;
	};
	CRUDS.language = "ES"; //EN ES
	CRUDS.languageFile = "language.json";
	CRUDS.languageData = {};
	$.get(CRUDS.languageFile, function(data) {
		CRUDS.languageData = data;
		toast(
			toast.cssUrl + 'cruds.css',
			toast.cssUrl + 'cruds.slk.css',
			toast.cssUrl + 'cruds.dtable.css',
			toast.cssUrl + 'cruds.notify.css',
			function() {},
			toast.scriptUrl + 'cruds.chifle.js',
			toast.scriptUrl + 'cruds.dtable.js',
			toast.scriptUrl + 'cruds.slk.js',
			function() {},
			toast.scriptUrl + 'cruds.general.js',
			function() {},
			toast.scriptUrl + 'cruds.db.js',
			toast.scriptUrl + 'cruds.form.js',
			toast.scriptUrl + 'cruds.table.js',
			toast.scriptUrl + 'cruds.validation.js',
			toast.scriptUrl + 'cruds.toolbar.js',
			toast.scriptUrl + 'cruds.build.js',
			function() {
				if (typeof CRUDS.initializationCallback !== 'function') {
					console.info('cruds success [init fn not found]');
				} else {
					console.info('cruds success');
					CRUDS.initializationCallback();
				}
			}
		)
	});
});
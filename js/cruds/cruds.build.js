CRUDS.build = function(parameters) {
	if (CRUDS.debug && CRUDS.verbose == 1) {
		console.info('CRUDS building');
	}

	g={};

	for (var x in CRUDS.defs) {
		var def = CRUDS.defs[x];
		g[def.name]=def;
		def.name = def.name.toString().toLowerCase();



		//Creates a master view for the crud
		var viewId = def.name + '-view';
		$view = $('<div/>').attr({
			id: viewId
		});
		$(def.target).append($view);
		def.viewSelector = '#' + viewId;
		def.target = '#' + viewId;



		(function() {
			//Create a path map with the def name: toggles master view
			var localviewSelector = def.viewSelector;
			var localName = def.name;
			var mapUrl = "#/" + localName;
			//console.info('MAP URL FOR ' + mapUrl);
			Path.map(mapUrl).to(function() {
				chfl.emit(localName + '.transition');
			}).enter(function() {
				for (var x in CRUDS.defs) {
					var d = CRUDS.defs[x];
					$(d.viewSelector).toggle(false);
				}

				$(localviewSelector).toggle(true);
			});
		})();

		CRUDS.createCollection(def);
		CRUDS.createTitle(def);
		CRUDS.createToolbar(def);
		CRUDS.createSeparation(def);
		CRUDS.createForm(def);
		CRUDS.createSeparation(def);
		CRUDS.createTable(def);
		CRUDS.register_updateTable(def);
		CRUDS.createSeparation(def);
		chfl.emit('dom.updated');
	}

	

	//Set default root path and enable router
	var defaultRoot = "#/" + parameters.root;

	if (CRUDS.debug && CRUDS.verbose == 1) {
		console.info('CRUDS defaul root its ' + defaultRoot);
	}

	Path.root('#/');
	Path.listen();

	if (CRUDS.debug && CRUDS.verbose == 1) {
		console.info('CRUDS ready.');
	}



}
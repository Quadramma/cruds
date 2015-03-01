CRUDS.createTable = function(def) {
	$table = $('<table/>')
		.attr('id', def.name + '-table')
		.attr('class', 'cruds-table');
	$thead = $('<thead/>').appendTo($table);

	for (var cindex in def.table.columns) {
		var column = def.table.columns[cindex];
		for (var f in def.fields) {
			var field = def.fields[f];

			if (field.name !== column) continue;



			$th = $('<th>')
				.attr({
					class: 'sort',
					'data-sort': field.name
				})
				.html(field.label);

			$thead.append($th);
		}
	}
	$('<tbody/>')
		.attr({
			class: "list"
		})
		.appendTo($table);

	var $tableWrapper = $('<div/>').attr({
		'id': def.name + '-table-wrapper'
	}).append($table);

	$(def.target).append($tableWrapper);


	if (CRUDS.debug && CRUDS.verbose == 1) {
		console.info('CRUDS ' + def.name + ' table created');
	}

};

CRUDS.register_updateTable = function(def) {
	function _update() {
		if (CRUDS.debug && CRUDS.verbose == 1) {
			console.info('dom.updated - updating table ' + def.name);
		}
		var arr = [];
		CRUDS.loop(def.collection, function(item) {
			$tr = $("<tr/>")
				.on('click', function() {
					chfl.emit('row.click', {
						item: item,
						def: def
					});
				});
			for (var i in def.table.columns) {
				var col = def.table.columns[i];
				for (var x in def.fields) {
					var field = def.fields[x];
					if (field.name.toString() == col.toString()) {
						if (field.type == 'Select') {
							var foreignCollection = CRUDS.defs[field.source.target].collection;
							var foreignItem = CRUDS.single(foreignCollection, function(i) {
								return i._id == parseInt(item[col]);
							});
							$td = $('<td/>').html(foreignItem[field.source.description]);
							$td.appendTo($tr);

						} else {
							$td = $('<td/>')
								.attr({
									class: field.name
								})
								.html(item[col]);
							$td.appendTo($tr);
						}
					}
				}
			}
			arr.push($tr);
		});
		var $tbody = $('#' + def.name + '-table tbody').empty().append(arr);
	}
	chfl.on('dom.updated', _update);

}
CRUDS.init = function(cb) {
	if (!CRUDS.initialized) {
		chfl.on('cruds.init', cb);
	} else {
		cb();
	}
};
CRUDS.add = function(def) {
	CRUDS.defs[def.name] = def;
}
CRUDS.log = function() {
	for (var x in CRUDS.defs) {
		var def = CRUDS.defs[x];
		if (CRUDS.debug) {
			console.info('Reading CRUD ' + def.name);
		}
	}
}


CRUDS.collectItem = function(def) {
	var item = {};
	for (var x in def.fields) {
		var f = def.fields[x];
		item[f.name] = $('#' + def.name + '-' + f.name).val();
	}
	item._id = CRUDS.$selector(def, 'internid').val();
	return item;
};
CRUDS.generateId = function(item) {
	return new Date().getTime();
};



CRUDS.createMenu = function(menuDef) {
	var $menu = $(menuDef.target);

	//Buttons
	for (var x in menuDef.buttons) {
		var btnDef = menuDef.buttons[x];
		$elem = $('<button class="cruds-button"/>')
			.attr('id', btnDef.name + '-button')
			.html(btnDef.label)
			.on('click', btnDef.click);
		$(menuDef.target).append($elem);
	}

	//Search a crud


	var searchSLKItems = function(validate) {
		var arr = [];
		var counter = 1;
		for (var x in CRUDS.defs) {
			var d = CRUDS.defs[x];
			var item = {
				_id: counter,
				name: d.name,
				fields: d.fields.length
			};
			if (validate(item)) {
				arr.push(item);
			}
			counter++;
		}
		var non = new Nonsense();
		for (var x = 0; x < 200; x++) {
			var name = non.firstName('male').toString().toLowerCase();
			var item = {
				_id: counter,
				name: name,
				fields: non.integerInRange(1, 10)
			};
			if (validate(item)) {
				arr.push(item);
			}
			counter++;
		}
		return arr;
	}

	$searchSLK = slk.create({
		name: 'search',
		codeLabel: 'id',
		codeField: '_id',
		descriptionField: 'name',
		descriptionLabel: 'Search for a CRUD',
		tableFields: [{
			name: '_id',
			label: 'ID'
		}, {
			name: 'name',
			label: 'Nombre'
		}, {
			name: 'fields',
			label: 'Cantidad de campos'
		}],
		onSelected: function(code, descr) {
			var url = '#/' + descr;
			window.history.pushState(url, url, url);
			//window.history.go();
			Path.listen();
		},
		onUpdate: function() {
			chfl.emit('dom.updated');
		},
		items: searchSLKItems
	}).appendTo($menu);



}

CRUDS.updateOperationField = function(def, donotclearoutput) {
	donotclearoutput = donotclearoutput || false;
	if (CRUDS.$selector(def, 'internid').val() == '') {
		CRUDS.$selector(def, 'operation').val(CRUDS.lang('OPT_NEW'));
		CRUDS.$selector(def, 'delete').attr('disabled', 'disabled');
		if (!donotclearoutput) {
			CRUDS.output(def, '');
		}
	} else {
		CRUDS.$selector(def, 'operation').val(CRUDS.lang('OPT_EDITION'));
		CRUDS.$selector(def, 'delete').removeAttr('disabled');
	}
};

CRUDS.createSeparation = function(def) {
	var $target = $(def.target);
	$hr = $('<hr/>')
		.attr('class', 'cruds-hr')
		.appendTo($target);
};

CRUDS.clear = function(def) {
	for (var x in def.fields) {
		var f = def.fields[x];
		$('#' + def.name + '-' + f.name).val('');
	}
	CRUDS.output(def, '');
	$('.operation-field').val('');
	$('.internid-field').val('');

	CRUDS.$selector(def, 'delete').attr('disabled', 'disabled');
}
CRUDS.createTitle = function(def) {
	$content = $('<div/>')
		.attr('id', def.name + '-content')
		.attr('class', 'cruds-content');
	var $title = $('<label/>')
		.attr('class', 'cruds-label')
		.on('click', function() {
			CRUDS.$selector(def, 'content').toggle();
		})
		.html('#' + def.label);
	$(def.target).append($title);
	$(def.target).append($content);
	def.target = '#' + def.name + '-content';
}


CRUDS.$selector = function(def, concat) {
	return $('#' + def.name + '-' + concat);
};
CRUDS.select = function(def, item) {
	for (var x in item) {
		var val = item[x];
		$elem = $('#' + def.name + '-' + x);
		if ($elem.length > 0) {
			$elem.val(val);
		}
	}
	CRUDS.$selector(def, 'internid').val(item._id);
	CRUDS.updateOperationField(def);
};
CRUDS.lang = function(code) {
	var data = CRUDS.languageData[code] || null;
	if (data == null) {
		return 'MISSING_' + code;
	}
	var val = CRUDS.languageData[code][CRUDS.language];
	if (val == null) {
		return 'MISSING_' + code + '_' + CRUDS.language;
	} else {
		return val;
	}
};


CRUDS.$on = chfl.on;


//#EVENTS

//List of events
//item.saved
//row.click


chfl.on('row.click', function(p) {
	CRUDS.select(p.def, p.item);
});


//#SHORTCUTS

$('html').on('keypress', function(e) {
	var code = e.charCode;
	var key = String.fromCharCode(e.charCode);
	//console.info(' keypress code ' + code);
});
CRUDS.save = function(def, cb) {
	console.info('CRUDS.save ' + def.name);
	var item = CRUDS.collectItem(def);
	var _id = def.collection.save(item);
	cb(_id);
}
CRUDS.trysave = function(def) {
	var idPrefix = '#' + def.name + '-';
	var $validated = $(idPrefix + 'validated');
	if ($validated.val() == false || $validated.val() == 'false') {
		CRUDS.validate(def);
		CRUDS.updateOperationField(def, true);
	} else {
		var item = CRUDS.collectItem(def);
		CRUDS.save(def, function(newKey) {
			CRUDS.output(def, CRUDS.lang('SAVE_SUCCESS'));
			//CRUDS.$selector(def, 'internid').val(newKey);
			CRUDS.clear(def);
			CRUDS.updateOperationField(def);
			chfl.emit('dom.updated');
			chfl.emit('item.saved', {
				item: item,
				def: def
			});
		});
		$validated.val(false);
	}
};
CRUDS.remove = function(def, id, cb) {
	var item = CRUDS.collectItem(def);
	def.collection.remove(item._id);
	cb(item);
};
CRUDS.find = function(collection, conditionFunct) {
	collection.read();
	var rta = [];
	for (var i = 0; i < collection.length; i++) {
		var item = collection[i];
		var isValid = conditionFunct(item);
		if (isValid) {
			rta.push(item);
		}
	}
	return rta;
};
CRUDS.single = function(collection, conditionFunct) {
	var arr = CRUDS.find(collection, conditionFunct);
	if (arr.length >= 1) {
		return arr[0];
	} else {
		return null;
	}
};
CRUDS.createCollection = function(def) {
	def.collection = new Collection(def.name);
};
CRUDS.loop = function(collection, callback) {
	collection.read();
	for (var i = 0; i < collection.length; i++) {
		var item = collection[i];
		callback(item);
	}
}
CRUDS.createSelect = function($select, source) {
	var foreigndef = CRUDS.defs[source.target];
	var foreignTableName = foreigndef.name;

	function _update() {
		var arr = [];
		CRUDS.loop(foreigndef.collection, function(item) {
			$option = $('<option>')
				.attr('value', item[source.key])
				.html(item[source.description])
			arr.push($option);

		});
		$select.empty().append(arr);
	}

	chfl.on('dom.updated', _update);
	_update();

};
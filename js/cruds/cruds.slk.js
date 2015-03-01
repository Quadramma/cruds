//SLK
//By Javi
//Version: 1
//
//Require:
//chfile
//jquery

$(function() {
	slk = {};
	slk.create = function(p) {
		//handler
		var handler = {};
		//init slks store arr
		slk._slks = slk._slks || {};
		//check slk name
		if (typeof slk._slks[p.name] !== 'undefined') {
			console.warn('cruds want to warn you that the slk ' + p.name + ' alredy exists. Canceling...');
			return;
		}
		//push handler
		slk._slks[p.name] = handler;
		//
		var $wrapper = $('<div/>').attr({
			id: p.name + '-slk-wrapper'
		});

		var $code = $('<input/>').attr({
			id: p.name + '-code-slk',
			class: 'slk code-slk',
			placeholder: p.codeLabel
		}).appendTo($wrapper);

		var $descr = $('<input/>').attr({
			id: p.name + '-descr-slk',
			class: 'slk descr-slk',
			placeholder: p.descriptionLabel
		}).appendTo($wrapper);

		/*
		p.searchLabel = p.searchLabel || 'Search';
		var $search = $('<button/>').attr({
				id: p.name + '-sarch-btn-slk',
				class: 'slk search-btn-slk'
			}).html(p.searchLabel)
			.on('click', function() {
				handler.enter();
			})
			.appendTo($wrapper);
*/


		handler.enter = function() {

			handler.result = p.items(function(item) {
				if ($code.val().toString().length > 1) {
					if (item[p.codeField] != $code.val()) {
						return false;
					} else {
						return true;
					}
				}
				if ($descr.val().toString().length > 1) {
					var itemVal = item[p.descriptionField].toString().toLowerCase();
					var inputVal = $descr.val().toString().toLowerCase();
					if (itemVal.indexOf(inputVal) >= 0) {
						return true;
					} else {
						return false;
					}
				}
				return true;
			});

			//console.info(handler.result);

			if (typeof handler.result == 'undefined' || handler.result == null) {
				handler.open();
				return;
			}
			if (handler.result.length > 1) {
				handler.open(handler.result);
				return;
			}
			if (handler.result.length == 1) {
				var single = handler.result[0];
				handler.set(single[p.codeField], single[p.descriptionField]);
				return;
			}
			handler.open(); //empty array?
		};


		handler.clear = function() {
			$code.val('');
			$descr.val('');
		};
		handler.close = function() {
			handler.clear();
			//dtable.remove(p.name);
			if (dtable.select(p.name) !== null) {
				dtable.select(p.name).hide();
			}

		};
		handler.set = function(code, descr) {
			handler.close();
			$code.val(code);
			$descr.val(descr);
			if (typeof p.onSelected === 'function') {
				p.onSelected($code.val(), $descr.val());
			}
		};
		handler.open = function(result) {
			handler.clear();
			result = result || [];
			if (result.length === 0) {
				result = p.items(null);
			}

			if (dtable.select(p.name) == null) {
				_createdtable();
			}
			dtable.select(p.name).set(result);
			dtable.select(p.name).show();
			_updatedtableposition();
		}

		function _updatedtableposition() {
			dtable.select(p.name).$.css({
				position: 'absolute',
				top: $code.offset().top + $code.height(),
				left: $code.offset().left
			});
		}

		function _createdtable() {
			dtable.create({
				name: p.name,
				fields: p.tableFields,
				onRowClick: function(item, $tr) {
					handler.set(item[p.codeField], item[p.descriptionField]);
				},
				onNewTr: function($tr) {

				},
				onUpdate: function() {
					if (typeof p.onUpdate == 'function') {
						p.onUpdate();
					}
				}
			});
			dtable.select(p.name).$.appendTo($wrapper);
		}

		$code.on('keypress', function(e) {
			if (e.charCode === 13) {
				handler.enter();
			}
		});
		$descr.on('keypress', function(e) {
			if (e.charCode === 13) {
				handler.enter();
			}
		});



		return $wrapper;
	};

});
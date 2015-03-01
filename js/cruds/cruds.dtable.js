//Dynamic Table
//By Javi
//Version: 1
//
//Require:
//chfile
//jquery

dtable = {
	handlers: {}
};
dtable.select = function(name) {
	var handler = dtable.handlers[name] || null;
	return handler;
};
dtable.remove = function(name) {
	$(dtable.handlers[name].selector).remove();
	delete dtable.handlers[name];
};
dtable.create = function(p) {


	function _createhandler() {
		var handler = {
			selector: '#' + p.name + '-dtable-wrapper'
		};

		//private funcs
		function _addsingle(item) {
			$tr = $('<tr/>');
			var arr = [];

			//console.info('adding item _single');

			$table.find('th').each(function() {
				var $th = $(this);
				//console.info('iterando sobre th ' + $th.attr('data-field'));
				for (var fieldName in item) {
					if ($th.attr('data-field') !== fieldName) {
						continue;
					}
					var fieldValue = item[fieldName];
					$td = $('<td/>')
						.html(fieldValue);
					if (typeof p.onNewTd == 'function') {
						p.onNewTd($td);
					}
					arr.push($td);
				}
			});
			$tr.append(arr);
			$tr.on('click', function() {
				if (typeof p.onRowClick == 'function') {
					p.onRowClick(item, $tr);
				}
			});
			if (typeof p.onNewTr == 'function') {
				p.onNewTr($tr);
			}
			return $tr;
		}

		function _addmultiple(param) {
			var arr = [];
			for (var x in param) {
				arr.push(_addsingle(param[x]));
			}
			return arr;
		}

		function _paginateItems(items) {
			//var pageTemplate = {items: null}
			var pages = [];
			var allinFlag = false;
			var rowPerPageCounter = 0;
			var arr = [];
			var index = 0;
			var pageNumber = 1;
			while (!allinFlag) {
				if (index == items.length) {
					allinFlag = true;
					break;
				} else {
					if (rowPerPageCounter == p.rowPerPage) {
						pages.push({
							pageNumber: pageNumber,
							items: arr
						});
						pageNumber++;
						rowPerPageCounter = 0;
						arr = [];
					} else {
						arr.push(items[index]);
						index++;
						rowPerPageCounter++;
					}
				}
			};
			return pages;
		}


		function _createpaginator() {
			var _validate = function(n, length) {
				if (n - 1 < 0 || n - 1 >= length) {
					console.warn('paginator said that goto function require a valid page number. Received:' + n);
					return false;
				} else {
					return true;
				}
			}
			var _draw = function(list) {
				$tbody.empty().append(_addmultiple(list));
				chfl.emit('dtable.dom.update');
			};
			var paginator = {
				next: function() {
					if (paginator.currentPage + 1 >= paginator.pages.length) {
						return; //outside range.
					} else {
						paginator.currentPage++;
						_draw(paginator.pages[paginator.currentPage - 1].items);
					}
				},
				prev: function() {
					if (paginator.currentPage - 1 <= 0) {
						return; //outside range.
					} else {
						paginator.currentPage--;
						_draw(paginator.pages[paginator.currentPage - 1].items);
					}
				},
				last: function() {
					paginator.currentPage = paginator.pages.length;
					_draw(paginator.pages[paginator.currentPage - 1].items);
				},
				first: function() {
					paginator.currentPage = 1;
					_draw(paginator.pages[0].items);

				},
				goto: function(n) {
					if (_validate(n, paginator.pages.length)) {
						paginator.currentPage = n;
						_draw(paginator.pages[n - 1].items);
					}
				},
				currentPage: null,
				pages: []
			};
			//finally: add some buttons to play with
			$first = $('<button/>').attr({
					id: p.name + '-dtable-paginator-first-btn'
				}).html('<<')
				.on('click', paginator.first);
			$prev = $('<button/>').attr({
					id: p.name + '-dtable-paginator-prev-btn'
				}).html('<')
				.on('click', paginator.prev);
			$next = $('<button/>').attr({
					id: p.name + '-dtable-paginator-next-btn'
				}).html('>')
				.on('click', paginator.next);
			$last = $('<button/>').attr({
					id: p.name + '-dtable-paginator-last-btn'
				}).html('>>')
				.on('click', paginator.last);

			$actual = $('<input/>').attr({
					id: p.name + '-dtable-paginator-actual',
					class: 'dtable-paginator dtable-paginator-actual'
				})
				.on('keypress', function(e) {
					var val = $(this).val();
					if (!isNaN(val) && e.charCode == 13) {
						paginator.goto(val);
					}
				});
			$left = $('<input/>').attr({
				id: p.name + '-dtable-paginator-left',
				class: 'dtable-paginator dtable-paginator-left'
			});
			chfl.on('dtable.dom.update', function() {
				$actual.attr({
					value: paginator.currentPage
				});
				$left.attr({
					value: '/' + paginator.pages.length
				});
			});

			$close = $('<button/>').attr({
					id: p.name + '-dtable-paginator-close-btn'
				}).html('x')
				.on('click', function(){
					handler.hide();
				});

			var $paginator = $('<div/>')
				.attr({
					id: p.name + '-dtable-paginator-wrapper',
					class: 'dtable-paginator-wrapper'
				})
				.append([$first, $prev, $next, $last, $actual, $left,$close]);
			$wrapper.append($paginator);
			return paginator;
		}

		function _addpaginator() {
			handler.paginator = handler.paginator || _createpaginator();
			handler.paginator.pages = _paginateItems(handler._items);
			handler.paginator.goto(1);
		}

		function _drawRows(items) {
			//check: si supera el limite por pagina se crea un paginador.
			if (handler._items.length > p.rowPerPage) {
				_addpaginator();
			} else {
				$tbody.append(_addmultiple(items));
			}
			chfl.emit('dtable.dom.update');
		}

		//handler implmentation
		handler.add = function(param) {
			//check param
			if (typeof param == 'undefined') {
				console.warn('dtable wants to tell you that .add method receive an undefined parameter');
				return;
			}
			//add/set _items
			handler._items = handler._items || [];
			if (typeof param.length == 'number') {
				for (var x in param) {
					handler._items.push(param[x]);
				}
				_drawRows(param);
			} else {
				handler._items.push(param);
				_drawRows([param]);
			}
			//triggers update evt
			if (typeof p.onUpdate == 'function') {
				p.onUpdate();
			}
		}
		handler.set = function(param) {
			if (typeof param == 'undefined') {
				console.warn('dtable wants to tell you that .set method receive an undefined parameter');
				return;
			}
			handler._items = [];
			$tbody.empty();
			this.add(param);
		};
		handler.hide = function() {
			dtable.select(p.name).$.toggle(false);
		}
		handler.show = function() {
			dtable.select(p.name).$.toggle(true);
		}

		return handler;
	}

	function _createTableTitles(fields) {
		var arr = [];
		for (var i in fields) {
			var f = fields[i];
			$th = $('<th/>')
				.attr('data-field', f.name)
				.html(f.label);
			arr.push($th);
		}
		return arr;
	}

	//defaults
	p.rowPerPage = p.rowPerPage || 10;
	p.orderByField = p.orderByField || p.fields[0].name;
	//public handler for manupulation
	dtable.handlers[p.name] = _createhandler();
	//dom elements
	$wrapper = $('<div/>').attr({
		id: p.name + '-dtable-wrapper',
		class: 'dtable-wrapper'
	});
	$table = $('<table/>').attr({
		id: p.name + '-table',
		class: 'dtable'
	});
	var $thArr = _createTableTitles(p.fields);
	var $thead = $('<thead/>').append($thArr);
	var $tbody = $('<tbody/>');
	$table.append($thead);
	$table.append($tbody);
	$wrapper.append($table);
	dtable.handlers[p.name].$ = $wrapper;
	return $wrapper;
};
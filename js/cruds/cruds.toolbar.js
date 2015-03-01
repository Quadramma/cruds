CRUDS.createToolbar = function(def) {
	function createButton(name, label, click) {
		$elem = $('<button>')
			.attr('id', def.name + '-' + name)

		.attr('class', def.name + '-button cruds-button toolbar-button')
			.html(label)
			.on('click', function(e) {
				click(e);
			});
		return $elem;
	}
	$toolbar = $('<div class="cruds-toolbar"/>');


	$toolbar.append(createButton('clear', CRUDS.lang("NEW"), function() {
		CRUDS.clear(def);
	}));


	$toolbar.append(createButton('save', CRUDS.lang("SAVE_CHANGES"), function() {
		CRUDS.trysave(def);
	}));


	$deleteButton = createButton('delete', CRUDS.lang("DELETE"), function() {
		if (CRUDS.debug && CRUDS.$selector(def, "internid").val() == '') {
			console.warn('internid vacio');
		}
		CRUDS.remove(def, CRUDS.$selector(def, "internid").val(), function(item) {
			$deleted = CRUDS.$selector(def, 'deleted');
			if ($deleted.val() == false || $deleted.val() == 'false') {
				CRUDS.$selector(def, 'output').val(CRUDS.lang('PRESS_AGAIN_TO_DELETE'));
				$deleted.val('true');
			} else {
				CRUDS.clear(def);


				CRUDS.output(def, CRUDS.lang('DELETED'))
				chfl.emit('dom.updated', {});
				$deleted.val('false');
			}

		});
	});
	$deleteButton.attr('disabled', 'disabled');
	$toolbar.append($deleteButton);



	var $target = $(def.target);
	$toolbar.appendTo($target);
	if (CRUDS.debug && CRUDS.verbose == 1) {
		console.info('CRUDS ' + def.name + ' toolbar created');
	}

};
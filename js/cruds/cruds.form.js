CRUDS.createForm = function(def) {
	var $form = $('<form/>')
		.attr('id', def.name + '-form')
		.attr('class', 'cruds-form');
	$form.on('keypress', function(e) {
		var code = e.charCode;
		var key = String.fromCharCode(e.charCode);
		//console.info('CRUD ' + def.name + ' keypress code ' + code);
		if (code === 13) {
			//ENTER
			CRUDS.trysave(def);
		} else {
			CRUDS.updateOperationField(def);
		}
	});

	for (var xx in def.fields) {
		var field = def.fields[xx];

		if (field.type == 'String' || field.type == 'Number') {
			var $elem = $('<input/>');
			$elem.attr('id', def.name + '-' + field.name);
			$elem.attr('class', def.name + '-field form-field');
			$elem.attr('name', field.name);
			$elem.attr('placeholder', field.label);
			$form.append($elem);
		}
		if (field.type == 'Select') {
			$select = $('<select class="cruds-select"/>')
			$select.attr('id', def.name + '-' + field.name);
			$select.attr('class', def.name + '-field form-field');
			$select.attr('name', field.name);
			$select.attr('placeholder', field.label);
			$select.change(function() {
				$select.attr('value', $(this).find('option:selected').val());
			});


			CRUDS.createSelect($select, field.source);

			$form.append($select);
		}
	}

	$deleted = $('<input type="checkbox" readonly>/')
		.css('display', 'none')
		.attr('id', def.name + '-deleted')
		.attr('class', 'deleted-field form-field hidden-field')
		.val(false)
		.appendTo($form);

	$validated = $('<input type="checkbox" readonly>/')
		.css('display', 'none')
		.attr('id', def.name + '-validated')
		.attr('class', 'validated-field form-field hidden-field')
		.val(false)
		.appendTo($form);

	//id interno
	$internid = $('<input readonly/>')
		.attr('id', def.name + '-internid')
		.attr('class', 'internid-field form-field')
		.attr('enabled', 'false')
		.attr('placeholder', 'id interno')
		.appendTo($form);
	//operacion
	$operation = $('<input readonly/>')
		.attr('id', def.name + '-operation')
		.attr('class', 'operation-field form-field')
		.attr('enabled', 'false')
		.attr('placeholder', 'operacion')
		.appendTo($form);
	//ouput
	$output = $('<input readonly/>')
		.attr('id', def.name + '-output')
		.attr('class', 'output-field form-field')
		.attr('enabled', 'false')
		//.attr('placeholder', 'output')
		.appendTo($form);

	$(def.target).append($form);

	if (CRUDS.debug && CRUDS.verbose == 1) {
		console.info('CRUDS ' + def.name + ' form created');
	}
};


CRUDS.output = function(def, msg) {
	//console.info('output -> ' + msg);
	var $selector = CRUDS.$selector(def, 'output');

	if (msg == '') {
		//$selector.trigger('notify-hide');
		$selector.val('');
	} else {
		$selector.val(msg);
		/*
		$selector.notify(msg, {
			position: 'right',
			elementPosition: 'middle left',
			autoHideDelay: 2000
		});
*/
	}


};
CRUDS.validate = function(def) {
	console.info('CRUDS.validate ' + def.name);
	var idPrefix = '#' + def.name + '-';
	var $validated = $(idPrefix + 'validated');
	for (var xx in def.fields) {
		var field = def.fields[xx];
		var required = field.required || false;
		var $elem = $(idPrefix + field.name);
		if (field.type == 'String' || field.type == 'Number') {
			if ($elem.val() == '') {
				if (required) {
					$elem.focus();
					$validated.val(false);
					CRUDS.output(def, 'Field/s required');
					return;
				}
			}
		}
		if (field.type == 'Number') {
			if (isNaN($elem.val())) {
				$validated.val(false);
				CRUDS.output(def, 'Number required');
				$elem.val('');
				$elem.focus();
				return;
			}
		}

		if (field.type == 'Select') {
			var val = $elem.val() || '';
			if (val === '') {
				$validated.val(false);
				CRUDS.output(def, 'Select choice');
				$elem.attr('value', '');
				$elem.focus();
				return;
			}
		}



		var minLength = field.minLength || 0;
		if (required && ($elem.val().toString().length < minLength)) {
			$validated.val(false);
			CRUDS.output(def, 'minLength its ' + minLength);
			//$elem.val('');
			$elem.focus();
			return;
		}
	}
	//
	$validated.val(true);

	CRUDS.output(def, CRUDS.lang('PRESS_AGAIN_TO_SAVE'));

};
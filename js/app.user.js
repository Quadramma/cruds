	CRUDS.add({
		name: 'user',
		label: 'Usuario',
		target: '#cruds-content',
		fields: [{
			name: "name",
			label: "Nombre",
			type: "String",
			required: true
		}, {
			name: "type",
			label: "Tipo de usuario",
			type: "Select",
			source: {
				target: 'userType',
				key: '_id',
				description: 'description'
			},
			required: true
		}, {
			name: "phone",
			label: "Telefono",
			type: "Number",
			//required: true,
			minLength: 6
		}],
		table: {
			columns: ['name', 'type']
		}
	});
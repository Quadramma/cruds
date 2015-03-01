	CRUDS.add({
		name: 'userType',
		label: 'Tipo de usuario',
		target: '#cruds-content',
		fields: [{
			name: "description",
			label: "Descripcion",
			type: "String",
			required: true
		}],
		table: {
			columns: ['description']
		}
	});
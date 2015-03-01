CRUDS.init(function() {


	$loader = $('<div/>')
		.attr({})
		.css({
			position: 'absolute',
			width: '100%',
			height: '100%',
			background: 'rgba(255,255,255,0.9)',
			'z-index': 99999999,
			margin: '0px',
			padding: '0px',
			top: '0px'
		}).append(
			$('<p/>')
			.css({
				color: 'black',
				position: 'absolute',
				width: '100%',
				'text-align': 'center',
				bottom: '0px',
				'vertical-align': 'middle'
			})
			.html('CRUDS its loading.')
		).appendTo($('body'));


	//Basic Skeleton
	$header = $('<header/>').append(
		$('<div/>').append(
			$('<h2/>').html('CRUDS')
		).attr({
			id: 'cruds-menu'
		})
	);
	$main = $('<div/>').attr({
		id: 'cruds-content'
	});
	$footer = $('<footer/>').append(
		$('<h3/>').html('contact:javi@quadramma.com')
	);
	$('body').append([$header, $main, $footer]);

	toast(
		'js/app.userType.js', //Master tables first!
		function() {},
		'js/app.user.js',
		function() {
			CRUDS.createMenu({
				target: '#cruds-menu',
				buttons: [{
					name: 'tutorial',
					label: 'Tutorial',
					click: function() {

					}
				}, {
					name: 'download',
					label: 'Download',
					click: function() {

					}
				}, {
					name: 'about',
					label: 'About',
					click: function() {

					}
				}]

			});
			CRUDS.build({
				root: 'user'
			});
			var h = $('header').height();
			$('#cruds-content, footer')
				.css('position', 'relative')
				.css('top', h + 'px');;
			//$('.cruds-content').toggle(false);

			setTimeout(function() {
				$loader.fadeOut();
			}, 500);

		}
	);
});



/*
		CRUDS.add({
			name: 'movies',
			label: 'Peliculas',
			target: '#uiview',
			fields: [{
				name: "name",
				label: "Nombre",
				type: "String",
				required: true
			}, {
				name: "genre",
				label: "Genero",
				type: "String",
				required: true
			}, {
				name: "stock",
				label: "Cantidad",
				type: "Number",
				required: true
			}],
			table: {
				columns: ['name', 'genre', 'stock']
			}
		});

		CRUDS.add({
			name: 'alquiler',
			label: 'Alquiler',
			target: '#uiview',
			fields: [{
				name: "empleado",
				label: "Empleado",
				type: "Number",
				required: true
			}, {
				name: "client",
				label: "Genero",
				type: "Number",
				required: true
			}, {
				name: "movie",
				label: "Pelicula",
				type: "Number",
				required: true
			}],
			table: {
				columns: ['name', 'genre']
			}
		});

*/
chfl = {
	evts: {},
	debug: false,
	verbose: 2
};
chfl.emit = function(name, data) {
	var arr = chfl.evts[name] || null;
	if (arr !== null) {
		var times = 0;
		for (var x in arr) {
			var evt = arr[x];
			evt(data);
			times++;
		}
		if (chfl.debug && verbose == 1) {
			console.info('chfl annunces that ' + name + ' was shot on ' + times + ' listeners :P');
		}
	} else {
		if (chfl.debug && verbose <= 4) {
			console.warn('chfl.emit [' + name + '][without listener]');
		}
	}
};
chfl.on = function(name, cb) {
	var arr = chfl.evts[name] || null;
	if (arr == null) {
		chfl.evts[name] = [];
	} else {

	}
	chfl.evts[name].push(cb);
};
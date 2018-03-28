export function formatTime(value, format = "yyyy-MM-dd HH:mm") {
	var maps = {
		'yyyy': (data) => {
			return data.getFullYear();
		},
		'MM': (data) => {
			return numberFixed(data.getMonth() + 1);
		},
		'dd': (data) => {
			return numberFixed(data.getDate());
		},
		'HH': (data) => {
			return numberFixed(data.getHours());
		},
		'mm': (data) => {
			return numberFixed(data.getMinutes());
		}
	};

	var trunk = new RegExp(Object.keys(maps).join("|"), "g");
	value = new Date(value);
	return format.replace(trunk, function(capture) {
		return maps[capture] ? maps[capture](value) : "";
	});
}

let numberFixed = (value) => {
	return value >= 10 ? value : "0" + value;
}

export {numberFixed}

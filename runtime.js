function $print(...obj) {
	console.log(...obj);
}

function $randInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function range(start, end) {
	if (end === undefined) {
		end = start;
		start = 0;
	}
	return Array.from({ length: end - start }, (_, i) => i + start);
}

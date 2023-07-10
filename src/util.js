export function convertMinutesToHours(minutes) {
	let hours = Math.floor(minutes / 60);
	let remainingMinutes = minutes % 60;
	if (remainingMinutes < 10) {
		remainingMinutes = '0' + remainingMinutes;
	}

	if (hours < 10) {
		hours = '0' + hours;
	}
	return `${hours}:${remainingMinutes}`;
}

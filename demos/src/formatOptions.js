const dates = document.querySelectorAll('[data-o-component="o-date"]');
const now = new Date();
const recently = new Date();
const today = new Date();
const yesterday = new Date();
const daysAgo = new Date();
recently.setMinutes(now.getMinutes() - 23);
today.setHours(now.getHours() - 6);
yesterday.setHours(now.getHours() - 24);
daysAgo.setDate(now.getDay() - 2);

const formats = ['Publish Date', 'Default o-date output', 'time-ago-limit-4-hours output', 'date-only output', 'as-today-or-yesterday-or-nothing output'];
const moments = [now, recently, today, yesterday, daysAgo];
const momentNames = ['Now', 'Recently', 'Earlier today', 'Yesterday', 'Few Days Ago', 'Long Ago'];
const publishDates = 	document.getElementsByClassName('publish-dates');

// Current browser time displayed
document.getElementById("current-date").innerHTML = now.toISOString();

for (let i = 0; i<formats.length; i++) {
	let th = document.createElement('th');
	th.appendChild(document.createTextNode(formats[i]));
	document.getElementsByTagName("thead")[0].appendChild(th);
}
for (let i = 0; i<publishDates.length; i++) {
	let td = publishDates[i];
	td.appendChild(document.createTextNode(momentNames[i]));
}

// declarative mode used
let c = 0;
for (let i = 1; i < moments.length; i++) {
	for (let j = 0; j < 4; j++) {
		dates[c].setAttribute('datetime', moments[i].toISOString());
		c++;
	}
}

require('./demo');

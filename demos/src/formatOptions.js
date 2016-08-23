const times = document.querySelectorAll('[data-o-component="o-date"]');
const now = new Date();
const recently = new Date();
const today = new Date();
const yesterday = new Date();
const daysAgo = new Date();
recently.setMinutes(now.getMinutes() - 23);
today.setHours(now.getHours() - 6);
yesterday.setHours(now.getHours() - 24);
daysAgo.setDate(now.getDay() - 2);

let moments = [now, recently, today, yesterday, daysAgo];

// Current browser time displayed
document.getElementById("current-date").innerHTML = now.toISOString();

// declarative mode used
let c = 0;
for (let i = 1; i < moments.length; i++) {
	for (let j = 0; j < 4; j++) {
		times[c].setAttribute('datetime', moments[i].toISOString());
		c++;
	}
}

require('./demo');

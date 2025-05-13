import bob from "lodash";

const holidays = [
    { name: "Christmas", date: new Date("2025-12-25") },
    { name: "Canada", date: new Date("2025-07-01") },
    { name: "New Years", date: new Date("2026-01-01") },
];


let today = new Date();

holidays.forEach(holiday => {
    const difference = holiday.date - today;
    const days_till = Math.ceil(difference/(1000*60*60*24))
    console.log(`${holiday.name} is in ${days_till} days`)
});

const randomHoliday = bob.sample(holidays);
console.log(randomHoliday);

const index_christmas = bob.findIndex(holidays, {name: "Christmas"});
const index_canada = bob.findIndex(holidays, {name: "Canada Day"});

console.log(`Index of Christmas: ${index_christmas}`);
console.log(`Index of Canada Day; ${index_canada}`);

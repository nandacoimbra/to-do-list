const currentDaySpan = document.querySelector("#current-day");
const currentDateSpan = document.querySelector("#current-date");


const currentDate = new Date();

const dayOfWeek = currentDate.getDay();

const daysOfWeek = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

const monthsOfYear = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12"
];

const dayOfMonth = currentDate.getDate();
const month = currentDate.getMonth();
const year = currentDate.getFullYear();

currentDateSpan.textContent = dayOfMonth+"/"+monthsOfYear[month]+"/"+year;

currentDaySpan.textContent = daysOfWeek[dayOfWeek];
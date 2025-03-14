// document.getElementById("fetch-btn").addEventListener("click", fetchData);

// const fact = document.getElementById("data-fact");
// const src = document.getElementById("data-src");

// const monthname = ["January","February","March","April","May","June","July","August","September","October","November","December"];

// const d = new Date();
// let month = monthname[d.getMonth()];
// let day = d.getDate();
// let year = d.getFullYear();
// console.log(month, day,',', year);
// let date = `${month} ${day}, ${year}`;
// document.getElementById("date").innerHTML = date;

// async function fetchData() {
// try {
//     const response = await fetch(
//     "https://uselessfacts.jsph.pl/api/v2/facts/random?language=en"
//     );
//     if (!response.ok) {
//     throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const data = await response.json();
//     console.log("Fetched Data:", data);

//     // Ensure elements exist before updating them
//     if (fact) {
//     fact.innerHTML = `${data.text}`;
//     } else {
//     console.error("Element #data-list not found");
//     }

//     if (src) {
//     src.innerHTML = `Source: <a href="${data.source_url}" target="_blank"><small>${data.source}<small></a>`;
//     } else {
//     console.error("Element #data-src not found");
//     }
// } catch (error) {
//     console.error("Error fetching data:", error);
// }
// }

// fetchData();

const fact = document.getElementById("data-fact");
const src = document.getElementById("data-src");
const dateElement = document.getElementById("date");

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const d = new Date();
let month = monthNames[d.getMonth()];
let day = d.getDate();
let year = d.getFullYear();
let dateString = `${month} ${day}, ${year}`;
dateElement.innerHTML = dateString;

// Function to fetch data from JSON file
async function fetchFact(type = "today") {
  try {
    const response = await fetch("/random_facts_with_dates.json");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    let selectedFact;

    if (type === "today") {
      selectedFact = data.find(fact => fact.month === month && fact.day == day);
    } else {
      const randomFacts = data.filter(fact => fact.month === "random");
      selectedFact = randomFacts[Math.floor(Math.random() * randomFacts.length)];
    }

    if (selectedFact) {
      fact.innerHTML = selectedFact.fact;
      if (type === "random") {
        dateElement.innerHTML = selectedFact.category; // Change date display to category for random facts
      } else {
        dateElement.innerHTML = dateString; // Reset to actual date when showing today's fact
      }
    } else {
      fact.innerHTML = "No fact available for today.";
      dateElement.innerHTML = dateString;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Button event listeners
document.getElementById("todays-fact-btn").addEventListener("click", () => fetchFact("today"));
document.getElementById("random-fact-btn").addEventListener("click", () => fetchFact("random"));

// Fetch today's fact on load
fetchFact("today");


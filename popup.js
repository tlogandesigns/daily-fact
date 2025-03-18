const dataStory = document.getElementById("data-story");
const dataTitle = document.getElementById("data-title");
const dateElement = document.getElementById("date");

// Set up the date (unchanged)
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

// Function to fetch the JSON and display a random joke
async function fetchJoke() {
  try {
    // Update the path to your JSON file as needed
    const response = await fetch("/jokes.json");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    
    // Flatten the stories from all parts, adding the part title and part label
    const allStories = data.parts.flatMap(part =>
      part.stories.map(story => ({
        ...story,
        partTitle: part.title,
        partLabel: part.part
      }))
    );
    
    // Pick a random story
    const randomStory = allStories[Math.floor(Math.random() * allStories.length)];
    
    // Update HTML elements:
    // The "data-title" will display the part title (and optionally the part label)
    dataTitle.innerHTML = `${randomStory.partTitle} (${randomStory.partLabel})`;
    // The "data-story" element displays the joke text
    dataStory.innerHTML = randomStory.text;
  } catch (error) {
    console.error("Error fetching joke:", error);
    dataStory.innerHTML = "Error loading joke.";
  }
}

// Button event listener to get a random joke when clicked
document.getElementById("random-fact-btn").addEventListener("click", fetchJoke);

// Fetch a joke on page load
fetchJoke();

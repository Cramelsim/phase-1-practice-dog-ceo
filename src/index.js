console.log('%c HI', 'color: firebrick');

const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = "https://dog.ceo/api/breeds/list/all";

const dogImageContainer = document.getElementById("dog-image-container");
const dogBreedList = document.getElementById("dog-breeds");
const breedDropdown = document.getElementById("breed-dropdown");

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");

  fetchDogImages();
  fetchDogBreeds();

  breedDropdown.addEventListener("change", event => {
    filterBreedsByLetter(event.target.value);
  });
});

// Function to fetch dog images
function fetchDogImages() {
  fetch(imgUrl)
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      const images = data.message; // Array of image URLs
      displayImages(images);
    })
    .catch(error => {
      console.error("Failed to fetch dog images:", error);
    });
}

// Function to add images to the DOM
function displayImages(images) {
  images.forEach(imageUrl => {
    const imgElement = document.createElement("img");
    imgElement.src = imageUrl;
    imgElement.alt = "A cute dog";
    imgElement.style.width = "200px";
    imgElement.style.margin = "10px";
    dogImageContainer.appendChild(imgElement);
  });
}

// Function to fetch dog breeds
function fetchDogBreeds() {
  fetch(breedUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const breeds = Object.keys(data.message); // Object keys are breed names (top-level keys)
      window.allBreeds = breeds; // Store breed names in global object
      displayBreeds(breeds);
    })
    .catch(error => {
      console.error("Failed to fetch dog breeds:", error);
    });
}

// Function to add breeds to the DOM
function displayBreeds(breeds) {
  dogBreedList.innerHTML = ''; // Clear the list before displaying new results
  breeds.forEach(breed => {
    const liElement = document.createElement("li");
    liElement.textContent = breed;
    liElement.style.cursor = "pointer"; // Indicate clickable items

    // Add event listener to change font color on click
    liElement.addEventListener("click", () => {
      liElement.style.color = "blue"; // Change to your preferred color
    });
    dogBreedList.appendChild(liElement);
  });
}

// Function to filter breeds based on the selected letter
function filterBreedsByLetter(letter) {
  const filteredBreeds = window.allBreeds.filter(breed =>
    breed.startsWith(letter)
  );
  displayBreeds(filteredBreeds);
}

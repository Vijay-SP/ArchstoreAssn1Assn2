const fs = require('fs');
const axios = require('axios');

async function fetchData(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

async function logResponseToFile(response) {
  try {
    const data = JSON.stringify(response, null, 2);
    fs.appendFileSync('cat_breeds.txt', data + '\n');
    console.log('Response logged to cat_breeds.txt');
  } catch (error) {
    console.error('Error logging response to file:', error);
    throw error;
  }
}

async function getCatBreeds() {
  const baseUrl = 'https://catfact.ninja/breeds';
  let pageNumber = 1;
  let totalPages = 0;
  let allBreeds = {};

  try {
    // Get the number of pages
    const response = await fetchData(`${baseUrl}?page=${pageNumber}`);
    totalPages = response.last_page;
    console.log('Total pages:', totalPages);

    // Fetch data from all pages
    while (pageNumber <= totalPages) {
      const response = await fetchData(`${baseUrl}?page=${pageNumber}`);
      const breeds = response.data;
      
      // Group cat breeds by country
      breeds.forEach((breed) => {
        const { origin, breed: breedName, coat, pattern } = breed;
        if (!allBreeds[origin]) {
          allBreeds[origin] = [];
        }
        allBreeds[origin].push({ breed: breedName, origin, coat, pattern });
      });

      pageNumber++;
    }

    // Log the response to a text file
    await logResponseToFile(allBreeds);

    // Return cat breeds grouped by country
    return allBreeds;
  } catch (error) {
    console.error('Error retrieving cat breeds:', error);
    throw error;
  }
}

getCatBreeds()
  .then((catBreeds) => {
    console.log('Cat breeds grouped by country:', catBreeds);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

const ACCESS_TOKEN = "9b7a0dbdb3cce6a2f2fd7f5e93a4a51e";
const API_BASE = `https://superheroapi.com/api.php/${ACCESS_TOKEN}`;

const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const heroInfoDiv = document.getElementById('hero-info');
const favsListDiv = document.getElementById('favourites-list');
const clearFavsBtn = document.getElementById('clear-favs');

// Load favourites from localStorage
let favourites = JSON.parse(localStorage.getItem('favourites')) || [];

// Display favourites
function renderFavourites() {
  favsListDiv.innerHTML = '';
  if (favourites.length === 0) {
    favsListDiv.textContent = 'No favourites yet.';
    return;
  }
  favourites.forEach(fav => {
    const div = document.createElement('div');
    div.className = 'fav-item';
    div.textContent = fav.name;
    div.onclick = () => fetchHeroById(fav.id);
    favsListDiv.appendChild(div);
  });
}

// Save favourites to localStorage
function saveFavourites() {
  localStorage.setItem('favourites', JSON.stringify(favourites));
}

// Add hero to favourites
function addToFavourites(hero) {
  if (!favourites.find(fav => fav.id === hero.id)) {
    favourites.push({ id: hero.id, name: hero.name });
    saveFavourites();
    renderFavourites();
  }
}

// Remove all favourites
clearFavsBtn.addEventListener('click', () => {
  if (confirm('Are you sure you want to clear all favourites?')) {
    favourites = [];
    saveFavourites();
    renderFavourites();
  }
});

// Search hero by name to get ID using /search endpoint
async function searchHeroByName(name) {
  try {
    const res = await fetch(`${API_BASE}/search/${encodeURIComponent(name)}`);
    const data = await res.json();
    if (data.response === 'success') {
      // Return the first match for simplicity
      return data.results[0];
    } else {
      throw new Error(data.error || 'Hero not found');
    }
  } catch (error) {
    throw error;
  }
}

// Fetch hero by ID and display details
async function fetchHeroById(id) {
  heroInfoDiv.innerHTML = '<p>Loading...</p>';
  try {
    const res = await fetch(`${API_BASE}/${id}`);
    const hero = await res.json();
    if (hero.response === 'success') {
      displayHero(hero);
    } else {
      heroInfoDiv.innerHTML = `<p class="error">Error: ${hero.error || 'Hero data not found'}</p>`;
    }
  } catch (error) {
    heroInfoDiv.innerHTML = `<p class="error">Error: ${error.message}</p>`;
  }
}

// Display hero details in the page
function displayHero(hero) {
  heroInfoDiv.innerHTML = `
    <h2>${hero.name}</h2>
    <img src="${hero.image.url}" alt="${hero.name}" />
    <p><strong>Full Name:</strong> ${hero.biography['full-name'] || 'N/A'}</p>
    <p><strong>Aliases:</strong> ${hero.biography.aliases.join(', ')}</p>
    <p><strong>Publisher:</strong> ${hero.biography.publisher || 'N/A'}</p>
    <p><strong>First Appearance:</strong> ${hero.biography['first-appearance'] || 'N/A'}</p>
    <p><strong>Alignment:</strong> ${hero.biography.alignment || 'N/A'}</p>
    <h3>Powerstats</h3>
    <ul>
      <li>Intelligence: ${hero.powerstats.intelligence}</li>
      <li>Strength: ${hero.powerstats.strength}</li>
      <li>Speed: ${hero.powerstats.speed}</li>
      <li>Durability: ${hero.powerstats.durability}</li>
      <li>Power: ${hero.powerstats.power}</li>
      <li>Combat: ${hero.powerstats.combat}</li>
    </ul>
    <button id="fav-btn">Add to Favourites</button>
  `;
  document.getElementById('fav-btn').onclick = () => addToFavourites(hero);
}

// Handle search button click
searchBtn.addEventListener('click', async () => {
  const name = searchInput.value.trim();
  if (!name) {
    alert('Please enter a superhero name.');
    return;
  }
  heroInfoDiv.innerHTML = '<p>Searching...</p>';
  try {
    const hero = await searchHeroByName(name);
    if (hero) {
      displayHero(hero);
    }
  } catch (error) {
    heroInfoDiv.innerHTML = `<p class="error">${error.message}</p>`;
  }
});

// On load render favourites list
renderFavourites();

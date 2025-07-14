const API_URL = "https://www.superheroapi.com/api.php/9b7a0dbdb3cce6a2f2fd7f5e93a4a51e/310";
const heroCard = document.getElementById("heroCard");

fetch(API_URL)
  .then(response => response.json())
  .then(hero => {
    heroCard.innerHTML = `
      <img src="${hero.image.url}" alt="Harry Potter" />
      <h2>${hero.name}</h2>
      <section>
        <h3>Power Stats</h3>
        <p>🧠 Intelligence: ${hero.powerstats.intelligence}</p>
        <p>💪 Strength: ${hero.powerstats.strength}</p>
        <p>⚡ Speed: ${hero.powerstats.speed}</p>
        <p>🛡️ Durability: ${hero.powerstats.durability}</p>
        <p>✨ Power: ${hero.powerstats.power}</p>
        <p>🥋 Combat: ${hero.powerstats.combat}</p>
      </section>

      <section>
        <h3>Biography</h3>
        <p><strong>Full Name:</strong> ${hero.biography["full-name"]}</p>
        <p><strong>Alter Egos:</strong> ${hero.biography["alter-egos"]}</p>
        <p><strong>Aliases:</strong> ${hero.biography.aliases.join(", ")}</p>
        <p><strong>Place of Birth:</strong> ${hero.biography["place-of-birth"]}</p>
        <p><strong>First Appearance:</strong> ${hero.biography["first-appearance"]}</p>
        <p><strong>Publisher:</strong> ${hero.biography.publisher}</p>
        <p><strong>Alignment:</strong> ${hero.biography.alignment}</p>
      </section>

      <section>
        <h3>Appearance</h3>
        <p><strong>Gender:</strong> ${hero.appearance.gender}</p>
        <p><strong>Race:</strong> ${hero.appearance.race}</p>
        <p><strong>Height:</strong> ${hero.appearance.height.join(" / ")}</p>
        <p><strong>Weight:</strong> ${hero.appearance.weight.join(" / ")}</p>
        <p><strong>Eye Color:</strong> ${hero.appearance["eye-color"]}</p>
        <p><strong>Hair Color:</strong> ${hero.appearance["hair-color"]}</p>
      </section>

      <section>
        <h3>Work</h3>
        <p><strong>Occupation:</strong> ${hero.work.occupation}</p>
        <p><strong>Base:</strong> ${hero.work.base}</p>
      </section>

      <section>
        <h3>Connections</h3>
        <p><strong>Group Affiliation:</strong> ${hero.connections["group-affiliation"]}</p>
        <p><strong>Relatives:</strong> ${hero.connections.relatives}</p>
      </section>
    `;
  })
  .catch(error => {
    heroCard.innerHTML = `<p>Error loading Harry Potter's profile 😢</p>`;
    console.error("API Error:", error);
  });

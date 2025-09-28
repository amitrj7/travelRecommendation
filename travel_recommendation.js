async function searchDestinations() {
  const query = document.getElementById("searchBar").value.toLowerCase();
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "";

  const response = await fetch("travel_recommendation_api.json");
  const data = await response.json();

  let results = [];

  // Search beaches
  data.beaches.forEach(beach => {
    if (beach.name.toLowerCase().includes(query) || beach.country.toLowerCase().includes(query)) {
      results.push(beach);
    }
  });

  // Search temples
  data.temples.forEach(temple => {
    if (temple.name.toLowerCase().includes(query) || temple.country.toLowerCase().includes(query)) {
      results.push(temple);
    }
  });

  // Display results
  if (results.length > 0) {
    results.forEach(item => {
      resultsContainer.innerHTML += `
        <div class="card">
          <h3>${item.name} (${item.country})</h3>
          <img src="${item.imageUrl}" alt="${item.name}">
          <p>${item.description}</p>
        </div>
      `;
    });
  } else {
    resultsContainer.innerHTML = "<p>No results found.</p>";
  }
}

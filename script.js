const API_KEY = "358176d3"; // replace with your API key

function searchMovie() {
  const query = document.getElementById("search").value;
  const resultsDiv = document.getElementById("results");

  if (query === "") {
    resultsDiv.innerHTML = "<p>Please enter a movie name.</p>";
    return;
  }

  resultsDiv.innerHTML = "Searching...";

  fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
      if (data.Response === "True") {
        let output = "";

        data.Search.forEach(movie => {
          output += `
            <div style="border:1px solid #444;padding:10px;margin:10px;">
              <h3>${movie.Title}</h3>
              <p>Year: ${movie.Year}</p>
              <p>Type: ${movie.Type}</p>
              <img src="${movie.Poster}" width="120">
            </div>
          `;
        });

        resultsDiv.innerHTML = output;
      } else {
        resultsDiv.innerHTML = "<p>No results found.</p>";
      }
    })
    .catch(error => {
      resultsDiv.innerHTML = "<p>Error fetching data.</p>";
      console.error(error);
    });
}
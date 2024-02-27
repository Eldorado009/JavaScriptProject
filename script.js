async function GetShows() {
  let res = await fetch("https://api.tvmaze.com/shows");
  let data = await res.json();
  return data;
}

window.onload = async () => {
  let shows = await GetShows();
  let parent = document.getElementById("main");
  let pagination = document.getElementById("pagination");

  const itemsPerPage = 20;
  let currentPage = 1;

  function displayData(page) {
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const showsToShow = shows.slice(startIndex, endIndex);

      parent.innerHTML = ""; // Clear previous content

      showsToShow.forEach(show => {
          parent.innerHTML += `<div class="col-3 mt-4">
              <div class="card" style="width: 17rem; height:700px">
                  <img class="card-img-top" src="${show["image"]["medium"]}" alt="Card image cap">
                  <div class="card-body">
                      <h5 class="card-title">${show["name"]}</h5>
                      <p class="card-text">Premiere: ${show["premiered"]}</p>
                  </div>
                  <ul class="list-group list-group-flush">
                      <li class="list-group-item">IMDB Rating: ${show["rating"]["average"]}</li>
                      <li class="list-group-item">Genre: ${show["genres"]}</li>
                      <li class="list-group-item">Language: ${show["language"]}</li>
                  </ul>
                  <div class="card-body">
                      <a href="${show["officialSite"]}" class="btn btn-primary">Go to website</a>
                      <a href="detail.html?id=${show["id"]}" class="btn btn-success">Go to detail</a>
                  </div>
              </div>
          </div>`;
      });

      updatePagination(page);
  }

  function updatePagination(page) {
      const totalPages = Math.ceil(shows.length / itemsPerPage);
      pagination.innerHTML = "";

      for (let i = 1; i <= totalPages; i++) {
          const button = document.createElement('button');
          button.textContent = i;
          button.className = (i === page) ? 'active' : '';
          button.addEventListener('click', () => displayData(i));
          pagination.appendChild(button);
      }
  }

  displayData(currentPage);
};

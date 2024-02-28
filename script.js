let form = document.querySelector("#searchMovie");
let input = document.querySelector("#textInput");
let alert_length = document.querySelector("#alert-length");
let alert_empty = document.querySelector("#alert-empty");
let parent = document.getElementById("main");
let pagination = document.getElementById("pagination");

async function GetShows() {
    let res = await fetch("https://api.tvmaze.com/shows");
    let data = await res.json();
    return data;
}

window.onload = async () => {
    let shows = await GetShows();
    let currentPage = 1;

    const itemsPerPage = 20;

    function displayData(page) {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const showsToShow = shows.slice(startIndex, endIndex);

        parent.innerHTML = "";

        showsToShow.forEach(show => {
            parent.innerHTML += `<div class="singleFilm col-3 mt-4">
                <div class="card" style="width: 17rem; height:700px">
                    <img class="card-img-top" src="${show["image"]["medium"]}" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">${show["name"]}</h5>
                        <p class="card-text">Premiere: ${show["premiered"]}</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">IMDB Rating: ${show["rating"]["average"]}</li>
                        <li class="list-group-item">Genre: ${show["genres"]["1"]}</li>
                        <li class="list-group-item">Language: ${show["language"]}</li>
                    </ul>
                    <div class="card-body">
                        <a href="${show["officialSite"]}" class="btn btn-primary" >Go to website</a>
                        <a href="detail.html?id=${show["id"]}" class="btn btn-success" >Go to detail</a>
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

form.addEventListener("submit", async function(event) {
    event.preventDefault();
    let length = input.value.trim().length;
    if (length === 0) {
        alert_empty.classList.remove("display-none");
    } else if (length < 3) {
        alert_length.classList.remove("display-none");
    } else {
        alert_length.classList.add("display-none");
        alert_empty.classList.add("display-none");

        let searchTerm = input.value.trim();
        try {
            let response = await fetch(`https://api.tvmaze.com/search/shows?q=${searchTerm}`);
            if (response.ok) {
                let data = await response.json();
                parent.innerHTML = ""; // Clear previous search results
                data.forEach(show => {
                    parent.innerHTML += `<div class="col-3 mt-4">
                        <div class="card" style="width: 17rem; height:700px">
                            <img class="card-img-top" src="${show["show"]["image"]["medium"]}" alt="Card image cap">
                            <div class="card-body">
                                <h5 class="card-title">${show["show"]["name"]}</h5>
                                <p class="card-text">Premiere: ${show["show"]["premiered"]}</p>
                            </div>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">IMDB Rating: ${show["show"]["rating"]["average"]}</li>
                                <li class="list-group-item">Genre: ${show["show"]["genres"]}</li>
                                <li class="list-group-item">Language: ${show["show"]["language"]}</li>
                            </ul>
                            <div class="card-body">
                                <a href="${show["show"]["officialSite"]}" class="btn btn-primary">Go to website</a>
                                <a href="detail.html?id=${show["show"]["id"]}" class="btn btn-success">Go to detail</a>
                            </div>
                        </div>
                    </div>`;
                });
            } else {
                console.error("API request failed");
            }
        } catch (err) {
            console.error("Error fetching data:", err);
        }
    }
});

input.addEventListener("input", function() {
    let length = input.value.trim().length;
    if (length === 0) {
        alert_empty.classList.remove("display-none");
        alert_length.classList.add("display-none");
    } else if (length < 3) {
        alert_length.classList.remove("display-none");
        alert_empty.classList.add("display-none");
    } else {
        alert_length.classList.add("display-none");
        alert_empty.classList.add("display-none");
    }
});

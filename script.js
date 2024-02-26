async function GetShows() {
    let res=await fetch("https://api.tvmaze.com/shows");
    let data=await res.json();
    return data;
}


window.onload=async()=>{
    let shows=await GetShows();
    let parent=document.getElementById("main")
    shows.forEach(show=> {
        parent.innerHTML+=`<div class="col-4 mt-4">
<div class="card" style="width: 17rem;">
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
      <a href="${show["image"]["original"]}" class="btn btn-success">Go to detail</a>

      

    </div>
</div>
</div>`
    });
}


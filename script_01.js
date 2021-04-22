const movieApikey = ""  // add your api key here

const fetching = () =>{
  let title = document.getElementById("search").value;
  return fetch(`http://www.omdbapi.com/?apikey=${movieApikey}&s=${title}`)
    .then((response) => response.json() )
  
}

async function showMovie(){
  
  let film = document.getElementById('main');
  let results = await fetching();
  let movies = results.Search;
  film.innerHTML = ""
  movies.forEach(movie =>
    film.innerHTML += 
    `     
    <div class="container-fluid" );' >
    <div class="row"> 
      <div class="col-5 mt-3">
          <div class="card" style="height: 245px">
              <div class="card-horizontal">
                <div class="img-square-wrapper">
                  <img class=" mt-1 mb-1 ml-1 " style="height:50%" src='${movie.Poster}' alt="Card image cap">
                </div>
        <div class="card-body">
          <h4 class="card-title">${movie.Title}</h4>
          <p> Date de sortie : ${movie.Year} </p>
        <button class="btn btn-primary" onclick="showPopup('${movie.imdbID}')"> Read More </button>
      </div>
    </div>
    `
  );
}

const fetchById = (id) =>{
  return fetch(`http://www.omdbapi.com/?i=${id}&apikey=${movieApikey}`)
    .then((response) => response.json() )
}

async function showPopup(id){
  
  let popUp = document.getElementById('popup');
  let movieById = await fetchById(id);
  let movie = movieById;
  popUp.innerHTML = ""
  
    popUp.innerHTML += 

    `  
        <div class="container-fluid">
          <div class="row">
            <div class="col-6 mt-3 mx-auto my-5 py-5">
                <div class="card" style="height: 460px">
                    <div class="card-horizontal">
                      <div class="img-square-wrapper">
                        <img class=" mt-1 mb-1 ml-1" style="" src='${movie.Poster}' alt="Card image cap">
                      </div>
              <div class="card-body">
                <h4 class="card-title">${movie.Title}</h4>
                <p> Date de sortie : ${movie.Released} </p>
                <p> Synopsis : ${movie.Plot} </p>
        </div>

      
    `
    document.getElementById("popup").style.display = "block";
    document.getElementById("popup").addEventListener("click", popOut)
}

function popOut(){
  document.getElementById("popup").style.display = "none";
  window.removeEventListener("mouseout", showPopup)
}

function pop(id){
  //document.getElementById(id).style.opacity= 100; // tried to implement Intersection Observer
}
//document.addEventListener("scroll", pop);
showMovie();
//setInterval(showMovie, 60 * 1000)

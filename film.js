let titleH1;
let producerSpan;
let directorSpan;
let relaseSpan;
let charactersDiv;
let planetsDiv;
const baseUrl = `http://localhost:9001/api`;

addEventListener('DOMContentLoaded', () => {
    titleH1 = document.querySelector("h1#title")
    producerSpan = document.querySelector("span#producer")
    directorSpan = document.querySelector("span#director")
    relaseSpan = document.querySelector("span#release_date")
    planetsUl = document.querySelector("#planets>ul")
    charactersUl = document.querySelector("#characters>ul")
    const sp = new URLSearchParams(window.location.search)
    const id = sp.get('id')
    getFilm(id)
  });

  async function getFilm(id) {
    let film;
    try {
        film = await fetchFilm(id)
        film.characters = await fetchCharacters(film)
        film.planets = await fetchPlanets(film)
    }
    catch (ex) {
        console.error(`Error reading film ${id} data.`, ex.message);
    }
    renderFilm(film)
  }

async function fetchFilm(id) {
    let filmUrl = `${baseUrl}/films/${id}`;
    return await fetch(filmUrl)
      .then(res => res.json())
}

async function fetchCharacters(film) {
    const url = `${baseUrl}/films/${film?.id}/characters`;
    const characters = await fetch(url)
      .then(res => res.json())
    return characters;
}


async function fetchPlanets(film) {
    const url = `${baseUrl}/films/${film?.id}/planets`;
    const planets = await fetch(url)
      .then(res => res.json())
    console.log(planets)
    return planets;
}

const renderFilm = film => {
    document.title = `SWAPI - ${film?.title}`;
    titleH1.textContent = film?.title;
    producerSpan.textContent = film?.producer;
    directorSpan.textContent = film?.director;
    relaseSpan.textContent = film?.release_date;
    const planetLis = film?.planets?.map(planet => `<li><a href="/planet.html?id=${planet.id}">${planet.name}</li>`)
    planetsUl.innerHTML = planetLis.join("");
    const characterLis = film?.characters?.map(character =>  `<li><a href="/character.html?id=${character.id}">${character.name}</li>`)
    charactersUl.innerHTML = characterLis.join("");
}
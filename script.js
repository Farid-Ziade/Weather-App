"use strict";


let place;
let p = document.createElement("p");
p.className = "invalid";
let search = document.querySelector(".search");
let input = document.querySelector(".input");
let container = document.querySelector(".container");
async function getCoordinates(place) {
  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${place}&count=1&language=en&format=json`,
    );
    const data = await response.json();
    if (!data.results) {
      p.textContent = "Please type a valid City or check your spelling";
      container.appendChild(p);
    } else {
      p.remove();
      console.log(data);
    }
  } catch (error) {
    console.error("failed to load data", error);
  }
}

search.addEventListener("click", () => {
  place = input.value;
  getCoordinates(place);
  input.value = "";
});

// async function getTemp(Long, lat) {
//   fetch(
//     "https://api.open-meteo.com/v1/forecast?latitude=33.945&longitude=35.5953&current=temperature_2m",
//   )
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (response) {
//       console.log(response.current.temperature_2m);
//     });
// }

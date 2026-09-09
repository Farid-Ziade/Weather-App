"use strict";
let divLoader = document.createElement("div");
divLoader.className = "loader";

let p = document.createElement("p");
p.className = "invalid";

let cardDiv = document.createElement("div");
cardDiv.className = "cardDiv";
let header = document.createElement("h3");
let search = document.querySelector(".search");
let input = document.querySelector(".input");
let container = document.querySelector(".container");
let paragraph = document.querySelector(".paragraph");

let date = new Date();
const options = { weekday: "long", day: "numeric", month: "long" };
const formattedDate = date.toLocaleDateString("en-GB", options);

let todayParagraph = document.createElement("p");
todayParagraph.className = "today-p";

let place;
let lat;
let long;
let countryName;
let admin;
let temp = document.createElement("h3");
let sunny = document.createElement("div");
sunny.className = "sunny";
let cloud = document.createElement("div");
cloud.className = "cloud";
let rain = document.createElement("div");
rain.className = "rain";
let snow = document.createElement("div");
snow.className = "snow";
let thunderstorm = document.createElement("div");
thunderstorm.className = "thunderstorm";
let weatherTempContainer = document.createElement("div");
weatherTempContainer.className = "weather-container";

let extraContainer = document.createElement("div");
extraContainer.className = "extraContainer";
let high = document.createElement("div");
high.className = "high";
let highP = document.createElement("p");
highP.className = "extraP";
let highH = document.createElement("h4");
let lowL = document.createElement("h4");
lowL.className = "lowl";
let dash = document.createElement("h4");
dash.textContent = "/";
let h4Container = document.createElement("div");
h4Container.className = "h4-container";
h4Container.appendChild(highH);
h4Container.appendChild(dash);
h4Container.appendChild(lowL);

highP.textContent = `High / Low`;
high.appendChild(highP);
//////////////////////////////
let humidity = document.createElement("div");
humidity.className = "humidity";
let humidityP = document.createElement("p");
humidityP.className = "extraP";
humidityP.textContent = "humidity";
humidity.appendChild(humidityP);
let dataDiv = document.createElement("div");
dataDiv.className = "h4-container";
let dataP = document.createElement("h4");
dataDiv.appendChild(dataP);
//////////////////////////////
let wind = document.createElement("div");
wind.className = "wind ";
let windP = document.createElement("p");
windP.className = "extraP";
windP.textContent = "wind";
wind.appendChild(windP);
let windDiv = document.createElement("div");
windDiv.className = "h4-container";
let windh4 = document.createElement("h4");
windDiv.appendChild(windh4);
extraContainer.appendChild(high);
extraContainer.appendChild(humidity);
extraContainer.appendChild(wind);

async function getCoordinates(place) {
  container.appendChild(divLoader);

  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${place}&count=1&language=en&format=json`,
    );

    const data = await response.json();

    if (!data.results) {
      p.textContent = "Please type a valid City or check your spelling";
      container.appendChild(p);
      lat = undefined;
      long = undefined;
    } else {
      console.log(data.results[0]);
      lat = data.results[0].latitude;
      long = data.results[0].longitude;
      admin = data.results[0].country;
      countryName = data.results[0].name;
    }
  } catch (error) {
    divLoader.remove();
    p.textContent = "failed to load data, please try again";
    container.appendChild(p);
  }
}

async function getTemp(lat, long) {
  divLoader.remove();
  paragraph.remove();
  if (lat && long) {
    try {
      let response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=temperature_2m_max,temperature_2m_min&current=temperature_2m,wind_speed_10m,relative_humidity_2m,weather_code&timezone=auto&forecast_days=1`,
      );
      let data = await response.json();
      console.log(data);
      if (admin) {
        header.textContent = `${countryName}, ${admin}`;
      } else {
        header.textContent = `${countryName}`;
      }
      todayParagraph.textContent = formattedDate;
      sunny.remove();
      cloud.remove();
      rain.remove();
      snow.remove();
      thunderstorm.remove();
      switch (data.current.weather_code) {
        case 0:
          // sunny
          //bg color
          temp.textContent = `${Math.round(data.current.temperature_2m)}°`;
          weatherTempContainer.appendChild(sunny);
          weatherTempContainer.appendChild(temp);
          break;
        case 1:
        case 2:
        case 3:
        case 45:
        case 48:
          //bg color

          temp.textContent = `${Math.round(data.current.temperature_2m)}°`;
          weatherTempContainer.appendChild(cloud);
          weatherTempContainer.appendChild(temp);
          break;
        case 51:
        case 53:
        case 55:
        case 61:
        case 63:
        case 65:
        case 80:
        case 81:
        case 82:
          //bg color
          temp.textContent = `${Math.round(data.current.temperature_2m)}°`;
          weatherTempContainer.appendChild(rain);
          weatherTempContainer.appendChild(temp);
          break;
        case 56:
        case 57:
        case 66:
        case 67:
        case 71:
        case 73:
        case 75:
        case 77:
        case 85:
        case 86:
          //bg color

          temp.textContent = `${Math.round(data.current.temperature_2m)}°`;
          weatherTempContainer.appendChild(snow);
          weatherTempContainer.appendChild(temp);
          break;
        case 95:
        case 96:
        case 99:
          //bg color

          temp.textContent = `${Math.round(data.current.temperature_2m)}°`;
          weatherTempContainer.appendChild(thunderstorm);
          weatherTempContainer.appendChild(temp);
          break;
        default:
          temp.textContent = `${Math.round(data.current.temperature_2m)}°`;
      }
      highH.textContent = `${Math.round(data.daily.temperature_2m_max)}°`;
      lowL.textContent = ` ${Math.round(data.daily.temperature_2m_min)}°`;
      dataP.textContent = `${data.current.relative_humidity_2m} ${
        data.current_units.relative_humidity_2m
      }`;
      windh4.textContent = `${data.current.wind_speed_10m} ${
        data.current_units.wind_speed_10m
      }`;
      high.appendChild(h4Container);
      humidity.appendChild(dataDiv);
      wind.appendChild(windDiv);
      cardDiv.appendChild(header);
      cardDiv.appendChild(todayParagraph);
      cardDiv.appendChild(weatherTempContainer);
      cardDiv.appendChild(extraContainer);
      container.appendChild(cardDiv);
    } catch (error) {
      divLoader.remove();
      p.textContent = "failed to load temp, please try again";
      container.appendChild(p);
    }
  }
}

search.addEventListener("click", async () => {
  cardDiv.remove();
  p.remove();
  place = input.value;
  await getCoordinates(place);
  await getTemp(lat, long);
  input.value = "";
});
input.addEventListener("keypress", async (event) => {
  if (event.key === "Enter") {
    cardDiv.remove();
    p.remove();
    place = input.value;
    await getCoordinates(place);
    await getTemp(lat, long);
    input.value = "";
  }
});
window.addEventListener("keydown", () => {
  input.focus();
});

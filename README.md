# Weather App

A simple, responsive weather-checker built with vanilla HTML, CSS, and JavaScript, as a solution to [The Odin Project's Weather App](https://www.theodinproject.com/lessons/node-path-javascript-weather-app) assignment.

Search any city and get its current conditions: temperature, a weather icon, high/low, humidity, and wind speed — with a °C/°F toggle and no frameworks or build step involved.

## Features

- **City search** — type a city and hit Enter or click Search.
- **Current conditions** — temperature, high/low for the day, humidity, and wind speed.
- **Weather icon** — a simple CSS-drawn icon (sun, cloud, rain, snow, thunderstorm) based on the returned weather code.
- **°C / °F toggle** — switch units without re-searching.
- **Loading state** — a spinner shows from the moment you search until data comes back.
- **Invalid input handling** — an inline message if the city can't be found or the request fails.
- **Responsive layout** — usable from small phones up through desktop, via CSS media queries.

## Tech

- Plain HTML / CSS / JavaScript — no frameworks, no bundler.
- [Open-Meteo](https://open-meteo.com/) APIs:
  - Geocoding API — turns a city name into coordinates.
  - Forecast API — fetches current and daily weather for those coordinates.

## Project structure

```
index.html     # markup
style.css      # styling, including responsive media queries
script.js      # search, API calls, DOM rendering
```

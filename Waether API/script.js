'use strict';

const Submit = document.querySelector('.submit');
const City = document.getElementById('city');
const cityName = document.querySelector('.cityname');
const temp = document.querySelector('.temp');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');
const icon = document.querySelector('.icon');
const weatherCondition = document.querySelector('.weather-condition');

const apiKey = `6ddad7c030555ad9afab13261f0ac763`;

const getData = async (city) => {
  if (!city) {
    alert('Please enter a city name');
    return;
  }

  const myAPI = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  try {
    const res = await fetch(myAPI);
    if (!res.ok) {
      throw new Error('City not found');
    }
    const data = await res.json();
    console.log(data);

    cityName.innerHTML = data.name;
    temp.innerHTML = `${data.main.temp} °C`;
    humidity.innerHTML = `Humidity: ${data.main.humidity}%`;
    wind.innerHTML = `Wind: ${data.wind.speed} m/s`;
    weatherCondition.innerHTML = data.weather[0].main;
    icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    icon.alt = data.weather[0].description;

  } catch (err) {
    alert('City not found. Please try again.');
    console.error(err);
  }
};

document.getElementById('weather-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const city = City.value.trim();
  getData(city);
});

getData("lagos");
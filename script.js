const searchbar = document.querySelector(".search");
const submitBtn = document.querySelector(".search-button");
const parentContainer = document.querySelector(".container");

submitBtn.addEventListener("click", (e) => {
  getCondition(searchbar.value);
  searchbar.value = "";
});

async function getCondition(location) {
  const key = "03a312df56c6ea172c35ee97622df898";
  let api = `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${key}`;

  fetch(api)
    .then((weather) => {
      return weather.json();
    })
    .then(displayCondition)
    .catch((err) => {
      console.log(err);
      alert("Please enter a correct city or country!");
    });
}

function displayCondition(weather) {
  let presentDay = new Date();
  const iconLink = "http://openweathermap.org/img/w/";

  let weatherResult = `
  <main class="weather-result">
    <section class="location-date">
      <div class="city">${weather.name}, ${weather.sys.country}</div>
      <div class="date">${getDate(presentDay)}</div>
    </section>
    <div class="temp-details">
      <div class="temp-icon">
      <img src="${iconLink}${weather.weather[0].icon}.png" />
      </div>
      <div class="temperature">
      ${Math.round(weather.main.temp)}<span class="temp-symbol">&deg;c</span>
      </div>
      <div class="condition">${weather.weather[0].main}</div>

      <div class="temp-degree">
        <div class="subdegree">
          <p>Low</p>
          <p>High</p>
        </div>
      
        ${Math.round(weather.main.temp_min)}&deg;c / ${Math.round(
    weather.main.temp_max
  )}&deg;c
      </div>
    </div>
    </main>
  `;

  const container = document.querySelector(".weather-result");

  if (container) {
    container.remove();
    parentContainer.insertAdjacentHTML("beforeend", weatherResult);
  } else {
    parentContainer.insertAdjacentHTML("beforeend", weatherResult);
  }
}

function getDate(now) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let day = days[now.getDay()];
  let date = now.getDate();
  let month = months[now.getMonth()];
  let year = now.getFullYear();

  return `${day}, ${date} ${month} ${year} `;
}

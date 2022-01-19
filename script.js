const searchbar = document.querySelector(".search");
const submitBtn = document.querySelector(".search-button");
submitBtn.addEventListener("click", setLocation);

function setLocation() {
  getCondition(searchbar.value);
  document.querySelector("main").style.display = "block";
}
async function getCondition(location) {
  const key = "03a312df56c6ea172c35ee97622df898";
  let api = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${key}`;

  fetch(api)
    .then((weather) => {
      return weather.json();
    })
    .then(displayCondition);
  // .catch((err) => {
  //   alert("wrong city!");
  // });
}

function displayCondition(weather) {
  let presentDay = new Date();

  const weatherResult = `
    <section class="location-date">
      <div class="city">${weather.name}, ${weather.sys.country}</div>
      <div class="date">${getDate(presentDay)}</div>
    </section>
    <div class="temp-details">
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
  `;
  document.querySelector("main").innerHTML += weatherResult;
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

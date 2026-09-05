const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container");

const grantAccessContainer = document.querySelector(
  ".grant-location-container",
);
const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");

let oldTab = userTab;
oldTab.classList.add("current-tab");
const API_KEY = "a9888a55664d7519c5f069b8a49f3967";

function renderWeatherinfo(data) {
  let newpara = document.createElement("p");
  newpara.textContent = `${data?.main?.temp.toFixed(2)} °C`;
  document.body.appendChild(newpara);
}

async function FetchWeatherDetails() {
  try {
    const lati = 17.333;
    const lon = 74.0833;

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${lon}&appid=${API_KEY}`,
    );
    const data = await response.json();
    console.log("Weather data : ->", data);
    renderWeatherinfo(data);
  } catch (err) {
    console.log("Error found -> ", err);
  }
}
function switchTab(clickedTab) {
  apiErrorContainer.classList.remove("active");
  if (clickedTab != currentTab) {
    currentTab.classList.remove("current-tab");
    currentTab = clickedTab;
    currentTab.classList.add("current-tab");
    if (!searchForm.classList.contains("active")) {
      userInfoContainer.classList.remove("active");
      grantAccessContainer.classList.remove("active");
      searchForm.classList.add("active");
    } else {
      searchForm.classList.remove("active");
      userInfoContainer.classList.remove("active");
      getFromSessionStorage();
    }
  }
}

function showPosition(position) {
  const userCoordinates = {
    lat: position.coords.latitude,
    lon: position.coords.longitude,
  };

  sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
  fetchUserWeatherInfo(userCoordinates);
}

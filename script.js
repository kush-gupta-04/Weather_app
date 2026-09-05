const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container");
const grantAccessContainer = document.querySelector(
  ".grant-location-container",
);
const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");

let currentTab = userTab;
currentTab.classList.add("current-tab");
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
      //kya search form wala container is invisible, if yes then make it visible
      userInfoContainer.classList.remove("active");
      grantAccessContainer.classList.remove("active");
      searchForm.classList.add("active");
    } else {
      //main pehle search wale tab pr tha, ab your weather tab visible karna h
      searchForm.classList.remove("active");
      userInfoContainer.classList.remove("active");
      //ab main your weather tab me aagya hu, toh weather bhi display karna poadega, so let's check local storage first
      //for coordinates, if we haved saved them there.
      getFromSessionStorage();
    }
  }
}

userTab.addEventListener("click", () => {
  //pass clicked tab as input paramter
  switchTab(userTab);
});

searchTab.addEventListener("click", () => {
  //pass clicked tab as input paramter
  switchTab(searchTab);
});

//check if cordinates are already present in session storage
function getfromSessionStorage() {
  const localCoordinates = sessionStorage.getItem("user-coordinates");
  if (!localCoordinates) {
    //agar local coordinates nahi mile
    grantAccessContainer.classList.add("active");
  } else {
    const coordinates = JSON.parse(localCoordinates);
    fetchUserWeatherInfo(coordinates);
  }
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    //HW - show an alert for no gelolocation support available
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

async function fetchUserWeatherInfo(coordinates) {
  const { lat, lon } = coordinates;
  // make grantcontainer invisible
  grantAccessContainer.classList.remove("active");
  //make loader visible
  loadingScreen.classList.add("active");

  //API CALL
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
    );
    const data = await response.json();

    loadingScreen.classList.remove("active");
    userInfoContainer.classList.add("active");
    renderWeatherInfo(data);
  } catch (err) {
    loadingScreen.classList.remove("active");
    //HW
  }
}

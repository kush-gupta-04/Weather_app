console.log("HElloooo JIIII");
const API_KEY = "a9888a55664d7519c5f069b8a49f3967";

function renderWeatherinfo(data) {
    let newpara = document.createElement('p');
    newpara.textContent = `${data?.main?.temp.toFixed(2)} °C`
    document.body.appendChild(newpara);
}

async function FetchWeatherDetails() {
    try {
        const lati = 17.333;
        const lon = 74.0833;

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${lon}&appid=${API_KEY}`);
        const data = await response.json();
        console.log("Weather data : ->", data);
        renderWeatherinfo(data);
    }
    catch (err) {
        console.log('Error found -> ', err);
    }

}
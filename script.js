function fetchWeather(city) {
    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    const cityPattern = /^[a-zA-Z\s]+$/;
    if (!cityPattern.test(city)) {
        alert("City name should only contain letters and spaces.");
        return;
    }

    const link = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=55ad1891dea89fde59534f98efb5a8cd`;

    var request = new XMLHttpRequest();
    request.open('GET', link, true);
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            var obj = JSON.parse(this.response);
            document.getElementById('weather').innerHTML = "Overview: " + obj.weather[0].description;
            document.getElementById('location').innerHTML = obj.name;
            document.getElementById('temp').innerHTML = Math.round(obj.main.temp - 273.15);
            document.getElementById('wind').innerHTML = "Wind speed: " + obj.wind.speed;
            document.getElementById('humidity').innerHTML = "Humidity: " + obj.main.humidity;
            document.getElementById('icon').src = "https://openweathermap.org/img/w/" + obj.weather[0].icon + ".png";
        } else {
            alert("City not found. Please enter a valid city name.");
        }
    };
    request.onerror = function () {
        alert("Network error. Please try again later.");
    };
    request.send();
}

function reset () {
    document.getElementById('weather').innerHTML = "";
    document.getElementById('location').innerHTML = "";
    document.getElementById('temp').innerHTML = "";
    document.getElementById('wind').innerHTML = "";
    document.getElementById('humidity').innerHTML = "";
    document.getElementById('icon').src = "";
}

// 🔘 Show button: fetch with input city
document.getElementById("show").addEventListener("click", function () {
    const city = document.querySelector(".search input").value.trim();
    fetchWeather(city);
});

// 🔄 Reload button: fetch again using the last shown city
document.getElementById("reload").addEventListener("click", function () {
    const reloadBtn = this;
    const lastCity = document.getElementById("location").innerText; 

    if (lastCity) {
        // add spin class
        reloadBtn.classList.add("spin");
        reset()
        // remove after animation finishes
        reloadBtn.addEventListener("animationend", () => {
            reloadBtn.classList.remove("spin");
        }, { once: true });

        fetchWeather(lastCity);
    } else {
        alert("No city loaded yet. Please search first.");
    }
});

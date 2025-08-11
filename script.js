document.getElementById("show").addEventListener("click", function () {
    const cityInput = document.querySelector(".search input");
    const city = cityInput.value.trim();

    // 1️⃣ Check if empty
    if (!city) {
        alert("Please enter a city name.");
        cityInput.focus();
        return;
    }

    // 2️⃣ Optional: Prevent numbers/special chars in city name
    const cityPattern = /^[a-zA-Z\s]+$/;
    if (!cityPattern.test(city)) {
        alert("City name should only contain letters and spaces.");
        cityInput.focus();
        return;
    }

    const link = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=55ad1891dea89fde59534f98efb5a8cd`;

    var request = new XMLHttpRequest();
    request.open('GET', link, true);
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            var obj = JSON.parse(this.response);
            console.log(obj);
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
});

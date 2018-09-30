//UI Elements module
//This module will be responsible for controlling elements like the menu

const UI = (function () {

    let menu = document.querySelector("#menu-container");

    const showApp = () => {
        document.querySelector("#app-loader")
        .classList.add('display-none');
        document.querySelector("main").removeAttribute
        ('hidden');
    };

    const loadApp = () => {
        document.querySelector("#app-loader")
        .classList.remove('display-none');
        document.querySelector("main").setAttribute
        ('hidden', 'true');
    };

    const _showMenu = () => menu.style.right = 0;

    const _hideMenu = () => menu.style.right = '-65%';

    const _toggleHourlyWeather = () => {
        let hourlyWeather = document.querySelector("#hourly-weather-wrapper"),
            arrow = document.querySelector("#toggle-hourly-weather").children[0],
            visible = hourlyWeather.getAttribute('visible'),
            dailyWeather = document.querySelector("#daily-weather-wrapper");

            if(visible == 'false'){
                hourlyWeather.setAttribute('visible', 'true');
                hourlyWeather.style.bottom = 0;
                arrow.style.transform = "rotate(180deg)";
                dailyWeather.style.opacity = 0;
            } else if (visible == 'true') {
                hourlyWeather.setAttribute('visible', 'false');
                hourlyWeather.style.bottom = '-100%';
                arrow.style.transform = "rotate(0deg)";
                dailyWeather.style.opacity = 1;
            } else console.error("Uknown state of the hourly weather panel and visible attribute.");
    };

    const drawWeatherData = (data, location) => {
        console.log(data)
        console.log(location)

        let currentlyData = data.currently;

        //Set current Weather
        //====================
        //Set current function

        document.querySelectorAll(".location-label").forEach( (e) => {
            e.innerHTML = location;
        });

        //Set the background image
        document.querySelector('main').style.backgroundImage = `url("./assets/images/bg-images/${currentlyData.icon}.jpg")`;
        //Set the icon
        document.querySelector("#summary-label").innerHTML = currentlyData.summary;
        //Set temperature from fahrenheit to celcius
        document.querySelector("#degrees-label").innerHTML = Math.round((
            currentlyData.temperature - 32) * 5/9) + '&#176;'
        
        //Set humidity
        document.querySelector("#humidity-label").innerHTML = Math.round(
            currentlyData.humidity * 100) + '%';        
        //Set windspeed
        document.querySelector("#wind-speed-label").innerHTML = 
            (currentlyData.windSpeed * 1.6093).toFixed(1) + 'kph';  

        UI.showApp();
    }    

    //menu events
    document.querySelector("#open-menu-btn").addEventListener('click', _showMenu);
    document.querySelector("#close-menu-btn").addEventListener('click', _hideMenu);

    //hourly-weather wrapper event
    document.querySelector("#toggle-hourly-weather").addEventListener('click', _toggleHourlyWeather);

    //export
    return{
        showApp,
        loadApp,
        drawWeatherData
    }

})();

//Get location Module
//This module will be responsible for getting the data about the location to search for weather

const GETLOCATION = (function () {

    let location;

    const locationInput = document.querySelector("#location-input"),
        addCityBtn = document.querySelector("#add-city-btn");

    const _addCity = () => {
        location = locationInput.value;
        locationInput.value = "";
        addCityBtn.setAttribute('disabled', 'true');
        addCityBtn.classList.add('disabled');
        
        //Get Weather Data
        WEATHER.getWeather(location)
    }

    locationInput.addEventListener('input', function(){
        let inputText = this.value.trim();

        if(inputText != ''){
            addCityBtn.removeAttribute('disabled');
            addCityBtn.classList.remove('disabled');
        } else {
            addCityBtn.setAttribute('disabled', 'true');
            addCityBtn.classList.add('disabled');
        }
    })

    addCityBtn.addEventListener('click', _addCity);
})();

//Get weather data
//This module will acquire weather data and then it will pass to another module which will put the data on UI
const WEATHER = (function () {
    const darkSkyKey = 'ee326c82308661699eff51c8b66f75d3',
    geocoderKey = '6603bc581c2c47f2b18833e23cf051ee';

    const _getGeocodeURL = (location) => `https://api.opencagedata.com/geocode/v1/json?q=${location}&key=${geocoderKey}`;

    const _getDarkSkyURL = (lat, lng) => `http://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${darkSkyKey}/${lat},${lng}`;

    const _getDarkSkyData = (url, location) => {
        axios.get(url)
        .then( (res) => {
            console.log(res);
            UI.drawWeatherData(res.data, location)
        })
        .catch( (err) => {
            console.error(err);
        });
    };

    const getWeather = (location) => {
        UI.loadApp();

        let geocodeURL = _getGeocodeURL(location);

        axios.get(geocodeURL)
            .then( (res) => {
                let lat = res.data.results[0].geometry.lat,
                lng = res.data.results[0].geometry.lng;

                let darkSkyURL = _getDarkSkyURL(lat, lng);

                _getDarkSkyData(darkSkyURL, location);
            })
            .catch( (err) => {
                console.log(err)
            })
    };

    return {
        getWeather
    }
})();

//Init

window.onload = function () { //determines when the page has loaded
    UI.showApp();
}
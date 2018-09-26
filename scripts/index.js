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

    //menu events
    document.querySelector("#open-menu-btn").addEventListener('click', _showMenu);
    document.querySelector("#close-menu-btn").addEventListener('click', _hideMenu);

    //hourly-weather wrapper event
    document.querySelector("#toggle-hourly-weather").addEventListener('click', _toggleHourlyWeather);

    //export
    return{
        showApp,
        loadApp
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

        console.log("Get weather data for", location)
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

    const _getGeocodeURL = (location) => 'https://api.opencagedata.com/geocode/v1/json?q=${location}&key=${geocoderKey}'

    const _getDarkSkyURL = (lat, lng) => 'https://api.darksky.net/forecast/${darkSkyKey}/${lat},${lng}';
})();

//Init

window.onload = function () { //determines when the page has loaded
    UI.showApp();
}
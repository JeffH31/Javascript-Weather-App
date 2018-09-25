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

    document.querySelector("#open-menu-btn").addEventListener('click', _showMenu);

    document.querySelector("#close-menu-btn").addEventListener('click', _hideMenu);

    return{
        showApp,
        loadApp
    }

})();

//Init

window.onload = function () { //determines when the page has loaded
    UI.showApp();
}
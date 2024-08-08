import getWeather from "./data/weather";
import DOM from "./util/dom";

import './styles/modern-normalize.css'
import './styles/fonts.css'
import './styles/style.css'

let inputField = document.querySelector("input");
let contentDiv = document.querySelector(".content");
let tempFahrenheitRadio = document.querySelector("#temp_f")
document.querySelector(".submit-btn").addEventListener("click", async (e) => {
    e.preventDefault();
    let location = inputField.value;
    if (location === "" || location === null || location === undefined) {
        return;
    }

    let isFahrenheit = true;
    if (!tempFahrenheitRadio.checked) {
        isFahrenheit = false;
    }

    let days = await getWeather(location);
    if (days === null) {
        return;
    }

    console.log(days);

    contentDiv.innerHTML = "";
    days.forEach((day, index) => {
        let cardElement = document.createElement("div");
        let cardHeaderElement = document.createElement("div");
        let cardMainElement = document.createElement("div");
        let cardFooterElement = document.createElement("div");
        let iconElement = document.createElement("img");
        let tempElement = document.createElement("p");
        let windSpeedElement = document.createElement("p");
        let descriptionElement = document.createElement("p");
        let dateTimeElement = document.createElement("p");

        iconElement.src = day.iconURL;
        tempElement.innerText = (isFahrenheit) ? `Temp: ${day.tempFahrenheit} °F` : `Temp: ${day.tempCelesius} °C`;
        windSpeedElement.innerText = `WindSpeed: ${day.windSpeed}`;
        descriptionElement.innerText = `Description: ${day.description}`;
        dateTimeElement.innerText = (index === 0) ? `Date: Today` : `Date: ${day.dateTime}`;

        cardElement.classList.add("card");
        cardHeaderElement.classList.add("card-header");
        cardMainElement.classList.add("card-main");
        cardFooterElement.classList.add("card-footer");

        cardHeaderElement.append(tempElement, dateTimeElement);
        cardMainElement.append(iconElement);
        cardFooterElement.append(descriptionElement, windSpeedElement);

        cardElement.append(cardHeaderElement, cardMainElement, cardFooterElement);

        contentDiv.append(cardElement);
    })
})
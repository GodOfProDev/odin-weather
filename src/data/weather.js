class WeatherData {
    constructor(iconName, dateTime, description, tempFahrenheit, windSpeed) {
        this.iconURL = `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/1st%20Set%20-%20Color/${iconName}.png`;
        this.dateTime = dateTime;
        this.description = description;
        this.tempFahrenheit = (tempFahrenheit).toFixed(2);
        this.tempCelesius = ((5/9) * (tempFahrenheit - 32)).toFixed(2);
        this.windSpeed = (windSpeed).toFixed(2);
    }
}

export default async function getWeather(location) {
   try {
       let response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=AYXXCY999QGTZNWMMDFN8YMJK`, {mode: "cors"});
       let data = await response.json();

        let daysJSON = data["days"];
        let daysData = [];
       for (let i = 0; i < 5; i++) {
           let day = daysJSON[i];
           daysData[i] = new WeatherData(
               day["icon"],
               day["datetime"],
               day["description"],
               day["temp"],
               day["windspeed"]
           )
       }

       return daysData;
   } catch (e) {
       alert("There was an issue obtaining data");
       console.log(e);
       return null;
   }
}
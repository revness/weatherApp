const getWeatherData = async (city) => {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=G6X8K9X9RN7G2ASFEEC32D95A&contentType=json`
    );
    const data = await response.json();
    console.log(data);
    const weatherDiv = document.getElementById("weatherData");
    weatherDiv.innerHTML = "";
    const h2 = document.createElement("h2");
    h2.innerText = data.resolvedAddress;
    weatherDiv.appendChild(h2);
    const table = document.createElement("table");
    table.innerHTML = `<tr>
<th>Date</th>
<th>Temperature</th>
<th>Wind Speed</th>
<th>Wind Direction</th>
<th>Humidity</th>
<th>Conditions</th>
</tr>`;
    data.days.forEach((day) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${day.datetime}</td>
    <td>${day.tempmax + " C"} </td>

    <td>${day.windspeed}</td>
    <td>${day.winddir}</td>
    <td>${day.humidity}</td>
    <td>${day.conditions}</td>`;
      table.appendChild(tr);
    });
    weatherDiv.appendChild(table);

    const p = document.createElement("p");
    let maxTemp = 0;
    let maxTempDate = "";
    data.days.forEach((day) => {
      if (day.tempmax > maxTemp) {
        maxTemp = day.tempmax;
        maxTempDate = day.datetime;
      }
    });
    p.innerText = `The maximum temperature is ${maxTemp} on ${maxTempDate}`;
    weatherDiv.appendChild(p);
  } catch (err) {
    console.log(err);
  }
};

const setUpPage = () => {
  getWeatherData("sydney");
  const appDiv = document.getElementById("main");
  appDiv.innerHTML = `<h1>Weather App</h1>`;
  const input = document.createElement("input");
  input.type = "text";
  input.id = "city";
  appDiv.appendChild(input);
  const button = document.createElement("button");
  button.innerText = "Get Weather";
  button.onclick = () => {
    const city = document.getElementById("city").value;
    getWeatherData(city);
  };
  appDiv.appendChild(button);
};

setUpPage();

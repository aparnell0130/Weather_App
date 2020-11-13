# Weather_App

## Description

This application will allow you to search the weather for over 200,000 cities. You will get the current weather and a five day forecast. 
#### The current weather information will include:
- Current date with an icon representation of the weather conditions
- Current temperature
- Wind speed
- UV index with a background color for based on UV conditions
#### The five day forecast information will include:
- 5 sections each having:
    - Date
    - Weather icon
    - Temperature
    - Humidity
### Instructions
1. Enter a city in the search and click the search button.
    - Once you click the search button you will be presented with the current weather and 5 day forecast.
2. Each city you enter will appear in a search history list. Click any city to see it's current weather and five day forecast
    - Once the city list reaches 10 cities the oldest city searched will be removed and the newest city will appear
3. Each time you refresh/reload the page, the current weather and five day forecast for the last city searched will appear.



### Tools/Technologies
- JavaScript
- HTML
- CSS

### API calls
```JS
var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + citySearch + '&appid=' + APIKey;
    // api call
    $.ajax({
        url: queryURL,
        method: 'GET'
        // after response function
    }).then(function (response) {
        // get latitude and longitude from city name to set in url for second api call
        var lat = response.coord.lat
        var lon = response.coord.lon
        var queryURL2 = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=hourly,minutely&appid=' + APIKey

```
## Live game link
- [Weather App](https://aparnell0130.github.io/Weather_App/)

![ALT Text](assets/images/weather.gif)

## License
- MIT License

Copyright (c) [2020] [Aaron Parnell]

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. 

## Author Info
- Linkedin - [Aaron Parnell](https://www.linkedin.com/in/aaron-parnell-1ab4661b3/)
- Github - [aparnell0130](https://github.com/aparnell0130)

[Back to top](#Weather_App)
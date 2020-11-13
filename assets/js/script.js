// local storage array for city list
var cityArray = JSON.parse(localStorage.getItem('cityArray')) || []

// click function for city search
$('#searchBtn').click(function () {
    citySearch = $('#citySearch').val()
    // if the value is empty return 
    if (citySearch == '') {
        return
    }
    // otherwise store selected city
    else {
        localStorage.setItem('city', citySearch)
    }
    // run these functions when the search button is clicked 
    setCity()
    cityList()
    createCityList()
})

// function to create city list
function createCityList() {
    var cityUl = $('#cityList')
    cityUl.empty()
    for (var i = 0; i < cityArray.length; i++) {
        var city = cityArray[i];
        var liEl = $('<li>').text(city).addClass('list-group-item li-hover border rounded').attr('id', city)
        cityUl.prepend(liEl)
    }
}
createCityList()

// click function for city list
$('#cityList').on('click', '.list-group-item', function () {
    citySearch = $(this).attr('id')
    localStorage.setItem('city', citySearch)
    setCity()
})

// function to create array for city list
function cityList() {
    // if the city does not already exist in the array push it to array
    if (!(cityArray.includes(localStorage.getItem('city')))) {
        cityArray.push(localStorage.getItem('city'))
    }
    // if array is greater than 10 remove the first index
    if (cityArray.length > 10) {
        cityArray.splice(cityArray[0], 1)
    }
    // store array
    localStorage.setItem('cityArray', JSON.stringify(cityArray))
}

// function to create weather display
function setCity() {
    // get city from local storage and put in api url search parameter
    var citySearch = localStorage.getItem('city')
    var APIKey = '0af4143c0ff70e72a85f52f2443a7b6a';
    // api url
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
        $.ajax({
            url: queryURL2,
            method: 'GET'
        }).then(function (response2) { // create current weather content
            // add border for current weather
            $('#currentWeather').addClass('border rounded mb-3')
            // format date
            var dateString = moment(response2.current.dt * 1000).format('M/DD/YYYY')
            // change temp from kelvin to fahrenheit
            var temp = ((response2.current.temp - 273.15) * 9 / 5 + 32).toFixed(0)
            // create icon
            var iconCode = response2.current.weather[0].icon
            var iconUrl = 'http://openweathermap.org/img/wn/' + iconCode + '.png';
            var iconImg = $('<img>')
            iconImg.attr('src', iconUrl)
            // create city heading content
            var city = $('#city').text(response.name + ' ' + dateString).addClass('card-header').css('backgroundColor', 'lightslategray')
            city.append(iconImg)
            // set temp, humidity and wind speed 
            $('#mainTemp').text('Temperature: ' + temp + ' °F')
            $('#mainHumidity').text('Humidity: ' + response2.current.humidity + '%')
            $('#windSpeed').text('Wind Speed: ' + response2.current.wind_speed)
            // create uv index
            var uvi = response2.current.uvi
            var uvSpan = $('<span>').text(uvi)
            uvSpan.css({ 'width': '30px', 'padding': '2px', 'border-radius': '5px', 'color': 'white' })
            var uviIndex = $('#uvIndex').text('UV Index: ')
            uviIndex.append(uvSpan)
            uviColor()
            // function to set background color based on uv index range
            function uviColor() {
                if (uvi >= 11) {
                    uvSpan.css({ 'backgroundColor': 'plum' })
                }
                else if (uvi < 11 && uvi >= 8) {
                    uvSpan.css({ 'backgroundColor': 'red' })
                }
                else if (uvi < 8 && uvi >= 6) {
                    uvSpan.css({ 'backgroundColor': 'orange' })
                }
                else if (uvi < 6 && uvi >= 3) {
                    uvSpan.css({ 'backgroundColor': 'yellow', 'color': 'black' })
                }
                else {
                    uvSpan.css({ 'backgroundColor': 'green' })
                }
            }
            // five day forecast array
            var forecast = response2.daily
            fiveDay(forecast)
        })
    });

    // function to create five day forecast
    function fiveDay(forecast) {
        $('#5day').text('5-Day Forecast: ')
        var weatherCards = document.getElementById('weatherCards')
        // clear content for 5 day forecast
        weatherCards.innerHTML = ''
        for (var i = 1; i < 6; i++) {
            // get date, icon, temperature and humidity for five day forecast cards
            var forecastDay = forecast[i].dt
            var forecastIcon = forecast[i].weather[0].icon
            var forecastTemp = forecast[i].temp.max
            var forecastHumidity = forecast[i].humidity
            // create elements needed for five day forecast cards
            var cardEl = $('<div>').addClass('card cardWidth mr-2 bg-primary text-white')
            var cardBody = $('<div>')
            var cardH5 = $('<h5>')
            var cardImg = $('<img>')
            var cardTemp = $('<p>')
            var cardHumid = $('<p>')
            // set content for five day forecast cards
            cardHumid.text('Humidity: ' + forecastHumidity + '%')
            cardTemp.text('Temp: ' + ((forecastTemp - 273.15) * 9 / 5 + 32).toFixed(0) + ' °F')
            cardImg.attr('src', 'http://openweathermap.org/img/wn/' + forecastIcon + '.png')
            cardH5.text(moment(forecastDay * 1000).format('M/DD/YYYY'))
            // append five day forecast cards
            $(weatherCards).append(cardEl)
            cardEl.append(cardBody)
            cardBody.append(cardH5, cardImg, cardTemp, cardHumid)
        }
    }
} setCity()
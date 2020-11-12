var cityArray = JSON.parse(localStorage.getItem('cityArray')) || []
console.log(cityArray)
$('#searchBtn').click(function () {
    citySearch = $('#citySearch').val()
    localStorage.setItem('city', citySearch)
    setCity()
    cityList()
    createCityList()
})

function createCityList() {
    var cityUl = $('#cityList')
    cityUl.empty()
    for (var i = 0; i < cityArray.length; i++) {
        var city = cityArray[i];
        var liEl = $('<li>').text(city).addClass('list-group-item').attr('id', city)
        cityUl.prepend(liEl)
    }
} createCityList()
var cityClick = $('#cityList').on('click', '.list-group-item', function () {
    citySearch = $(this).attr('id')
    localStorage.setItem('city', citySearch)
    setCity()
})
console.log(cityClick)

function cityList() {

    cityArray.push(localStorage.getItem('city'))
    cityArray.splice(10)
    localStorage.setItem('cityArray', JSON.stringify(cityArray))

}



function setCity() {
    var citySearch = localStorage.getItem('city')
    var APIKey = '0af4143c0ff70e72a85f52f2443a7b6a';
    var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + citySearch + '&appid=' + APIKey;
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (response) {

        var lat = response.coord.lat
        var lon = response.coord.lon
        var queryURL2 = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=hourly,minutely&appid=' + APIKey
        $.ajax({
            url: queryURL2,
            method: 'GET'
        }).then(function (response2) {

            $('#currentWeather').addClass('border rounded mb-3')
            var dateString = moment(response2.current.dt * 1000).format('M/DD/YYYY')
            var temp = ((response2.current.temp - 273.15) * 9 / 5 + 32).toFixed(0)
            var uvi = response2.current.uvi
            var uvSpan = $('<span>').text(uvi)
            uvSpan.css({ 'width': '30px', 'padding': '2px', 'border-radius': '5px', 'color': 'white' })
            var iconCode = response2.current.weather[0].icon
            var iconUrl = 'http://openweathermap.org/img/wn/' + iconCode + '.png';
            var iconImg = $('<img>')
            iconImg.attr('src', iconUrl)
            var city = $('#city').text(response.name + ' ' + dateString).addClass('card-header')
            city.append(iconImg)
            $('#mainTemp').text('Temperature: ' + temp + ' °F')
            $('#mainHumidity').text('Humidity: ' + response2.current.humidity + '%')
            $('#windSpeed').text('Wind Speed: ' + response2.current.wind_speed)
            var uviIndex = $('#uvIndex').text('UV Index: ')

            uviIndex.append(uvSpan)
            uviColor()
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


            var forecast = response2.daily

            fiveDay(forecast)
        })

    });

    function fiveDay(forecast) {
        $('#5day').text('5-Day Forecast: ')
        var weatherCards = document.getElementById('weatherCards')
        weatherCards.innerHTML = ''
        for (var i = 1; i < 6; i++) {
            var forecastDay = forecast[i].dt
            var forecastIcon = forecast[i].weather[0].icon
            var forecastTemp = forecast[i].temp.max
            var forecastHumidity = forecast[i].humidity
            var cardEl = $('<div>').addClass('card cardWidth mr-2 bg-primary text-white')
            var cardBody = $('<div>')
            var cardH5 = $('<h5>')
            var cardImg = $('<img>')
            var cardTemp = $('<p>')
            var cardHumid = $('<p>')
            cardHumid.text('Humidity: ' + forecastHumidity + '%')
            cardTemp.text('Temp: ' + ((forecastTemp - 273.15) * 9 / 5 + 32).toFixed(0) + ' °F')
            cardImg.attr('src', 'http://openweathermap.org/img/wn/' + forecastIcon + '.png')
            cardH5.text(moment(forecastDay * 1000).format('M/DD/YYYY'))
            $('#weatherCards').append(cardEl)
            cardEl.append(cardBody)
            cardBody.append(cardH5, cardImg, cardTemp, cardHumid)
        }
    }
} setCity()
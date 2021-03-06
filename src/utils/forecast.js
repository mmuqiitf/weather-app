const request = require('request')
const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=14a89fa6dd4fc4e2dca8b4cd25e75351&query=' + latitude + ',' + longitude
    request({url, json: true}, (error, response) => {
        if(error){
            callback('Unable to connect to weather services!', undefined)
        }
        else if(response.body.error){
            callback('Location didn\'t exist! Try another search', undefined)
        }
        else{
            console.log(response.body)
            callback(undefined, 'It is currently ' + response.body.current.temperature + ' degress out. There is a ' + response.body.current.precip + '% chances of rain. ' + response.body.current.weather_descriptions + '. The wind speed is ' + response.body.current.wind_speed + ' and the pressure is ' + response.body.current.pressure)
        }
    })
}
module.exports = forecast
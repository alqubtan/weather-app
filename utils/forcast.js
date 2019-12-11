const request = require('request');

const forcast = (latitude, longitude, callback) => {

    const url = `https://api.darksky.net/forecast/890f9a8a50b0a0c2f56b539308193843/${latitude},${longitude}`;
 

    request({url, json: true}, (error, {body}) => {
         
        if (error) {
            callback('unable to connect to the service.');
        } else if (body.error) {
            callback('sreach not found .' , undefined);
        }else {
            callback(undefined ,{
                'summary': body.currently.summary,
                 'currently': body.currently.temperature,
                  'windSpeed': body.currently.windSpeed,
                  'precipProbability': body.currently.precipProbability,
                  'daily': body.daily.summary
                 
                })
        }
    }) 


}


module.exports = forcast;
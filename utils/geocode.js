const request = require('request');

const getWeather = (address, callback) => {
    const token = 'pk.eyJ1IjoiYWxxdWJ0YW4iLCJhIjoiY2szaG42NXhjMDA3bTNpcXM5Z25mMDMxbyJ9.eijtiOwqTGBncKPmvHQ31w';
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${token}`;

    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('unable to connect to service.', undefined)
        } else if(body.features.length === 0) {
            callback('location not found.', undefined)
        }else {
            callback(undefined, {
                latitude : body.features[0].center[0],
                longitude: body.features[0].center[1]
               
            });
        }


    });

}

module.exports = getWeather;
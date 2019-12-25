const req = require('request')

// api endpoints
const urls = {
	pm25: "https://api.data.gov.sg/v1/environment/pm25",
	psi: "https://api.data.gov.sg/v1/environment/psi",
	api: "https://developers.data.gov.sg/"
}

var apiKey = ""

function hazometer () {}

function checkForKey (apiKey){
	if(apiKey.length === 0){
		throw new Error(`No API Key specified. Register and get one here: ${urls.api}`)
	}
}

hazometer.prototype.getInfo = function(params, callback) {
	let {apiKey, dateTime, date} = params
	let qs = {}
	checkForKey(apiKey)
	if(dateTime){qs.date_time = dateTime}
	if(!date){qs.date = date}
	req({
		url: urls.psi,
		headers: {'api-key': apiKey},
		qs: qs // if you give them nothing, they give you eveything
		
	}, function(err, response, body) {
		if(err || response.statusCode !== 200) {callback("NEA API inaccessible")}
		body = JSON.parse(body)
		let data = {
			summary: body.api_info.status,
			lastUpdate: new Date(body.items[0].timestamp),
		}
		let compass = ["east","central","south","north","west","national"]
		let newNames = ["dailyPM10","dailyPM25","8hCO","2hNO2","dailySO2","8hO3","3hPSI","dailyPSI"]
		let attributes = ["pm10_twenty_four_hourly","pm25_twenty_four_hourly","co_eight_hour_max","no2_one_hour_max","so2_twenty_four_hourly","o3_eight_hour_max","psi_three_hourly","psi_twenty_four_hourly"]
		compass.forEach(function(v,i){
			data[v] = {}
			attributes.forEach(function(attr,index){
				data[v][newNames[index]] = body.items[0].readings[attr][v]
			})
			data[v]["location"] = body.region_metadata[i].label_location
		});
		//data = body
		callback(null, data)
	});
}

hazometer.prototype.getPM25 = function(params, callback){
	let {apiKey, dateTime, date} = params
	let qs = {}
	checkForKey(apiKey)
	if(dateTime){qs.date_time = dateTime}
	if(!date){qs.date = date}
	req({
		url: urls.pm25,
		headers: {'api-key': apiKey},
		qs: qs // if you give them nothing, they give you eveything
		
	}, function(err, response, body) {
		if(err || response.statusCode !== 200) {callback("NEA API inaccessible")}
		body = JSON.parse(body)
		let data = []
		let compass = ["east","central","south","north","west"]
		body.items.forEach(function(reading, index){
			let cur = {
				lastUpdate:new Date(reading.timestamp)
			}
			compass.forEach(function(v,i){
				cur[v] = reading.readings["pm25_one_hourly"][v]
			})
			data.push(cur)
		});
		callback(null, data)
	});
}


module.exports = new hazometer()

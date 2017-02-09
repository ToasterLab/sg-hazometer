const hazometer = require('./sg-hazometer')
const apiKey = "xxx"

hazometer.getInfo({apiKey}, function(err, data){
	console.log("General Air Quality Information")
	console.log(data)
})

console.log("===================================")

hazometer.getPM25({apiKey}, function(err, data){
	console.log("PM2.5 levels")
	console.log(data)
})
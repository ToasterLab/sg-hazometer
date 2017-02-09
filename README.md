# `sg-hazometer`

The `sg-hazometer` is a simple `npm` module allowing for easy retrieval of pollutant data from [`data.gov.sg`](https://data.gov.sg), which is in turn sourced from NEA.

	`node demo.js`

## Demo

    const hazometer = require("sg-hazometer")
    const apiKey = "xxx" // get one here https://developers.data.gov.sg
    
    hazometer.getInfo({apiKey}, function(err, data){
			console.log(data)
		})
		
You'll get something like the following:

```
{
    summary: 'healthy',
    last_update: 2017 - 02 - 09 T14: 00: 00.000 Z,
    east: {
        dailyPM10: 32,
        dailyPM25: 20,
        '8hCO': 0.27,
        '2hNO2': 15,
        dailySO2: 3,
        '8hO3': 56,
        '3hPSI': 53,
        dailyPSI: 60,
        location: {
            latitude: 1.35735,
            longitude: 103.94
        }
    },
    central: {
        dailyPM10: 29,
        dailyPM25: 19,
        '8hCO': 0.58,
        '2hNO2': 60,
        dailySO2: 5,
        '8hO3': 58,
        '3hPSI': 59,
        dailyPSI: 59,
        location: {
            latitude: 1.35735,
            longitude: 103.82
        }
    },
    south: {
        dailyPM10: 28,
        dailyPM25: 18,
        '8hCO': 0.52,
        '2hNO2': 60,
        dailySO2: 137,
        '8hO3': 57,
        '3hPSI': 59,
        dailyPSI: 61,
        location: {
            latitude: 1.29587,
            longitude: 103.82
        }
    },
    north: {
        dailyPM10: 33,
        dailyPM25: 21,
        '8hCO': 0.4,
        '2hNO2': 20,
        dailySO2: 11,
        '8hO3': 63,
        '3hPSI': 56,
        dailyPSI: 61,
        location: {
            latitude: 1.41803,
            longitude: 103.82
        }
    },
    west: {
        dailyPM10: 30,
        dailyPM25: 17,
        '8hCO': 0.78,
        '2hNO2': 39,
        dailySO2: 4,
        '8hO3': 77,
        '3hPSI': 40,
        dailyPSI: 56,
        location: {
            latitude: 1.35735,
            longitude: 103.7
        }
    },
    national: {
        dailyPM10: 33,
        dailyPM25: 21,
        '8hCO': 0.78,
        '2hNO2': 60,
        dailySO2: 137,
        '8hO3': 77,
        '3hPSI': 55,
        dailyPSI: 61,
        location: {
            latitude: 0,
            longitude: 0
        }
    }
}
```


## FAQ

### What do all these terms mean?

`summary`: human-readable assessment of current air quality (see [this](http://www.haze.gov.sg/images/default-source/default-album/psi-poster.jpg))

`dailyPM10`: 24h readings for particulate matter 10 micrometers or less in diameter

`dailyPM25`: ditto, but for particulate matter 2.5 micrometers or less in diameter

`8hCO`: 8h readings for Carbon Monoxide levels

`2hNO2`: 2h readings for Nitrogen Dioxide levels

`dailySO2`: 24h readings for Sulfur Dioxide levels

`8hO3`: 8h readings for Ozone levels

`3hPSI`: 3h readings for the NEA-released Particulate Matter Index (PSI)

`dailyPSI`: ditto but every 24h

`location`: coordinates of the points at which the readings are taken at

### Why don't the `dateTime` or `date` parameters seem to do anything?

The data.gov.sg API seems to be faulty.

### Why is data on pollution sub-indexes not included?

The Pollutant Standards Index (PSI) is calculated from sub-indexes using a formula detailed [here](http://www.haze.gov.sg/docs/default-source/faq/computation-of-the-pollutant-standards-index-(psi).pdf). This module retrieves the raw data that is used to calculate the index, that is then used to calculate the overall PSI. Unless you plan to check NEA's mathematics, it's unlikely the sub-index itself will be of any interest.
searchInput = $('#search-input')
submitBtn = $('#search-button')
cityContainer = $('#saved-cities')
todaysCardArea = $('#city-card-container')
fiveDayArea = $('#five-day-cards-container')


function getCities() {
	let retrievedCities = (JSON.parse(localStorage.getItem('cities')))
	if(!retrievedCities){
		retrievedCities= []
	}
	return retrievedCities
}

function saveCities() {
	let cities = getCities()
	const searchedCity = searchInput.val()
	if(!cities.includes(searchedCity)){
		cities.push(searchedCity)
	}
	localStorage.setItem('cities', JSON.stringify(cities))
	return cities
}

function displaySavedButtons(){
	let cities = getCities()
	for(let city of cities){
		let cityButton = $('<button>',{
			text: `${city}`,
			addClass: "btn btn-outline-success font-monospace",
			type: "button",
			click: function(){
				showCityWeather(city)
			}
		})
		cityContainer.append(cityButton)
	}	
}

function showCityWeather(city){
	todaysCardArea.empty()
	fiveDayArea.empty()
	fetchingApi(city)
	.then(() => forcastApi(city))
	.catch(err => console.error(err))
}

function fetchingApi(searchCity){
	let todayQueryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&units=imperial&appid=f04d4021fe7f253532227cadb8b2c067`
	return fetch(todayQueryUrl)
	.then(function(response){
		if(!response.ok){
			throw response.json()
		}
		return response.json()
	})
	.then(function(cityResults){
		// console.log(cityResults)
		cityContainer.empty()	
		displayTodaysCard(cityResults)
		saveCities(cityResults)
		displaySavedButtons()
	})
		.catch((err) => console.error(`fetch problem: ${err}`))
	}

function displayTodaysCard (cityResults){
	todaysCardArea.empty()

	const todaysCard = $('<div>')
	todaysCard.addClass('card text-bg-light border-warning mb-3 p-3')

	const cardBody = $('<div>')
	cardBody.addClass('card-body')


	const cityName = $('<h2>')
	cityName.addClass('text-success')
	cityName.text(cityResults.name)
	
	const icon = $('<i>')
	// *error here.
	icon.addClass(`owf owf-${cityResults.weather[0].id} owf-2x`)

	const date = $('<h4>')
	date.text(dayjs.unix(cityResults.dt).format('MM/DD/YYYY'))
	date.addClass('text-success-emphasis')

	const details = $('<ul>')
	details.addClass('text-secondary-emphasis')

	const temp = $('<li>')
	temp.text(`Temperature: ${Math.round(cityResults.main.temp)}\u00B0F`)

	const humidity = $('<li>')
	humidity.text(`Humidity: ${cityResults.main.humidity}%`)
	
	const wind = $('<li>')
	wind.text(`Wind: ${Math.round(cityResults.wind.speed)} MPH`)
	
	details.append(temp, humidity, wind)
	cardBody.append(cityName, date, icon, details)
	todaysCard.append(cardBody)
	todaysCardArea.append(todaysCard)
}

function forcastApi(forcastedCity){
	let forcastQueryUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${forcastedCity}&units=imperial&appid=f04d4021fe7f253532227cadb8b2c067`
	fetch(forcastQueryUrl)
	.then(function(response){
		if(!response.ok){
			throw response.json()
		}
		return response.json()
		})
		.then(function(cityForcast){
			// console.log(cityForcast)
			fiveDayArea.empty()
			displayForcastCards(cityForcast)
			
		})
		.catch((err) => console.error(`fetch problem: ${err}`))
}
	

function displayForcastCards(cityForcast){
// console.log(cityForcast)

while(cityForcast.list.length >= 8){
	const oneDay = cityForcast.list.splice(0,8)
	const dayDetails = oneDay[0]
	// console.log(oneDay)
	// console.log(dayDetails)
	
		const forcastCard = $('<div>')
		forcastCard.addClass('card border-info text-dark mb-3 p-3 accordion accordion-flush bg-light').attr('#accordion')
		
		const accordionTitle = $('<h3>').addClass('bg-info text-white accordion-header row m-0')
		
		const date = $('<h4>')
		date.text(dayjs.unix(dayDetails.dt).format('MM/DD/YYYY'))
		date.addClass('text-success col').addClass('date')
		
		const icon = $('<i>')
		icon.addClass(`owf owf-${dayDetails.weather[0].id} owf-2x col`)
		
		
		
		
		const accordionBtn = $('<button>').addClass('accordion-button collapsed btn btn-info p-2').attr({
			'type': 'button',
			'data-bs-toggle': 'collapse',
			'data-bs-target': `#collapse-${dayDetails.dt}`,
			'aria-expanded': 'false',
			'aria-controls': `#collapse-${dayDetails.dt}`
		});
		
		
		accordionBtn.append(date, icon)
		accordionTitle.append(accordionBtn)

		
		const details = $('<div>').addClass('text-success-emphasis text-end p-2 accordion-collapse collapse').attr({
			'id': `collapse-${dayDetails.dt}`,
			'data-bs-parent': '#accordion'
		})
		
		
		function findTempAverage(oneDay){
			let tempSum = 0
			for(let i = 0; i < oneDay.length; i++){
			let tempData = oneDay[i].main.temp
			tempSum += tempData
		}
		let tempAvg = tempSum/8
			return tempAvg
		}
		const temp = $('<li>')
		temp.text(`Temperature: ${Math.round(findTempAverage(oneDay))}\u00B0F`)

		function findHumidAverage(oneDay){
			let humidSum = 0
			for(let i = 0; i < oneDay.length; i++){
				let humidData = oneDay[i].main.humidity
				humidSum += humidData
			}
			let humidAvg = humidSum/8
			return humidAvg
		}
		const humidity = $('<li>')
		humidity.text(`Humidity: ${Math.round(findHumidAverage(oneDay))}%`)

		function findWindAverage(oneDay){
			let windSum = 0
			for(let i = 0; i < oneDay.length; i++){
				let windData = oneDay[i].wind.speed
				windSum += windData
			}
			let windAvg = windSum/8
			return windAvg
		}
		const wind = $('<li>')
		wind.text(`Wind: ${Math.round(findWindAverage(oneDay))} MPH`)

		details.append(temp,humidity,wind)
		forcastCard.append(accordionTitle, details)
		fiveDayArea.append(forcastCard)
		
	}
}


$('form').on('submit', function(event){
	event.preventDefault()
	fetchingApi(searchInput.val())
	forcastApi(searchInput.val())

	
})


$(document).ready(function(){
	$( function() {
		$( "#accordion" ).collapse({
			toggle: true
		});
		
	})
	
	displaySavedButtons()
} );



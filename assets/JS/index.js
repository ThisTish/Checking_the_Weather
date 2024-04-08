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
			addClass: "btn",
			// click: showCityWeather()
		})
		cityContainer.append(cityButton)
	}	
}

// todo needs param not sure if this is the right one to use, might want to try `${searchInput.val()}`
function showCityWeather(cityName){
	fetchingApi(cityName)
	forcastApi(cityName)
}

function fetchingApi(searchCity){
	let todayQueryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&units=imperial&appid=f04d4021fe7f253532227cadb8b2c067`
	fetch(todayQueryUrl)
		.then(function(response){
			if(!response.ok){
				throw response.json()
			}
			return response.json()
		})
		.then(function(cityResults){
			console.log(cityResults)
			displayTodaysCard(cityResults)
			
		})
		.catch((err) => console.error(`fetch problem: ${err}`))
}

function displayTodaysCard (cityResults){
	const todaysCard = $('<div>')
	todaysCard.addClass('card', 'bg-light', 'text-dark','mb-3', 'p-3')
	
	const cardBody = $('<div>')
	cardBody.addClass('card-body')
	
	const cityName = $('<h3>')
	cityName.text(cityResults.name)
	
	const date = $('<h4>')
	// todo format date
	date.text(cityResults.dt)
	
	const icon = $('<i>')
	icon.addClass(`owf owf-${cityResults.weather[0].id} owf-2x`)
	
	const details = $('<ul>')
	
	const temp = $('<li>')
	temp.text(cityResults.main.temp)
	
	const humidity = $('<li>')
	humidity.text(cityResults.main.humidity)
	
	const wind = $('<li>')
	wind.text(cityResults.wind.speed)
	
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
			console.log(cityForcast)
			displayForcastCards(cityForcast)
			
		})
		.catch((err) => console.error(`fetch problem: ${err}`))
}

function displayForcastCards(cityForcast){
	while(cityForcast.list.length >= 8){
	const oneDay = cityForcast.list.splice(0,8)
	const forcastCard = $('<div>')
	forcastCard.addClass('card', 'bg-light', 'text-dark','mb-3', 'p-3')
	
	const cardBody = $('<div>')
	cardBody.addClass('card-body')
	
	const dayDetails = oneDay[0]

	// todo format date
	const date = $('<h4>')
	date.text(dayDetails.dt)
	
	const icon = $('<i>')
	icon.addClass(`owf owf-${dayDetails.weather[0].id} owf-2x`)
	
	const details = $('<ul>')
	
	
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
	temp.text(findTempAverage(oneDay))

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
	humidity.text(findHumidAverage(oneDay))
	
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
	wind.text(findWindAverage(oneDay))
	
	details.append(temp, humidity, wind)
	cardBody.append(date, icon, details)
	forcastCard.append(cardBody)
	fiveDayArea.append(forcastCard)
	}
}


// todo event listener for 'submit'
$('form').on('submit', function(event){
	event.preventDefault()
	saveCities()
	fetchingApi(searchInput.val())
	forcastApi(searchInput.val())
	// displaySavedButtons()
})


$('document').ready(function(){
	displaySavedButtons()
})
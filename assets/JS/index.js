searchInput = $('#search-input')
submitBtn = $('#search-button')
cityContainer = $('#saved-cities')
todaysCardArea = $('#city-card-container')
fiveDayArea = $('#five-day-cards-container')

// retrievedCity = city's info retrieved from weatherAPI

//? get params?


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
	if(!searchedCity){
		alert(`Couldn't find ${searchedCity}.
		Please try again.`)
		return cities
	}
	
	else if(!cities.includes(searchedCity)){
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
			click: showCity()
		})
		cityContainer.append($('<li>')).append(cityButton)

	}	
}

function showCity (body){
	displayTodaysCard(body)
	displayForcastCards(body)
}

function fetchingApi(searchCity){
	let queryUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&appid=f04d4021fe7f253532227cadb8b2c067`

	fetch(queryUrl)
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
	console.log(cityResults.city.name)
	const todayResults = cityResults.list[0]
	console.log(todayResults.dt_txt)
	console.log(todayResults.main.temp)
	console.log(todayResults.weather[0].icon)
	console.log(todayResults.main.humidity)
	console.log(todayResults.wind.speed)

	return
}

function displayForcastCards(cityResults){
	for(let result of cityResults){
		
	}

}


// todo event listener for 'submit'
$('form').on('submit', function(event){
	event.preventDefault()
	// request info from weather.com
	// todaysCard()
	// displayForcastCards()
	saveCities()
	fetchingApi(searchInput.val())
	// displaySavedButtons()
})

// todo when
$('document').ready(function(){
	displaySavedButtons()
})
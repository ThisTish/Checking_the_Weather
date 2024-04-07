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
	// *don't really need this, and it doesn't work like i want to, come back to it later
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

// function showCity (body){
// 	displayTodaysCard(body)
// 	displayForcastCards(body)
// }

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
			displayForcastCards(cityResults)

		})
		.catch((err) => console.error(`fetch problem: ${err}`))
}

function displayTodaysCard (cityResults){
	const todaysCard = $('<div>')
	todaysCard.addClass('card', 'bg-light', 'text-dark','mb-3', 'p-3')

	const cardBody = $('<div>')
	cardBody.addClass('card-body')

	const cityName = $('<h3>')
	console.log(cityResults.city.name)
	cityName.text(cityResults.city.name)

	const todayResults = cityResults.list[0]
	
	const date = $('<h4>')
	// todo format date
	date.text(todayResults.dt_txt)
	console.log(todayResults.dt_txt)

	const icon = $('<i>')
	// todo not exactly correct, look into
	icon.class(owf-lg)
	icon.content(todayResults.weather[0].icon)
	// todo look how to properly display this
	console.log(todayResults.weather[0].icon)

	const details = $('<ul>')

	const temp = $('<li>')
	// todo convert to display farenheit
	temp.text(todayResults.main.temp)
	console.log(todayResults.main.temp)

	const humidity = $('<li>')
	humidity.text(todayResults.main.humidity)
	console.log(todayResults.main.humidity)

	const wind = $('<li>')
	wind.text(todayResults.wind.speed)
	console.log(todayResults.wind.speed)

	details.append(temp, humidity, wind)
	cardBody.append(cityName, date, icon, details)
	todaysCard.append(cardBody)
	todaysCardArea.append(todaysCard)
	return
}
// ? use dayjs? go through 1 by one and add a day each time?
function displayForcastCards(cityResults){
	for(let i = 1; i < 40; i++){
		const forcast = cityResults.list[i]

		// ?this might work with some tweeking
		if([i].includes('18:00:00')){
		console.log(forcast.dt_txt)
		console.log(forcast.main.temp)
		console.log(forcast.weather[0].icon)
		console.log(forcast.main.humidity)
		console.log(forcast.wind.speed)
		}
	}



}


// todo event listener for 'submit'
$('form').on('submit', function(event){
	event.preventDefault()
	// request info from weather.com
	// displayForcastCards()
	// displayTodaysCard()
	// saveCities()
	fetchingApi(searchInput.val())
	// displaySavedButtons()
})


// $('document').ready(function(){
// 	displaySavedButtons()
// })
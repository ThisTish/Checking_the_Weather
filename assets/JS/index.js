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
	let todayQueryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=f04d4021fe7f253532227cadb8b2c067`

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
		console.log(cityResults.name)
		cityName.text(cityResults.name)
				
		const date = $('<h4>')
		// todo format date
		date.text(cityResults.dt)
		console.log(cityResults.dt)
		
		const icon = $('<i>')
		// todo not exactly correct, look into
		icon.addClass(`owf owf-${cityResults.weather[0].id} owf-2x`)
		// todo look how to properly display this
		console.log(cityResults.weather[0].id)
		
		const details = $('<ul>')
		
		const temp = $('<li>')
		// todo convert to display farenheit
		temp.text(cityResults.main.temp)
		console.log(cityResults.main.temp)
		
		const humidity = $('<li>')
		humidity.text(cityResults.main.humidity)
		console.log(cityResults.main.humidity)
		
		const wind = $('<li>')
		wind.text(cityResults.wind.speed)
		console.log(cityResults.wind.speed)
		
		details.append(temp, humidity, wind)
		cardBody.append(cityName, date, icon, details)
		todaysCard.append(cardBody)
		todaysCardArea.append(todaysCard)
		return
		console.log(forcast.dt_txt)
		console.log(forcast.main.temp)
}


	function forcastApi(forcastedCity){
		let forcastQueryUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${forcastedCity}&appid=f04d4021fe7f253532227cadb8b2c067`
	
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

		const oneDay = cityForcast.list.splice(0,8)
		console.log(oneDay)

		
		// * all working for first array
			const forcastCard = $('<div>')
			forcastCard.addClass('card', 'bg-light', 'text-dark','mb-3', 'p-3')
			
			const cardBody = $('<div>')
			cardBody.addClass('card-body')

			// // todo switch 0 to i when looping
			const dayResults = oneDay[0]
			
			// // todo format date
			const date = $('<h4>')
			date.text(dayResults.dt)
			console.log(dayResults.dt)
			
			const icon = $('<i>')
			icon.addClass(`owf owf-${dayResults.weather[0].id} owf-2x`)
			console.log(dayResults.weather[0].id)
			
			const details = $('<ul>')
			
			let tempAvg = 0

			for(let i = 0; 0 < oneDay.length; i++){
				
			}

			// todo convert to display farenheit
			const temp = $('<li>')
			temp.text(dayResults.main.temp)
			console.log(dayResults.main.temp)
			
			const humidity = $('<li>')
			humidity.text(dayResults.main.humidity)
			console.log(dayResults.main.humidity)
			
			const wind = $('<li>')
			wind.text(dayResults.wind.speed)
			console.log(dayResults.wind.speed)
			
			details.append(temp, humidity, wind)
			cardBody.append(date, icon, details)
			forcastCard.append(cardBody)
			todaysCardArea.append(forcastCard)
			return
	}
		







// todo event listener for 'submit'
$('form').on('submit', function(event){
	event.preventDefault()
	// request info from weather.com
	// displayForcastCards()
	// displayTodaysCard()
	// saveCities()
	fetchingApi(searchInput.val())
	forcastApi(searchInput.val())
	// displaySavedButtons()
})


// $('document').ready(function(){
// 	displaySavedButtons()
// })
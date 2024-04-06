searchInput = $('#search-input')
submitBtn = $('#search-button')
cityContainer = $('#saved-cities')
todaysCardArea = $('#city-card-container')
fiveDayArea = $('#five-day-cards-container')

// retrievedCity = city's info retrieved from weatherAPI

function getCities() {
	let retrievedCities = (JSON.parse(localStorage.getItem('cities')))
	if(!cities){
		retrievedCities= []
	}
	return retrievedCities
}

function saveCities() {
	let cities = getCities()
	const searchedCity = searchInput.val()
	if(!searchedCity//a valid city//
	){
		alert(`Couldn't find ${searchedCity}.
		Please try again.`)
		return cities
	}

	else(!cities.include(searchedCity)){
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
		(cityContainer).append($('<li>').append(city))
	}	
}


// todo READ WEATHER API DOCUMENT***********************************************

function displayTodaysCard (){
	//todo retrievedCity splice info needed. create card. append to todayCardArea
}

function displayForcastCards(){
	// todo retrievedCity splice info needed. create card for each day. append to a list. append fiveDayArea

}

// todo event listener for 'submit'
	// request info from weather.com
	todaysCard()
	displayForcastCards()
	saveCities()
	

// todo when
(document).ready(function){
	displaySavedButtons()
}
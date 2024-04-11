

// *FULL API CONCEPTS FOR BEGINERS ON YOUTUBE

// from github.com/request/request
const request = require('request');
request('http://www.google.com', function (error, response, body) {
  console.error('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});

// closer to what we have been learning
const require = require('request')
request('google.com}', function(error, response, body){
	if (!error && response.statusCode === 200){
		let parsedBody = JSON.parse(body)
		console.log(parsedBody['query']['results']['channel']['astronomy']['sunset'])
	}
})


// *LEARN FETCH API IN 6 MIN YOUTUBE
fetch(`api.openweathermap.org/data/2.5/weather?q={city}&appid={f04d4021fe7f253532227cadb8b2c067}`{
	method:'POST',
	body: {
		name:'user'
	},
})
	.then(res => {
		return res.json
		if(res.ok){
			console.log('success')
		}
		else{
			console.log('not ok')
		}
	})

// *Full Stack Example in homework details

let city;

const queryURL = `api.openweathermap.org/data/2.5/weather?q={city}&appid={f04d4021fe7f253532227cadb8b2c067}`

fetch(queryURL)


// *MDN PRACTICE


//* accordion building?

const forecastItems = [
	{id: 'flush-collapseOne', title:'Day One', content: "placeholder"},
	{id: 'flush-collapseTwo', title:'Day Two', content: "placeholder"},
	{id: 'flush-collapseThree', title:'Day Three', content: "placeholder"},
	{id: 'flush-collapseFour', title:'Day Four', content: "placeholder"},
	{id: 'flush-collapseFive', title:'Day Five', content: "placeholder"}
]


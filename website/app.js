/* Global Variables */

//API credentials from OpenWeatherMap
const apiKey = '';
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//event listener for the element with the id: generate
generatebutton = document.getElementById('generate')

generatebutton.addEventListener('click', generateResult);

//callback function to execute when it is clicked.
function generateResult(event) {
    const zipCode = document.getElementById('zip').value;
    const userResponse = document.getElementById('feelings').value;

    retrieveWeatherData(baseURL, zipCode, apiKey)
        .then(function(data) {
            //postData('/add', {temperature: data.main.temp, date: date_str, userResponse: userResponse});
            postData('/add',{ date: newDate, temperature: data.main.temp, userResponse: userResponse })
            updateUI('/all');
        })
};


//get request to the api data.
const retrieveWeatherData = async (baseURL, zipCode, apiKey) =>{
    const res = await fetch(baseURL + zipCode +',us' + '&APPID=' + apiKey);
    try {
        // Transform into JSON
        const data = await res.json()
        return data;
    }
    catch(error) {
        console.log("error", error);
        // appropriately handle the error
    };
};


/* Function to POST data */
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
        date: data.date,
        temp: data.temperature,
        userResponse: data.userResponse
    })
})

    try {
        const newData = await response.json();
        return newData;
    } catch(error) {
        console.log('error', error);
    }
};

//update UI
const updateUI = async (url ='') => {
    const request = await fetch(url);
    try {
        const allData = await request.json();
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temperature;
        document.getElementById('content').innerHTML = allData.userResponse;
    } catch(error) {
        console.log('error', error);
    }
};
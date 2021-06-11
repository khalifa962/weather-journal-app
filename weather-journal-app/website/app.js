/* Global Variables */
let apiURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const APiKey = '5eac52fe6f364776277ac86bea98f32b';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();
// create a variable for generate button
const generateBtn = document.getElementById('generate');
/* Function to GET Web API Data*/
generateBtn.addEventListener("click", async() => {
        //return user's inputs into variables 
        const feelings = document.querySelector('#feelings').value;
        const zipCode = document.querySelector("#zip").value;

        if (!zipCode) {
            alert("Enter Your Zip Code!")
        }
        getTemprature(apiURL, zipCode, APiKey)
            .then(result => {
                return getWeatherData(result, feelings)

            })

        .then(result => {
                updateUI()

            })
            .catch(err => {
                console.log(err)
            })

    })
    //get the temprature by fetching apiURL with the hold data        

async function getTemprature(apiURL, zipCode, APiKey) {
    const resp = await fetch(apiURL + zipCode + ',us' + '&appid=' + APiKey + '&units=metric');
    const data = await resp.json();
    const temprature = data.main.temp;
    return temprature
}
/* Function to POST data */
async function getWeatherData(temprature, feelings) {
    await fetch('/PostProjectData', {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            Date: newDate,
            temp: temprature,
            feelings: feelings,

        })
    });
    /* Function to GET Project Data */
    const endPointRes = await fetch('/GetProjectData', {
        credentials: "same-origin"
    });
    const weatherData = await endPointRes.json();
    return weatherData
}
//function to upaate user interface
async function updateUI() {
    const request = await fetch('http://localhost:8000/GetProjectData');
    const projectData = await request.json();
    document.querySelector("#date").innerHTML = projectData.Date;
    document.querySelector("#temp").innerHTML = projectData.temp;
    document.querySelector("#content").innerHTML = projectData.feelings;
}

/* Global Variables */
//API Credentials
const apiURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = ',Us&appid=7f060fec2e2f78f5c344ab69e41063c4';
//const apiKey = ',SA&appid=7f060fec2e2f78f5c344ab69e41063c4';

// Create a new date instance dynamically with JS
let date = new Date();
let newDate = date.getMonth() + '.' + date.getDate() + '.' + date.getFullYear();

//client side post function 
const postData = async (url = '', data = {}) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await res.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log('error', error);
    };
};
//Event Listeners
document.getElementById('generate').addEventListener('click', generateAction);


// get Temp
const getTemp = async (apiURL, zipCode, apiKey) => {
    const res = await fetch(apiURL + zipCode + apiKey);
    try {
        const data = await res.json();
        return data;
    }
    catch (error) {
        console.log("error", error);
    }
};


// function 
function generateAction() {
    const userZipCode = document.getElementById('zip').value;
    const userFeeling = document.getElementById('feelings').value;
    getTemp(apiURL, userZipCode, apiKey)
        .then(function (data) {
            console.log(data);
            postData('/post', { temp: data.main.temp, date: newDate, content: userFeeling });
            dymUpdateUI();
        });
};

//Dynamically Update UI
const dymUpdateUI = async () => {
    const request = await fetch("/get");

    try {
        const resData = await request.json();
        console.log(resData);
        document.getElementById('temp').innerHTML = resData.temp;
        document.getElementById('date').innerHTML = resData.date;
        document.getElementById('content').innerHTML = resData.content;

    } catch (error) {
        console.log("error");
    }
};

/* Global Variables */
//learning git by using this repo.
/* soooorrrryyyy of my bad english */

// Create a new date instance dynamically with JS
let d = new Date();

// I add 1 month as months is not currect 
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

// lets add the key from https://home.openweathermap.org/api_keys.
const theWeatheAppKey = "c17374f50b6c316aeff33b4d21b120a7";

// also we need to define the generate button.
const generateKey = document.getElementById("generate");

/* add event listener that will take the zip code value using async function that will use await and fetch.
Important: this is the main function addEventListener*/
let mainFunction = generateKey.addEventListener("click", async ()=>{
  // idintfay some global variables that we will use its value in the results section.
  const contentOfFeeling = document.getElementById('feelings').value
  const zipCode = document.getElementById('zip').value
// just check that zip code value is ok and runing. I used it and did not want to delete it.
console.log("the zip code is" , zipCode)
    // Bounce points ( I add alert that zip code is empty and this will excute if only zip code left empty)
    if(zipCode === ""){
        alert("Zip Code field is empty. Please enter Zip Code")
        return
    }
    // lets fetch the api with await to make sure that is everything is working fine and save it in string to use it:
    const weatherAPIDataInJSON = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${theWeatheAppKey}&units=metric`);
        const weatherAPIData = await weatherAPIDataInJSON.json();
        console.log(weatherAPIData)
        const temprture = weatherAPIData.main.temp;
        //Bounce points (I add extra information like were are this zip code and humidity to make this api more usable)
        const country = weatherAPIData.sys.country;
        const place = weatherAPIData.name;
        const humidity = weatherAPIData.main.humidity;
        console.log(temprture) // I want to delete it but i think it will be usefull for you to check that two values are idntical here and in the index.html
        // return serverSection(temprture,contentOfFeeling,country,place,humidity)
      })
      .then((temprture,contentOfFeeling,country,place,humidity) =>{serverSection (temprture,contentOfFeeling,country,place,humidity)})
      .then((finalFormOfData) =>{displayResults(finalFormOfData)})

// server section: 
// in this section the data will go out and in the server and save it so I can use it in display my data
// Important: this is the most importatnt function that will convert the date to readable and store it. without it we can't read.

async function serverSection (temprture,contentOfFeeling,country,place,humidity) {
        await fetch("/postReqData", {
          // its post method
            method: 'POST',
          // in the same website so credentials will be same-origin
            credentials: 'same-origin',
          // type of the content is JSON.
            headers: {
              'Content-Type': 'application/json'
            },
          // what do we want from the server.
            body: JSON.stringify({
                date: newDate,
                temp: temprture,
                content: contentOfFeeling,
                country: country,
                place: place,
                humidity: humidity
            }),
          });
          // get Reqest Data.
          const serverRes = await fetch("/getReqData", {
          credentials: 'same-origin'
          });
          // the final form of data.
          const finalFormOfData = await serverRes.json();
            return displayResults(finalFormOfData);
            };
            //the function to the display the data.
async function displayResults(finalFormOfData) {
const fetchTheData = await fetch ('/getReqData');
  // if everything is ok.
  try{
  let theData = await fetchTheData.json()
  let displayDate = document.getElementById("date").innerHTML = "Today date is " + theData.date;
  // Bounce points (I convert the C to F inside the function and did not used extranal function. I think this is good way. I did not want the code to be longer.
  // Bounce points ( toFix to make the 1 decimal we not want to make the temp with alot of decimals, right ?)
  let displayTemp = document.getElementById("temp").innerHTML = "Today temprature is " +theData.temp.toFixed(1)+ " °C which equal to " + (theData.temp*9/5 + 32).toFixed(1) + " °F and The humidity is "+theData.humidity + "%";
  let displayContent = document.getElementById("content").innerHTML = "I heared that you are " +theData.content + " . So did I.";
  let displayCountry = document.getElementById("country").innerHTML = "This zip code you enter is in " +theData.place + " , "+theData.country;
  // if error happan.
}catch(error){
    console.log("check the" , error)
}
};
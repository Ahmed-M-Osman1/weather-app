/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();

// I add 1 month as months is not currect 
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

// lets add the key from https://home.openweathermap.org/api_keys
const theWeatheAppKey = "c17374f50b6c316aeff33b4d21b120a7";

// also we need to take define the generate button
const generateKey = document.getElementById("generate");



// add event listener that will take the zip code value using async function that will use await and fetch
// Important: this is the main function addEventListener
let mainFunction = generateKey.addEventListener("click", async ()=>{
  // idintfay some global variables 
  const contentOfFeeling = document.getElementById('feelings').value
  const zipCode = document.getElementById('zip').value
// just check that zip code value is ok and runing i used it and did not want to delet it
console.log("the zip code is" , zipCode)
    // Bounce points ( I add alert that zip code is empty)
    if(zipCode === ""){
        alert("Zip Code field is empty. Please enter Zip Code")
        return
    }
    // lets fetch the api with await to make sure that is everything is working fine and save it in string to console.log it:
    const weatherAPIDataInJSON = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${theWeatheAppKey}&units=metric`);
        const weatherAPIData = await weatherAPIDataInJSON.json()
        const temprture = weatherAPIData.main.temp;
        console.log(temprture) // I want to delete it but i think it will be usefull for you to check that two values are idntical here and in the index.html
        return {contentOfFeeling, temprture}
      });
// server section: 
// in this section the data will go out and in the server and save it so i can use it in display my data

async function serverSection (){
        await fetch("/postReqData", {
          // its post method
            method: 'POST',
          // in the same website so credentials will be same-origin
            credentials: 'same-origin',
          // type of the content is JSON.
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                date: newDate,
                temp: temprture,
                content: contentOfFeeling
            }),
          });
          const serverRes = await fetch("/getReqData", {
          credentials: 'same-origin'
          });
          const finalFormOfData = await serverRes.json();
          console.log(finalFormOfData);
          return finalFormOfData;
            };

            function displayResults() {
              let displayDate = document.getElementById("date").innerHTML = serverSection.newDate;
              let displayTemp = document.getElementById("temp").innerHTML = serverSection.temprture;
              let displayContent = document.getElementById("content").innerHTML = serverSection.content;
              entryHolder.appendChild(displayResults);
              displayResults.style.fontSize = '1.25em'
            };
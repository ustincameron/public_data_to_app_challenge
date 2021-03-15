const fs = require('fs');
const cheerio = require('cheerio');
const axios = require('axios');
const apiKey = process.argv.slice(2)[0];
const sleepRate = 1500; // ms - used to maintain api rate limits

const getInitialData = () =>{
   console.log("Data-Scraping Initial Source.");
   return axios.get('https://publiclibraries.com/state/kansas/')
      .then(async (htmlResponse) => {
         const $ = cheerio.load(htmlResponse.data)
         const result = $("#libraries tr").not(':first-child').map((i, element) => ({
            city: $(element).find('td:nth-of-type(1)').text().trim(),
            name: $(element).find('td:nth-of-type(2)').text().trim(),
            address: $(element).find('td:nth-of-type(3)').text().trim(),
            zip: $(element).find('td:nth-of-type(4)').text().trim(),
            phone: $(element).find('td:nth-of-type(5)').text().trim()
         })).get()
         
         return JSON.stringify(result);
      })
      .catch((error) => {
         console.error(error)
      });
}
const getExpandedData = async (initialData) => {
   const initialDataObj = JSON.parse(initialData)
   const placeData = [];
   console.log("Starting Reverse-Lookup.");
   for(let i = 0; i < initialDataObj.length; i++) {
      await sleep(sleepRate);
      const placeId = await reverseLookup(initialDataObj[i].name, initialDataObj[i].address, initialDataObj[i].city, initialDataObj[i].zip);
      const place = await getPlaceDetails(placeId);
      if(place){
         console.log(place.name);
         placeData.push(place);
      }
   }
   console.log("Finished Reverse-Lookup.");
   return placeData;
}
const getPlaceDetails = async (placeId) =>{
      const fields = 'place_id,name,rating,formatted_phone_number,formatted_address,geometry,icon,url,website,review,opening_hours';
      const { data } = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&key=${apiKey}`);
      if(data && data.result){
         return data.result;
      }
}
const reverseLookup = async (name, address, city, zip) =>{
      const query = encodeURI(`${name} ${address} ${city} ${zip}`)
      const { data } = await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${apiKey}`);
      if(data && data.results.length>0){
         return data.results[0].place_id;
      }
}
const saveFile = async (placeData) =>{
   try {
      const finalData = fs.writeFileSync('./public/api/kansasLibraries.json', JSON.stringify(placeData))
      if(finalData){
         console.log("JSON File Saved.");
      }
   }
   catch (error) {
      console.error(error)
   }
}
const sleep = (ms) => {
   return new Promise(resolve => setTimeout(resolve, ms));
}
const run = async () =>{
   if(!apiKey){
      console.error("Include a Google Places API Key as an argument.")
      return false;
   }
   const initialData = await getInitialData();
   const expandedData = await getExpandedData(initialData);
   await saveFile(expandedData);
}
run();
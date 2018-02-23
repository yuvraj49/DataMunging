const fs = require('fs');
const readline = require('readline');
const StreamVal = require('stream');

const instream = fs.createReadStream('country_details.csv');
const outstream = new StreamVal();
const reader = readline.createInterface(instream, outstream);
const populationObject = [];
const gdpObject = [];
const ppObject = [];

const continentObject = [];


let headers = [];
let headerCounter = 0;
reader.on('line', (line) => {
  if (headerCounter === 0) {
    headers = line.split(',');
    headerCounter = 1;
  } else {
    jsonConversion(line); 
  }
  sortElement();
});

reader.on('close', () => {
  getFinalContinent();
  writeToFile();  
  
});

function jsonConversion(line){

  const currentline = line.split(',');
    // console.log(currentline);
    var continent = 6;
    var gdpValue;
    var populationValue;
    if (!(currentline[0] === 'European Union' || currentline[0] === 'World')) {
      const tempValueForPopulation = {};
      const tempValueForGdp = {};
      const tempValueForPp = {};
      for (let val = 0; val < headers.length; val += 1) {
        if (headers[val] === 'Country') {
          tempValueForPp[headers[val]] = currentline[val];
          tempValueForPopulation[headers[val]] = currentline[val];
          tempValueForGdp[headers[val]] = currentline[val];
          continent = checkContinent(currentline[val]);
         // console.log(continent);
        }
        if (headers[val] === 'GDP2013') { 
          tempValueForGdp[headers[val]] = currentline[val];
          gdpValue = val;
           }
        if (headers[val] === 'Population2013') { 
          tempValueForPopulation[headers[val]] = currentline[val]; 
          populationValue = val;
        }
        if (headers[val] === 'PPP2013') { 
          tempValueForPp[headers[val]] = currentline[val];

         }
      }
      populationObject.push(tempValueForPopulation);
      gdpObject.push(tempValueForGdp);
      ppObject.push(tempValueForPp);

      computeGDP(continent,currentline,gdpValue,populationValue);
    }
}

function writeToFile(){

  fs.writeFile('population.json', JSON.stringify(populationObject), 'utf8', (err) => {
    console.log(err);
  });
  fs.writeFile('gdp.json', JSON.stringify(gdpObject), 'utf8', (err) => {
    console.log(err);
  });
  fs.writeFile('pp.json', JSON.stringify(ppObject), 'utf8', (err) => {
    console.log(err);
  });
  fs.writeFile('continentGDP.json', JSON.stringify(continentObject), 'utf8', (err) => {
    console.log(err);
  });
 // console.log(continentObject);
}

function sortElement(){

  populationObject.sort((a, b) => b.Population2013 - a.Population2013);
  gdpObject.sort((a, b) => b.GDP2013 - a.GDP2013);
  ppObject.sort((a, b) => b.PPP2013 - a.PPP2013);
}









function checkContinent(Country){




  if (Country === 'Russia' || Country === 'India' || Country === 'Japan' || Country === 'China' || Country === 'Indonesia' || Country === 'Saudi Arabia' || Country === 'Turkey' || Country === 'Republic of Korea') {
           // continentObject[0]['continent'] = "Asia";
            return 0;
        } else if (Country === 'France' || Country === 'Italy' || Country === 'Germany' || Country === 'United Kingdom') {
           // continentObject[0]['continent'] = "Asia";
            return 1;
        } else if (Country === 'Australia') {
          // continentObject[0]['continent'] = "Asia";
           return 2;
        } else if (Country === 'Mexico' || Country === 'USA' || Country === 'Canada') {
          //  continentObject[0]['continent'] = "Asia";
            return 3;
        } else if (Country === 'Brazil' || Country === 'Argentina') {
          //  continentObject[0]['continent'] = "Asia";
            return 4;
        } else if (Country === 'South Africa') {
          // continentObject[0]['continent'] = "Asia";
            return 5;
        }
}

var temp = {};

var asia = ['Asia',0,0];
var nAmerica = ['North America',0,0];
var sAmerica = ['South America',0,0];
var Australia = ['Australia',0,0];
var Europe = ['Europe',0,0];
var Africa = ['Africa',0,0];




function computeGDP(continent,currentline,gdpValue,populationValue)
{

 // console.log(continentObject);

  // continentObject[continent]['gdp'] += +currentline[gdpValue];
  // continentObject[continent]['population'] += +currentline[populationValue];



  if(continent == 0){
    asia[1] += parseFloat(currentline[populationValue]);
    asia[2] += parseFloat(currentline[gdpValue]);
    //continentObject[continent].push(asia);
  }else if(continent == 1){
    nAmerica[1] += parseFloat(currentline[populationValue]);
    nAmerica[2] += parseFloat(currentline[gdpValue]);
    //continentObject[continent].push(nAmerica);
  }else if(continent == 2){
    sAmerica[1] += parseFloat(currentline[populationValue]);
    sAmerica[2] += parseFloat(currentline[gdpValue]);
    //continentObject[continent].push(sAmerica);
  }else if(continent == 3){
    Australia[1] += parseFloat(currentline[populationValue]);
    Australia[2] += parseFloat(currentline[gdpValue]);
    //continentObject[continent].push(Australia);
  }else if(continent == 4){
    Europe[1] += parseFloat(currentline[populationValue]);
    Europe[2] += parseFloat(currentline[gdpValue]);
    //continentObject[continent].push(Europe);
  }else if(continent == 5){
    Africa[1] += parseFloat(currentline[populationValue]);
    Africa[2] += parseFloat(currentline[gdpValue]);
    //continentObject[continent].push(Africa);
  }
 // console.log(asia);
}




function getFinalContinent(){

  //temp.continent = 'Asia';
  temp.arr = asia;
  continentObject.push(temp);
  //temp.continent = 'Asia';
  temp = {};
  temp.arr = nAmerica;
  continentObject.push(temp);
  //temp.continent = 'Asia';
  temp = {};
  temp.arr = sAmerica;
  continentObject.push(temp);
  //temp.continent = 'Asia';
  temp = {};
  temp.arr = Australia;
  continentObject.push(temp);
  temp = {};
  temp.arr = Europe;
  continentObject.push(temp);
  //temp.continent = 'Asia';
  temp = {};
  temp.arr = Africa;
  continentObject.push(temp);

  console.log(continentObject);
}






















const fs = require('fs');
const readline = require('readline');
const stream = require('stream');

const instream = fs.createReadStream('country_details.csv');
const outstream = new stream();
const reader = readline.createInterface(instream, outstream);
const populationObject = [];
const gdpObject = [];
const ppObject = [];
let headers = [];
let headerCounter = 0;
reader.on('line', (line) => {
  if (headerCounter == 0) {
    headers = line.split(',');
    headerCounter = 1;
  } else {
   	const currentline = line.split(',');
    console.log(currentline);
   	if (!(currentline[0] == 'European Union' || currentline[0] == 'World')) {
      const tempValueForPopulation = {};
      const tempValueForGdp = {};
      const tempValueForPp = {};
      for (let val = 0; val < headers.length; val++) {
        if (headers[val] == 'Country') {
          tempValueForPp[headers[val]] = currentline[val];
          tempValueForPopulation[headers[val]] = currentline[val];
          tempValueForGdp[headers[val]] = currentline[val];
        }
        if (headers[val] == 'GDP2013') { tempValueForGdp[headers[val]] = currentline[val]; }
        if (headers[val] == 'Population2013') { tempValueForPopulation[headers[val]] = currentline[val]; }
        if (headers[val] == 'PPP2013') { tempValueForPp[headers[val]] = currentline[val]; }
      }
      populationObject.push(tempValueForPopulation);
      gdpObject.push(tempValueForGdp);
      ppObject.push(tempValueForPp);
      	}
  }
  populationObject.sort((a, b) => b.Population2013 - a.Population2013);
  gdpObject.sort((a, b) => b.GDP2013 - a.GDP2013);
  ppObject.sort((a, b) => b.PPP2013 - a.PPP2013);
});
reader.on('close', () => {
  fs.writeFile('population.json', JSON.stringify(populationObject), 'utf8', (err) => {
     	console.log(err);
  });
  fs.writeFile('gdp.json', JSON.stringify(gdpObject), 'utf8', (err) => {
     	console.log(err);
  });
  fs.writeFile('pp.json', JSON.stringify(ppObject), 'utf8', (err) => {
     	console.log(err);
  });
});


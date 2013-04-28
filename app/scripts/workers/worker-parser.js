/**
 * I am a webworker that parses a json string and returns a json object.
 * 
 * I should be used if any data requests/ parsing takes longer than 250ms
 */

self.onmessage = function(event){
	//get the json string
	var jsonText = event.data;
	
	//parse the json string
	var jsonObj = JSON.parse(jsonText);
	
	//return the json object
	self.postMessage(jsonObj);
};

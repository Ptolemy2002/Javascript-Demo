/*
	Retreive JSON data from the url
*/
function getJSON(url, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
	xhr.responseType = 'json';
	xhr.onload = function() {
		var status = xhr.status;
		if (status == 200) {
			callback(200, xhr.response);
		} else {
			callback(status);
		}
	};
	xhr.send();
}

/*
	Get the index of the name column by looping through meta.view.columns and finding the object with the name property
	set to 'NAME
*/
function getNameIndex(data) {
	var nameIndex = -1;
	for (var i = 0; i < data.meta.view.columns.length; i++) {
		if (data.meta.view.columns[i].name == 'NAME') {
			nameIndex = i;
			break;
		}
	}
	return nameIndex;
}

/*
	Get the names of each subway station by looping through the data and using the
	column in the nameIndex.
*/
function getStationNames(data, nameIndex) {
	var stationNames = [];
	for (var i = 0; i < data.data.length; i++) {
		stationNames.push(data.data[i][nameIndex]);
	}
	return stationNames;
}

getJSON("https://data.cityofnewyork.us/api/views/kk4q-3rt2/rows.json", (responseCode, data) => {
	if (responseCode != 200) {
		console.log("Request failed with status code: " + responseCode);
	} else {
		console.log(data);

		let nameIndex = getNameIndex(data);
		console.log("Name column is at index " + nameIndex);
		
		let stationNames = getStationNames(data, nameIndex);
		//Sort the station names alphabetically
		stationNames.sort();
		console.log("Got " + stationNames.length + " station names");
		console.log(stationNames);

		let contentList = document.getElementById("contentList");
		//Create a list item for the first 10 station names
		for (var i = 0; i < 10; i++) {
			if (i < stationNames.length) {
				let listItem = document.createElement("li");
				listItem.innerHTML = stationNames[i];
				contentList.appendChild(listItem);
			}
		}
	}
});

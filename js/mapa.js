var map;
var longitude = "";
var latitude = "";
var coord="";
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var metros = [];
var partida = [];
var chegada = [];
var final = "";
var i = 0;
var tempo = [];
var aux="";
var now = "";
var interval = "";
/*if (localStorage.length != 0){
    tempo.push(localStorage.tempo);
    .push(localStorage.);
    chegada.push(localStorage.chegada);    
    partida.push(localStorage.partida);  
    tempo = JSON.parse(tempo);
     = JSON.parse();
    chegada = JSON.parse(chegada);
	partida = JSON.parse(partida);
	adicionar();
}
*/

function initialize() {	
	directionsDisplay = new google.maps.DirectionsRenderer();
	var latlng = new google.maps.LatLng(-18.8800397, -47.05878999999999);
	
    var options = {
        zoom: 5,
		center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
	
    map = new google.maps.Map(document.getElementById("mapa"), options);
	directionsDisplay.setMap(map);
	directionsDisplay.setPanel(document.getElementById("trajeto-texto"));
	
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function (position) {

			pontoPadrao = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			map.setCenter(pontoPadrao);
			
			var geocoder = new google.maps.Geocoder();
			
			geocoder.geocode({
				"location": new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
            },
            function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					$("#txtEnderecoPartida").val(results[0].formatted_address);
				}
            });
		});
	}
}


initialize();

function formatatempo(segs) {
	min = 0;
	hr = 0;
	while(segs>=60) {
		if (segs >=60) {
			segs = segs-60;
			min = min+1;
		}
	}
	
	while(min>=60) {
		if (min >=60) {
			min = min-60;
			hr = hr+1;
		}
	}
	
	if (hr < 10) {hr = "0"+hr}
	if (min < 10) {min = "0"+min}
	if (segs < 10) {segs = "0"+segs}
	fin = hr+":"+min+":"+segs
	return fin;
}
var segundos = 0; 
function conta() {
segundos++;
document.getElementById("counter").innerHTML = formatatempo(segundos);
}

function inicia(){
interval = setInterval("conta();",1000);
}

function para(){
}

function zera(){
clearInterval(interval);
segundos = 0;
document.getElementById("counter").innerHTML = formatatempo(segundos);
}	

function showPosition(position) {
	tempo.push(document.getElementById("counter").textContent);
	clearInterval(interval);	
	localStorage.tempo = JSON.stringify(tempo);

	var latitude = position.coords.latitude.toString();
	var longitude = position.coords.longitude.toString();
	var g = new google.maps.Geocoder();
	g.geocode({
	  "location": new google.maps.LatLng(latitude, longitude)
	},
	function(results, status) {
	  if (status == google.maps.GeocoderStatus.OK) {
		  final = results[0].formatted_address;
		  chegada.push(final);		  
		  localStorage.chegada = JSON.stringify(chegada);
		/*  var metro = document.getElementsByClassName("adp-summary")[0].children[0].textContent;
		  console.log(metro);
		  metros.push(metro);
		  localStorage.metros = JSON.stringify(metros);*/
		  
	  }
	});
	var enderecoPartida = $("#txtEnderecoPartida").val();
	coord = latitude+","+longitude;
	var request = {
		origin: enderecoPartida,
		destination: coord,
		travelMode: google.maps.TravelMode.DRIVING
	};

	partida.push(request.origin);  
    localStorage.partida = JSON.stringify(partida);
	localStorage.tempo = JSON.stringify(tempo);
	directionsService.route(request, function(result, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			directionsDisplay.setDirections(result);
			metros.push(result.routes[0].legs[0].distance.text);
			localStorage.metros = JSON.stringify(metros);
			var vetor = [];	
			console.log(metros);	
			console.log( vetor.length);
			var aux = i;
			vetor = JSON.parse(localStorage.partida); 
			for (i = aux; i < vetor.length; i++) {
				var tr = document.createElement("tr");   
				tr.id = "tr"+i;   
				var vetor1 = []; 
				var vetor2 = [];
				var vetor3 = [];
				var vetor4 = [];		
				
				console.log(JSON.stringify(partida));
				var td1 = document.createElement("td");
				var td2 = document.createElement("td");
				var td3 = document.createElement("td");    
				var td4 = document.createElement("td");    
				
		
				vetor1 = JSON.parse(localStorage.partida);
				vetor2 = JSON.parse(localStorage.chegada);
				vetor3 = JSON.parse(localStorage.metros);
				vetor4 = JSON.parse(localStorage.tempo);
				
				
				td1.textContent = vetor1[i]; 
				td2.textContent = vetor2[i];
				td3.textContent = vetor3[i];
				td4.textContent = vetor4[i];		
				
				document.getElementById("tbody").appendChild(tr);
				document.getElementById("tr"+i).appendChild(td1);
				document.getElementById("tr"+i).appendChild(td2);
				document.getElementById("tr"+i).appendChild(td3);
				document.getElementById("tr"+i).appendChild(td4);
				
			}	
		}
	});

	
}

document.getElementById("btnEnviar").addEventListener("click",function () {
	navigator.geolocation.getCurrentPosition(showPosition);
	console.log(localStorage.partida); 
	

});


function adicionar() {


}

function apagar() {
    var horainicio = [];
    var horafim = [];
    var metros= [];
    var partida = [];
    var chegada = [];
    var i = 0;
    var vetor = JSON.parse(localStorage.partida); 
    console.log("tamanho "+vetor.length-1);
    for (i = 0; i < vetor.length; i++) {
        aux = document.getElementById("tr"+i);
        document.getElementById("tr"+i).parentNode.removeChild(aux);        
        
    }
    localStorage.clear();
}
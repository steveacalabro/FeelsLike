
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("phrase", function(request, response) {
	var temp=request.params.temp;
	var wind=request.params.wind;
	var hum=request.params.humidity;
	var ser=request.params.serverty;
	var type=request.params.type;
	var nsfw=request.params.nsfw;
  response.success(createPhrase(temp, wind, hum, ser, type, nsfw));
});

Parse.initialize("WAZOc6VldvRSqy8KjNPC71O2MoQRf7Q7K5a3xp37","WRZy60GqOSfbsfgZWgTJuELwg0HFqYhHyulIOMOW");
var good =["it's a'ight", "go have a picinic"];
var bad = ["you're FUCKED", "if god was lactose intolerant and ate a whole wheel of cheese, that is the weather today"];
//var pr=Parse.Object.extend("prefix");
//var query=new Parse.Query("prefix");
//var prefix=query.get("fragment");

/*query.find({
  success: function(results) {
    alert("Successfully retrieved " + results.length + " scores.");
    // Do something with the returned Parse.Object values
    for (var i = 0; i < results.length; i++) { 
      var object = results[i];
      alert(object.id + ' - ' + object.get('playerName'));
    }
  },
  error: function(error) {
    alert("Error: " + error.code + " " + error.message);
  }
});*/

var prefix = ["holy shit,", "goddamnit,", "whoa,", "shit...","whoa man,"];
var temp = [["its fucking cold, goddamnit", "it's cold as fucking shit","its colder than a witches tit out there"], 
          ["yeah, it's really cold", "it's freezing-ish", "it's cold as balls"], 
          ["its kinda chilly", "put a sweater on"], 
          ["the tempture isn't too bad"], 
          [], 
          ["es mucho calinte"], 
          ["you will sweat your balls off"]];
var wind=[[],[],["the wind is unbearable"]];
var humid=[[],[],[]];
var severity = [[],["light", "a little bit of", "slight", "some"],["heavy", "lots of", "a fuck ton of", "a metric fuck ton of"]];
var type= [[],["snow"],["thunderstormes"], ["rain"], ["sleet"],["fluries"]];
var con=["with", "and there is", "and"];

function createPhrase(t, w, h, s, ty, sensor){
    var phrase="";
    
    if (Math.abs(t-3)>=2){
        phrase+=(getRandon(prefix));
    }
    phrase+=(" "+ getRandon(temp[t]));
    if (ty>0){
        phrase+=(" "+getRandon(con));
        if (s>0){
            phrase+=(" "+getRandon(severity[s]));
        }
        phrase+=(curse())
        phrase+=(" "+getRandon(type[ty])+",");
    }
    if (w>1){
        phrase+=(" "+getRandon(severity[w])+curse()+" wind,")
    }
    if (h>1){
        phrase+=(" "+getRandon(severity[h])+curse()+" humidity,")
    }
    
    
    
    
    if (sensor){
        phrase=censor(phrase);   
    }
    phrase=phrase.charAt(0).toUpperCase() + phrase.slice(1);
    phrase=phrase.slice(0, phrase.length-1) +".";
	if ((phrase.split(",").length - 1)>1){
    	phrase=reverse(phrase);
    	phrase=phrase.replace(",", "dna ");
    	phrase=reverse(phrase);
	}
    return phrase;
}

function reverse(s){
    return s.split("").reverse().join("");
}
function isArray(Array) {
    return Array.constructor.toString().indexOf("Array") > -1;
}
function curse(){
    if ((Math.floor(Math.random()*2))>0){
        return " fucking";
    }
    else return "";
}
function getRandon(arr){
    return arr[Math.floor(Math.random()*arr.length)];}

function censor (phrase){
    phrase=phrase.replace(/balls/g, "&@!!$");
    phrase=phrase.replace(/shit/g, "$#!+");
    phrase=phrase.replace(/fuck/g, "%#^*");
    return phrase;
}

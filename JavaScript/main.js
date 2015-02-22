function createPhrase(t, w, h, s, ty, sensor){
Parse.initialize("WAZOc6VldvRSqy8KjNPC71O2MoQRf7Q7K5a3xp37","WRZy60GqOSfbsfgZWgTJuELwg0HFqYhHyulIOMOW");

//var good =["it's a'ight", "go have a picinic"];
/*var query=new Parse.Query("Good");
var good=[];
query.find({
    success: function(results) {
      for (var i = 0; i < results.length; ++i) {
		  good.push(results[i].get("phrase"));
      }
    },
  });
//var bad = ["you're FUCKED", "if god was lactose intolerant and ate a whole wheel of cheese, that is the weather today"];
query=new Parse.Query("Bad");
var bad=[];
query.find({
    success: function(results) {
      for (var i = 0; i < results.length; ++i) {
		  bad.push(results[i].get("phrase"));
      }
    },
  });
//var pr=Parse.Object.extend("prefix");
query=new Parse.Query("prefix");
var prefix=[]//query.equalTo("fragment", "holy shit,");
query.find({
    success: function(results) {
      for (var i = 0; i < results.length; ++i) {
		  console.log(results[i].get("fragment"));
		  prefix.push(results[i].get("fragment"));
      }
    },
  });
//var prefix = ["holy shit,", "goddamnit,", "whoa,", "shit...","woah man,"];
/*var temp = [["its cold as balls", "its cold as fuck","its colder than a witches tit out there"], 
          ["yeah, it's really cold"], 
          ["its kinda chilly", "put a sweater on"], 
          ["the tempture isn't too bad"], 
          [], 
          ["es mucho calinte"], 
          ["you will sweat your balls off"]];
	query=new Parse.Query("Temp");
	query.equalTo("level", t);
var temp=[];
query.find({
    success: function(results) {
      for (var i = 0; i < results.length; ++i) {
		  temp.push(results[i].get("fragment"));
      }
    },
  });
//var wind=[[],[],["the wind is unbearable"]];
	query=new Parse.Query("Wind");
	query.equalTo("level", w);
var wind=[];
query.find({
    success: function(results) {
      for (var i = 0; i < results.length; ++i) {
		  wind.push(results[i].get("fragment"));
      }
    },
  });
//var humid=[[],[],[]];
	query=new Parse.Query("Humidity");
	query.equalTo("level", h);
var humid=[];
query.find({
    success: function(results) {
      for (var i = 0; i < results.length; ++i) {
		  humid.push(results[i].get("fragment"));
      }
    },
  });
//var severity = [[],["light", "a little bit of", "slight"],["heavy", "lots of", "a fuck ton of", "a metric fuck ton of"]];
	query=new Parse.Query("Severity");
	query.equalTo("level", s);
var severity=[];
query.find({
    success: function(results) {
      for (var i = 0; i < results.length; ++i) {
		  severity.push(results[i].get("fragment"));
      }
    },
  });
//var type= [[],["snow"],["thunderstormes"], ["rain"], ["sleet"],["fluries"]];
	query=new Parse.Query("Type");
	query.equalTo("level", ty);
var type=[];
query.find({
    success: function(results) {
      for (var i = 0; i < results.length; ++i) {
		  type.push(results[i].get("fragment"));
      }
    },
  });
//var con=["with", "and there is", "and"];
	query=new Parse.Query("Conjunction");
var con=[];
query.find({
    success: function(results) {
      for (var i = 0; i < results.length; ++i) {
		  con.push(results[i].get("fragment"));
      }
    },
  });*/


    var phrase="";
    
    if (Math.abs(t-3)>=2){
        phrase+=(getRandon("prefix"));
    }
    phrase+=(" "+ getRandon(temp));
    if (ty>0){
        phrase+=(" "+getRandon(con));
        if (s>0){
            phrase+=(" "+getRandon(severity));
        }
        phrase+=(curse())
        phrase+=(" "+getRandon(type)+",");
    }
    if (w>1){
        phrase+=(" "+getRandon(severity)+curse()+" wind,")
    }
    if (h>1){
        phrase+=(" "+getRandon(severity)+curse()+" humidity,")
    }
    
    
    
    
    if (sensor){
        phrase=censor(phrase);   
    }
    phrase=phrase.charAt(0).toUpperCase() + phrase.slice(1);
    phrase=phrase.slice(0, phrase.length-1) +".";
    phrase=reverse(phrase);
    phrase=phrase.replace(",", "dna ");
    phrase=reverse(phrase);
    
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
function getRandon(name, level){
	var arr=[];
	query=new Parse.Query(name);
	query.equalTo("level", level);
	query.find({
    success: function(results) {
      for (var i = 0; i < results.length; ++i) {
		  arr.push(results[i].get("fragment"));
      }
    },
  });
    return arr[Math.floor(Math.random()*arr.length)];}

function getRandon(name){
	var arr=[];
	query=new Parse.Query(name);

	query.find({
    success: function(results) {
      for (var i = 0; i < results.length; ++i) {
		  arr.push(results[i].get("fragment"));
      }
    },
  });
    return arr[Math.floor(Math.random()*arr.length)];}

function censor (phrase){
    phrase=phrase.replace(/balls/g, "&@!!$");
    phrase=phrase.replace(/shit/g, "$#!+");
    phrase=phrase.replace(/fuck/g, "%#^*");
    return phrase;
}
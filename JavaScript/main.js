var good =["it's a'ight", "go have a picinic"];
var bad = ["you're FUCKED"];
var prefix = ["holy shit,", "goddamnit,", "whoa,", "shit...","woah man,"];
var temp = [["its cold as balls", "its cold as fuck","its colder than a witches tit out there"], 
          ["yeah, it's really cold"], 
          ["its kinda chilly", "put a sweater on"], 
          ["tempture isn't too bad"], 
          [], 
          [], 
          ["you will sweat your balls off"]];
var wind=[[],[],[]];
var humid=[[],[],[]];
var severity = [[],["light", "a little bit of", "slight"],["heavy", "lots of", "a fuck ton of", "a metric fuck ton of"]];
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
        phrase+=(" "+curse())
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
function getRandon(arr){
    return arr[Math.floor(Math.random()*arr.length)];}

function censor (phrase){
    phrase=phrase.replace(/balls/g, "&@!!$");
    phrase=phrase.replace(/shit/g, "$#!+");
    phrase=phrase.replace(/fuck/g, "%#^*");
    return phrase;
}
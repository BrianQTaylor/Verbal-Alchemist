var wordAPI = "https://random-word-api.herokuapp.com/word?number=1";

var body = document.querySelector("body")
var button = document.getElementById("button");
var word = document.getElementById(`wordContainer`)
var definition = document.getElementById(`definitionContainer`)
var saveBTN = document.getElementById("save")



var randomWord = () => {
    fetch(wordAPI)
        .then(response => {
        return response.json();
        })
        .then (response => {
        word.textContent = response;
        randomDefinition(response);
        })
}

var randomDefinition = (word) => {
    fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=661a7679-224c-4c9c-a51a-3baa9e09eca3`)
        .then(response =>{
        return response.json()

    })
    .then (response => {
        console.log(response)
        if (response[0].shortdef)
        definition.textContent = "Definition: " + response[0].shortdef;
        
    })  
    .catch(err => {
// insert a p tag here saying "Can not define word"
// need to figure out how to make this message pop up if the the length is greater than one 
if (response[0].shortdef.length[0])
definition.textContent = "Can not define the word"
        console.log(err)
    })

}




//local storage
saveBTN.addEventListener("click", function(){
    //console.log("hello")
    const word = word
    const definition = randomDefinition
    const favorword = {word, definition}
    localStorage.setItem("word", JSON.stringify(favoriteword))
   })
   
   // fix below
   var favoriteFruit = JSON.parse(localStorage.getItem("word"))


generateButton.addEventListener("click", function(){
     randomWord();
 })


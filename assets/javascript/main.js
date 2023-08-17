var wordAPI = "https://random-word-api.herokuapp.com/word?number=1";

var body = document.querySelector("body")
var button = document.getElementById("button");
var word = document.getElementById(`wordContainer`)
var definition = document.getElementById(`definitionContainer`)
 

var randomWord = () => {
    fetch(wordAPI)
        .then(response => {
        return response.json();
        })
        .then (response => {
        word.textContent = response;
        randomDefinition(word);
        })
}

var randomDefinition = (word) => {
    fetch(`https:www.dictionaryapi.com/api/v3/references/collegiate/json/${word.innerText}?key=661a7679-224c-4c9c-a51a-3baa9e09eca3`)
        .then(response =>{
        return response.json()

    })
    .then (response => {
        if (response[0].shortdef)
        definition.textContent = "Definition: " + response[0].shortdef;
        
    })  
    .catch(err => {
        console.log(err)
    })

}


generateButton.addEventListener("click", function(){
     randomWord();
 })


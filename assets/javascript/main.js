var wordAPI = "https://random-word-api.herokuapp.com/word?number=1";
// var dicAPI = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word.textContent}?key=661a7679-224c-4c9c-a51a-3baa9e09eca3`;

var body = document.querySelector("body")
var button = document.getElementById("button");
var word = document.createElement(`h1`)
var definition = document.createElement(`p`)
body.appendChild(definition) 

var randomWord = () => {
    fetch(wordAPI)
        .then(response => {
        return response.json();
        })
        .then (response => {
        word.textContent = response;
        body.appendChild(word);
        randomDefinition(word);
        })
}

var randomDefinition = (word) => {
    fetch(`https:www.dictionaryapi.com/api/v3/references/collegiate/json/${word.innerText}?key=661a7679-224c-4c9c-a51a-3baa9e09eca3`)
        .then(response =>{
        return response.json()
    })
    .then (response => {
        console.log(response[0].shortdef);
        if (response[0].shortdef)
        definition.textContent = "Definition: " + response[0].shortdef;
        body.appendChild(definition)
    })  
    .catch(err => {
        console.log(err)
    })

}


generateButton.addEventListener("click", function(){
     randomWord();

    console.log("button clicked")
 })


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
        // console.log(word)
        // console.log(word.innerText)
        randomDefinition(response);
        })
}

var randomDefinition = (word) => {
    // console.log(word)
    //     console.log(word.innerText)
    //https://www.dictionaryapi.com/api/v3/references/collegiate/json/voluminous?key=your-api-key
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
        
        console.log(err)
    })

}


generateButton.addEventListener("click", function(){
     randomWord();
 })


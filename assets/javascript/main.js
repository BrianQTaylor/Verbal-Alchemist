var wordAPI = "https://random-word-api.herokuapp.com/word?number=1";

var body = document.querySelector("body")
var button = document.getElementById("button");
var word = document.getElementById(`wordContainer`)
var definition = document.getElementById(`definitionContainer`)
var saveBTN = document.getElementById("save")
var storeWord = document.getElementById("storeWord")
var storeDefinition = document.getElementById("storeDefinition")

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
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(response => {
        console.log(response);

        if (Array.isArray(response) && response.length === 20) {
            // Log an error if the response is an array of 20 items
            console.error('API response contains 20 items');
            definition.textContent = "Word Cannot be defined";
        } else if (response[0]?.shortdef) {
            // Display the definition if it exists
            definition.textContent = "Definition: " + response[0].shortdef;
        } else {
            // Display an error message if definition doesn't exist
            definition.textContent = "Word cannot be defined";
        }
    })
    .catch(err => {
        console.error('Error fetching or processing API:', err);
        definition.textContent = "Error fetching definition";
    });

}

generateButton.addEventListener("click", function(){
     randomWord();
 })

 saveBTN.addEventListener("click", () => {
    const savedWord = word.textContent;
    const savedDefinition = definition.textContent;

    if (savedWord && savedDefinition) {
        const savedData = {
            word: savedWord,
            definition: savedDefinition
        };
        localStorage.setItem("savedData", JSON.stringify(savedData));
        console.log("Word and definition saved to local storage!");
    } else {
        console.log("No word or definition to save.");
    }
});

// Function to display saved data on the screen
var displaySavedData = () => {
    var savedDataJSON = localStorage.getItem("savedData");
    
    if (savedDataJSON) {
        const savedData = JSON.parse(savedDataJSON);
        console.log(savedData)
        storeWord.textContent = savedData.word;
        storeDefinition.textContent = savedData.definition;
        console.log("Saved data loaded from local storage!");
    } else {
        console.log("No saved data found in local storage.");
    }
};

// Call the function to display saved data when the page loads
document.addEventListener("click", displaySavedData);
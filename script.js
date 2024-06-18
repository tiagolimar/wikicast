document.getElementById('searchButton').addEventListener('click', async () => {
    const term = document.getElementById('searchTerm').value;
    if (term) {
        const content = await fetchWikipediaContent(term);
        // if (content.type === 'disambiguation') {
        //     displayOptions(content);
        // } else {
        // }
        speakText(content.extract);
    }
});

async function fetchWikipediaContent(term) {
    // const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${term}`);
    const response = await fetch(`https://pt.wikipedia.org/w/rest.php/v1/page/${term}`);
    const data = await response.json();
    return data;
}

function speakText(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
}

function displayOptions(content) {
    const optionsContainer = document.createElement('div');
    console.log(content.titles);
    content.titles.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option.title;
        button.addEventListener('click', async () => {
            const specificContent = await fetchWikipediaContent(option.title);
            speakText(specificContent.extract);
        });
        optionsContainer.appendChild(button);
    });
    document.getElementById('app').appendChild(optionsContainer);
}

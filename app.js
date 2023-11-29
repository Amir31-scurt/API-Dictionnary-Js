const defContainer = document.querySelector('.p2');
defContainer.classList.add('d-none');
function search() {
  const word = document.getElementById('wordInput').value.trim();
  const apiUrl = `https://www.larousse.fr/dictionnaires/francais/${word}`;
  fetch(apiUrl)
    .then((response) => response.text())
    .then((html) => {
      const parser = new DOMParser();
      const Oridoc = parser.parseFromString(html, 'text/html');
      const definitionContainer = Oridoc.querySelector('.Definitions');
      let definition = 'No definition found';
      let example = 'NO example found';
      if (definitionContainer) {
        // Select the first complete sentence marked by "1."
        const sentences = definitionContainer.textContent.split('1.');
        //console.log(sentences);
        if (sentences.length > 1) {
          defContainer.classList.remove('d-none');
          // Get the first complete sentence after "1."
          definition = sentences[1].trim().split(':')[0] + '.';
          var colonIndex = sentences[1].indexOf(':');
          var dotIndex = sentences[1].indexOf('.');
          example = sentences[1].slice(colonIndex + 1, dotIndex);
        }
      }

      displayDefinition(definition, example);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
}
function displayDefinition(definition, example) {
  const word = document.getElementById('wordInput').value.trim();
  const wordVal = document.querySelector('.mot');
  wordVal.innerHTML = word;
  const definitionContainer = document.getElementById('description');
  definitionContainer.innerHTML = '';

  const definitionParagraph = document.createElement('p');
  const exampleParagraphe = document.createElement('p');
  definitionParagraph.textContent = `Définition: ${definition}`;
  exampleParagraphe.textContent = `Exemple : ${example}`;
  definitionContainer.appendChild(definitionParagraph);
  definitionContainer.appendChild(exampleParagraphe);
}

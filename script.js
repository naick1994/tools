// Configura la tua chiave API e l'ID del foglio
const apiKey = 'AIzaSyDMKwT8XY6Id2zPGfquTX7S0TwLVox4LWk'; // La tua API Key
const spreadsheetId = '1BOQ9CjjzxVD1fP5uwSr_TOIy8o_Xva_8Jz2TZ4W-t3c'; // ID del foglio Google
const sheetName = 'Foglio1'; // Nome del foglio

// URL per l'API di Google Sheets
const sheetURL = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}?key=${apiKey}`;

// Carica i dati dal Google Sheets
fetch(sheetURL)
  .then(response => response.json())
  .then(data => {
    if (!data.values || data.values.length < 2) {
      throw new Error('Il foglio è vuoto o non ha abbastanza righe.');
    }

    const rows = data.values;
    const tools = rows.slice(1).map(row => ({
      name: row[0], // Prima colonna: Nome
      category: row[1], // Seconda colonna: Categoria
      description: row[2], // Terza colonna: Descrizione
      link: row[3], // Quarta colonna: Link
    }));

    // Mostra i tool sulla pagina
    displayTools(tools);

    // Aggiungi il filtro di ricerca
    const searchBox = document.getElementById('searchBox');
    searchBox.addEventListener('input', () => {
      const filteredTools = tools.filter(tool =>
        tool.name.toLowerCase().includes(searchBox.value.toLowerCase()) ||
        tool.category.toLowerCase().includes(searchBox.value.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchBox.value.toLowerCase())
      );
      displayTools(filteredTools);
    });
  })
  .catch(error => console.error('Errore nel caricamento dei dati:', error));

// Funzione per mostrare i tool
function displayTools(tools) {
  const toolsContainer = document.getElementById('toolsContainer');
  toolsContainer.innerHTML = '';

  tools.forEach(tool => {
    const toolCard = document.createElement('div');
    toolCard.className = 'tool-card';

    toolCard.innerHTML = `
      <h2>${tool.name}</h2>
      <p><strong>Categoria:</strong> ${tool.category}</p>
      <p>${tool.description}</p>
      <a href="${tool.link}" target="_blank">Scopri di più</a>
    `;

    toolsContainer.appendChild(toolCard);
  });
}
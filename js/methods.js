async function getGroups() {
    try {
      const scriptUrl = 'https://script.google.com/macros/s/AKfycbwqqlwySYEoJPwUH0sTA1wwwWJryCO4ngpqyn8XluVXwl5qOQPj5TKE1IgqLvUmCiOt1g/exec';
      const response = await fetch(scriptUrl);
      
      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }
  
      const data = await response.json();
      
      // Crear la constante messages
      const messages = data.map(row => ({
        id: row[0],
        title: row[1], // Columna B
        body: row[2]   // Columna C
      }));
  
      // Filtrar y ordenar messages
      const filteredMessages = messages.filter(mgs => mgs.body.trim() !== "");
      filteredMessages.sort((a, b) => a.id - b.id);
  
      return filteredMessages; // Retornar la constante messages
  
    } catch (error) {
      console.error("Error al obtener los datos:", error);
      return []; // Retornar un arreglo vacío en caso de error
    }
  }
  
  function createGroupStats(registered, pending, attended) {
    const nav = document.createElement('nav');
    nav.className = "level";
  
    const stats = [
      { heading: 'Grupos Registrados', title: registered },
      { heading: 'Grupos Pendientes', title: pending },
      { heading: 'Grupos Atendidos', title: attended },
    ];
  
    stats.forEach(stat => {
      const levelItem = document.createElement('div');
      levelItem.className = "level-item has-text-centered";
  
      const innerDiv = document.createElement('div');
  
      const headingElement = document.createElement('p');
      headingElement.className = "heading";
      headingElement.textContent = stat.heading;
  
      const titleElement = document.createElement('p');
      titleElement.className = "title";
      titleElement.textContent = stat.title;
  
      innerDiv.appendChild(headingElement);
      innerDiv.appendChild(titleElement);
      levelItem.appendChild(innerDiv);
      nav.appendChild(levelItem);
    });
  
    // Agregar el nav al contenedor
    const container = document.getElementById('stats-container'); // Cambia a tu contenedor
    if (container) {
      container.prepend(nav);
    } else {
      console.error('No se encontró el contenedor especificado.');
    }
  }
  
  function createMessage(title, body) {
    const article = document.createElement('article');
    article.className = "message is-info"; // Cambiar a "is-dark" si prefieres
  
    const header = document.createElement('div');
    header.className = "message-header";
    header.innerHTML = `<p>${title}</p>`; // Solo muestra el título
  
    const bodyDiv = document.createElement('div');
    bodyDiv.className = "message-body";
    bodyDiv.textContent = body;
  
    article.appendChild(header);
    article.appendChild(bodyDiv);
  
    document.getElementById('messages-container').appendChild(article);
  }


  function deleteFirstMessage() {
    const messageContainer = document.getElementById('messages-container');
    const firstMessage = messageContainer.querySelector('article'); // Seleccionar el primer mensaje
    if (firstMessage) {
        messageContainer.removeChild(firstMessage); // Eliminar el primer mensaje
    } else {
        console.log("No hay mensajes para eliminar.");
    }
}
  
  document.addEventListener("DOMContentLoaded", async function() {
    const messages = await getGroups(); // Esperar a que se obtengan los mensajes
    createGroupStats(20, 5, 15); // Puedes cambiar estos números según los datos reales
  
    console.log(messages); // Para verificar que se obtienen los mensajes
  
    messages.forEach(msg => createMessage(msg.title, msg.body));


    // Agregar evento al botón de eliminar
    const deleteButton = document.getElementById('delete-group-button');
    deleteButton.addEventListener('click', deleteFirstMessage);
  });
  
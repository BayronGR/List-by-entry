document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault(); // Previene la acción por defecto del formulario
  document.getElementById("message").textContent = "Enviando...";
  document.getElementById("message").style.display = "block";
  document.getElementById("submit-button").disabled = true;

  // Recolección de datos del formulario
  var formData = new FormData(this);
  var keyValuePairs = [];
  for (var pair of formData.entries()) {
    keyValuePairs.push(pair[0] + "=" + pair[1]);
  }

  var formDataString = keyValuePairs.join("&");

  // Enviar una solicitud POST al script de Google Apps
  fetch(
    "https://script.google.com/macros/s/AKfycbwLVHQlHNLa8fBwFamcT3iHxYSq67j4mvs1rInY-ie7ZiSmIcwvenAaT-BrES6AtbsgDA/exec",
    {
      redirect: "follow",
      method: "POST",
      body: formDataString,
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
    }
  )
    .then(function (response) {
      if (response.ok) {
        return response.text();
      } else {
        throw new Error("Error en el envío");
      }
    })
    .then(function (data) {
      // Mensaje de éxito
      document.getElementById("message").textContent =
        "Datos enviados correctamente!";
      document.getElementById("message").style.display = "block";
      document.getElementById("message").style.backgroundColor = "green";
      document.getElementById("message").style.color = "white";
      document.getElementById("submit-button").disabled = false;
      document.getElementById("form").reset();

      setTimeout(function () {
        document.getElementById("message").style.display = "none";
      }, 3000);
    })
    .catch(function (error) {
      // Mensaje de error
      console.error(error);
      document.getElementById("message").textContent =
        "Ocurrió un error al enviar el formulario.";
      document.getElementById("message").style.display = "block";
      document.getElementById("message").style.backgroundColor = "red";
      document.getElementById("message").style.color = "white";
      document.getElementById("submit-button").disabled = false;
    });
});

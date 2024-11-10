function doPost(e) {
    // Obtener los datos del formulario
    var params = e.parameter;
    
    // Definir la hoja de cálculo donde se guardarán los datos
    var sheet = SpreadsheetApp.openById('1s7USlF57KrEAkYsJPWvmfcrqmWs2GXnPaB-NZEyeKc4').getSheetByName('Asistencia'); // Cambia 'Hoja1' por el nombre de tu hoja
    
    // Obtener el último número registrado en la columna A (sin contar la primera fila)
    var lastRow = sheet.getLastRow();
    var lastId = 0;
    
    // Verificar si hay registros previos (sin contar la primera fila)
    if (lastRow > 1) {
      // Obtener todos los valores de la columna A, comenzando desde la segunda fila
      var ids = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
      
      // Buscar el mayor ID registrado
      lastId = Math.max.apply(null, ids.flat());
    }
    
    // Generar el nuevo ID (último ID + 1)
    var newId = lastId + 1;
    
    // Obtener los datos del formulario
    var mesa = params['Numero de mesa']; // Este es el valor de la mesa (columna B)
    var ayudaRevisión = params['Ayuda o revision']; // Ayuda o Revisión (columna C)
    var detalles = params['Notas']; // Detalles (columna D)
    
    // Insertar los datos en la hoja de cálculo (columna E queda vacía)
    sheet.appendRow([newId, mesa, ayudaRevisión, detalles, '']); // Deja la columna E vacía
    
    // Retornar una respuesta al usuario (opcional)
    return ContentService.createTextOutput("Datos registrados correctamente.");
  }
  
let asistencia;

async function getAsist()
{
    try {
        // Fetch first 10 files
        response = await gapi.client.sheets.spreadsheets.values.get({
          spreadsheetId: '1s7USlF57KrEAkYsJPWvmfcrqmWs2GXnPaB-NZEyeKc4',
          range: 'Asistencia Data!A:D',
        });
      } catch (err) {
        document.getElementById('content').innerText = err.message;
        return;
      }
      const range = response.result;
      if (!range || !range.values || range.values.length == 0) {
        document.getElementById('content').innerText = 'No values found.';
        return;
      }
      
      asist = [];
      range.values.forEach(fila => {
        if(isNaN(parseInt(fila[0])) || fila[3] !== undefined) return;

        const newAsist = {
            Id:fila[0],
            Grupo: fila[1],
            Estado: fila[2],
            fecha_terminado: fila[3]
        };

        asist.push(newAsist);
      });
      console.log(asist);
}
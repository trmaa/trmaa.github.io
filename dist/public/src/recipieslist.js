async function read() {
    const script = await fetch('./src/htmlcount.sh');
    const json = './src/html_files.json';
    try {
        const respuesta = await fetch(json);
        if (!respuesta.ok) {
            throw new Error('Error al cargar el archivo JSON');
        }
        const datosJSON = await respuesta.text(); 
        const datos = JSON.parse(datosJSON);
        return datos;
    } catch (error) {
        console.error('Error al leer el archivo JSON:', error);
    }
}

let data = await read();
console.log(data);
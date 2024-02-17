export async function read(pack) {
    const json = pack;
    try {
        const respuesta = await fetch(json);
        if (!respuesta.ok) {
            console.error('Error al cargar el archivo JSON');
            return "";
        }
        const datosJSON = await respuesta.text();
        const datos = JSON.parse(datosJSON);
        return datos;
    } catch (error) {
        console.error('Error al leer el archivo JSON:', error);
        return "";
    }
}
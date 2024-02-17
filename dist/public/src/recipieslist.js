import { pixa,verify } from "./pixabay.js";

async function read() {
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

async function main() {
    let data = await read();
    console.log(data);

    let article = document.querySelector("#articulo");
    article.style.gridTemplateRows = `repeat(${3 + Math.floor(data.length / 3)}, 1fr)`;

    let components = [];
    for (const item of data) {
        try {
            let localImageURL = `./pages/${encodeURIComponent(item.title.trim())}.jpg`;
            let imageExists = await verify(localImageURL);
            let imageURL = imageExists ? localImageURL : await pixa(item.title.trim());
            
            components.push(`
                <div class="miniatura">
                   <div class="img"><img src="${imageURL}"></img></div>
                   <h3>${item.title}</h3>
                   <p>Fantastic dish</p>
                   <div class="button"><button onclick="window.goTo('./pages/${encodeURIComponent(item.title.trim())}.html')">See more</button></div>
                </div>
            `);
        } catch (error) {
            console.error(error);
        }
    }

    article.innerHTML = components.join('');
}

main();
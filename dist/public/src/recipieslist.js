import { pixa, verify } from "./pixabay.js";
import { read } from "./json.js";

async function main() {
    let data = await read('./src/html_files.json');
    console.log(data);

    let article = document.querySelector("#articulo");
    article.style.gridTemplateRows = `repeat(${3 + Math.floor(data.length / 3)}, 1fr)`;

    let components = [];
    for (const item of data) {
        try {
            let localImageURL = `./pages/${encodeURIComponent(item.title.trim())}.jpg`;
            let imageExists = await verify(localImageURL);
            let imageURL = imageExists ? localImageURL : await pixa(item.title.trim());

            let encodedTitle = encodeURIComponent(item.title.trim()).replace(/%20/g, '_');

            let descripcion = await read(`./pages/${encodedTitle}.json`);

            components.push(`
                <div class="miniatura">
                   <div class="img" style="border-radius:10px;"><img src="${imageURL}"></img></div>
                   <h3>${item.title}</h3>
                   <p>${descripcion.text}</p>
                   <div class="button"><button onclick="window.goTo('./pages/${encodedTitle}.html')">See more</button></div>
                </div>
            `);
        } catch (error) {
            console.error(error);
        }
    }

    article.innerHTML = components.join('');
}

main();
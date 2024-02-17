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
    article.style.gridTemplateRows = `repeat(${3+Math.floor(data.length/3)},1fr)`;

    let components = data.map(item => `
        <div class="miniatura">
           <div class="img"><img src="comunity.jpg"></img></div>
           <h3>${item.title}</h3>
           <p>Fantastic dish</p>
           <div class="button"><button onclick="window.goTo('${item.title}.html')">See more</button></div>
        </div>
    `);

    article.innerHTML = components.join('');
}

main();
import rutaImagen from "../assets/img/Muneco.png";
let sinTraduccion = true;
const CODIGOS = {
                a: "ai",
                e: "enter",
                i: "imes",
                o: "ober",
                u: "ufat"
            };

// Vector de las claves del diccionario CODIGOS.
let vocales = Object.keys(CODIGOS);

let contenedorTraductor = document.querySelector('.contenedor_traductor');



function encriptarTexto(){
    let textoIngresado = document.getElementById('texto').value;

    if(textoIngresado) {
        textoIngresado = textoIngresado.toLowerCase();
        console.log(textoIngresado);

        if(verificarTexto(textoIngresado)){
            let textoEncriptado = "";



            for(let i = 0; i < textoIngresado.length; i++){
                if(textoIngresado[i] === 'a'){
                    textoEncriptado += CODIGOS['a'];
                } else if (textoIngresado[i] === 'e'){
                    textoEncriptado += CODIGOS['e'];
                } else if (textoIngresado[i] === 'i'){
                    textoEncriptado += CODIGOS['i'];
                } else if (textoIngresado[i] === 'o'){
                    textoEncriptado += CODIGOS['o'];
                } else if (textoIngresado[i] === 'u'){
                    textoEncriptado += CODIGOS['u'];
                } else {
                    textoEncriptado += textoIngresado[i];
                }
            }

            mostrarTraduccion(capitalizarPrimeraLetra(textoEncriptado));
            console.log(`Texto encriptado ${textoEncriptado}`);
        }
    }
}

function desencriptarTexto(){
    let textoIngresado = document.getElementById('texto').value;

    if(textoIngresado){
        let textoDesencriptado = textoIngresado;

        for (let i = 0; i < vocales.length; i++) {
            textoDesencriptado = textoDesencriptado.replaceAll(CODIGOS[vocales[i]], vocales[i]);
        }

        mostrarTraduccion(capitalizarPrimeraLetra(textoDesencriptado));
        console.log(`Texto desencriptado ${textoDesencriptado}`);
    }
}



function verificarTexto(texto){
    let regex = /^[a-zA-Z0-9\s]+$/;
    let esValido = false;
    if(regex.test(texto)) {
        console.log("No contiene caracteres especiales ni letras con acento.")
        esValido = true;
    } else {
        console.log("No es texto valido");
        alert("No se puede traducir texto");
        esValido = false;
    }

    return esValido;
}


function mostrarMensajeSinTraduccion(){
    contenedorTraductor.innerHTML = '';

    // Creo un div.
    let contenedorImagen = document.createElement('div');
        
    // Creo una etiqueta imagen
    let imagen = document.createElement('img');
    imagen.src = rutaImagen;


    // Creo una clase para el div
    contenedorImagen.classList.add('contenedor_imagen');

    // Añado a la imagen como un hijo del div contenedor_imagen
    contenedorImagen.appendChild(imagen);

    // Creo un parrafo
    let parrafo = document.createElement('p');
    parrafo.innerHTML = '<span>Ningún mensaje fue encontrado</span>Ingresa el texto que desees encriptar o desencriptar';


    contenedorTraductor.appendChild(contenedorImagen);
    contenedorTraductor.appendChild(parrafo);
}

function mostrarTraduccion(textoEncriptado){
    contenedorTraductor.innerHTML = '';

    // Creo una etiqueta de parrafo.
    let textoTraducido = document.createElement('p');
    textoTraducido.innerHTML = textoEncriptado;
    textoTraducido.classList.add('traduccion');
    // Creo un boton
    let botonCopiar = document.createElement('button');
    botonCopiar.innerHTML = "Copiar"
    botonCopiar.classList.add('btn');
    botonCopiar.id = 'btnCopiar';

    botonCopiar.onclick = function() {
        copiarTexto(textoEncriptado);
    }

    contenedorTraductor.appendChild(textoTraducido);
    contenedorTraductor.appendChild(botonCopiar);

    textoTraducido.style.width = '90%';
    textoTraducido.style.textAlign = 'start';
    textoTraducido.style.overflowWrap = 'break-word';
    contenedorTraductor.style.justifyContent = 'space-between';
    contenedorTraductor.style.padding = '17px 8px';
    contenedorTraductor.style.width = '95%';
}

function capitalizarPrimeraLetra(texto){
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
}

function copiarTexto(textoTraducido){
    // Utilizo API de Clipboard para copiar el texto.

    navigator.clipboard.writeText(textoTraducido)
        .then(() => {
            alert("Texto copiado");
        })
        .catch((err) => {
            console.error(`Error al copiar texto: ${err}`);
        })
    
}




if(sinTraduccion){
    mostrarMensajeSinTraduccion();
}


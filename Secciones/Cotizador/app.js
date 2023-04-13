const form = document.querySelector("#formulario");
const moneda = document.querySelector("#monedas");
const criptomoneda = document.querySelector("#criptomonedas");
const containerform = document.querySelector(".container-form")
const containeranswer = document.querySelector(".container-answer");

const objBusqueda = {
    moneda: 'USD',
    criptomoneda: ''
}

function selectCriptos(criptos) {
    criptos.forEach(cripto => {
        const { FullName, Name } = cripto.CoinInfo;
        const option = document.createElement("option");

        option.value = Name;
        option.textContent = FullName + " " + "(" + Name + ")";

        criptomoneda.appendChild(option);
    });
}

function consultarCriptos() {
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=30&tsym=USD';
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(respuestaJson => {
            selectCriptos(respuestaJson.Data);
            objBusqueda.criptomoneda = respuestaJson.Data[0].CoinInfo.Name;
        })
        .catch(error => console.log(error))
}

function limpiarHTML(){
    containeranswer.innerHTML = '';
}

function mostrarCotizacion(data) {
    limpiarHTML();
    
    const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL } = data;

    const answer = document.createElement('div');
    answer.classList.add('display-info');
    answer.innerHTML = `
    
        <img src="https://www.cryptocompare.com/${IMAGEURL}" width="80" alt="Texto alternativo de la imagen">
        <p class="main-price">Precio: <span>${PRICE}</span></p>
        <p>Precio mas alto del dia: <span>${HIGHDAY}</span></p>
        <p>Precio mas bajo del dia: <span>${LOWDAY}</span></p>
        <p>Variacion 24 Hs.: <span>${CHANGEPCT24HOUR}%</span></p>
    `;

    containeranswer.appendChild(answer);
}

function consultarApi(moneda, criptomoneda) {
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
    console.log(url);

    fetch(url)
        .then(resultado => resultado.json())
        .then(resultadoJson => {

            mostrarCotizacion(resultadoJson.DISPLAY[criptomoneda][moneda]);
            //console.log(resultadoJson.DISPLAY[criptomoneda][moneda]);
        })
        .catch(error => console.log(error))
}

function submitForm(e) {
    e.preventDefault();

    const { moneda, criptomoneda } = objBusqueda;
    consultarApi(moneda, criptomoneda);
}

function getValue(e) {
    objBusqueda[e.target.name] = e.target.value;
}

document.addEventListener('DOMContentLoaded', () => {
    consultarCriptos();

    form.addEventListener('submit', submitForm);
    moneda.addEventListener('change', getValue);
    criptomoneda.addEventListener('change', getValue);
});


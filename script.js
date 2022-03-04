const APIKEY = 'f25110b0f83adb9f7c080ee182cd1d00';

let latitude = 0;
let longitude = 0;
let meuNumero;
let maximaTemp;
let minimaTemp;
let veloVento;
let humidade;
let minhaCidade, meuPais;

function getPosition(callback){
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                latitude = position.coords.latitude;
                longitude = position.coords.longitude;
                callback()
            },
            function (error) {
                console.log(error);
            })
    } else {
        alert("I'm sorry, but geolocation services are not supported by your browser.");
        }
}

function getTemperature() {
    let apiGet = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIKEY}&units=metric`;
    axios.get(apiGet)
    .then((response)=>{
        console.log(response.data);
        let iconeImagem = response.data.weather[0].icon
        let urlImg = `https://openweathermap.org/img/wn/${iconeImagem}@2x.png`;
        
        
        mostrarCidadePais(response.data.name, response.data.sys.country);
        mostrarIndicesDeTemp(response.data.main.temp_min, response.data.main.temp_max);
        mostrarVentoUmidade(response.data.main.humidity, response.data.wind.speed);
        mostrarIcone(urlImg);
    })
    .catch((error)=>{
        console.log(error.response);
    })
}

getPosition(getTemperature);   

function mostrarCidadePais(cidade, pais) {
    minhaCidade = cidade;
    meuPais = pais;
    const informacaoCidadeEPais = document.querySelector('main h1');
    informacaoCidadeEPais.innerHTML = `${cidade}, ${pais}`;
}

function mostrarIndicesDeTemp(tempMinima, tempMaxima){
    maximaTemp = tempMaxima;
    minimaTemp = tempMinima;
    const elementTemperatura = document.querySelector('.temp-max-min');
    elementTemperatura.innerHTML = `
    <div class="min"><p>Mínima</p><p>${tempMinima.toFixed(2)}°C</p></div>
    <div class="max"><p>Máxima</p><p>${tempMaxima.toFixed(2)}°C</p></div>
    `;
}

function mostrarVentoUmidade(umidadeLocal, velocidadeVento){
    veloVento = velocidadeVento;
    humidade = umidadeLocal;
    const elementVento = document.querySelector('.vento-umidade');
    elementVento.innerHTML = `
    <div class="vento"><p>Vento</p><p>${velocidadeVento.toFixed(2)}Km/h</p></div>
    <div class="umidade"><p>Umidade</p><p>${umidadeLocal.toFixed(2)}%</p></div>
    `;
}

function mostrarIcone(urlImg){
    let geral = document.querySelector('.geral')
    geral.innerHTML = `<img src="${urlImg}" alt="">`;
}

function compartilhar(){

    meuNumero = prompt('Qual seu número de Whatsap ? (Não se esqueça DDD+Numero)')
    const preMensagem = ('Tempo na sua localidade:'
    + `\n - Minha Cidade: ${minhaCidade}, ${meuPais}`
    + `\n - Temperatura Maxima: ${minimaTemp}°C`
    + `\n - Temperatura Mínima: ${maximaTemp}°C`
    + `\n - Velocidade Vento: ${veloVento} km/h`
    + `\n - Humidade: ${humidade}%`)
    
    const url = `https://wa.me/55${meuNumero}?text=` + encodeURIComponent(preMensagem);
    window.open(url,'_blank');
}

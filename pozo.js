var content1 = document.getElementById('contenido1');
var content2 = document.getElementById('contenido2');
var content3 = document.getElementById('contenido3');
var content5 = document.getElementById('contenido5');
var dat = document.getElementById('date');
var millon = document.getElementById('millones');
var title = document.getElementById('title1');
var Unidad = document.getElementById('pozoUnidad');

const idPanel = 1;

async function init() {
  await getUser();
  await mostrarImagenSegunHora();
}

async function mostrarImagenSegunHora() {
  var now = new Date();
  var hours = now.getHours();

  content1.style.display = 'none';
  content2.style.display = 'none';
  content3.style.display = 'none';
  content5.style.display = 'none';

  if (hours < 10) {
      content1.style.display = 'block';
  } else if (hours >= 10 && hours < 16) {
      content2.style.display = 'block';
  } else if (hours >= 16 && hours < 19) {
      content3.style.display = 'block';
  } else if (hours >= 19) {
      content5.style.display = 'block';
  }
}

async function getUser() {
  const coord = await axios.get(`https://apialacooh.alacoohecuador.com/playlist/panel/${idPanel}`);
  var latitud = coord.data.data[0].point.coordinates[0];
  var longitud = coord.data.data[0].point.coordinates[1];
  const response = await axios.get(`https://weatherstation.alacoohperu.pe/api/clima/${latitud}/${longitud}`);
  //const response2 = await axios.get(`https://weatherstation.alacoohperu.pe/api/climagrados/${latitud}/${longitud}`);
  const text_clima = response.data.data.weather[0].description;
  const datatemp = response.data.data.main.temp.toFixed(0);
  const result = datatemp.toString();
  const fecha = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dateEs = fecha.toLocaleDateString('es-ES', options);
  const palabras = dateEs.split(",");
  const palabraDia = palabras[0][0].toUpperCase() + palabras[0].substr(1);
  const palabraFecha = palabras[1];
  const unir = palabraDia + "," + palabraFecha;
  document.getElementById('title1').innerHTML = result+'°';
  function formatAMPM(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // La hora 0 debe ser 12
    minutes = minutes < 10 ? '0' + minutes : minutes; // Si los minutos son menores a 10, añadir un 0 al inicio
    const strTime = hours + ':' + minutes;
    return { strTime, ampm };
  }

  function updateTime() {
    const date = new Date();
    const { strTime, ampm } = formatAMPM(date);
    document.getElementById('hours').innerText = strTime;
    document.getElementById('ampm').innerText = ampm;
  }

  // Actualizar la hora cada segundo
  setInterval(updateTime, 1000);

  // Mostrar la hora al cargar la página
  updateTime();
}

init();

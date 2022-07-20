import fecthAPI from './fetch/fecthAPI.js';

let datos = [];

document.addEventListener('click', e => {
  if (e.target.matches('#button__theme')) {
    cambiarTema();
  }
  if (e.target.matches('#select__continent')) {
    mostrarMenu();
  }

  if (e.target.matches('.list__select li')) {
    cambiarRegion(e);
    let regionElegida = e.target.dataset.continent;
    filtrarRegion(regionElegida);
  }
  e.stopPropagation();
});

document.addEventListener('DOMContentLoaded', () => {
  fecthAPI().then(data => {
    data.forEach(item => {
      datos.push(item);
    });
    mostrarCards(data);
  });
});

document.addEventListener('keyup', e => {
  const showRegion = document.querySelector('#select__continent span');
  showRegion.textContent = 'Filter by Region';

  if (e.target.matches('#searchCountry')) {
    const paisB = e.target.value;
    if (paisB) {
      buscarPais(paisB);
    } else {
      mostrarCards(datos);
    }
  }
});

const cacheTema =
  localStorage.getItem('theme') ||
  (window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light');
if (cacheTema) {
  document.documentElement.setAttribute('data-theme', cacheTema);
}

const cambiarTema = () => {
  const actualTema = document.documentElement.getAttribute('data-theme');
  let cambiarTema = '';

  if (actualTema === 'light') {
    cambiarTema = 'dark';
  } else {
    cambiarTema = 'light';
  }

  mostrarBtnTheme(cambiarTema);

  document.documentElement.setAttribute('data-theme', cambiarTema);
  localStorage.setItem('theme', cambiarTema);
};

const mostrarBtnTheme = id => {
  const template__theme = document.getElementById('template__theme');
  const button__theme = document.getElementById('button__theme');

  button__theme.textContent = '';

  const clone = template__theme.content.cloneNode(true);
  const btnclone = clone.getElementById(`${id}theme`);

  button__theme.appendChild(btnclone);
};

mostrarBtnTheme(cacheTema);

const mostrarMenu = () => {
  const showMenu = document.querySelector('#select__continent ul');
  showMenu.classList.toggle('display__none');
};

const cambiarRegion = e => {
  const showRegion = document.querySelector('#select__continent span');
  showRegion.textContent = e.target.textContent;
  mostrarMenu();
};

const filtrarRegion = region => {
  let data = datos.filter(pais => pais.region === region);
  mostrarCards(data);
};

const mostrarCards = data => {
  const template__countries = document.getElementById(
    'template__countries',
  );
  const fragment = document.createDocumentFragment();
  const cards__countries = document.querySelector('.cards__countries');

  cards__countries.textContent = '';

  data.forEach(pais => {
    const clone = template__countries.content.cloneNode(true);
    clone.querySelector('.card img').setAttribute('src', pais.flags.png);
    clone.querySelector('.card__des h4').textContent = pais.name.common;
    clone.querySelector('.card__Pop').textContent = pais.population;
    clone.querySelector('.card__Reg').textContent = pais.region;
    clone.querySelector('.card__Cap').textContent = pais.capital;

    fragment.appendChild(clone);
  });

  cards__countries.appendChild(fragment);
};

const buscarPais = paisBuscado => {
  let data = datos.filter(pais => {
    if (pais.name.common.toLowerCase().indexOf(paisBuscado) === -1) {
      return;
    } else {
      return pais;
    }
  });
  mostrarCards(data);
};
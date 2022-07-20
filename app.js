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
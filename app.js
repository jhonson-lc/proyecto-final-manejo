document.addEventListener('click', e => {
  if (e.target.matches('#button__theme')) {
    cambiarTema();
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
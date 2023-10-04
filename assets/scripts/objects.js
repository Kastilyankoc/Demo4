// const userChosenKeyName = 'level';

// const person = {
//   bittle,
//   name: 'Max',
//   age: 30,
//   hobbies: ['Sports', 'Cooking'],
//   [userChosenKeyName]: '...',
//   greet: function () {
//     alert('Hi there!');
//   },
// };

// // person.age = 32;
// // delete person.age;
// // person.age = undefined;
// // person.age = null;
// person.isAdmin = true;

// console.log(person['age']);

// const propKey = 'field 12';
// const perso2n = {
//     [propKey]: 'Max'
// };
// console.log(perso2n['field 12']);

const addMoviBtn = document.getElementById('add-movie-btn');
const searchBtn = document.getElementById('search-btn');

const movies = [];

const renderMovies = (filter = '') => {
  const movieList = document.getElementById('movie-list');

  if (movies.length === 0) {
    movieList.classList.remove('visible');
    return;
  } else {
    movieList.classList.add('visible');
  }
  movieList.innerHTML = '';

  const filteredMovies = !filter
    ? movies
    : movies.filter(movie => movie.info.title.includes(filter));

  filteredMovies.forEach(movie => {
    const movieEl = document.createElement('li');
    const { info, ...otherProps } = movie;
    console.log(otherProps);
    // const { title: movieTitle } = info;
    // const { getFormattedTitle } = movie;
    let { getFormattedTitle } = movie;
    getFormattedTitle = getFormattedTitle.bind(movie);
    let text = getFormattedTitle() + ' - ';
    // let text = getFormattedTitle.call(movie) + ' - '; //burada apply()kullanılabilir.
    //let text = getFormattedTitle.apply(movie) + ' - ';
    // let text = movie.getFormattedTitle() + ' - ';
    for (const key in info) {
      //burada title işleme almamak için bu şekilde terimi str olarak yazdık
      if (key !== 'title') {
        text = text + `${key}: ${info[key]}`;
      }
    }
    movieEl.textContent = text;
    movieList.append(movieEl);
  });
};

const addMovieHandler = () => {
  const title = document.getElementById('title').value;
  const extraName = document.getElementById('extra-name').value;
  const extraValue = document.getElementById('extra-value').value;

  if (
    title.trim() === '' ||
    extraName.trim() === '' ||
    extraValue.trim() === ''
  ) {
    return;
  }
  const newMovie = {
    info: {
      title,
      [extraName]: extraValue,
    },
    id: Math.random().toString(),
    getFormattedTitle() {
      return this.info.title.toUpperCase();
    },
  };

  movies.push(newMovie);
  renderMovies();
};

const searchMovieHandler = () => {
  const filterTerm = document.getElementById('filter-title').value;
  renderMovies(filterTerm);
};

addMoviBtn.addEventListener('click', addMovieHandler);
searchBtn.addEventListener('click', searchMovieHandler);

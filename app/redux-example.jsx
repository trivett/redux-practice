var redux = require('redux');

var nameReducer = (state = 'Anonymous', action) => {
  switch(action.type){
    case 'CHANGE_NAME':
      return action.name
    default:
      return state;
  }
};

var changeName = (name) => {
  return {
    type: 'CHANGE_NAME',
    name
  }
}

var nextHobbyId = 1;
var hobbiesReducer = (state = [], action) => {
  switch (action.type){
    case 'ADD_HOBBY':
      return [
        ...state,
        {
          id: nextHobbyId++,
          hobby: action.hobby
        }
      ];
    case 'REMOVE_HOBBY':
      return state.filter((hobby) => hobby.id !== action.id);
    default:
      return state;
  }
};


var addHobby = (hobby) => {
  return {
    type: 'ADD_HOBBY',
    hobby
  }
}

var removeHobby = (id) => {
  return {
    type: 'REMOVE_HOBBY',
    id
  }
}
var nextMovieId = 1;
var moviesReducer = (state = [], action) => {
  switch (action.type){
    case 'ADD_MOVIE':
      return [
        ...state,
        {
          id: nextMovieId++,
          movie: action.movie
        }
      ];
    case 'REMOVE_MOVIE':
      return state.filter((movie) => movie.id !== action.id);
    default:
      return state;
  }
};


var addMovie = (title, genre) => {
  return {
    type: 'ADD_MOVIE',
    title,
    genre
  }
}

var removeMovie = (id) => {
  return {
    type: 'REMOVE_MOVIE',
    id
  }
}


var reducer = redux.combineReducers({
  name: nameReducer,
  hobbies: hobbiesReducer,
  movies: moviesReducer

});

var store = redux.createStore(reducer, redux.compose(
  window.devToolsExtension ? window.devToolsExtension() : (f) => f
));

var unsubscribe = store.subscribe(() =>{
  var state = store.getState();
  console.log("name is ", state.name);
  console.log("new state: ", state)
  document.getElementById('app').innerHTML = state.name;
});
// unsubscribe();

var currentState = store.getState();

console.log(currentState);



store.dispatch(changeName('Digby'));

store.dispatch(addHobby("Running"));
store.dispatch(addHobby("Biking"));
store.dispatch(removeHobby(2));
store.dispatch(addMovie("Burn After Reading", "comedy"));
store.dispatch(addMovie("The Lobster", "Weird"));
store.dispatch(removeMovie(2));
store.dispatch(changeName('Frances'));


console.log(store.getState())

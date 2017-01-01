var redux = require('redux');

var stateDefault = {
  name: "Anonymous",
  hobbies: [],
  movies: []
}


var nextHobbyId = 1;
var nextMovieId = 1;

var oldreducer = (state = stateDefault, action) => {
  switch (action.type){

    case 'ADD_MOVIE':
      return {
        ...state,
        movies: [
          ...state.movies,
          {
            id: nextMovieId++,
            title: action.title,
            genre: action.genre

          }
        ]
      }
    case 'REMOVE_MOVIE':
      return {
        ...state,
        movies: state.movies.filter((movie) => movie.id !== action.id)
      }

    default:
      return state;
  }

};



var nameReducer = (state = 'Anonymous', action) => {
  switch(action.type){
    case 'CHANGE_NAME':
      return action.name
    default:
      return state;
  }
};

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



var action = {
  type: 'CHANGE_NAME',
  name: "Vincent"
}
store.dispatch(action);

store.dispatch({
  type: 'ADD_HOBBY',
  hobby: "Running"
});

store.dispatch({
  type: 'ADD_HOBBY',
  hobby: "Biking"
});

store.dispatch({
  type: 'REMOVE_HOBBY',
  id: 2
});

store.dispatch({
  type: 'ADD_MOVIE',
  title: "Mad Max",
  genre: "action"
});

store.dispatch({
  type: 'ADD_MOVIE',
  title: "The Lobster",
  genre: "weird"
});

store.dispatch({
  type: 'REMOVE_MOVIE',
  id: 2
});


store.dispatch({
  type: 'CHANGE_NAME',
  name: "emily"
});


console.log(store.getState())

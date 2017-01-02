var redux = require('redux');

var actions = require('./actions/index');
var store = require('./store/configureStore').configure();

var unsubscribe = store.subscribe(() =>{
  var state = store.getState();
  console.log("name is ", state.name);
  console.log("new state: ", state)
  if (state.map.isFetching){
    document.getElementById('app').innerHTML = 'Loading......';
  } else if (state.map.url) {
    document.getElementById('app').innerHTML = '<a href="' + state.map.url + '" target="_blank">your location</a>';

  }
});
// unsubscribe();

var currentState = store.getState();

console.log(currentState);


store.dispatch(actions.fetchLocation());
store.dispatch(actions.changeName('Digby'));

store.dispatch(actions.addHobby("Running"));
store.dispatch(actions.addHobby("Biking"));
store.dispatch(actions.removeHobby(2));
store.dispatch(actions.addMovie("Burn After Reading", "comedy"));
store.dispatch(actions.addMovie("The Lobster", "Weird"));
store.dispatch(actions.removeMovie(2));
store.dispatch(actions.changeName('Frances'));


console.log(store.getState())

var redux = require('redux');

var reducer = (state = {name: "Anonymous"}, action) => {
  switch (action.type){
    case 'CHANGE_NAME':
      return {
        ...state,
        name: action.name
      };
    default:
      return state;
  }

};

var store = redux.createStore(reducer, redux.compose(
  window.devToolsExtension ? window.devToolsExtension() : (f) => f
));

var unsubscribe = store.subscribe(() =>{
  var state = store.getState();
  console.log("name is ", state.name);
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
  type: 'CHANGE_NAME',
  name: "emily"
});

console.log(store.getState())

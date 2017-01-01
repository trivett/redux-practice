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

var store = redux.createStore(reducer);

var currentState = store.getState();

console.log(currentState);



var action = {
  type: 'CHANGE_NAME',
  name: "Vincent"
}
store.dispatch(action);

console.log(store.getState())

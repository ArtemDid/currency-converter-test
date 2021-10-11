import { createStore } from 'redux';

const initialStateToDo = {
  curr: []
}

const reduser = function (state = initialStateToDo, action) {

  switch (action.type) {
    case "ACTION_SET_BUY_CURR":
      {
        return { ...state, curr: action.payload }
      }
    default: return state;
  }
}

const store = createStore(reduser);

store.subscribe(function () {
  console.log(store.getState());
});

export default store;
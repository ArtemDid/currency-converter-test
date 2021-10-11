import React from "react";
import './App.css';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import Main from './components/Main'
import store from './store/store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Main/>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

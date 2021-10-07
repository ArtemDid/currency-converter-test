import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import MainPage from './components/MainPage'
import ShowCurrency from './components/ShowCurrency'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/showcurrency" component={ShowCurrency} />
        <Redirect path="*" to="/"/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

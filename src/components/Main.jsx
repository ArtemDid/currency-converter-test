import React, { useLayoutEffect } from "react";
import { Route, Switch, Redirect } from 'react-router-dom';
import MainPage from './MainPage'
import ShowCurrency from './ShowCurrency'
import { CreateActionSetCurr } from '../actions/actions'
import { useDispatch } from "react-redux";
import dayjs from 'dayjs';


function App() {
  const dispatch = useDispatch();
  const bankURL = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';

  async function fetchRates() {
    try {
      const response = await fetch(bankURL, {
        method: 'GET',
      });
      const data = await response.json();

      console.log('data: ', data)

      localStorage.setItem("data", JSON.stringify(data));
      dispatch(CreateActionSetCurr(data));
    } catch (err) {
      console.log("Not Found: ", err);
    }
  }


  useLayoutEffect(() => {
    const storedExchageData = JSON.parse(localStorage.getItem('data'))
    if (!storedExchageData) {
      fetchRates();
      return;
    }

    const currentDate = dayjs().format('DD.MM.YYYY');
    if (storedExchageData[0].exchangedate === currentDate) {
      dispatch(CreateActionSetCurr(storedExchageData));
      return;
    }
  
    fetchRates();
  }, [])


  return (
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route path="/showcurrency" component={ShowCurrency} />
      <Redirect path="*" to="/" />
    </Switch>
  );
}

export default App;

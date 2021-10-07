import React, { Fragment, useState, useEffect } from "react";
import { Modal, Table } from 'antd';
import { Layout, Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { NavLink, useLocation } from 'react-router-dom';
import 'antd/dist/antd.css';
const axios = require('axios');
const { Header } = Layout;

const ShowCurrency = () => {
  const Currency = ['UAH', 'AZN', 'BYN', 'CAD', 'CHF', 'CNY', 'CZK', 'DKK', 'EUR', 'GBP', 'GEL', 'HUF', 'ILS', 'JPY', 'KZT', 'MDL', 'NOK', 'PLZ', 'RUB', 'SEK', 'SGD', 'TMT', 'TRY', 'USD', 'UZS']
  var [dataRates, setdataRates] = useState([]);
  const [dataRates2, setdataRates2] = useState([]);
  const [currentValue, setCurrentValue] = useState('UAH');
  const [currency, setCurrency] = useState([]);

  const location = useLocation();

  function rates() {
    let date = new Date(Date.now());
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    fetch(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json`, {
      method: 'GET',
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log('data: ', data)
        setdataRates(data);
        setdataRates2(data);
        foo(data);
      })
      .catch(err => {
        console.log(err.message);

      });

  }

  function foo(data) {
    let mas = []
    data.map((item) => {
      mas.push(item.cc)
    })
    return setCurrency(mas)
  }

  const columns = [
    {
      title: 'Title',
      dataIndex: 'cc',
      align: 'center',
      key: 'cc',
    },
    {
      title: 'Rate',
      dataIndex: 'rate',
      align: 'center',
      key: 'rate',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.rate - b.rate,
    },
  ];

  useEffect(() => {
    rates();
  }, [])



  const menu = (
    <Menu>
      {currency.map((item, index) => {
        return (
          <Menu.Item key={index}>
            <a href="#" onClick={function () {
              console.log(item, location.pathname)
              setCurrentValue(item)
              let val = dataRates2.findIndex(function (item2, index) {
                if (item2.cc == item)
                  return index;
              });
              let tmp = dataRates2[val].rate;
              console.log(val, tmp)
              setdataRates(dataRates2);
              console.log(dataRates)
              setdataRates(() => {
                dataRates.map((item) => {
                  item.rate /= tmp;
                })
                return dataRates;
              })

            }}>{item}</a>
          </Menu.Item>
        )
      })}
    </Menu>
  );

  return (
    <Fragment>
      <Layout>
        <Header >
          <Menu theme="dark" mode="horizontal" style={{ textAlignLast: 'center' }}>
            <Menu.Item key="1">
              <Dropdown overlay={menu} trigger={['click']} scrollable>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                  {currentValue} <DownOutlined />
                </a>
              </Dropdown>
            </Menu.Item>
            <Menu.Item key="3">
              <NavLink to="/">Back</NavLink>
            </Menu.Item>
          </Menu>
        </Header>
      </Layout>

      <Table columns={columns} dataSource={dataRates} />
    </Fragment>
  );
};

export default ShowCurrency;
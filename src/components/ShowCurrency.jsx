import React, { Fragment, useState, useEffect } from "react";
import { Layout, Menu, Dropdown, Table } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import 'antd/dist/antd.css';
import { useStore, useSelector } from "react-redux";
const { Header } = Layout;

const ShowCurrency = () => {
  const [dataRates, setdataRates] = useState([]);
  const [currentValue, setCurrentValue] = useState('UAH');
  const [currencySelect, setCurrencySelect] = useState([]);
  const store = useStore()
  const selectorStateCurrency = useSelector(state => state.curr)

  function dropDown(data) {
    let masDropDown = []
    data.map((item) => {
        masDropDown.push(item.cc)
    })
    return setCurrencySelect(masDropDown)
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
    setdataRates(store.getState().curr);
    dropDown(store.getState().curr);
  }, [selectorStateCurrency])

  function checkCurrency(e) {
    setCurrentValue(e.target.innerText)
    let indexCurrent = store.getState().curr.findIndex(function (item, index) {
      if (item.cc === e.target.innerText)
        return index;
    });
    if (indexCurrent === -1) {
      indexCurrent = 0;
    }
    let rateCurrent = dataRates[indexCurrent].rate;

    setdataRates(store.getState().curr);

    dataRates.map((item) => {
      item.rate = (item.rate / rateCurrent).toFixed(4)
    });

    setdataRates(dataRates)
  }

  const menu = (
    <Menu>
      {currencySelect.map((item, index) => {
        return (
          <Menu.Item key={index}>
            <a href="#" onClick={(e) => checkCurrency(e)}>{item}</a>
          </Menu.Item>
        )
      })}
    </Menu>
  );

  return (
    <Fragment>
      <Layout>
        <Header>
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
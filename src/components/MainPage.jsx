import React, { Fragment, useState, useEffect } from "react";
import { Modal, Table } from 'antd';
import { Layout, Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { NavLink, useLocation } from 'react-router-dom';
import 'antd/dist/antd.css';
const axios = require('axios');
const { Header } = Layout;
export const App = () => {


    return (
        <Fragment>
            <Layout>
                <Header >
                    <Menu theme="dark" mode="horizontal" style={{ textAlign: 'end' }}>
                        <Menu.Item key="2" >
                            <NavLink to="/showcurrency" activeClassName="active">Show Currency</NavLink>
                        </Menu.Item>
                    </Menu>
                </Header>
            </Layout>


        </Fragment>
    );
};

export default App;
import React, { Fragment, useState, useEffect } from "react";
import { Layout, Menu, Row, Col } from 'antd';
import { NavLink } from 'react-router-dom';
import 'antd/dist/antd.css';
import "./style.css";
import { useStore, useSelector } from "react-redux";

import { useForm } from "react-hook-form";
const { Header } = Layout;

const App = () => {
    const store = useStore()
    const [currencySelect, setCurrencySelect] = useState([]);
    const [dataRates, setdataRates] = useState([]);
    const [result, setResult] = useState("");
    const selectorStateCurrency = useSelector(state => state.curr)

    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {

        let val_first = dataRates.findIndex(function (item, index) {
            if (item.cc === data.first)
                return index;

        });
        let val_second = dataRates.findIndex(function (item, index) {
            if (item.cc === data.second)
                return index;
        });

        if (val_first === -1) {
            val_first = 0;
        }
        else if (val_second === -1) {
            val_second = 0;
        }

        const resultCurrency = data.Count * dataRates[val_first].rate / dataRates[val_second].rate

        setResult(resultCurrency.toFixed(3))
    };

    const Input = ({ label, register, required }) => (
        <>
            <div style={{ textAlign: 'center' }}>
                <label style={{ width: 'max-content' }}>
                    {label}
                </label>
            </div>
            <input {...register(label, { required })} />
        </>
    );

    const Select = React.forwardRef(({ onChange, name, label }, ref) => (
        <>
            <div style={{ textAlign: 'center' }}>
                <label style={{ width: 'max-content' }}>
                    {label}
                </label>
            </div>
            <select name={name} ref={ref} onChange={onChange}>
                {
                    currencySelect.map((item, index) => (
                        <option value={`${item}`} key={index}>{item}</option>
                    ))
                }
            </select>
        </>
    ));


    function dropDown(data) {
        let masDropDown = []
        data.map((item) => {
            masDropDown.push(item.cc)
        })
        return setCurrencySelect(masDropDown)
    }


    useEffect(() => {
        setdataRates(store.getState().curr);
        dropDown(store.getState().curr);
    }, [selectorStateCurrency])

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

            <form onSubmit={handleSubmit(onSubmit)}>
                <Row gutter={16}>
                    <Col className="gutter-row" span={8} style={{ textAlign: 'center' }}>
                        <Select label="First" {...register("first")} />
                    </Col>
                    <Col className="gutter-row" span={8}>
                        <Input label="Count" register={register} required />
                    </Col>
                    <Col className="gutter-row" span={8} style={{ textAlign: 'center' }}>
                        <Select label="Second" {...register("second")} />
                    </Col>
                </Row>
                <p>{result}</p>
                <input type="submit" />
            </form>
        </Fragment>
    );
};

export default App;
import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {top30Dax} from './top30Dax.js';

const alpha = require('alphavantage')({key: 'FA00FMT5QINLH5NR'});


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            label: '',
            values: [],
            x: '',
            y: ''
        }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        top30Dax.forEach((entry) => {
            alpha.data.monthly_adjusted(entry.symbol).then(data => {
                this.setState(prevState => ({
                    data: [...prevState.data, {[entry.name] : data}]
                }))
            });
        });
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React with alphaAdvantage</h1>
                </header>
                <p className="App-intro">
                    {this.state.data ? JSON.stringify(this.state.data) : <span>No data</span>}
                </p>
            </div>
        );
    }
}

export default App;

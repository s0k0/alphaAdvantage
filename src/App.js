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
        console.log(this.state.data);
    }

    loadData() {
        top30Dax.forEach((entry) => {
            alpha.data.monthly_adjusted(entry.symbol).then(data => {
                this.setState({data: [...this.state.data, ... [data]]})
            });
        });
    }

    calculateYearly() {
        //TODO: parse monthly close points and calculate annual diff between Jan - Dec
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React with alphaAdvantage</h1>
                </header>
                <div className="App-intro">
                    <h3>Top 30 DAX Companies</h3>
                    {top30Dax.map((company,index) => {
                        return <p key={index}>{company.name} :: {company.symbol}</p>
                    })}
                    <h3>Raw data provided by alphaAdvantage</h3>
                    {this.state.data ? JSON.stringify(this.state.data[0]) : <span>No data</span>}
                </div>
            </div>
        );
    }
}

export default App;

import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Authorize } from './components/Auth'
import { myHatList } from './components/Hats'
import { Library } from './components/FilmLibrary'

import './custom.css'

export default class App extends Component {
    static displayName = App.name;
    constructor(props) {
        super(props);
        this.state = { tok: '', isAuth: false };
    }
    setToken = (token) => {
        console.log('123re' + token);
        this.setState({ tok: token });
    }

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/counter' component={Counter} />
                <Route path='/fetch-data' component={FetchData} />
                <Route path='/auth' component={Authorize} />
                <Route path='/Hats' component={myHatList} />
                <Route path='/Library' component={Library} />
            </Layout>
        );
    }
}

import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import Home from './containers/Home';

class App extends Component {
    render() {
        return (
            <div>
                <div>
                    <Link to="/">Home</Link>
                </div>
                <div>
                    <Route path="/" exact component={Home} />
                </div>
            </div>
        )
    }
}

export default App
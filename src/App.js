import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import Home from './containers/Home';

import { Menu, Container } from 'semantic-ui-react'


class App extends Component {
    render() {
        return (
            <div>
                <Menu borderless huge fixed>
                    <Container>
                      <Menu.Item>
                      <Link to="/">Home</Link>
                      </Menu.Item>
                    </Container>
                </Menu>

                <Container>
                    <Route path="/" exact component={Home} />
                </Container>
            </div>
        )
    }
}

export default App

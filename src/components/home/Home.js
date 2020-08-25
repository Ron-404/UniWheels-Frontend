import React, { Component } from 'react';
import logo from '../../logo.png';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                proyecto base uniWheels
              </p>
            </header>
          </div>
        )
    }
}

export default Home;
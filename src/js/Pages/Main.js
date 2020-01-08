import * as React from 'react';
import { Component } from 'react';
import autoBind from 'react-autobind';

class Main extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
        };
    }

    render() {

        return (
            <div>
                Привет, эта главная страница
            </div>
        );
    }
}

export default Main;

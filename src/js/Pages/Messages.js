import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';

class Messages extends Component<any, any> {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
        };
    }

    render() {

        return (
            <div>
                сообщения
            </div>
        );
    }
}


const mapStateToProps = state => ({
});

export default connect(
    mapStateToProps, {},
)(Messages);

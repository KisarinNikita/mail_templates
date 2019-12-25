import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import { readCategory } from '../Actions/categoriesAction';

class Categories extends Component<any, any> {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
        };
    }

  componentWillMount() {
    this.props.getCategoryAll();
  }

    render() {

        return (
            <div>
                категории
            </div>
        );
    }
}


const mapStateToProps = state => ({

});

export default connect(
    mapStateToProps, { readCategory },
)(Categories);

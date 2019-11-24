import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

class Nav extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {

        return (
            <header>
                <NavLink to="/" activeClassName="active">Главная</NavLink>
                <NavLink to="/categories" activeClassName="active">Категории</NavLink>
                <NavLink to="/messages" activeClassName="active">Сообщения</NavLink>
            </header>
        );
    }
}


const mapStateToProps = state => ({
});

export default connect(
    mapStateToProps, {},
)(Nav);

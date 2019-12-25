import * as React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    return (
      <header>
        <div className="container nav">
          <NavLink to="/" activeClassName="active">Главная</NavLink>
          <NavLink to="/categories" activeClassName="active">Категории</NavLink>
          <NavLink to="/messages" activeClassName="active">Сообщения</NavLink>
        </div>
      </header>
    );
  }
}


const mapStateToProps = state => ({});

export default connect(
  mapStateToProps, {},
)(Nav);

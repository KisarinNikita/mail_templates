import * as React from 'react';
import { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Nav from './Pages/Nav';
import Main from './Pages/Main';
import Categories from './Pages/Categories';
import Messages from './Pages/Messages';
import history from './router';


class App extends Component {
  render() {

    return (
      <Provider store={store}>
        <Router history={history}>
          <Nav/>
          <div className="container">
            <Switch>
              <Route path="/" exact component={Main}/>
              <Route path="/categories" component={Categories}/>
              <Route path="/messages" component={Messages}/>
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

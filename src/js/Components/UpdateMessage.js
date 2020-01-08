import * as React from 'react';
import { Component } from 'react';
import autoBind from 'react-autobind';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

class UpdateMessage extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      name: this.props.data.title,
      parent: this.props.data.parent ? this.props.data.parent.id : '',
    };
  }

  handleChangeName(event) {
    this.setState({ name: event.target.value });
  }

  handleChangeParent(event) {
    this.setState({ parent: event.target.value });
  }

  handleCreate() {
    if (this.state.name.trim() !== '') {
      this.props.update(this.state.name, this.state.parent);
    } else {
      alert('Имя категории не может быть пустым');
    }
  }

  render() {

    return (
      <div>
        <h3>Редактирование сообщения</h3>
      </div>
    );
  }
}

export default UpdateMessage;

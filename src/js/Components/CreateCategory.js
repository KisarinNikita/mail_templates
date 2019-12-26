import * as React from 'react';
import { Component } from 'react';
import autoBind from 'react-autobind';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

class CreateCategory extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      name: '',
      parent: ''
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
      this.props.create(this.state.name, this.state.parent);
    } else {
      alert('Имя категории не может быть пустым');
    }
  }

  render() {
    return (
      <div>
        <h3>Создание категории</h3>
        <div className="row">
          <TextField
            label="Название категории"
            type="text"
            value={this.state.name}
            onChange={this.handleChangeName}
            variant="outlined"
          />
        </div>
        <div className="row">
          <div className="column">
            <label>Родительская категория</label>
            <Select
              value={this.state.parent}
              onChange={this.handleChangeParent}
            >
              {this.props.parents.map((val) =>
                <MenuItem key={val} value={val}>{val}</MenuItem>
              )};
            </Select>
          </div>

        </div>
        <div className="row">
          <Button variant="contained" color="primary" onClick={this.handleCreate}>
            Добавить категорию
          </Button>
        </div>
      </div>
    );
  }
}

export default CreateCategory;

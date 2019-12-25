import * as React from 'react';
import {Component} from 'react';
import autoBind from 'react-autobind';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

class AddCategory extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      name: '',
      parent: ''
    };
  }

  handleChangeName(event) {
    this.setState({name: event.target.value});
  }

  handleChangeParent(event) {
    this.setState({parent: event.target.value});
  }

  render() {

    return (
      <div>
        <h3>Создание категории</h3>
        <TextField
          label="Название категории"
          type="password"
          value={this.state.name}
          onChange={this.handleChangeName}
          variant="outlined"
        />

        <FormControl>
          <InputLabel>Родительская категория</InputLabel>
          <Select
            value={this.state.parent}
            onChange={this.handleChangeParent}
          >
            <MenuItem value={1}>Ten</MenuItem>
            <MenuItem value={2}>Twenty</MenuItem>
            <MenuItem value={3}>Thirty</MenuItem>
          </Select>
        </FormControl>

      </div>
    );
  }
}

export default AddCategory;

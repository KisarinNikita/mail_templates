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
      title: this.props.data.title,
      body: this.props.data.body,
      category: this.props.data.category,
    };
  }

  handleChangeName(event) {
    this.setState({ title: event.target.value });
  }

  handleChangeText(event) {
    this.setState({ body: event.target.value });
  }

  handleChangeCategory(event) {
    this.setState({ category: event.target.value });
  }

  handleUpdate() {
    if (this.state.title.trim() !== '' && this.state.category !== '') {
      this.props.update(this.state.title, this.state.body, this.state.category);
    } else {
      alert('Заголовок и категория не могут быть пустыми');
    }
  }

  render() {

    return (
      <div>
        <h3>Редактирование сообщения</h3>
        <div className="row">
          <TextField
            label="Название категории"
            type="text"
            value={this.state.title}
            onChange={this.handleChangeName}
            variant="outlined"
          />
        </div>
        <div className="row">
          <TextField
            label="Сообщение"
            type="text"
            multiline
            rowsMax="3"
            variant="outlined"
            value={this.state.body}
            onChange={this.handleChangeText}
            fullWidth
          />
        </div>
        <div className="row">
          <div className="column">
            <label>Категория</label>
            <Select
              value={this.state.category}
              onChange={this.handleChangeCategory}
            >
              {this.props.categories.map((val) =>
                <MenuItem key={val} value={val}>{val}</MenuItem>
              )};
            </Select>
          </div>
        </div>
        <div className="row">
          <Button variant="contained" color="primary" onClick={this.handleUpdate}>
            Редактировать сообщение
          </Button>
        </div>
      </div>
    );
  }
}

export default UpdateMessage;

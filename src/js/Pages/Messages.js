import * as React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';
import autoBind from 'react-autobind';
import {
  readMessagesAction,
  createMessageAction,
  deleteMessageAction,
  updateMessageAction,
  searchFilterMessageAction
} from "../Actions/messagesAction";

import {
  readCategoryAction,
} from '../Actions/categoriesAction';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Pagination from 'react-js-pagination';
import Modal from 'react-modal';

import CreateMessage from "../Components/CreateMessage";
import UpdateMessage from "../Components/UpdateMessage";
import TextField from '@material-ui/core/TextField';

class Messages extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    const {messages} = props;
    this.state = {
      messages,
      openEditModal: false,
      openCreateModal: false,
      update: {
        id: null,
        title: '',
        body: '',
        category: null,
      },
      activePage: 1,
      rowsPerPage: 5,
      count: this.props.count,
    };
  }

  componentDidMount() {
    this.props.readMessagesAction();
    this.props.readCategoryAction();
  }

  static getDerivedStateFromProps(props, state) {
    const isSearchEmpty = props.searchQuery.trim() === '';
    if (state.messages !== props.messages.data || props.searchQuery.trim() !== '') {
      return {
        messages: isSearchEmpty ? props.messages.data : props.filtered,
        count: isSearchEmpty ? props.messages.count : props.filtered.length,
        openEditModal: false,
        openCreateModal: false,
      };
    }
    return state;
  }

  deleteMessage(id, name) {
    const conf = window.confirm(`Уверены что хотите удалить ${name}?`);
    if (conf) {
      this.props.deleteMessageAction(id);
    }
  };

  openUpdateModal(id, title, body, category) {
    this.setState({...this.state, update: {id: id, title: title, body: body, category: category}}, () =>
      this.setState({...this.state, openEditModal: true})
    );
  };

  openCreateModal() {
    this.setState({...this.state, openCreateModal: true});
  };

  closeEditModal() {
    this.setState({...this.state, openEditModal: false});
  }

  closeCreateModal() {
    this.setState({...this.state, openCreateModal: false});
  }

  createMessage(title, body, category) {
    this.props.createMessageAction(title, body, category);
  };

  updateMessage(title, body, category) {
    this.props.updateMessageAction(this.state.update.id, title, body, category);
  }

  handlePageChange(pageNumber) {
    this.setState({...this.state, activePage: pageNumber});
  }

  filterList(e) {
    this.props.searchFilterMessageAction(e.target.value);
  }

  renderMessages = () => {
    const from = (Number(this.state.activePage) * Number(this.state.rowsPerPage)) - Number(this.state.rowsPerPage);
    const to = Number(this.state.activePage) * Number(this.state.rowsPerPage);
    const rows = this.state.messages.map((item, i) =>
      ((from < Number(i) + 1) && (Number(i) + 1 <= to)) &&
      (
        <TableRow key={item.id}>
          <TableCell>
            {item.id}
          </TableCell>
          <TableCell>
            {item.title}
          </TableCell>
          <TableCell>
            {item.body}
          </TableCell>
          <TableCell>
            {item.category.id}
          </TableCell>
          <TableCell className="tr--small">
            <button onClick={() => this.openUpdateModal(item.id, item.title, item.body, item.category.id)}>Редактировать</button>
            <button onClick={() => this.deleteMessage(item.id, item.title)}>Удалить</button>
          </TableCell>
        </TableRow>
      )
    );
    return <>{rows}</>;
  };

  render() {

    const updateMessageModal = (
      <Modal
        isOpen={this.state.openEditModal}
        onRequestClose={this.closeEditModal}
        overlayClassName="overlay"
        className="modal"
      >
        <UpdateMessage categories={this.props.ids} data={this.state.update} update={this.updateMessage}/>
      </Modal>
    );

    const createMessageModal = (
      <Modal
        isOpen={this.state.openCreateModal}
        onRequestClose={this.closeCreateModal}
        overlayClassName="overlay"
        className="modal"
      >
        <CreateMessage categories={this.props.ids} create={this.createMessage}/>
      </Modal>
    );

    return (
      <div>
        <div className="options-row">
          <TextField
            label="Поиск по названию"
            type="text"
            onKeyUp={(e) => this.filterList(e)}
            variant="outlined"
          />

          <button onClick={() => this.openCreateModal()}>Добавить сообщение</button>
        </div>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Название</TableCell>
              <TableCell>Текст</TableCell>
              <TableCell>Категория</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.messages && this.renderMessages()}
          </TableBody>
        </Table>

        {this.state.messages && this.state.messages.length === 0 && <p>Список сообщений пуст</p>}

        {this.state.messages && this.state.messages.length !== 0 &&
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={this.state.rowsPerPage}
          totalItemsCount={this.state.count}
          onChange={this.handlePageChange}
        />
        }

        {createMessageModal}
        {updateMessageModal}
      </div>
    );
  }
}


const mapStateToProps = state => ({
  messages: state.Messages.data,
  count: state.Messages.count,
  ids: state.Categories.ids,
  searchQuery: state.Messages.searchQuery,
  filtered: state.Messages.filtered,
});

export default connect(
  mapStateToProps, {
    readCategoryAction,
    readMessagesAction,
    createMessageAction,
    deleteMessageAction,
    updateMessageAction,
    searchFilterMessageAction
  },
)(Messages);

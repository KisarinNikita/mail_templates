import * as React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';
import autoBind from 'react-autobind';
import {readMessagesAction} from "../Actions/messagesAction";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Modal from 'react-modal';

import CreateMessage from "../Components/CreateMessage";
import UpdateMessage from "../Components/UpdateMessage";

class Messages extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    const {messages} = props;
    this.state = {
      messages,
      openEditModal: false,
      openCreateModal: false,
    };
  }

  componentDidMount() {
    this.props.readMessagesAction();
  }

  static getDerivedStateFromProps(props, state) {
    if (state.messages !== props.messages.data) {
      return {
        messages: props.messages.data,
        openEditModal: false,
        openCreateModal: false,
      };
    }
    return state;
  }

  deleteMessage(id, name) {
    const conf = window.confirm(`Уверены что хотите удалить ${name}?`);
    if (conf) {
      console.log('delete');
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

  renderMessages = () => {
    // const from = (Number(this.state.activePage) * Number(this.state.rowsPerPage)) - Number(this.state.rowsPerPage);
    // const to = Number(this.state.activePage) * Number(this.state.rowsPerPage);
    const rows = this.state.messages.map((item, i) =>
      // ((from < Number(i) + 1) && (Number(i) + 1 <= to)) &&
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
        <UpdateMessage parents={this.props.ids} data={this.state.update} update={this.updateCategory}/>
      </Modal>
    );

    const createMessageModal = (
      <Modal
        isOpen={this.state.openCreateModal}
        onRequestClose={this.closeCreateModal}
        overlayClassName="overlay"
        className="modal"
      >
        <CreateMessage parents={this.props.ids} create={this.createCategory}/>
      </Modal>
    );

    return (
      <div>
        <div className="options-row">
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

        {createMessageModal}
        {updateMessageModal}

      </div>
    );
  }
}


const mapStateToProps = state => ({
  messages: state.Messages.data,
});

export default connect(
  mapStateToProps, {
    readMessagesAction
  },
)(Messages);

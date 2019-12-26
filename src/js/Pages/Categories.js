import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Pagination from "react-js-pagination";

import Modal from 'react-modal';

import {
  readCategoryAction,
  deleteCategoryAction,
  createCategoryAction,
  updateCategoryAction,
  searchFilterAction
} from '../Actions/categoriesAction';
import CreateCategory from "../Components/CreateCategory";
import UpdateCategory from "../Components/UpdateCategory";
import TextField from '@material-ui/core/TextField';

class Categories extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    const { categories } = props;
    this.state = {
      categories,
      openEditModal: false,
      openCreateModal: false,
      update: {
        id: null,
        title: '',
        parent: null
      },
      activePage: 1,
      rowsPerPage: 5,
      count: this.props.ids.length
    };
  }

  componentDidMount() {
    this.props.readCategoryAction();
  }

  static getDerivedStateFromProps(props, state) {
    if (state.categories !== props.categories.data) {
      return {
        categories: props.categories.data,
        openEditModal: false,
        openCreateModal: false,
        count: props.ids.length
      };
    }
    if (props.searchQuery !== '') return { categories: props.filtered };
    return state;
  }

  deleteCategory(id, name) {
    const conf = window.confirm(`Уверены что хотите удалить ${name}?`);
    if (conf) {
      this.props.deleteCategoryAction(id);
    }
  };

  createCategory(title, parent) {
    this.props.createCategoryAction(title, parent);
  };

  updateCategory(title, parent) {
    this.props.updateCategoryAction(this.state.update.id, title, parent);
  };

  openUpdateModal(id, title, parent) {
    this.setState({ ...this.state, update: {id: id, title: title, parent: parent}}, () =>
      this.setState({ ...this.state, openEditModal: true})
    );
  };

  openCreateModal() {
    this.setState({ ...this.state, openCreateModal: true });
  };

  closeEditModal() {
    this.setState({ ...this.state, openEditModal: false });
  }

  closeCreateModal() {
    this.setState({ ...this.state, openCreateModal: false });
  }


  renderRows = () => {
    const from = (Number(this.state.activePage) * Number(this.state.rowsPerPage)) - Number(this.state.rowsPerPage);
    const to = Number(this.state.activePage) * Number(this.state.rowsPerPage);
    const rows = this.state.categories.map((item, i) =>
      ((from < Number(i)+1) && (Number(i)+1 <= to)) ? (
        <TableRow key={item.id}>
          <TableCell>
            {item.id}
          </TableCell>
          <TableCell>
            {item.title}
          </TableCell>
          <TableCell>
            {item.parent !== null ? item.parent.id : '-'}
          </TableCell>
          <TableCell>
            {item.messages.length}
          </TableCell>
          <TableCell className="tr--small">
            <button onClick={() => this.openUpdateModal(item.id, item.title, item.parent)}>Редактировать</button>
            <button onClick={() => this.deleteCategory(item.id, item.title)}>Удалить</button>
          </TableCell>
        </TableRow>
      ) : (
          <></>
        )
    );

    return <>{rows}</>;
  };

  filterList(e){
    this.props.searchFilterAction(e.target.value);
  }

  handlePageChange(pageNumber) {
    this.setState({ ...this.state, activePage: pageNumber });
  }

  render() {

    const updateCategoryModal = (
      <Modal
        isOpen={this.state.openEditModal}
        onRequestClose={this.closeEditModal}
        overlayClassName="overlay"
        className="modal"
      >
        <UpdateCategory parents={this.props.ids} data={this.state.update} update={this.updateCategory}/>
      </Modal>
    );

    const createCategoryModal = (
      <Modal
        isOpen={this.state.openCreateModal}
        onRequestClose={this.closeCreateModal}
        overlayClassName="overlay"
        className="modal"
      >
        <CreateCategory parents={this.props.ids} create={this.createCategory}/>
      </Modal>
    );

    return (
      <div>
        <TextField
          label="Поиск по названию"
          type="text"
          onChange={(e) => this.filterList(e)}
          variant="outlined"
        />

        <button onClick={() => this.openCreateModal()}>Добавить категорию</button>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Название</TableCell>
              <TableCell>ID родителя</TableCell>
              <TableCell>Кол-во сообщений</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.categories && this.renderRows()}
          </TableBody>
        </Table>

        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={this.state.rowsPerPage}
          totalItemsCount={this.state.count}
          onChange={this.handlePageChange}
        />
        {createCategoryModal}
        {updateCategoryModal}
      </div>
    );
  }
}


const mapStateToProps = state => ({
  categories: state.Categories.data,
  ids: state.Categories.ids,
  filtered: state.Categories.filtered,
  searchQuery: state.Categories.searchQuery,
});

export default connect(
  mapStateToProps, { readCategoryAction, deleteCategoryAction, createCategoryAction, updateCategoryAction, searchFilterAction },
)(Categories);

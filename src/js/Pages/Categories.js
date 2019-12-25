import * as React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';
import autoBind from 'react-autobind';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Modal from 'react-modal';

import {readCategoryAction, deleteCategoryAction} from '../Actions/categoriesAction';
import AddCategory from "../Components/AddCategory";


class Categories extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    const {categories} = props;
    this.state = {
      categories,
      openEditModal: false,
      openAddModal: false,
    };
  }

  componentDidMount() {
    this.props.readCategoryAction();
  }

  static getDerivedStateFromProps(props, state): object {
    if (state.categories !== props.categories.data) {
      return {
        categories: props.categories.data,
      };
    }
    return state;
  }

  deleteCategory(id, name) {
    const conf = window.confirm(`Уверены что хотите удалить ${name}?`);
    if (conf) {
      this.props.deleteCategoryAction(id);
    }
  };

  editCategory() {
    this.setState({...this.state, openEditModal: true});
  };

  addCategory() {
    this.setState({...this.state, openAddModal: true});
  };

  closeEditModal() {
    this.setState({...this.state, openEditModal: false});
  }

  closeAddModal() {
    this.setState({...this.state, openAddModal: false});
  }


  renderRows = () => {
    const rows = this.state.categories.map((item) =>
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
          <button onClick={() => this.editCategory()}>Редактировать</button>
          <button onClick={() => this.deleteCategory(item.id, item.title)}>Удалить</button>
        </TableCell>
      </TableRow>
    );

    return <>{rows}</>;
  };

  render() {

    console.log(this.state.categories);


    const editCategoryModal = (
      <Modal
        isOpen={this.state.openEditModal}
        onRequestClose={this.closeEditModal}
        overlayClassName="overlay"
        className="modal"
      >
        {/*<EditCategory />*/}
      </Modal>
    );

    const addCategoryModal = (
      <Modal
        isOpen={this.state.openAddModal}
        onRequestClose={this.closeAddModal}
        overlayClassName="overlay"
        className="modal"
      >
        <AddCategory />
      </Modal>
    );

    return (
      <div>
        <button onClick={() => this.addCategory()}>Добавить категорию</button>
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

        {addCategoryModal}
        {editCategoryModal}

      </div>
    );
  }
}


const mapStateToProps = state => ({
  categories: state.Categories.data,
  ids: state.Categories.ids
});

export default connect(
  mapStateToProps, {readCategoryAction, deleteCategoryAction},
)(Categories);

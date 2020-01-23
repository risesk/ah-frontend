import React, { Component } from 'react';
import { connect } from 'react-redux';
import './app.css';
import Table from './Components/Table/Table';
import {
  getDataFromLocalStorage,
  getDataFromGthubApi,
  getErrorFromGthubApi,
  sortData,
} from './actions/TableActions';

class App extends Component {
  constructor(props) {
    super(props);
    this.onSort = this.onSort.bind(this);
  }

  componentDidMount() {
    const appData = JSON.parse(localStorage.getItem('appData'));
    if (appData) {
      return this.props.getDataFromLocalStorage(appData);
    }
    return fetch('https://raw.githubusercontent.com/blmzv/ah-frontend-intern/master/profiles.json')
      .then((res) => res.json())
      .then(
        (res) => {
          this.props.getDataFromGthubApi(res);
        },
        (err) => {
          this.props.getErrorFromGthubApi(err);
        },
      );
  }

  onSort(sortField) {
    const sort = this.props.sort === 'asc' ? 'desc' : 'asc';
    const data = this.sortProfiles(sortField, sort);
    this.props.sortData({ data, sort, sortField });
    localStorage.setItem('appData', JSON.stringify({
      data,
      sort,
      sortColumnName: sortField,
    }));
  }

  sortProfiles(sortField, sort) {
    const cloneData = this.props.data.slice();
    // Удаляем пробелы и скобки из сортируемого поля.
    const regExp = /[ )(]/g;
    const getSortParam = (profile) => profile[sortField].toLowerCase().replace(regExp, '');

    return cloneData.sort((profile1, profile2) => {
      if (sort === 'asc') {
        return getSortParam(profile1) > getSortParam(profile2) ? 1 : -1;
      }
      return getSortParam(profile1) < getSortParam(profile2) ? 1 : -1;
    });
  }

  render() {
    const { error, isLoaded } = this.props;
    if (error) {
      return <div>Ошибка: {error.message}</div>;
    } if (!isLoaded) {
      return <div>Загрузка...</div>;
    }
    return (
      <div className='app'>
        <h1 className='app__title'>Профили пользователей</h1>
        <p className='app__text'>Кликни на заголовок колонки, чтобы отсортировать таблицу</p>
        <Table
          data={this.props.data}
          sort={this.props.sort}
          sortColumnName={this.props.sortColumnName}
          onSort={this.onSort}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ ...state });

const mapDispatchToProps = {
  getDataFromLocalStorage,
  getDataFromGthubApi,
  getErrorFromGthubApi,
  sortData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

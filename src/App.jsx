import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './app.css';
import Table from './Components/Table/Table.jsx';
import Spin from './Components/Spin/Spin.jsx';
import {
  setDataFromLocalStorage,
  setDataFromGthubApi,
  setErrorFromGthubApi,
  setSortedData,
} from './actions/TableActions';

const url = 'https://raw.githubusercontent.com/blmzv/ah-frontend-intern/master/profiles.json';

class App extends Component {
  constructor(props) {
    super(props);
    this.onSort = this.onSort.bind(this);
  }

  componentDidMount() {
    const appData = JSON.parse(localStorage.getItem('appData'));
    if (appData) {
      this.props.setDataFromLocalStorage(appData);
    } else {
      this.getDataFromGithub();
    }
  }

  async getDataFromGithub() {
    try {
      const response = await fetch(url);
      const data = await response.json();
      this.props.setDataFromGthubApi(data);
    } catch (err) {
      this.props.setErrorFromGthubApi(err);
    }
  }

  onSort(sortField) {
    const sortDirection = this.props.sortDirection === 'asc' ? 'desc' : 'asc';
    const data = this.sortProfiles(sortField, sortDirection);

    this.props.setSortedData({ data, sortDirection, sortField });
    localStorage.setItem('appData', JSON.stringify({
      data,
      sortDirection,
      sortColumnName: sortField,
    }));
  }

  sortProfiles(sortField, sortDirection) {
    const cloneData = this.props.data.slice();
    // Удаляем пробелы и скобки из сортируемого поля.
    const regExp = /[ )(]/g;
    const getSortParam = (profile) => profile[sortField].toLowerCase().replace(regExp, '');

    return cloneData.sort((profile1, profile2) => {
      if (sortDirection === 'asc') {
        return getSortParam(profile1) > getSortParam(profile2) ? 1 : -1;
      }
      return getSortParam(profile1) < getSortParam(profile2) ? 1 : -1;
    });
  }

  render() {
    const { error, isLoaded, data, sortDirection, sortColumnName } = this.props;
    if (error) {
      return <div>Ошибка: {error.message}</div>;
    } if (!isLoaded) {
      return <Spin mix='app__spiner' />;
    }

    return (
      <div className='app'>
        <h1 className='app__title'>Профили пользователей</h1>
        <p className='app__text'>Кликни на заголовок колонки, чтобы отсортировать таблицу</p>
        <Table
          data={data}
          sortDirection={sortDirection}
          sortColumnName={sortColumnName}
          onSort={this.onSort}
        />
      </div>
    );
  }
}

App.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  sortDirection: PropTypes.oneOf(['asc', 'desc', '']),
  sortColumnName: PropTypes.string,
  isLoaded: PropTypes.bool.isRequired,
  error: PropTypes.object,
  setDataFromLocalStorage: PropTypes.func.isRequired,
  setDataFromGthubApi: PropTypes.func.isRequired,
  setErrorFromGthubApi: PropTypes.func.isRequired,
  setSortedData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ ...state });

const mapDispatchToProps = {
  setDataFromLocalStorage,
  setDataFromGthubApi,
  setErrorFromGthubApi,
  setSortedData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

import React, {Component} from 'react';
import './App.css';
import { Table } from './Components/Table/Table'

const profiles = require('./profiles.json');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: profiles,
      sort: '',  // 'asc' | 'desc'
      sortColumnName: '',
    };
    this.onSort = this.onSort.bind(this);
  }

  componentDidMount() {
    const appData = JSON.parse(localStorage.getItem('appData'))
    if (appData) {
      this.setState({
        data: appData.data,
        sort: appData.sort,
        sortColumnName: appData.sortColumnName,
      });
    }
  }

  onSort(sortField) {
    const sort = this.state.sort === 'asc' ? 'desc' : 'asc';
    const data = this.sortProfiles(sortField, sort);
    this.setState({ data, sort, sortColumnName: sortField });
    localStorage.setItem('appData', JSON.stringify({
      data: data,
      sort: sort,
      sortColumnName: sortField,
      })
    );
  }

  sortProfiles(sortField, sort) {
    const cloneData = this.state.data.slice();
    // Удаляем пробелы и скобки.
    const regExp = /[ \)\(]/g;
    const getSortParam = (profile) => {
      return profile[sortField].toLowerCase().replace(regExp, '');
    };

    return cloneData.sort((profile1, profile2) => {
      if ( sort == 'asc') {
        return getSortParam(profile1) > getSortParam(profile2) ? 1 : -1;
      } else {
        return getSortParam(profile1) < getSortParam(profile2) ? 1 : -1;
      }
    })
  }

  render() {
    return (
      <div className='app'>
        <h1 className='app__title'>Профили пользователей</h1>
        <p className='app__text'>Кликни на заголовок колонки, чтобы отсортировать таблицу</p>
        <Table
          data={this.state.data}
          sort={this.state.sort}
          sortColumnName={this.state.sortColumnName}
          onSort={this.onSort}
        />
      </div>
    );
  }
}

export default App;


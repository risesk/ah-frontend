import React, {Component} from 'react';
import './App.css';
import { Table } from './Components/Table/Table'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      sort: '',  // 'asc' | 'desc'
      sortColumnName: '',
      error: null,
      isLoaded: false,
    };
    this.onSort = this.onSort.bind(this);
  }

  componentDidMount() {
    const appData = JSON.parse(localStorage.getItem('appData'))
    if (appData) {
      return this.setState({
        data: appData.data,
        sort: appData.sort,
        sortColumnName: appData.sortColumnName,
        isLoaded: true
      });
    } else {
        fetch('https://raw.githubusercontent.com/blmzv/ah-frontend-intern/master/profiles.json')
          .then( res => res.json())
          .then(
            (res) => {
              this.setState({
                data: res,
                isLoaded: true
              });
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
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
    // Удаляем пробелы и скобки из сртируемого поля.
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
    const { error, isLoaded } = this.state;
    if (error) {
      return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Загрузка...</div>;
    } else {
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
}

export default App;


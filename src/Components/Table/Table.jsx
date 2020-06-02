/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import './table.css';

const Table = (props) => (

  <table className='table'>

    <thead className='table__header'>
      <tr>

        {Object.keys(props.data[0]).map((columnName, i) => (
          <th key={i} onClick={ () => props.onSort(columnName) } className='table__title'>
            {`${columnName}`}
            {props.sortColumnName === columnName
              ? props.sortDirection === 'asc' ? <span>&darr;</span> : <span>&uarr;</span>
              : null
            }
          </th>
        ))
        }

      </tr>
    </thead>

    <tbody>
      {props.data.map((profile) => (
        <tr
          key={profile.Phone + profile.Company}
        >

          {Object.keys(profile).map((data, i) => (
            <th key={i} className='table__cell'>{profile[data]}</th>
          ))
          }

        </tr>
      ))
      }
    </tbody>

  </table>

);

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  sortDirection: PropTypes.oneOf(['asc', 'desc', '']),
  sortColumnName: PropTypes.string,
  onSort: PropTypes.func,
};

export default Table;

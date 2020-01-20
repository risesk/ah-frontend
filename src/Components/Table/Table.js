import React from "react";
import './table.css';

export const Table = (props) => {

    return(

      <table className="table">

        <thead className="table__header">
          <tr>

            {Object.keys(props.data[0]).map( (columnName, i) => (
                <th key={i} onClick={() => {props.onSort(columnName)} } className='table__title'>{columnName}</th>
              ))
            }

          </tr>
        </thead>

        <tbody>
          {props.data.map( profile => (
            <tr
             key={profile.Phone + profile.Company}
            >

              {Object.keys(profile).map( (data, i) => (
                <th key={i} className='table__cell'>{profile[data]}</th>
                ))
              }

            </tr>
            ))
          }
        </tbody>

      </table>

    )
  };

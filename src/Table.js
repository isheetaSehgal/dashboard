import React, { useState } from 'react';
import './Table.css';

const Table = ({ data, columns, id }) => {
  const [collapsedRows, setCollapsedRows] = useState({});
  const [hiddenColumns, setHiddenColumns] = useState([]);
  const [nestedData, setNestedData] = useState({});
  const [nestedCollapsedRows, setNestedCollapsedRows] = useState({});

  const toggleRow = (rowIndex) => {
    setCollapsedRows((prev) => ({
      ...prev,
      [rowIndex]: !prev[rowIndex],
    }));
  };

  const toggleColumn = (columnIndex) => {
    setHiddenColumns((prev) =>
      prev.includes(columnIndex)
        ? prev.filter((index) => index !== columnIndex)
        : [...prev, columnIndex]
    );
  };

  const addNestedRow = (rowIndex) => {
    setNestedData((prev) => ({
      ...prev,
      [rowIndex]: [
        ...(prev[rowIndex] || []),
        { detail1: 'Team Lead', detail2: 'Task', detail3: 'Detail' },
      ],
    }));
  };

  const toggleNestedRow = (rowIndex, nestedRowIndex) => {
    setNestedCollapsedRows((prev) => ({
      ...prev,
      [rowIndex]: {
        ...prev[rowIndex],
        [nestedRowIndex]: !prev[rowIndex]?.[nestedRowIndex],
      },
    }));
  };

  const handleStatusChange = (rowIndex, nestedRowIndex, status) => {
    setNestedData((prev) => ({
      ...prev,
      [rowIndex]: prev[rowIndex].map((row, index) =>
        index === nestedRowIndex ? { ...row, status } : row
      ),
    }));
  };

  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                onClick={() => toggleColumn(index)}
                className={hiddenColumns.includes(index) ? 'hidden' : ''}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <React.Fragment key={rowIndex}>
              <tr onClick={() => toggleRow(rowIndex)}>
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className={hiddenColumns.includes(colIndex) ? 'hidden' : ''}
                  >
                    {row[col]}
                  </td>
                ))}
              </tr>
              {collapsedRows[rowIndex] && (
                <tr className="expanded-row">
                  <td colSpan={columns.length}>
                    <button onClick={() => addNestedRow(rowIndex)}>Add Row</button>
                    <table className="nested-table">
                      <thead>
                        <tr>
                        <th>Team Manager</th>
                          <th>Task</th>
                         <th>Detail</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(nestedData[rowIndex] || []).map((nestedRow, nestedIndex) => (
                          <React.Fragment key={nestedIndex}>
                            <tr onClick={() => toggleNestedRow(rowIndex, nestedIndex)}>
                              <td>{nestedRow.detail1}</td>
                              <td>{nestedRow.detail2}</td>
                              <td>{nestedRow.detail3}</td>
                            </tr>
                            {nestedCollapsedRows[rowIndex]?.[nestedIndex] && (
                              <tr className="expanded-row">
                                <td colSpan={3}>
                                  <select
                                    value={nestedRow.status || 'pending'}
                                    onChange={(e) =>
                                      handleStatusChange(rowIndex, nestedIndex, e.target.value)
                                    }
                                  >
                                    <option value="pending">Pending</option>
                                    <option value="ongoing">Ongoing</option>
                                    <option value="completed">Completed</option>
                                  </select>
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;


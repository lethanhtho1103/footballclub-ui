import { useMemo } from 'react';
import { matchSorter } from 'match-sorter';
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';

// scss
import classNames from 'classnames/bind';
import style from './DataTable.module.scss';
import GlobalFilter from '../GlobalFilter';

const cx = classNames.bind(style);

function DataTable({ data, columns }) {
  function fuzzyTextFilterFn(rows, id, filterValue) {
    return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
  }

  fuzzyTextFilterFn.autoRemove = (val) => !val;
  const filterTypes = useMemo(
    () => ({
      fuzzyText: fuzzyTextFilterFn,
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue).toLowerCase().startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    [],
  );

  const {
    getTableProps,
    headerGroups,
    rows,
    pageOptions,
    page,
    state: { pageIndex, pageSize, globalFilter },
    previousPage,
    nextPage,
    setPageSize,
    canPreviousPage,
    canNextPage,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      filterTypes,
      //   defaultColumn,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
  );
  return (
    <div className={cx('wrap')}>
      <div className={cx('header__table')}>
        <div className={cx('header__table--entries')}>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[5, 10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
          Show {pageSize} / {rows.length} result
        </div>
        <div className={cx('header__table--search')}>
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
        </div>
      </div>
      <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        '  🔽'
                      ) : (
                        '  🔼'
                      )
                    ) : column.disableSortBy ? (
                      ' '
                    ) : (
                      <FontAwesomeIcon icon={faSort} className={cx('icon-sort')} />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
      <div className={cx('table-footer')}>
        <div className={cx('table-page-number')}>
          Page
          <em>
            {pageIndex + 1} / {pageOptions.length}
          </em>
        </div>
        <div className={cx('table-control')}>
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            Previous page
          </button>
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            Next page
          </button>
        </div>
      </div>

      {/* footer */}
      <div className={cx('footer__end')}>
        <hr />
        ---End---
      </div>
    </div>
  );
}

export default DataTable;

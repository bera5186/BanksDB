import React, { useEffect } from "react";
import { useTable, usePagination } from "react-table";

export const Table = ({
  columns,
  data,
  fetchData,
  pageCount,
  paginated = true,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      manualPagination: true,
      autoResetPage: false,
      autoResetSortBy: false,
      pageCount,
    },
    usePagination
  );

  useEffect(() => {
    fetchData({ pageIndex, pageSize });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, pageSize]);

  return (
    <>
      <table
        {...getTableProps()}
        className="min-w-full divide-y divide-gray-200"
      >
        <thead className="bg-gray-100">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  className="px-6 py-4 text-center"
                  {...column.getHeaderProps()}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody
          {...getTableBodyProps()}
          className="text-gray-600 bg-white divide-y divide-gray-200"
        >
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      className="px-6 py-4 text-center"
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination Section */}

      {paginated ? (
        <div className="pagination py-4 bg-gray-300 px-4 flex justify-evenly items-center">
          <div className="flex justify-center items-center w-auto">
            <button
              className="bg-purple-700 w-32 px-3 py-3 cursor-pointer mr-4 flex justify-center items-center rounded text-white"
              disabled={!canPreviousPage}
              onClick={() => gotoPage(0)}
            >
              {"<<"}
              Page 1
            </button>{" "}
            <button
              className="bg-purple-700 w-28 px-3 py-3 cursor-pointer mr-4 flex justify-center items-center rounded text-white"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              {"<"}
              Previous
            </button>{" "}
            <button
              className="bg-purple-700 w-28 px-3 py-3 cursor-pointer mr-4 flex justify-center items-center rounded text-white"
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              Next
              {">"}
            </button>{" "}
            <button
              className="bg-purple-700 w-32 rounded px-3 py-3 cursor-pointer ml-4 mr-4 flex justify-center items-center text-white"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              Page {pageCount}
              {" >>"}
            </button>{" "}
          </div>
          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageCount}
            </strong>{" "}
          </span>
          <div className="flex justify-between items-center">
            <span>
              | Go to page:{" "}
              <input
                type="number"
                defaultValue={pageIndex + 1}
                max={pageCount}
                min={1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  gotoPage(page);
                }}
                style={{ width: "100px" }}
              />
            </span>{" "}
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[3, 5, 10, 20, 30, 40, 50].map((pageSize) => (
                <option
                  key={pageSize}
                  value={pageSize}
                  onChange={(e) => {
                    console.log(e.target.value, "size");
                  }}
                >
                  Show {pageSize} per page
                </option>
              ))}
            </select>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

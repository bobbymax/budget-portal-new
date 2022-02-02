import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import TextInputField from '../../forms/TextInputField'
import TablePagination from './TablePagination'
import "./data-table.css"
import TableLoader from './TableLoader'

const DataTableComponent = ({
    pageName,
    columns,
    rows,
    handleEdit=undefined,
    handleDelete=undefined,
    term="",
    searchKeyWord=undefined,
    isFetching=false,
    exportable=false
}) => {

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)

    const handleChangePage = (newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    const getSearchTerm = e => {
        searchKeyWord(e.target.value)
    }
    return (
        <>
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">{ pageName }</h4>
                </div>
                <div className="card-body">
                    <div className="searchable">
                        <div className="row">
                            <div className="col-md-12">
                                <TextInputField 
                                    placeholder={`Search ${pageName}`}
                                    value={term}
                                    onChange={getSearchTerm}
                                    additionalClasses={`search-input`}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="table-responsive tableWrapper">
                        <table className="table table-bordered table-striped verticle-middle table-responsive-sm">
                            {/* Table Head */}
                            <thead>
                                <tr>
                                    {columns.map((col, index) => (
                                        <th key={index}>
                                            { col.label.toUpperCase() }
                                        </th>
                                    ))}
                                    {handleEdit !== undefined && (<th scope="col">Action</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {isFetching && (<TableLoader columnsLength={columns.length} />)}
                                {! isFetching && rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
                                    <tr key={row.id}>
                                        {columns && columns.length > 0 && columns.map((col, index) => (
                                            <td key={index}>{ row[col.key] }</td>
                                        ))}
                                        {handleEdit !== undefined && (
                                            <td>
                                                <span>
                                                    <Link to="#" onClick={() => handleEdit(row)} className="mr-4" data-toggle="tooltip" data-placement="top" title="Edit">
                                                        <i className="fa fa-pencil color-muted"></i> 
                                                    </Link>
                                                    <Link to="#" onClick={() => handleDelete(row)} className="mr-4" data-toggle="tooltip" data-placement="top" title="Edit">
                                                        <i className="fa fa-trash color-muted"></i> 
                                                    </Link>
                                                </span>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {! isFetching && (
                            <TablePagination 
                                rowsPerPageOptions={[5, 10, 25, 100]}
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default DataTableComponent

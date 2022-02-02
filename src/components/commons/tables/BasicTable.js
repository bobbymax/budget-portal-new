import React from 'react'
import { Link } from 'react-router-dom'

const BasicTable = ({
    page,
    columns,
    rows,
    handleEdit=undefined,
    handleDelete=undefined,
    exportable=false
}) => {
  return (
      <>
        <div className="card">
            <div className="card-header">
                <h4 className="card-title">{ page }</h4>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered table-striped verticle-middle table-responsive-sm">
                        <thead>
                            <tr>
                                {columns && columns.length > 0 && columns.map((col, index) => (
                                    <th scope="col" key={index}>{ col.label }</th>
                                ))}
                                {handleEdit !== undefined && (<th scope="col">Action</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {rows && rows.length > 0 ? rows.map(row => (
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
                            )) : (
                                <tr><td className="text-danger" colSpan={columns.length + 1}>No Data Found!!!</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      </>
  )
}

export default BasicTable

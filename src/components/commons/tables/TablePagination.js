import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const TablePagination = ({
    rowsPerPageOptions,
    count=0,
    rowsPerPage,
    page,
    onPageChange,
    onRowsPerPageChange
}) => {

    const [totalPages, setTotalPages] = useState(0)
    const next = page > 3 ? 'white' : 'grey'

    useEffect(() => {
        setTotalPages(Math.ceil(count / rowsPerPage))
    }, [rowsPerPage, count])

    return (
        <>
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-end">
                    <li>
                        <select 
                            className={`form-control`}
                            value={rowsPerPage}
                            onChange={onRowsPerPageChange}
                            defaultValue={rowsPerPage}
                        >
                            {rowsPerPageOptions.map((opt, i) => (
                                <option value={opt} key={i}>{ opt }</option>
                            ))}
                        </select>
                    </li>
                    <li className={`page-item ${page === 0 && 'disabled'}`}>
                        <Link className="page-link" to="#" onClick={() => onPageChange(page--)}>
                            <span aria-hidden="true" style={{ color: 'grey' }}>&laquo;</span>
                            <span className="sr-only">Previous</span>
                        </Link>
                    </li>
                        <li className={`page-item ${page === 1 && 'active'} ${page === 1 || page === totalPages ? 'disabled' : ''}`}><Link className="page-link" to="#" onClick={() => onPageChange(1)}>1</Link></li>
                        <li className={`page-item ${page === 2 && 'active'} ${page === 2 || page === totalPages ? 'disabled' : ''}`}><Link className="page-link" to="#" onClick={() => onPageChange(2)}>2</Link></li>
                        <li className={`page-item ${page === 3 && 'active'} ${page === 3 || page === totalPages ? 'disabled' : ''}`}><Link className="page-link" to="#" onClick={() => onPageChange(3)}>3</Link></li>
                    <li className={`page-item ${page > 3 && 'active'} ${page === totalPages && 'disabled'}`}>
                        <Link 
                            className="page-link" 
                            to="#"
                            onClick={() => {
                                onPageChange(page++)
                            }}
                        >
                            <span aria-hidden="true" style={{ color: next }}>&raquo;</span>
                            <span className="sr-only">Next</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default TablePagination

import React from 'react'

const TableLoader = ({
    columnsLength
}) => {
    return (
        <>
            <tr>
                <td colSpan={columnsLength + 1} className="loading"><div className="bar"></div></td>
            </tr>
            <tr>
                <td colSpan={columnsLength + 1} className="loading"><div className="bar"></div></td>
            </tr>
            <tr>
                <td colSpan={columnsLength + 1} className="loading"><div className="bar"></div></td>
            </tr>
            <tr>
                <td colSpan={columnsLength + 1} className="loading"><div className="bar"></div></td>
            </tr>
        </>
    )
}

export default TableLoader

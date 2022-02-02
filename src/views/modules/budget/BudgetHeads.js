import React, { useEffect, useState } from 'react'
import BasicTable from '../../../components/commons/tables/BasicTable'
import { collection } from '../../../services/utils/controllers'

const BudgetHeads = () => {


    const [budgetHeads, setBudgetHeads] = useState([])
    // const [open, setOpen] = useState(false)


    const columns = [
        { label: 'Name', key: 'name' }
    ]


    // const handleUpdate = data => {
    //     //
    // }

    // const handleDestroy = data => {

    // }

    useEffect(() => {
        try {
            collection('budgetHeads')
            .then(res => setBudgetHeads(res.data.data))
            .catch(err => console.log(err.message))
        } catch (error) {
            console.log(error)
        }
    }, [])

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="page-titles">
                    <button className="btn btn-success">
                        <i className="fa fa-plus"></i>{' '}
                        Import Budget Heads
                    </button>
                </div>
            </div>
            {/* Budget Heads component */}
            <div className="col-md-12">
                <BasicTable 
                    page="Budget Heads"
                    columns={columns}
                    rows={budgetHeads}
                />
            </div>
        </div>
    )
}

export default BudgetHeads

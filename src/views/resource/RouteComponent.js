/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import BasicTable from '../../components/commons/tables/BasicTable'
import { collection } from '../../services/utils/controllers'

const RouteComponent = ({
    entity,
    path,
    component,
    dependencies=[],
    formElements=[],
    columns=[],
    validations=[],
    tableType="basic"
}) => {

    // entity
    // route
    // component
    // dependencies
    // form elements [options for form select inputs] => { inputType: 'text', label: 'Roles', placeholder: 'Enter Roles', field: 'name', value: '' }
    // columns display
    // validation rules
    // alerts

    const [chunks, setChunks] = useState([])
    const [state, setState] = useState({})
    const [open, setOpen] = useState(false)

    const handleSubmit = e => {
        e.preventDefault()
    }

    const handleUpdate = data => {
        //
    }

    const handleDestroy = data => {
        //
    }

    useEffect(() => {
        try {
            collection(entity)
            .then(res => {
                setChunks(res.data.data)
            })
            .catch(err => console.log(err.message))
        } catch (error) {
            console.log(error)
        }
    }, [entity])

    useEffect(() => {
        const element = {}
        try {
            formElements.length > 0 && formElements.map(el => (element[el.key] = el.value))
            setState(element)
        } catch (error) {
            console.log(error)
        }
    }, [formElements])

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="page-titles">
                    <button className="btn btn-primary" onClick={() => setOpen(! open)} disabled={open}>
                        <i className="fa fa-plus-square"></i>{' '}
                        Add { entity }
                    </button>
                </div>
            </div>

            {open && (
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="form-body">
                                <form onSubmit={handleSubmit}>
                                    {formElements.length > 0 && formElements.map((el, index) => (
                                        {}
                                    ))}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="col-lg-12">
                <BasicTable 
                    page="Roles"
                    columns={columns}
                    rows={chunks}
                    handleEdit={handleUpdate}
                    handleDelete={handleDestroy}
                />
            </div>
        </div>
    )
}

export default RouteComponent

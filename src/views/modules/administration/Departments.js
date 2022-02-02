import React, { useEffect, useState } from 'react'
import BasicTable from '../../../components/commons/tables/BasicTable'
import CustomSelect from '../../../components/forms/CustomSelect'
import TextInputField from '../../../components/forms/TextInputField'
import Alert from '../../../services/classes/Alert'
import { alter, collection, destroy, store } from '../../../services/utils/controllers'
import { validate } from '../../../services/utils/validation'

const Departments = () => {

    const initialState = {
        id: 0,
        name: "",
        code: "",
        type: "",
        parentId: 0
    }

    const [state, setState] = useState(initialState)
    const [departments, setDepartments] = useState([])
    const [open, setOpen] = useState(false)
    const [update, setUpdate] = useState(false)
    const [errors, setErrors] = useState({})

    const columns = [
        {
            label: 'Name',
            key: 'name'
        },
        {
            label: 'Code',
            key: 'code'
        },
        {
            label: 'Type',
            key: 'type'
        }
    ]

    const types = [
        {key: "directorate", label: "Directorate"},
        {key: "division", label: "Division"},
        {key: "department", label: "Department"},
        {key: "unit", label: "Unit"},
    ]

    const rules = [
        {name: "name", rules: ['required', 'string', 'min:3']},
        {name: "code", rules: ['required', 'string']},
        {name: "type", rules: ['required', 'string']},
        {name: "parentId", rules: ['required']}
    ]

    const formatDept = () => {
        return departments.length > 0 && departments.map(dept => (
            {
                key: dept.id,
                label: dept.name,
                code: dept.code,
                parent: dept.parentId
            }
        ))
    }


    const handleSubmit = e => {
        e.preventDefault()

        const data = {
            name: state.name,
            code: state.code,
            type: state.type,
            parentId: state.parentId,
        }

        const formErrors = validate(rules, data)
        setErrors(formErrors)
        const status = Object.keys(formErrors).length === 0 && formErrors.constructor === Object

        if (status) {
            if (update) {
                try {
                    alter('departments', state.id, data)
                    .then(res => {
                        const result = res.data.data

                        setDepartments(departments.map(el => {
                            if (result.id === el.id) {
                                return result
                            }

                            return el
                        }))
                        Alert.success('Updated', res.data.message)
                    })
                    .catch(err => console.log(err.message))
                } catch (error) {
                    console.log(error)
                }
            } else {
                try {
                    store('departments', data)
                    .then(res => {
                        const result = res.data.data
                        setDepartments([result, ...departments])
                        Alert.success('Created!!', res.data.message)
                    })
                    .catch(err => console.log(err.message))
                } catch (error) {
                    console.log(error)
                }
            }

            setErrors({})

            setUpdate(false)
            setState(initialState)
            setOpen(false)
        }
    }

    const handleUpdate = data => {
        setState(data)
        setUpdate(true)
        setOpen(true)
    }

    const handleDestroy = data => {
        Alert.flash('Are you sure?', 'warning', "You would not be able to revert this!!")
        .then(result => {
            if (result.isConfirmed) {
                destroy('departments', data.id)
                .then(res => {
                    setDepartments([...departments.filter(dept => dept.id !== res.data.data.id)])
                    Alert.success('Deleted!!', res.data.message)
                })
                .catch(err => console.log(err.message))
            }
        })
    }


    useEffect(() => {
        try {
            collection('departments')
            .then(res => setDepartments(res.data.data))
            .catch(err => console.log(err.message))
        } catch (error) {
            console.log(error)
        }
    }, [])

    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <div className="page-titles">
                        <button className="btn btn-success" onClick={() => setOpen(! open)} disabled={open}>
                            <i className="fa fa-plus"></i>{' '}
                            Add Department
                        </button>
                    </div>
                </div>

                {open && (
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="form-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <TextInputField 
                                                    placeholder="Enter Department Name"
                                                    value={state.name}
                                                    onChange={e => setState({ ...state, name: e.target.value })}
                                                    error={errors && errors.name && errors.name.length > 0}
                                                    errorMessage={errors && errors.name && errors.name[0]}
                                                />
                                            </div>
                                            <div className="col-md-3">
                                                <TextInputField 
                                                    placeholder="Enter Code"
                                                    value={state.code}
                                                    onChange={e => setState({ ...state, code: e.target.value })}
                                                    error={errors && errors.code && errors.code.length > 0}
                                                    errorMessage={errors && errors.code && errors.code[0]}
                                                />
                                            </div>
                                            <div className="col-md-5">
                                                <CustomSelect 
                                                    defaultText="None"
                                                    options={formatDept()}
                                                    value={state.parentId}
                                                    onChange={e => setState({ ...state, parentId: e.target.value })}
                                                    error={errors && errors.parentId && errors.parentId.length > 0}
                                                    errorMessage={errors && errors.parentId && errors.parentId[0]}
                                                />
                                            </div>

                                            <div className="col-md-4">
                                                <CustomSelect 
                                                    defaultText="Select Department Type"
                                                    options={types}
                                                    value={state.type}
                                                    onChange={e => setState({ ...state, type: e.target.value })}
                                                    error={errors && errors.type && errors.type.length > 0}
                                                    errorMessage={errors && errors.type && errors.type[0]}
                                                />
                                            </div>

                                            <div className="col-md-12 mt-3">
                                                <button type="submit" className="btn btn-primary">Submit</button>
                                                <button type="button" className="btn btn-danger" onClick={() => {
                                                    setUpdate(false)
                                                    setState(initialState)
                                                    setOpen(false)
                                                    setErrors({})
                                                }}>Close</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="col-lg-12">
                    <BasicTable
                        page="Departments"
                        columns={columns}
                        rows={departments}
                        handleEdit={handleUpdate}
                        handleDelete={handleDestroy}
                    />
                </div>
            </div>
        </>
    )
}

export default Departments

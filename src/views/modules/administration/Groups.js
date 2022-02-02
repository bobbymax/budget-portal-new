/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import BasicTable from '../../../components/commons/tables/BasicTable'
import CustomSelect from '../../../components/forms/CustomSelect'
import TextInputField from '../../../components/forms/TextInputField'
import Alert from '../../../services/classes/Alert'
import { alter, collection, destroy, store } from '../../../services/utils/controllers'
import { validate } from '../../../services/utils/validation'

const Groups = () => {

    const initialState = {
        id: 0,
        name: "",
        max_slots: 0,
        start_date: "",
        expiry_date: "",
        cannot_expire: 0,
    }

    const [groups, setGroups] = useState([])
    const [state, setState] = useState(initialState)
    const [update, setUpdate] = useState(false)
    const [open, setOpen] = useState(false)
    const [errors, setErrors] = useState({})


    const columns = [
        {
            label: 'Name',
            key: 'name'
        },
        {
            label: 'Slot',
            key: 'max_slots'
        }
    ]

    const options = [
        {key: "1", label: "Yes"},
        {key: "0", label: "No"},
    ]

    const rules = [
        {name: "name", rules: ['required', 'string', 'min:3']},
        {name: "max_slots", rules: ['required', 'integer']},
        {name: "start_date", rules: ['required']},
        {name: "cannot_expire", rules: ['required']},
    ]


    const handleUpdate = data => {
        setState(data)
        setUpdate(true)
        setOpen(true)
    }

    const handleSubmit = e => {
        e.preventDefault()

        const data = {
            name: state.name,
            max_slots: parseInt(state.max_slots),
            start_date: state.start_date,
            expiry_date: state.expiry_date,
            cannot_expire: state.cannot_expire,
        }

        const formErrors = validate(rules, data)
        setErrors(formErrors)
        const status = Object.keys(formErrors).length === 0 && formErrors.constructor === Object

        if (status) {
            if (update) {
                try {
                    alter('groups', state.id, data)
                    .then(res => {
                        const result = res.data.data

                        setGroups(groups.map(el => {
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
                    store('groups', data)
                    .then(res => {
                        const result = res.data.data
                        setGroups([result, ...groups])
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

    const handleDestroy = data => {
        Alert.flash('Are you sure?', 'warning', "You would not be able to revert this!!")
        .then(result => {
            if (result.isConfirmed) {
                destroy('groups', data.id)
                .then(res => {
                    setGroups([...groups.filter(grp => grp.id !== res.data.data.id)])
                    Alert.success('Deleted!!', res.data.message)
                })
                .catch(err => console.log(err.message))
            }
        })
    }


    useEffect(() => {
        try {
            collection('groups')
            .then(res => {
                setGroups(res.data.data)
            })
            .catch(err => console.log(err.message))
        } catch (error) {
            console.log(error)
        }
    }, [])

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="page-titles">
                    <button className="btn btn-primary" onClick={() => setOpen(! open)} disabled={open}>
                        <i className="fa fa-plus-square"></i>{' '}
                        Add Group
                    </button>
                </div>
            </div>

            {open && (
                <>
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="form-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <TextInputField 
                                                    placeholder="Enter Group Name"
                                                    value={state.name}
                                                    onChange={e => setState({ ...state, name: e.target.value })}
                                                    error={errors && errors.name && errors.name.length > 0}
                                                    errorMessage={errors && errors.name && errors.name[0]}
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <TextInputField 
                                                    placeholder="Enter Max Slot"
                                                    type="number"
                                                    value={state.max_slots}
                                                    onChange={e => setState({ ...state, max_slots: e.target.value })}
                                                    error={errors && errors.max_slots && errors.max_slots.length > 0}
                                                    errorMessage={errors && errors.max_slots && errors.max_slots[0]}
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <CustomSelect 
                                                    defaultText="Cannot Expire?"
                                                    options={options}
                                                    value={state.cannot_expire}
                                                    onChange={e => setState({ ...state, cannot_expire: e.target.value })}
                                                    error={errors && errors.cannot_expire && errors.cannot_expire.length > 0}
                                                    errorMessage={errors && errors.cannot_expire && errors.cannot_expire[0]}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <TextInputField 
                                                    placeholder="Start Date"
                                                    type="date"
                                                    value={state.start_date}
                                                    onChange={e => setState({ ...state, start_date: e.target.value })}
                                                    error={errors && errors.start_date && errors.start_date.length > 0}
                                                    errorMessage={errors && errors.start_date && errors.start_date[0]}
                                                />
                                            </div>

                                            <div className="col-md-6">
                                                <TextInputField 
                                                    placeholder="Expiry Date"
                                                    type="date"
                                                    value={state.expiry_date}
                                                    onChange={e => setState({ ...state, expiry_date: e.target.value })}
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
                </>
            )}

            <div className="col-md-12">
                <BasicTable 
                    page="Groups"
                    columns={columns}
                    rows={groups}
                    handleEdit={handleUpdate}
                    handleDelete={handleDestroy}
                />
            </div>
        </div>
    )
}

export default Groups

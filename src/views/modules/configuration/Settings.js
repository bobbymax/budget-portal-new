/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-script-url */
import React, { useEffect, useState } from 'react'
import TextInputField from '../../../components/forms/TextInputField'
import CustomSelect from '../../../components/forms/CustomSelect'
import BasicTable from '../../../components/commons/tables/BasicTable'
import { collection, store } from '../../../services/utils/controllers'

const Settings = () => {

    const initialState = {
        key: "",
        display_name: "",
        input_type: "",
        group: "",
        details: ""
    }

    const [state, setState] = useState(initialState)
    const [settings, setSettings] = useState([])
    const [open, setOpen] = useState(false)

    const columns = [
        {key: 'key', label: 'Key'},
        {key: 'display_name', label: 'Display Name'},
        {key: 'input_type', label: 'Input Type'},
        {key: 'group', label: 'Group'}
    ]

    const options = [
        {key: "text", label: "Text"},
        {key: "textarea", label: "Textarea"},
        {key: "file", label: "File"},
        {key: "number", label: "Number"},
        {key: "password", label: "Password"},
        {key: "email", label: "Email"},
        {key: "checkbox", label: "Checkbox"},
        {key: "radio", label: "Radio"},
    ]

    const groups = [
        {key: "site", label: "Site"},
        {key: "admin", label: "Admin"},
    ]

    const updateRow = data => {
        console.log(data)
    }

    const handleSubmit = e => {
        e.preventDefault()

        // console.log(state)
        const data = {
            key: state.key,
            display_name: state.display_name,
            input_type: state.input_type,
            group: state.group,
            details: state.details
        }

        try {
            store('settings', data)
            .then(res => {
                setSettings([res.data.data, ...settings])
            })
            .catch(err => console.log(err.message))
        } catch (error) {
            console.log(error)
        }

        setState(initialState)
        setOpen(false)
    }

    useEffect(() => {
        try {
            collection('settings')
            .then(res => {
                setSettings(res.data.data)
            })
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
                    <button className="btn btn-primary" onClick={() => setOpen(! open)} disabled={open}>
                        <i className="fa fa-plus-square"></i>{' '}
                        Add Setting
                    </button>
                </div>
            </div>
            {open && (
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="fomr-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-md-5">
                                                <TextInputField 
                                                    placeholder="Enter Key"
                                                    value={state.key}
                                                    onChange={e => setState({...state, key: e.target.value})}
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-7">
                                                <TextInputField 
                                                    placeholder="Enter Display Name"
                                                    value={state.display_name}
                                                    onChange={e => setState({...state, display_name: e.target.value})}
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <CustomSelect 
                                                    options={options}
                                                    value={state.input_type}
                                                    onChange={e => setState({...state, input_type: e.target.value})}
                                                />
                                            </div>

                                            <div className="col-md-6">
                                                <CustomSelect 
                                                    options={groups}
                                                    value={state.group}
                                                    onChange={e => setState({...state, group: e.target.value})}
                                                />
                                            </div>
                                            <div className="col-md-12">
                                                <TextInputField 
                                                    placeholder="Enter Details"
                                                    value={state.details}
                                                    onChange={e => setState({...state, details: e.target.value})}
                                                    multiline="4"
                                                />
                                            </div>
                                            <div className="col-md-12 mt-3">
                                                <button type="submit" className="btn btn-primary">Submit</button>
                                                <button type="button" className="btn btn-danger" onClick={() => setOpen(false)}>Close</button>
                                            </div>
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
                    page="Settings"
                    columns={columns}
                    rows={settings}
                    handleEdit={updateRow}
                />
            </div>
        </div>

      </>
  )
};

export default Settings

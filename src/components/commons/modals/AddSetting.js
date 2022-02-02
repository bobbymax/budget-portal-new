import React, { useState } from 'react'
import CustomSelect from '../../forms/CustomSelect';
import TextInputField from '../../forms/TextInputField';

const AddSetting = ({ onSubmit }) => {

    const initialState = {
        key: "",
        display_name: "",
        input_type: "",
        group: "",
        details: ""
    }

    const [state, setState] = useState(initialState)

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

    const handleSubmit = e => {
        e.preventDefault()
        onSubmit(state)
        setState(initialState)
    }

  return (
    <div className="modal fade add-setting" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-lg">
            <div className="modal-content">
                <form onSubmit={handleSubmit}>
                    <div className="modal-header">
                        <h5 className="modal-title">Add Setting</h5>
                        <button type="button" className="close" data-dismiss="modal">
                            <span>×</span>
                        </button>
                    </div>
                    <div className="modal-body">
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
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger light" data-dismiss="modal">Close</button>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
};

export default AddSetting

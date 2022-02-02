import React from 'react'

const CustomSelect = ({
    label="",
    options,
    value="",
    onChange=undefined,
    defaultText="Choose Option",
    defaultInputValue=0,
    error=false,
    errorMessage=null,
    arrinput=false
}) => {
  return (
      <>
        <div className={`form-group ${error ? 'input-danger' : ''}`}>
            {label !== "" && (<label className="mb-1"><strong>{label}</strong></label>)}
            <select 
                className={arrinput ? `multi-select` : `form-control default-select`}
                value={value}
                onChange={onChange}
                multiple={arrinput ? 'multiple' : ''}
            >
                <option value={defaultInputValue}>{ defaultText }</option>
                {options.map((option, index) => (
                    <option key={index} value={option.key}>{option.label}</option>
                ))}
            </select>
            {errorMessage ? (<span style={{ fontSize: 12 }} className="text-danger">{ errorMessage }</span>) : null}
        </div>
      </>
  )
};

export default CustomSelect

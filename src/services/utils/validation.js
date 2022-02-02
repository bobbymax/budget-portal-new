
const cleanse = obj => {
    for (let name in obj) {
        if (obj[name] && obj[name].length === 0) {
            delete obj[name]
        }
    }
    return obj
} 

export const validate = (validation, value) => {

    const error = {}

    // loop through validation to get rules
    validation.forEach(request => {
        const fieldError = []

        // loop through rules and check if the values meets the criteria 
        request.rules.forEach(rule => {
            // if it doesnt meet requirement load the error message
            // rule.substring(0,3) === "min" && fieldError.push(`${request.name} is here`)

            if (rule === "required") {
                ! value[request.name] && fieldError.push(`${request.name} is required!`)
            }

            if (rule === "string") {
                typeof value[request.name] !== 'string' && fieldError.push(`${request.name} must be a type of string.`)
            }

            if (rule === "integer") {
                typeof value[request.name] !== 'number' && fieldError.push(`${request.name} must be an integer`)
            }

            if (rule === "array") {
                ! Array.isArray(value[request.name]) && fieldError.push(`${request.name} must be an array`)
            }

            if (rule.substring(0,3) === "max") {
                const limit = rule.split(":")
                const val = limit[1]

                value[request.name].length > val && fieldError.push(`${request.name} must have ${val} character(s) or less`)
            }

            if (rule.substring(0,3) === "min") {
                const res = rule.split(":")
                const fig = res[1]

                value[request.name].length < fig && fieldError.push(`${request.name} must have ${fig} or more character(s)`)
            }
        })

        error[request.name] = fieldError
    })

    // return error
    return cleanse(error)
}
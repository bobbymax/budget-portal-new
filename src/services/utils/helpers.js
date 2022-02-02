export const formatConfig = arr => {
    const obt = {}

    if (arr.length > 0) {
        arr.forEach(el => {
            obt[el.key] = el.value
        })
    }

    return obt
}

export const getMonthToCurrent = () => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const date = new Date()

    return months.slice(0, months[date.getMonth()])
}

export const formatCurrency = fig => {
    let currency = Intl.NumberFormat('en-US')
    return "NGN " + currency.format(fig)
}

export const returnArr = arrs => {
    const arr = []

    arrs.forEach(el => {
        arr.push(el && el.fund.booked_balance)
    })

    return arr
}
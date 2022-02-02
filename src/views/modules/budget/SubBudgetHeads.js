import React, { useEffect, useState } from 'react'
import DataTableComponent from '../../../components/commons/tables/DataTableComponent'
import { collection } from '../../../services/utils/controllers'

const SubBudgetHeads = () => {

    const [subBudgetHeads, setSubBudgetHeads] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [results, setResults] = useState([])

    const columns = [
        {
            label: 'Name',
            key: 'name'
        }
    ]

    const handleEdit = data => {

    }

    const handleDestroy = data => {

    } 

    const handleSearch = str => {
        setSearchTerm(str)

        if (str !== "") {
            const filtered = subBudgetHeads.filter(row => {
                return Object.values(row)
                .join(" ")
                .toLowerCase()
                .includes(str.toLowerCase())
            })

            setResults(filtered)
        } else {
            setResults(subBudgetHeads)
        }
    }
 

    useEffect(() => {
        try {
            setIsLoading(true)
            collection('subBudgetHeads')
            .then(res => {
                setSubBudgetHeads(res.data.data)
                setIsLoading(false)
            })
            .catch(err => console.log(err.message))
        } catch (error) {
            console.log(error)
        }
    }, [])

    return (
        <>
            <DataTableComponent 
                pageName="Sub Budget Heads"
                columns={columns}
                rows={searchTerm.length < 1 ? subBudgetHeads : results}
                handleEdit={handleEdit}
                handleDelete={handleDestroy}
                term={searchTerm}
                searchKeyWord={handleSearch}
                isFetching={isLoading}
            />
        </>
    )
}

export default SubBudgetHeads

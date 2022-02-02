/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ModuleCard from '../../components/commons/widgets/ModuleCard'

const Modules = () => {

    const auth = useSelector(state => state.auth.value.user)

    const [modules, setModules] = useState([])

    const handleNav = data => {
        //
    }


    useEffect(() => {
        if (auth && auth.department) {
            setModules(auth.accessibleModules)
        }
    }, [auth])

    return (
        <>
            <div className="row">
                {modules.map(module => module.type === "application" && (
                    <div className="col-xl-3 col-lg-6 col-sm-6" key={module.id}>
                        <ModuleCard 
                            name={module.name}
                            path={`/applications${module.path}`}
                            children={module.children}
                            entity={module}
                            handleNav={handleNav}
                        />
                    </div>
                ))}
            </div>
        </>
    )
}

export default Modules

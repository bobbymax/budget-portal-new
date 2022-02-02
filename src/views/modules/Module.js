import React from 'react'
import { useLocation } from 'react-router-dom'
import ModuleCard from '../../components/commons/widgets/ModuleCard'

const Module = () => {

  const location = useLocation()
  const { module } = location.state

  return (
      <>
        <div className="row">
          {module && module.children.length > 0 && module.children.map(child => (
            <div className="col-xl-3 col-lg-6 col-sm-6" key={child.id}>
              <ModuleCard 
                name={child.name}
                path={child.path}
                children={child.children}
                entity={child}
                color="warning"
              />
            </div>
          ))}
        </div>
      </>
  )
}

export default Module

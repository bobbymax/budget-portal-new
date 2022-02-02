/* eslint-disable jsx-a11y/role-supports-aria-props */
import React from 'react'
import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'

const Aside = () => {

    const auth = useSelector(state => state.auth.value.user)

  return (
    <div className="deznav">
        <div className="deznav-scroll">
            <ul className="metismenu" id="menu">
                <li>
                    <NavLink to="/" className="ai-icon" aria-expanded="false">
                        <i className="flaticon-381-networking" />
                        <span className="nav-text">Dashboard</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/applications" className="ai-icon" aria-expanded="false">
                        <i className="flaticon-381-app" />
                        <span className="nav-text">Modules</span>
                    </NavLink>
                </li>

                {auth && auth.administrator ? (
                    <li>
                        <Link to="/settings" className="ai-icon" aria-expanded="false">
                            <i className="flaticon-381-settings-2" />
                            <span className="nav-text">Settings</span>
                        </Link>
                    </li>
                ) : null}
            </ul>
        </div>
    </div>
  )
}

export default Aside

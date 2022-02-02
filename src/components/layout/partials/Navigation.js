/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import logo from "../../../assets/images/logo-ncdmb.png"
import logoCompact from "../../../assets/images/logo-text-again.png"
import brand from "../../../assets/images/logo-text-again.png"

const Navigation = () => {
  return (
    <div className="nav-header">
    <a href="#" className="brand-logo">
        <img className="logo-abbr" src={logo} alt="logo top" />
        <img className="logo-compact" src={logoCompact} alt="logo compact" />
        <img className="brand-title" src={brand} alt="brand logo" />
    </a>
    <div className="nav-control">
        <div className="hamburger">
        <span className="line" /><span className="line" /><span className="line" />
        </div>
    </div>
    </div>

  )
}

export default Navigation

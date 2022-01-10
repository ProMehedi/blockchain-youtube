import React from 'react'
import Identicon from 'identicon.js'
import dvideo from '../dvideo.png'

const Navbar = ({ account }) => {
  return (
    <nav className='navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow text-monospace'>
      <a className='navbar-brand col-sm-3 col-md-2 mr-0' href='/'>
        <img
          src={dvideo}
          width='30'
          height='30'
          className='d-inline-block align-top'
          alt=''
        />
        &nbsp;DVide0
      </a>
      <ul className='navbar-nav px-3'>
        <li className='nav-item text-nowrap d-none d-sm-none d-sm-block'>
          <small className='text-white'>{account && account}</small>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar

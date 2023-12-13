import React from 'react'
import Menu from './Menu'

const SideBar = ({activePage}) => {
  return (
    <>
        <Menu page={activePage}/>
    </>
  )
}

export default SideBar
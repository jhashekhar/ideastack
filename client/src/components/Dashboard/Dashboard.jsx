import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom'


const linkStyle = "font-mono text-md text-blue-600 hover:text-blue-400 tracking-normal"
const buttonStyle = "h-8 px-2 py-1 bg-blue-500 font-mono text-sm text-white rounded-sm"


export function TopBar(props) {

  let history = useHistory()

  const handleSignOut = (event) => {
    event.preventDefault()

    localStorage.clear()
    history.push('/')
  }

  return (
    <div className="grid grid-cols-2 pb-5">
      <div className="h-12 col-span-1">
        <span className="font-mono text-xl font-bold tracking-normal">Your Stack</span>
      </div>

      <div className="h-12 col-span-1 justify-self-end">
        <div className="grid grid-cols-2 gap-10">
          <div>
            <span className="h-8 font-mono text-sm py-1 font-bold">Hi, {props.name}!</span>
          </div>

          <div>
            <button onClick={handleSignOut} className={buttonStyle}>Sign Out</button>
          </div>
        </div>
      </div>
  </div>
  )

}

export function SideBar() {
  return (
    <div>
      <div>
        <Link to="/einingar" className={linkStyle}>Books</Link>
      </div>

      <div className="pt-3">
        <Link to="/domain" className={linkStyle}>Domains</Link>
      </div>

      <div className="pt-3">
        <Link to="/l" className={linkStyle}>Links</Link>
      </div>
    </div>
  )
}


function Dashboard() {

  if (!localStorage.getItem('username')) {
    return (
      <div className="mt-20 mx-48 center">
        <span className="font-mono">
          You are not signed in. <Link to='/' className={linkStyle}>Click Here</Link> to signin or signup.
        </span>
      </div>
    )
  } else {
    const name = localStorage.getItem('username').split(' ')[0]

    return (
      <div className="mx-10 mt-10 flex flex-col h-screen justify-between">
        <div>
          <TopBar name={name}/>
          <SideBar />
        </div>
      </div>
    )
  }
}

export default Dashboard

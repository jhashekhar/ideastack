import React from 'react'
import { Link } from 'react-router-dom'

function Home() {

  const linkStyle = "font-mono text-md text-blue-600 hover:text-blue-400 tracking-normal"
  return (
      <div className="pt-8 px-10 flex flex-col h-screen justify-between">
        <div>
          <div className="pb-10">
            <span className="font-mono text-xl font-bold tracking-normal">Idea Stack</span> <span className="font-mono italic">- A different way to organise, improvise and share your ideas!</span>
          </div>
          
          <div className="pt-2">
            <Link to="/signin" className={linkStyle}>Sign In</Link>
          </div>

          <div className="pt-3">
            <Link to="/signup" className={linkStyle}>Sign Up</Link>
          </div>

        </div>
        
        <footer className="pb-5">
          <span className="font-mono text-sm">Built by </span><a className="font-mono text-sm text-blue-600" href="https://jhashekhar.github.io">Shekhar Jha</a>
        </footer>
    </div>
  )
}

export default Home

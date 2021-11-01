import {gql, useMutation} from '@apollo/client'
import React, { useState } from 'react'

// initial input values
const initialValues = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SIGN_UP = gql`
  mutation ($name: String, $email: String, $password: String) {
    register(name: $name, email: $email, password: $password) {
      name
      email
      password
    } 
  }
`

const inputStyle = "h-8 w-64 px-1 bg-gray-100 border border-gray-400 focus:outline-none focus:border focus:border-blue-500 rounded-sm"
const buttonSytle = "h-9 px-2 py-0.5 bg-blue-600 rounded-sm"

function SignUpForm() {
  const [values, setValues] = useState(initialValues)
  const [toggle, setToggle] = useState(false)
  
  const [signup, { data }] = useMutation(SIGN_UP)

  const handleInputChange = (event) => {
    const { name, value } = event.target
    
    setValues({...values, [name]: value})
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    // run mutation function
    signup({variables: { name: `${values.firstname} ${values.lastname}`, 
                         email: values.email.toLowerCase(), 
                         password: values.password}}).catch(err => console.log(err))
  }

  const handleToggle = (event) => {
    event.preventDefault()
    setToggle(!toggle)

  } 

  return (
    <div>
      <form>
        <p className="pt-2"> 
           <input className={inputStyle} name='firstname' type='text' placeholder='First Name' onChange={handleInputChange} />
        </p>
        
        <p className="pt-2">
          <input className={inputStyle} name='lastname' type='text' placeholder='Last Name'  onChange={handleInputChange}/>
        </p>
        
        <p className="pt-2">
          <input className={inputStyle} name='email' type='text' placeholder='Email' onChange={handleInputChange}/>
        </p>

        <p className="pt-2">
          <input className={"mr-2 " + inputStyle} name='password' type={toggle? 'text' : 'password'} placeholder='Password' onChange={handleInputChange} />
          <button onClick={handleToggle}>
            <span className="font-mono text-sm">Show Password</span>
          </button>
        </p>
        
        <p className="pt-2">
          <input className={inputStyle} name='confirmPassword' type='password' placeholder='Confirm Password' onChange={handleInputChange} />
        </p>

        <p className="pt-4">
          <button className={buttonSytle} onClick={handleSubmit}>
            <span className="font-mono text-white text-sm">Sign Up</span>
          </button>
        </p>
      </form>
    </div>
  )
}

function SignUp() {
  return (
    <div className="px-10 pt-8">
     <p className="pb-8 font-mono text-lg font-bold">Sign Up</p>
     <SignUpForm />
    </div>
  )
}

export default SignUp

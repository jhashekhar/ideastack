import React, { useState } from 'react'
import { gql, useMutation } from "@apollo/client"
import { useHistory } from "react-router-dom"

// initial input values
const initialValues = {
  email: '',
  password: ''
}

const SIGN_IN = gql`
  mutation ($email: String, $password: String) {
    signIn(email: $email, password: $password) {
      token
      user {
        id
        email
        name
      }
    }
  }
`

const inputStyle = "h-8 w-64 px-1 bg-gray-100 border border-gray-400 focus:outline-none focus:border focus:border-blue-500 rounded-sm"
const buttonStyle = "h-8 px-2 my-0.25 bg-blue-600 rounded-sm"

function SignInForm() {
  const [values, setValues] = useState(initialValues)
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  let history = useHistory()

  const [userSignIn] = useMutation(SIGN_IN, { 
    variables: {
      email: values.email, 
      password: values.password 
    },
    onCompleted: (userSignIn) => {
      if (userSignIn) {
        console.log(userSignIn)
        localStorage.setItem('token', userSignIn.signIn.token)
        localStorage.setItem('userId', userSignIn.signIn.user.id)
        localStorage.setItem('username', userSignIn.signIn.user.name)
        history.push('/db')
      }
    }
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target
    if (value !== '' && name === 'email') setEmailError(false)
    if (value !== '' && name === 'password') setPasswordError(false)
    setValues({...values, [name]: value})

  }


  const handleSubmit = (event) => {
   event.preventDefault()

   if (values.email === '' && values.password === '') {
     setEmailError(true)
     setPasswordError(true)
   } else if (values.email === '') {
     setEmailError(true)
   } else if (values.password === '') {
     setPasswordError(true)
   } else {
     try {
       userSignIn()
     } catch(err) {
       console.log(err)
     }
   }
 }
  
  return (
    <div>
      <form>
       <p className="pt-2">
         <input className={inputStyle} name='email' type='text' placeholder='Email' onChange={handleInputChange}/>
         {emailError? <span className="text-red-600 text-sm tracking-wide"> Email field is empty!</span> : null}
       </p>

       <p className="pt-2">
         <input className={inputStyle} name='password' type='password' placeholder='Password' onChange={handleInputChange}/> 
         {passwordError? <span className="text-red-600 text-sm tracking-wide"> Password field is empty!</span> : null}
       </p>

       <p className="pt-4">
         <button className={buttonStyle} onClick={handleSubmit}>
           <span className="font-mono text-sm text-white">Sign In</span>
         </button>
       </p>
      </form>
    </div>
  )
}


function SignIn(){
  return (
    <div className="px-10 pt-8">
      <p className="pb-8 font-mono text-lg font-bold">Sign In</p>
      <SignInForm />
    </div>

  )
}

export default SignIn

import React, {useState} from "react"


const initialFormState = {
  signin: true,
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
}

function Auth() {
  const [formState, setFormState] = useState(initialFormState)
  const [passwordError, setPasswordError] = useState('')

  const handleInputChange = (event) => {
    const {name, value} = event.target

    setFormState({...formState, [name]: value})
  }

  const handleClick = (event) => {
    event.preventDefault()
    setFormState({ ...formState, signin: !formState.signin })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (formState.signin) {
      const data = { email: formState.email, password: formState.password}
      console.log(data)
    } else {
      if (formState.password === formState.confirmPassword) {
      const data = { name: formState.name, email: formState.email, password: formState.password}
      console.log(data)
      } else {
        setPasswordError("Password doesn't match")
      }
    }
  }

  return (
    <div>  
      <h3>{formState.signin? "Sign In" : "Sign Up"}</h3>
      
      <div>
        {!formState.signin && (
          <input name="name" type="text" placeholder="Your name" onChange={handleInputChange}/>
        )}
      </div>

      <div>
        <input name="email" type="text" placeholder="Email" onChange={handleInputChange}/>
      </div>

      <div>
        <input name="password" type="password" placeholder="Password" onChange={handleInputChange}/>
        {passwordError}
      </div>
    
      <div>
        {!formState.signin && (
          <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleInputChange}/>
        )}
      </div>

      <div>
        <p>
          <button onClick={handleSubmit}>
            { formState.signin? 'Sign In' : 'Create Account'}
          </button>
        </p>

        <p>
          <button onClick={handleClick}>
            { formState.signin? 'Create an account?' : 'Already have an account'}
          </button>
        </p>
      </div>
    </div>
  )
}

export default Auth

import React, { useState } from 'react'
import { FaUser } from 'react-icons/fa'

function Login() {
    const [formData,setFormData] = useState({
        name:'',
        email:'',
        password:'',
        password2:''

    })

    const { email, password } = formData

    const onChange = (e) =>{ 

        setFormData((prevState) =>({
            ...prevState,
            [e.target.name]:e.target.value,
        }))
    }

    const onSubmit = (e) =>{
        e.preventDefault();
    }

  return (
      <>
          <section className="heading">
              <h1>
                  <FaUser />Login
              </h1>
              <p>Please Login to set goals</p>
          </section>
          <section className="form">
            <form onSubmit={onSubmit}>

                <div className="form-group">
                    <input 
                        type="email"
                        className="form-control" 
                        id='email' 
                        name='email'
                        value={email}
                        placeholder='Enter email' 
                        onChange={onChange} 
                    />
                </div>

                <div className="form-group">
                    <input 
                        type="password"
                        className="form-control" 
                        id='password' 
                        name='password'
                        value={password}
                        placeholder='Enter password' 
                        onChange={onChange} 
                    />
                </div>

                <div className="form-group">
                    <button type='submit' className="btn btn-block">
                        Submit
                    </button>
                </div>
                  
            </form>
          </section>
      </>
  )
}

export default Login
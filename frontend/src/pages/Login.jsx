import React, { useEffect, useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import { login, reset } from '../features/auth/authSlice'

function Login() {
    const [formData,setFormData] = useState({
        name:'',
        email:'',
        password:'',
        password2:''

    })

    const { email, password } = formData

    const navigate = useNavigate()
    const dispatch  = useDispatch()

    const { user, isLoading,isError,isSuccess, message} = useSelector((state)=>state.auth)

    useEffect(() =>{
        if(isError){
            toast.error(message)
        }
        if(isSuccess || user){
            navigate('/')
        }
        dispatch(reset())

    },[user,isError,isSuccess,message,navigate,dispatch])

    const onChange = (e) =>{ 

        setFormData((prevState) =>({
            ...prevState,
            [e.target.name]:e.target.value,
        }))
    }

    const onSubmit = (e) =>{
        e.preventDefault()

        const userData = {
            email,
            password
        }
        dispatch(login(userData))
    }

    if(isLoading){
        return  <Spinner/>
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
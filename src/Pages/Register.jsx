import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import api from '../API/axios'
import background from '../Assets/background.jpg'

const Register = ({currentuser,setCurrentuser}) => {
    const navigate = useNavigate()
    const [values,setValues] = useState({
        username:"",
        email:"",
        mobile:undefined,
        password:"",
        confirm:""
    })
    const [loader,setLoader] = useState(false)
    const handleChange =(e)=>{
        setValues({...values,[e.target.name]: e.target.value})
    }
    const handleValidation =()=>{
        const {username,email,mobile,password,confirm} = values
        if(email === ""){
            alert("username is required")
            return false
        }
        else if(username === ""){
          alert("password is required")
          return false
        }
        else if(mobile === undefined){
          alert("password is required")
          return false
        }
        else if(confirm === ""){
          alert("password is required")
          return false
        }
        else if(password === ""){
          alert("password is required")
          return false
        }
        else if(password !== confirm){
          alert("incorrect confirm password")
          return false
        }
        return true
    }
    const handleSubmit =async(e)=>{
        setLoader(true)
        e.preventDefault()
        if(handleValidation()){
            try {
                const {username,email,mobile,password} = values
                const userData = {username,email,mobile,password}
                const {data} = await api.post('/auth/register',userData)
                if(data.status === false){
                    setLoader(false)
                    alert(data.msg)
                    console.log(data)
                }
                if(data.status === true){
                    setLoader(false)
                    setCurrentuser(userData)
                    navigate('/verify')
                }
            } catch (error) {
                console.log(error.message)
            }
            
        }
    }
  return (
    <>
    <Container>
        <form onSubmit={e=>handleSubmit(e)}>
        {loader?(<div class="loader"></div>):(
            <div className="cont">
            <div className="brand">
                <h1>PizzaDelivery</h1>
            </div>
            <input type='text' placeholder='username' name='username' onChange={e=>handleChange(e)} />
            <input type='email' placeholder='E-Mail' name='email' onChange={e=>handleChange(e)} />
            <input type='number' placeholder='mobile number' name='mobile' onChange={e=>handleChange(e)} />
            <input type="password" placeholder='Password' name='password' onChange={e=>handleChange(e)} />
            <input type="password" placeholder='Confirm Password' name='confirm' onChange={e=>handleChange(e)} />
            <button type='submit' className='submit'>Register</button>
            <span>Already have an account ? <Link to={'/login'}>Login</Link></span>
        </div>
        )}
        </form>
    </Container>
    </>
  )
}

const slideLeft = keyframes`
  100% {
    background-position: left;
  }
`;

const Container = styled.div`
    overflow: hidden;
    background-image: url(${background});
    background-size: cover;
    background-position: center;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    form{
        .loader {
          margin: 10rem auto;
          width: fit-content;
          font-weight: bold;
          font-family: monospace;
          font-size: 30px;
          background: radial-gradient(circle closest-side,#ff0000 94%,#0000) right/calc(200% - 1em) 100%;
          animation: ${slideLeft} 1s infinite alternate linear;

          &::before {
            content: "Loading...";
            line-height: 1em;
            color: #0000;
            background: inherit;
            background-image: radial-gradient(circle closest-side,#fff 94%,#ff0000);
            -webkit-background-clip:text;
            background-clip:text;
          }
        }
        .cont{
            display: flex;
        flex-direction: column;
        background-color: #ffffffca;
        padding: 2rem;
        padding-bottom: 3rem;
        gap: 1rem;
        text-align: center;
        border-radius: 1.5rem;
        .submit{
                width: 50%;
                margin: 1rem auto;
                padding: 0.5rem;
                border-radius: 0.3rem;
                border: none;
                outline: none;
                background-color: #ffa600d0;
                &:hover{
                    background-color: #9c6705;
                }
            }
        input{
            margin-top: 0.5rem;
            padding: 0.3rem;
            border-radius: 0.3rem;
            border: none;
            outline: none;
            &:active{
                border: 2px solid orange;
            }
        }
        span{
            a{
                text-decoration: none;
                color: #7f5606;
            }
        }
        }
    }
`

export default Register
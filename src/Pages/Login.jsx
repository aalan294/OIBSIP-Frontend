import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import api from '../API/axios'
import background from '../Assets/background.jpg'

const Login = ({currentuser,setCurrentuser}) => {
    const navigate = useNavigate()
    const [loader,setLoader] = useState(false)

    useEffect(()=>{
        var user = JSON.parse(localStorage.getItem('pizza-delivery-app'))
        if(user){
            setCurrentuser(user)
            if(!user.isVerified){
                navigate('/verify')
            }
            else if(user.isAdmin){
                navigate('/main')
            }
            else{
                navigate('/')
            }
        }
    },[])
    const [values,setValues] = useState({
        email:"",
        password:""
    })
    const handleChange =(e)=>{
        setValues({...values,[e.target.name]: e.target.value})
    }
    const handleValidation =()=>{
        const {email,password} = values
        if(email === ""){
            alert("username is required")
            return false
        }
        else if(password === ""){
            alert("password is required")
            return false
        }
        return true
    }
    const handleSubmit =async(e)=>{
        setLoader(true)
        e.preventDefault()
        if(handleValidation()){
            try {
                const {email,password} = values
                const userData = {email,password}
                const {data} = await api.post('/auth/login',userData)
                if(data.status === false){
                    setLoader(false)
                    alert(data.msg)
                    console.log(data)
                }
                if(data.status === true){
                    setLoader(false)
                    setCurrentuser(data.info)
                    if(data.info.isAdmin && data.info.isVerified){
                        localStorage.setItem('pizza-delivery-app',JSON.stringify(data.info))
                        navigate('/main')
                    }
                    else if(data.info.isVerified && !data.info.isAdmin ){
                        localStorage.setItem('pizza-delivery-app',JSON.stringify(data.info))
                        navigate('/')
                    }
                    else{
                        navigate('/verify')
                    }
                }
            } catch (error) {
                alert(error.message)
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
            <input type='email' placeholder='E-Mail' name='email' onChange={e=>handleChange(e)} />
            <input type="password" placeholder='Password' name='password' onChange={e=>handleChange(e)} />
            <button type='submit' className='submit'>Log In</button>
            <span>Don't have an account ? <Link to={'/register'}>Register</Link></span>
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
            height: 40vh;
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

export default Login
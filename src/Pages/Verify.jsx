import React, { useState } from 'react'
import styled from 'styled-components'
import api from '../API/axios'
import { useNavigate } from 'react-router-dom'

const Verify = ({currentuser,setCurrentuser}) => {

  const navigate = useNavigate()
  const [noti,setNoti] = useState({
    msg:"",
    status:true
  })
const[otp,setOtp] = useState("")

  const otpVerify = async(e)=>{
    try {
      e.preventDefault()
      const {data} = await api.post('/auth/verify',{email:currentuser.email,otp:otp})
      setNoti(data)
      if(data.status){
        if(currentuser.token){
          const {id,email,username,token,mobile,isVerified,isAdmin} = currentuser
          const local = {
                      id,
                      email,
                      mobile,
                      username,
                      isAdmin,
                      isVerified:true,
                      token
                    }
                    setCurrentuser(local)
          localStorage.setItem('pizza-delivery-app',JSON.stringify(local))
          navigate('/login')
        }
        navigate('/login')
      }
    } catch (error) {
      console.log(error.message)
    }


  }
  const resend =async(e)=>{
    try {
      e.preventDefault()
      const user = JSON.parse(localStorage.getItem('pizza-delivery-app'))
      console.log(user.email)
      const email = user.email
      const {data} = await api.post('/auth/resendOTP',{email})
      if(!data.status){
        alert(data.msg)
      }
      setNoti(data)
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <Container>
      <h1>VERIFICATION NEEDED</h1>
      <form action="" onSubmit={otpVerify}>
        <label htmlFor="otp">OTP: <input required id='otp' type="number" placeholder='Enter The 6 digit OTP here' minLength={6} maxLength={6} value={otp} onChange={(e)=>setOtp(e.target.value)} /></label><br />
        <button type='submit'>verify</button>
        <p>Did't recieve tha OTP?<button onClick={(e)=>resend(e)}>Resend</button></p>
        <span className={noti.status?'gnoti':'rnoti'}>{noti.msg}</span>
      </form>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  form{
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    padding:1rem 3rem 1rem 3rem ;
    text-align: center;
    .rnoti{
      color: red;
    }
    .gnoti{
      color: green;
    }
  }
`

export default Verify
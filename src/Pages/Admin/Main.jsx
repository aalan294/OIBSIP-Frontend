import Recieved from '../../Components/Recieved'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import bimage from '../../Assets/food-pizza-wallpaper-preview.jpg'
import Kitchen from '../../Components/Kitchen'
import Delivery from '../../Components/Delivery'

const Main = () => {
  const [selected,setSelected] = useState('recieved')
  let content = null;
  const navigate = useNavigate()

  if(selected === 'recieved') {
    content = <Recieved />;
  } else if(selected === 'kitchen') {
    content = <Kitchen />;
  } else if(selected === 'deliver') {
    content = <Delivery />;
  }

  const handleLogOut=()=>{
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem('pizza-delivery-app')
      navigate('/login')
    }
  }

  return (
    <Container>
      <div className="bimage">
        <div className="out">
          <button onClick={handleLogOut}><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="orange" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </button>
        </div>
          <h1>Orders Page <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="feather feather-clock"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg></h1>
          <div className="nav">
            <ul>
              <li><button onClick={()=>setSelected('recieved')}>New Orders</button></li>
              <li><button onClick={()=>setSelected('kitchen')}>In Kitchen</button></li>
              <li><button onClick={()=>setSelected('deliver')}>Out To Delivery</button></li>
            </ul>
          </div>
          <img src={bimage} alt="" />
      </div>
      <div className="menu-list">
        {content}
      </div>
    </Container>
  )
}

const Container = styled.div`
  height: 100%;
  width: 100%;
  .bimage{
    width: 100%;
    height: 60vh;
    position: relative;
    .out{
      position: absolute;
      top: 2rem;
      right: 0.1rem;
      display: flex;
      flex-direction: column;
      align-items: end;
      button{
        border-radius: 50%;
        border:3px solid black;
        padding:5px;
      }
    }
    .nav{
      position: absolute;
      top: 9.2rem;
      left: 36%;
      @media only screen and (max-width: 600px){
              left: 1rem;
              right: 1rem;
            }
      ul{
        display: flex;
        justify-content: space-evenly;
        list-style-type: none;
        @media only screen and (max-width: 600px){
              margin: 0;
              padding:0;
              margin-top: 2rem;
            }
        li{
          margin: 0.3rem;
          button{
            padding: 0.5rem 1rem;
            border: 3px solid white;
            background-color: red;
            color: white;
            border-radius: 10px;
          }
        }
      }
    }
    h1{
      position: absolute;
      top: 5rem;
      left: 42%;
      text-align: center;
      background-color: white;
      padding: 0.4rem 1rem;
      border-radius: 1rem;
      @media only screen and (max-width: 600px){
              left: 1rem;
              right: 1rem;
            }
    }
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .menu-list{
    position: relative;
    bottom: 10rem;
    width: 90%;
    height: 60vh;
    overflow-y: scroll;
    overflow-x: hidden;
    background-color: white;
    margin: 0 auto;
    border-radius: 1rem;
    border: 15px solid white;
    @media only screen and (max-width: 600px){
              bottom: 14rem;
            }
    &::-webkit-scrollbar{
            width: 0.2rem;
            &-thumb{
                background-color: #ffa60047;
                width: 0.1rem;
                border-radius: 1rem;
            }
        }
  }
`

export default Main
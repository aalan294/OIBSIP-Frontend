import Recieved from '../../Components/Recieved'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link, Route, Routes } from 'react-router-dom'
import bimage from '../../Assets/food-pizza-wallpaper-preview.jpg'
import Kitchen from '../../Components/Kitchen'
import Delivery from '../../Components/Delivery'

const Main = () => {
  const [selected,setSelected] = useState('recieved')
  let content = null;

  if(selected === 'recieved') {
    content = <Recieved />;
  } else if(selected === 'kitchen') {
    content = <Kitchen />;
  } else if(selected === 'deliver') {
    content = <Delivery />;
  }
  return (
    <Container>
      <div className="bimage">
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
    .nav{
      position: absolute;
      top: 11rem;
      left: 36%;
      ul{
        display: flex;
        justify-content: space-evenly;
        list-style-type: none;
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
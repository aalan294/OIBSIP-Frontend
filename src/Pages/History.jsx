import React, { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import api from '../API/axios'
import { Link, useNavigate } from 'react-router-dom'
import bimage from '../Assets/food-pizza-wallpaper-preview.jpg'
import recieve from '../Assets/received-160122_1280.png'
import baking from '../Assets/pngtree-bakery-icon-for-your-project-png-image_1541423.jpg'
import delivery from '../Assets/download.png'
import delivered from '../Assets/download.jpg'

const History = () => {
  const [orders,setOrders] = useState([])
  const [user,setUser] = useState(undefined)
  const [isChecked, setIsChecked] = useState(false)
  const [loader,setLoader] = useState(true)
  const [rel,setRel] = useState(true)

  const navigate = useNavigate()

  useEffect(()=>{
    const fetchOrders = async()=>{
      try {
        if(localStorage.getItem('pizza-delivery-app')){
          const res = await JSON.parse(localStorage.getItem('pizza-delivery-app'))
        setUser(res)
        const {data} = await api.get(`/orders/${res.id}`)
        if(!data.status){
          setLoader(false)
          throw new Error(data.msg)
        }
        setLoader(false)
        setOrders(data.orders)
        }
        else{
          navigate('/login')
        }
      } catch (error) {
        alert(error.message)
      }
    }
    fetchOrders()
  },[rel])
    const statusImages = {
      'received': recieve,
      'in kitchen': baking,
      'sent to delivery': delivery,
      'delivered': delivered
    }
    const weeks = {
      0: 'Sunday',
      1: 'Monday',
      2: 'Tuesday',
      3: 'Wednesday',
      4: 'Thursday',
      5: 'Friday',
      6: 'Saturday'
    }


    const handleLogOut=async()=>{
      const confirmLogout = window.confirm("Are you sure you want to logout?");
      if (confirmLogout) {
        localStorage.removeItem('pizza-delivery-app')
        setRel(!rel)
        navigate('/login')
      }
    }
  return (
    <Container>
      <div className="bimage">
        <div className="nav">
          <div className="svg">
            <input type='checkbox' checked={isChecked} onChange={()=>setIsChecked(!isChecked)} name="" id="check" />
            <label htmlFor="check">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="orange" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </label>
          </div>
          <ul className={`menu ${isChecked?'show':'hide'}`}>
            <Link to={'/'}><li>Home</li></Link>
            <Link to={'/cart'}><li>Cart</li></Link>
            <Link to={'/display'}><li>Pending Orders</li></Link>
            <Link to={'/history'}><li>Order History</li></Link>
            <Link><li onClick={handleLogOut} >Log Out</li></Link>
          </ul>
        </div>
          <h1>Order History <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="feather feather-clock"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg></h1>
          <img src={bimage} alt="" />
      </div>
      <div className="menu-list">
        {loader?(<div class="loader"></div>):(
          <ul>
          {
            orders.map((item)=>{var datetime = new Date(item.createdAt) 
              return(
                <li key={item._id}>
                  <div className="image">
                    <img src={statusImages[item.status]} alt='' />
                  </div>
                  <div className="det">
                    -<h1>{`${weeks[datetime.getDay()]} Date:${datetime.getDate()}/${datetime.getMonth()+1}/${datetime.getFullYear()} Time: ${datetime.getHours()}:${datetime.getMinutes()}`}</h1>
                    <p>{`Price: Rs.${item.total}`}</p>
                    <p className='stat'>{`Status: ${item.status}`}</p>
                  </div>
                </li>
            )})
          }
        </ul>
        )}
      </div>
    </Container>
  )
}

const slideLeft = keyframes`
  100% {
    background-position: left;
  }
`;

const Container = styled.div`
  height: 100%;
  width: 100%;
  .bimage{
    width: 100%;
    height: 60vh;
    position: relative;
    .nav{
      position: absolute;
      top: 2.5rem;
      right: 0.1rem;
      display: flex;
      flex-direction: column;
      align-items: end;
      .svg{
        input{
          display: none;
        }
        label{
          padding:0.5rem;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: white;
          border:6px solid black;
          border-radius: 50%;
        }
      }
      .menu{
        margin-top: 0;
        width:220px;
        background-color: white;
        list-style-type: none;
        display: flex;
        flex-direction: column;
        padding: 0;
        z-index: 99;
        border: 3px solid #ffa60046;
        a{
          text-decoration: none;
          color: inherit;
          li{
            margin:0;
            padding: 1rem 0.6rem;
            color: #7e5200;
            border: 1px solid #ffa60046;
            text-align: center;
            &:hover{
              background-color: #ffa60046;
            }
          }
        }
        }
        .hide{
          display: none;
        }
    }
    h1{
      position: absolute;
      top: 7rem;
      left: 41%;
      text-align: center;
      background-color: white;
      padding: 0.4rem 1rem;
      border-radius: 1rem;
      @media only screen and (max-width: 600px){
        left: 1rem;
        right: 1rem
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
            bottom: 15rem;
          }
    &::-webkit-scrollbar{
            width: 0.2rem;
            &-thumb{
                background-color: #ffa60047;
                width: 0.1rem;
                border-radius: 1rem;
            }
        }
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
    ul{
      list-style-type: none;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      margin: 0;
      padding: 0;
      li{
        margin: 0.6rem;
        width: 90%;
        height: 7rem;
        border: 2px solid orange;
        background-color: #ffa60065;
        color: #bc7c04;
        border-radius: 0.7rem;
        gap: 2rem;
        display: flex;
        align-items: center;
        padding: 0 1rem;
        .image{
          width: 4rem;
          height: 4rem;
          border-radius: 50%;
          @media only screen and (max-width: 600px){
            width:3rem;
            height: 3rem;
            border-radius: 50%;
          }
          img{
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 50%;
          }
        }
        .det{
          h1,p{
            margin: 0;
            padding: 0;
            @media only screen and (max-width: 600px){
              font-size: small;
            }
          }
          .stat{
            color: green;
          }
        }
      }
    }
  }
`

export default History
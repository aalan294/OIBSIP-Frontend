import React, { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import api from '../API/axios'
import bimage from '../Assets/food-pizza-wallpaper-preview.jpg'
import { Link, useNavigate } from 'react-router-dom'

const Home = ({currentuser,setCurrentuser,menu,setMenu}) => {

  const [isChecked, setIsChecked] = useState(false)
  const [loader,setLoader] = useState(true)
  const [rel,setRel] = useState(true)

  const navigate = useNavigate()
  useEffect(()=>{
    if(localStorage.getItem('pizza-delivery-app')){
      setCurrentuser(JSON.parse(localStorage.getItem('pizza-delivery-app')))
      const user = JSON.parse(localStorage.getItem('pizza-delivery-app'))
      if(user.isAdmin){
        navigate('/main')
      }
    }
    else{
      navigate('/login')
    }

  },[rel])
  useEffect(()=>{
    const fetchMenu =async()=>{
      try {
        const response = await api.get('/menu')
        if(!response.data.status){
          setLoader(false)
          throw new Error("can't fetch menu list")
        }
        else{
          setMenu(response.data.menu)
          setLoader(false)
        }
      } catch (error) {
        console.log(error.message)
      }
    }
    fetchMenu()
  },[])

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
        <h1>Pizza Delivery App</h1>
        <img src={bimage} alt="" />
      </div>
      <div className="menu-list">
        {loader?(<div class="loader"></div>):(
          <ul>
          {
            menu.map((item)=>(
              <Link to={`/card/${item._id}`}>
                <li key={item._id}>
                  <div className="image">
                    <img src={item.image} alt={item.pizza} />
                  </div>
                  <div className="det">
                    <p>{`${item.pizza} Pizza`}</p>
                    <p>{`Rs.${item.price}`}</p>
                  </div>
                </li>
              </Link>
            ))
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
    overflow-x:hidden;
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
      margin: 0;
      padding: 0;
      list-style-type: none;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      a{
        text-decoration: none;
        color: black;
        li{
          width: 300px;
          height: 300px;
          display: flex;
          flex-direction: column;
          align-items: center;
          border: 1px solid orange;
          margin: 0.5rem;
          background-color: #ffa6006e;
          border-radius: 0.5rem;
          @media only screen and (max-width: 600px){
            width: 140px;
            height: 170px;
          }
          .image{
            width: 100%;
            height: 80%;
            border-radius: 0.5rem;
            @media only screen and (max-width: 600px){
              height: 70%;
            }
            img{
              width: 100%;
              height:100%;
              object-fit: cover;
              border: 1px solid orange;
              border-radius: 0.5rem 0.5rem 0 0;
            }
          }
          .det{
            p{
              margin: 0;
              margin-top: 4px;
              padding: 0;
              text-align: center;
              @media only screen and (max-width: 600px){
                margin-top: 0;
                font-size: small;
              }
            }
          }
        }
      }
    }
  }
`

export default Home
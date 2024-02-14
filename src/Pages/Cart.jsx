import React, { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import api from '../API/axios'
import { Link, useNavigate } from 'react-router-dom'
import bimage from '../Assets/food-pizza-wallpaper-preview.jpg'

const Cart = () => {
  const [user,setUser] = useState(undefined)
  const [cart,setCart] = useState(undefined)
  const [isChecked, setIsChecked] = useState(false)
  const [order,setOrder] = useState([])
  const [loader,setLoader] = useState(true)
  const [rel,setRel] = useState(true)

  const navigate = useNavigate()

  useEffect(()=>{
    const fetchCart = async()=>{
      try {
        if(localStorage.getItem('pizza-delivery-app')){
          const res = await JSON.parse(localStorage.getItem('pizza-delivery-app'))
        setUser(res)
        const {data} = await api.get(`/cart/${res.id}`)
        if(!data.status){
          setLoader(false)
          throw new Error(data.msg)
        }
        setCart(data.data)
        setLoader(false)
        }
        else{
          navigate('/login')
        }
      } catch (error) {
        alert(error.message)
      }
    }
    fetchCart()
  },[rel])

  const handleLogOut=async()=>{
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem('pizza-delivery-app')
      setRel(!rel)
      navigate('/login')
    }
  }

  const handleDelete =  async(id)=>{
    try {
      setLoader(true)
      const {data} = await api.delete(`/cart/${id}`)
      if(!data.status){
        setLoader(false)
        throw new Error(data.msg)
      }
      if(data.status){
        setLoader(false)
        alert(data.msg)
        setCart(cart.filter(item => item._id!==id))
      }
    } catch (error) {
      alert(error.message)
    }
  }

  const handleOrder = async()=>{
    try {
      setLoader(true)
      var items = []
      var total = 0
      cart.map((item)=>{
        let obj = {
          productId: item.productId,
          pizza:item.pizza,
          quantity:item.quantity,
          base: item.base,
          sauce: item.sauce,
          cheese: item.cheese,
          price: item.price
        }
        items.push(obj)
        total= total + item.price
      })
      setOrder(items)
      if(total!==0){const {data} = await api.post('/orders',{userId:user.id,items,total})
      setCart([])
      if(!data.status){
        setLoader(false)
        throw new Error(data.msg)
      }
      if(data.status){
        setLoader(false)
        navigate('/display')
        alert(data.msg)
      }}else{
        alert("Your Cart Is Empty")
      }
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div>
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
          <h1>Your Cart <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shopping-cart"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg></h1>
          <button className='checkout' onClick={handleOrder}>Checkout Now <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shopping-bag"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg></button>
        <img src={bimage} alt="" />
      </div>
      <div className="menu-list">
        {loader?(<div class="loader"></div>):(
          <ul>
          {
            cart.map((item)=>(
              <Link>
                <li key={item._id}>
                  <div className="image">
                    <div className="trash" onClick={()=>handleDelete(item._id)}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="orange" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg></div>
                    <img src={item.image} alt={item.pizza} />
                  </div>
                  <div className="det">
                    <p>{`${item.pizza} Pizza`}</p>
                    <p>{`Quantity: ${item.quantity}`}</p>
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
    </div>
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
      top: 1rem;
      right: 0.1rem;
      display: flex;
      flex-direction: column;
      align-items: end;
      .svg{
        input{
          display: none;
        }
        label{
          padding: 0.5rem;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: white;
          border: 6px solid black;
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
      top: 5rem;
      left: 45%;
      text-align: center;
      background-color: white;
      padding: 0.4rem 1rem;
      border-radius: 1rem;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      @media only screen and (max-width: 600px){
        left: 1rem;
        right: 1rem
      }
    }
    .checkout{
      position: absolute;
      top: 12rem;
      left: 46%;
      text-align: center;
      color: white;
      font-weight: 400;
      background-color: red;
      border:3px solid white;
      padding: 0.7rem 1.5rem;
      border-radius: 1rem;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      cursor: pointer;
      @media only screen and (max-width: 600px){
        left: 1rem;
        right: 1rem
      }
      &:hover{
        background-color: #940303;
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
      flex-wrap: wrap;
      justify-content: center;
      margin: 0;
      padding: 0;
      a{
        text-decoration: none;
        color: black;
        li{
          width: 300px;
          height: 400px;
          display: flex;
          flex-direction: column;
          align-items: center;
          border: 1px solid orange;
          margin: 1rem;
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
            position: relative;
            @media only screen and (max-width: 600px){
              height: 70%;
            }
            .trash{
              position: absolute;
              top: 12px;
              right: 4px;
              padding: 6px;
              border-radius: 50%;
              background-color: white;
              display: flex;
              justify-content: center;
              align-items: center;
              border: 3px solid orange;
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

export default Cart
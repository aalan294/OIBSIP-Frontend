import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import api from '../API/axios'

const Card = ({menu}) => {
  const {id} = useParams()
  const [item,setItem] = useState([])
  const [cheese,setCheese] = useState('')
  const [base,setBase] = useState('')
  const [sauce,setSauce] = useState('')
  const [quantity,setQuantity] = useState(1)
  const [user,setUser] = useState(undefined)
  const [loader,setLoader] = useState(true)

  const navigate = useNavigate()

  useEffect(()=>{
    setUser(JSON.parse(localStorage.getItem('pizza-delivery-app')))
    setItem(menu.find(item => item._id === id))
    setLoader(false)
  },[])


  const addToCart=async(e)=>{
    try {
      setLoader(true)
      e.preventDefault()
      const newItem = {...item,cheese:cheese,base:base,sauce:sauce}
      const update = {userId: user.id,
         productId: newItem._id, 
         pizza: newItem.pizza, 
         base, 
         cheese, 
         sauce, 
         image: newItem.image, 
         price: newItem.price * quantity, 
         quantity}
      setItem(newItem)
      const {data} = await api.post('/cart',update)
      if(!data.status){
        setLoader(false)
        throw new Error("cannot add to the cart")
      }
      setLoader(false)
      alert(data.msg)
      navigate('/')
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <Container>
      <div className="card">
        <Link to={'/'}><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="orange" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-square"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="9" x2="15" y2="15"></line><line x1="15" y1="9" x2="9" y2="15"></line></svg></Link>
        <div className="image">
          <img src={item.image} alt={item.pizza} />
        </div>
        <div className="det">
        {loader?(<div class="loader"></div>):(
          <form action="" onSubmit={addToCart}>
          <h1>{`${item.pizza} Pizza`}</h1>
          <div className="choose">
          <select id="selectCheese" value={cheese} onChange={(e)=>setCheese(e.target.value)}>
                <option value={''}>Select the Cheese</option>
                <option value="Mozzarella">Mozzarella</option>
                <option value="Feta">Feta</option>
                <option value="Cheddar">Cheddar</option>
            </select>
            <select id="selectBase" value={base} onChange={(e)=>setBase(e.target.value)}>
                <option value={''}>select the base</option>
                <option value="Thin crust">Thin crust</option>
                <option value="Thick crust">Thick crust</option>
                <option value="Stuffed crust">Stuffed crust</option>
            </select>
            <select id="selectSauce" value={sauce} onChange={(e)=>setSauce(e.target.value)}>
                <option value={''}>Select the sauce</option>
                <option value="Tomato sauce">Tomato sauce</option>
                <option value="Alfredo sauce">Alfredo sauce</option>
                <option value="BBQ sauce">BBQ sauce</option>
            </select>
          </div>
          <input type="number" placeholder='QUANTITY' value={quantity} min={1} onChange={(e)=>setQuantity(e.target.value)} />
          <h1>{`Rs.${item.price * quantity}`}</h1>
          <button type='submit'>Add to Cart</button>
          </form>
        )}
        </div>
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
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  background-color: orange;
  .card{
    margin: 1rem;
    width: 65%;
    height: 80%;
    display: flex;
    flex-wrap: wrap;
    background-color: #ffffff9d;
    border-radius: 1.5rem;
    position: relative;
    @media only screen and (max-width: 600px){
      width: 80%;
      justify-content: center;
      padding: 1rem;
    }
    a{
      position:absolute;
      right: 1rem;
      top: 1rem;
    }
    .image{
      width: 35%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding-left: 1rem;
      border-radius: 1rem;
      margin-top: 2rem;
      @media only screen and (max-width: 600px){
        width: 60%;
      }
      img{
        width: 100%;
        height:auto;
        object-fit: cover;
        border-radius: 1rem;
      }
    }
    .det{
      width: 60%;
      height:100%;
      margin:0 auto;
      @media only screen and (max-width: 600px){
          height: 50%;
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
      form{
        padding-top: 3rem;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        @media only screen and (max-width: 600px){
          padding: 0;
        }
        input{
          background-color: orange;
          border-radius: 4px;
          width: 4rem;
          text-align: center;
          font-size: larger;
          @media only screen and (max-width: 600px){
            width: 2.5rem;
          }
        }
        button{
          align-self: flex-end;
          justify-self: flex-end;
          margin-right: 1rem;
          padding: 0.5rem;
          border-radius: 15px;
          border: none;
          background-color: #6f2e2ec3;
          color: white;
          @media only screen and (max-width: 600px){
            align-self: center;
            margin: 0;
          }
          &:hover{
            box-shadow: 5px 5px 5px brown;
          }
        }
        .choose{
          @media only screen and (max-width: 600px){
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
          }
          select{
            margin: 0.5rem;
            background-color: orange;
            border-radius: 5px;
            padding: 7px;
          }
        }
      }
    }
  }
`
export default Card
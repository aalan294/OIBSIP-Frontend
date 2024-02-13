import React, { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import api from '../../API/axios'
import { Link, useNavigate, useParams } from 'react-router-dom'

const AdminCard = () => {
  const {id} = useParams()
  const [item,setItem] = useState(undefined)
  const [newStatus,setNewStatus] = useState('')
  const [loader,setLoader] = useState(true)

  const navigate = useNavigate()

  useEffect(()=>{
    const fetchItem = async()=>{
      try {
        const {data} = await api.get(`/card/${id}`)
        if(!data.status){
          setLoader(false)
          throw new Error(data.msg)
        }
        setLoader(false)
        setItem(data.orders)
      } catch (error) {
        alert(error.message)
      }
    }
    fetchItem()
  },[])

  const handleUpdate = async(e,id)=>{
    e.preventDefault()
    try {
      setLoader(true)
      if(newStatus !==''){
        const {data} = await api.put('/orders',{id:id,status:newStatus})
        if(!data.status){
          setLoader(false)
          throw new Error(data.msg)
        }
        else{
          setLoader(false)
          alert("status updated successfully")
          navigate('/main')
        }
      }
      else{
        throw new Error("select an option to update")
      }
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <Container>
      {item?(
        <div className="box">
          <Link to={'/main'}><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="orange" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-square"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="9" x2="15" y2="15"></line><line x1="15" y1="9" x2="9" y2="15"></line></svg></Link>
          <form action="" onSubmit={(e)=>handleUpdate(e,item._id)}>
          <select id="selectCheese" value={newStatus} onChange={(e)=>setNewStatus(e.target.value)}>
                <option value={''}>Update Status</option>
                <option value="received">received</option>
                <option value="in kitchen">in kitchen</option>
                <option value="sent to delivery">sent to delivery</option>
                <option value="delivered">delivered</option>
            </select>
            <button type='submit'>Update</button>
          </form>
          <div className="status">
            <h3>{item.status}</h3>
          </div>
          {loader?(<div class="loader"></div>):(
            <ul>
            {item.items.map((item,index) =>(
                <li key={index}>
                  <h4>Item {index+1}: {item.pizza} Pizza</h4>
                  <p>Base: {item.base}</p>
                  <p>Cheese: {item.cheese}</p>
                  <p>Sauce: {item.sauce}</p>
                  <h4>Quantity: {item.quantity}</h4>
                  <h4>Price: Rs.{item.price}</h4>
                </li>
              ))
            }
          </ul>
          )}
        <div className="price">
          <h3>Total Amount: {item.total}</h3>
        </div>
      </div>
      ):(<p>Loading</p>)}
      
    </Container>
  )
}

const slideLeft = keyframes`
  100% {
    background-position: left;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .box{
    width: 75%;
    height: 75%;
    border: 1px solid orange;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #ffa60057;
    position: relative;
    a{
      position:absolute;
      right: 1rem;
      top: 1rem;
    }
    form{
      position:absolute;
      right: 3rem;
      bottom: 3rem;
      select{
            background-color: orange;
            border-radius: 5px;
            padding: 4px;
            margin-right: 0.5rem;
      }
      button{
        background-color: #ff0000;
        color: white;
        border: 3px solid black;
        border-radius: 5px;
        padding: 5px 10px;
      }
    }
    .status{
      color: green;
      font-weight: 500;
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
      width: 95%;
      list-style-type: none;
      display: flex;
      flex-wrap: wrap;
      height: 70%;
      overflow-y: scroll;
      &::-webkit-scrollbar{
            width: 0.2rem;
            &-thumb{
                background-color: #ffa60047;
                width: 0.1rem;
                border-radius: 1rem;
            }
        }
      li{
        border: 1px solid orange;
        padding: 2rem;
        margin: 2rem;
        background-color: white;
        h4{
          text-align: center;
        }
      }
    }
  }
`
export default AdminCard
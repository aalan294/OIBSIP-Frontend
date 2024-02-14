import React, { useEffect, useState } from 'react'
import api from '../API/axios'
import styled, { keyframes } from 'styled-components'
import { Link } from 'react-router-dom'
import recieve from '../Assets/received-160122_1280.png'
import baking from '../Assets/pngtree-bakery-icon-for-your-project-png-image_1541423.jpg'
import delivery from '../Assets/download.png'

const Kitchen = () => {
    const [pending,setPending] = useState([])
  const [user,setUser] = useState(undefined)
  const [loader,setLoader] = useState(true)

  useEffect(()=>{
    const fetchPending = async()=>{
      try {
        const res = await JSON.parse(localStorage.getItem('pizza-delivery-app'))
        setUser(res)
        const {data} = await api.get('/kitchen')
        if(!data.status){
          setLoader(false)
          throw new Error(data.msg)
        }
        setLoader(false)
        setPending(data.orders)
      } catch (error) {
        alert(error.message)
      }
    }
    fetchPending()
  },[])
    const statusImages = {
      'received': recieve,
      'in kitchen': baking,
      'sent to delivery': delivery
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

  return (
    <Container>
      {loader?(<div class="loader"></div>):(
        <ul>
        {
          pending.map((item)=> {var datetime = new Date(item.createdAt) 
          return(
            <Link to={`/admincard/${item._id}`}>
              <li key={item._id}>
                <div className="image">
                  <img src={statusImages[item.status]} alt='' />
                </div>
                <div className="det">
                  <h1>{`${weeks[datetime.getDay()]} Date:${datetime.getDate()}/${datetime.getMonth()+1}/${datetime.getFullYear()} Time: ${datetime.getHours()}:${datetime.getMinutes()}`}</h1>
                  <p>{`Price: Rs.${item.total}`}</p>
                  <p className='stat'>{`Status: ${item.status}`}</p>
                </div>
              </li>
            </Link>
          )})
        }
      </ul>
      )}
    </Container>
  )
}

const slideLeft = keyframes`
  100% {
    background-position: left;
  }
`;

const Container = styled.div`
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
      a{
        text-decoration: none;
        color: inherit;
        li{
        margin: 0.6rem;
        width: 87%;
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
          @media only screen and (max-width: 600px){
            width:3rem;
            height: 3rem;
          }
          img{
            width: 100%;
            height: 100%;
            object-fit: cover;
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

export default Kitchen
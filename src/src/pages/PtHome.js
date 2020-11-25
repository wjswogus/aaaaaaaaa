import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AddrModal from '../components/AddrModal';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Slider from '../components/Slider';
import CardForm from '../pages/board/CardForm';



const PtHome = (props) => {
  console.log(props.name);
  const [user, setUser] = useState({});

  useEffect ( () => {
    fetch("http://10.100.102.27:8000/user/info",{
      headers:{
        "Authorization":localStorage.getItem("Authorization"),
      }
    }).then(res => res.json())
    .then( res=>{
      setUser(res);
      console.log(res);
      console.log(res.auth_pt);
    })


  } ,[])
  
    
    return (
        <div>
            
                  <AddrModal/>
                  {user.auth_pt === 3 ?   <Link to = "/ptregister"> <button>등록</button> </Link>
                  
                  :   ""
                

                }
                    <Slider/>
                    <CardForm/>
                  <Footer/>

              </div>
    )
}

export default PtHome;
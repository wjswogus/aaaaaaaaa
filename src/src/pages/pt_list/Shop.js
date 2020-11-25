import { Card, CardActionArea, CardContent, CardMedia, Divider, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CopyToClipboard } from 'react-copy-to-clipboard'
import MapInfo from '../../components/MapInfo';
import NavTool from '../../components/NavTool';
import ReviewForm from '../../components/ReviewForm';
import ReviewSlide from '../../components/ReviewSlide';
import { Button, Table } from 'react-bootstrap';


const ContainerStyle = styled.div`
    -webkit-box-lines: multiple !important;
    -webkit-box-pack: start !important;
    -ms-flex-pack: start !important;
    -webkit-box-align: stretch !important;
    -ms-flex-align: stretch !important;
    display: -webkit-box !important;
    display: -moz-box !important;
    display: -ms-flexbox !important;
    display: -webkit-flex !important;
    display: flex !important;
    -webkit-align-items: stretch !important;
    align-items: stretch !important;
    -webkit-justify-content: flex-start !important;
    justify-content: flex-start !important;
    -webkit-flex-wrap: wrap !important;
    -ms-flex-wrap: wrap !important;
    flex-wrap: wrap !important;
    width: 100% !important;
    padding-left: 24px !important;
    padding-right: 24px !important;
    padding-top: 30px !important;
    padding-bottom: 30px !important;
    margin-left: auto !important;
    margin-right: auto !important;
`;
const ContentStyle = styled.div`
    display: block;
    position: relative !important;
    width: 58.3333% !important;
    margin-left: 0% !important;
    margin-right: 0% !important;
`;

const BoxStyle = styled.div`
    position: relative !important;
    width: 33.3333% !important;
    margin-left: 8.33333% !important;
    margin-right: 0% !important;
    height: 1500px;

`;
const navBar = styled.div`
    border: 1px solid rgb(221, 221, 221);
    border-radius: 12px;
    padding: 24px;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
`;
const imgStyle = styled.img`
    height: 400px;
    width: 500px;
    text-align: center;
`;

const TableContainer =styled.div`
    width: 60%;
`;

const Td = styled.td`
    text-align: center;
    font-size: 25px;
`;

const Th = styled.th`
    text-align: center;
    font-size: 25px;
`;


const Shop = (props) => {
    
    const [reviews , setReview] = useState();


    const [shop, setShop]= useState([]);

    const getAdd = () => {
        alert("주소가 복사되었습니다");

    }
    
    const [state,setState] = useState({
        value: '',
        copied: false,
      });
    
    

		/*let jwtTokenTemp = localStorage.getItem("Authorization");
		let jwtToken = jwtTokenTemp.replace('Bearer ', '');

		setUserId(jwt_decode(jwtToken).id); 

		if(!isLogin){
			alert('로그인 후 이용할 수 있습니다.');
			props.history.push("/");  
        }
        fetch("http://localhost:8000/post/"+props.match.params.id, {
			method: "GET",
			headers:{
				"Authorization": localStorage.getItem("Authorization")
			}
		}).then(res=>res.json()).then(res=>{
			setPost(res); 
		});
        */
       useEffect(() => {
        fetch("http://10.100.102.27:8000/ptDetail/" + props.match.params.id, {
            method: "GET"
            
        }).then(res=>res.json())
        .then(res=>{
            console.log(res);
            setShop(res); 
            
            console.log(shop.ptNo,"zzzzz");
    });
      }, []);
      console.log(shop,"zzzzz");

      

    return (
        <div>
        <h1 className="al_middle">{shop.pt_name}</h1>
        <div>
        <br/><br/><br/>
        </div>
        <img src={shop.pt_img} alt="not exist iamge"/>
        <br/><br/>
        <Divider/>
        <ContainerStyle>
        
            <ContentStyle>
                <br/><br/>
                <h4>
                    {shop.pt_content}
                </h4>
                <br/><br/>
                <Divider/>
                <br/><br/>
                <h4>
                    {shop.pt_address}
                </h4>       
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                 
        
                <MapInfo name={shop.pt_name} add={shop.ptAddress}/>
                <br/>

                <CopyToClipboard text={shop.ptAddress}
                    onCopy={() => setState({copied: true})}>
                    <button onClick={getAdd}>주소복사</button>
                </CopyToClipboard>

            </ContentStyle>
            
            <BoxStyle>
                <div className="nav">
                <NavTool price={shop.pt_price} ptNo={shop.ptNo}/>
                </div>
            </BoxStyle>
        </ContainerStyle>

        <TableContainer>
        <Table striped bordered hover>
<thead>
<tr>
  <Th></Th>
  <Th>1개월</Th>
  <Th>3개월</Th>
  <Th>6개월</Th>
</tr>
</thead>
<tbody>
<tr>
  <Td bgcolor="yellow">헬스</Td>
  <Td>70000원</Td>
  <Td>170000원</Td>
  <Td>240000원</Td>
</tr>
<tr>
  <Td>P.T</Td>
  <Td colSpan="3">1회당 50000원</Td>
  
</tr>
<tr>
  <Td>그룹 P.T</Td>
  <Td colSpan="3">1회 당 40000원</Td>
  
</tr>
</tbody>
</Table>
</TableContainer>
{shop.ptNo === shop.user ? (<>
      <Button variant="contained" color="primary">
    수정
  </Button>  <Button variant="contained" color="secondary">
   삭제
  </Button>  
  </>): (<>
  </>)
    }      
          

        <Divider/>
        
        <br/><br/>

        <br/><br/>
        <h2 className="al_middle">REVIEW</h2> 

        <br/>

        
        <CopyToClipboard text={shop.pt_address}
            onCopy={() => setState({copied: true})}>
          <Button variant="contained" color="primary" onClick={getAdd}>
       주소복사
       </Button>
           
        </CopyToClipboard>
        <br/><br/>
        <h2 className="shopInfo">REVIEW</h2> 
        <ReviewForm />

        <ReviewSlide/>
        
        <br/>

        <ReviewForm ptNo={shop.ptNo}/>

    </div>  );
};

export default Shop;

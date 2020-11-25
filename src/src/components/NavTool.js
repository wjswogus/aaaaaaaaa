import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const navSt = styled.div`
    border: 1px solid rgb(221, 221, 221);
    border-radius: 2px;
    padding: 10px;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
`;

const conslerSt = styled.div`
  font-size: 14px;
`;

//상품 번호를 장바구니 테이블에 넣는다
const NavTool = (props) => {
    const {price, ptNo} = props;
    
const addCart = (e) =>{
  e.preventDefault();
  let form = document.getElementById("form");
  const formData = new FormData(form);
  console.log(formData);
  fetch("http://10.100.102.27:8000/wish/" + ptNo, {
          method: "POST",
          headers: {
            "Authorization": localStorage.getItem("Authorization")
          },
          body: formData
  })
    .then((res) => res.text())
    .then((res) => {
      if (res === "ok") {
        alert("장바구니에 담겼습니다");
      }else{
    alert("장바구니에 담기지 않았습니다");
  }
  });
}

const pay = (e) =>{
  e.preventDefault();
  let form = document.getElementById("form");
  const formData = new FormData(form);
  formData.append("order_no", ptNo);
  console.log(formData);
  fetch("http://10.100.102.27:8000/order", {
          method: "POST",
          headers: {
            "Authorization": localStorage.getItem("Authorization")
          },
          body: formData
  })
    .then((res) => res.text())
    .then((res) => {
      if (res === "ok") {
        alert("구매에 성공했습니다");
      }else{
    alert("구매에 실패했습니다");
  }
  });
}

    return (
      <navSt>
      <h1>{price}</h1>
         

          <Link to={`/`}>
            <conslerSt><h3>📞카톡 상담</h3></conslerSt>
          </Link>
          <br/>
          <Link to={`/stshop/1`}>
            <conslerSt><h3>📷제휴 스튜디오</h3></conslerSt>
          </Link>
          <h1>hellchong12</h1>
          <h1>010-2325-1223</h1>
      </navSt>
    );
};

export default NavTool;
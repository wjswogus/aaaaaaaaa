import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import InputText from './InputText';
import { Editor, EditorState, RichUtils } from 'draft-js';


function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

  

const ReviewForm = (props) => {

    const ptNo = props.ptNo;

    const [review, setReview] = useState({
      rev_title : '',
      rev_content : '',
      rev_img : ''
    });

    
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  

    const submitRev = (ptNo) => {
      
      let form = document.getElementById("review");
      const formData = new FormData(form);
      formData.append("type", "pt");
      console.log(formData);
      fetch("http://10.100.102.27:8000/review/write/" + ptNo, {
        method: "POST",
        headers: {
          "Authorization": localStorage.getItem("Authorization")
        },
        body: formData
      }).then(res => {
        return res.text();
      }).then(res => {
        if (res === "ok") {
        } else {
          alert('글등록 실패');
        }
      });
    }
  

    const changeValue = (e) => {
      setReview({
        ...review,
        [e.target.name]: e.target.value
        
      });
      console.log(review);
    }





    const body = (
      <div style={modalStyle} className={classes.paper}>
        <h2 id="simple-modal-title">리뷰 작성</h2>
        <form id="review">
          <p id="simple-modal-description">
              <input type="text" name="rev_title" placeholder="제목을 입력하세요" onChange={changeValue}/>
              
           <InputText name="rev_content" rev_content={review.rev_content}/>

              <input type="file" name="rev_img"/> 
          </p>
          
        </form>
        <button type="submit" onClick={() => submitRev(ptNo)}>
                리뷰 작성
          </button>
      </div>
    );
   
    return (
        <div>
            <button type="button" onClick={handleOpen}>
                리뷰 작성
            </button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
            
        </div>
    );
};

export default ReviewForm;
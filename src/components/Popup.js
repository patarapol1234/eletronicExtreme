import React from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Popup = ({setPopup}) => {
    const navigate = useNavigate();
    const handleClick = async () => {
      const token = localStorage.getItem('token')
      const result = await axios.delete(`http://localhost:4444/member/delete/${token}`)
      if (result.data.status === 'ok') {
        alert('Hope to see you comeback agian soon')
        setPopup(false)
        localStorage.removeItem('token')
        navigate('/login')
      }else{
        alert(result.data.status.error)
      }
    } 

    const closePopup = () => {
        setPopup(false)
    }
  return (
    <>
       <div>
        <h2>Are you sure ?</h2>
        <button type="button" onClick={handleClick}>Yes</button>
        <button type="button" onClick={closePopup}>No</button>
        </div> 
    </>
  )
}

export default Popup
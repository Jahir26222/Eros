import React, { useState } from "react";
import "./Navbar.css";
import MainSection from "./MainSection";
import { Link , useNavigate } from "react-router-dom";

const Navbar = () => {
  const [data, setData] = useState(5);
  const navigate = useNavigate()

  const ShowUser = ()=>{
    let profile =  document.querySelector(".id-box");
    profile.classList.toggle("show");

  }


  return (
    <>
    <nav className="navbar">
      <div className="navbar-logo">

       <img src="./public/images/Eros-logo.png"  onClick={()=>navigate('/')} />
      </div>


      <div className="icon-box">
      {/* <i className="ri-message-3-line" id="icon"></i> */}
     
      <Link to='/notification'><i className="fa-regular fa-bell" id="icon"></i></Link>
      <span className="bell">{data}</span>

      <div className="profile show" onClick={ShowUser}>
          <div className="avatar">N</div>
          <p>Nidhi Patel</p>
          <i className="fa-solid fa-angle-down down" id="icon"></i>
        </div>
      </div>
    </nav>
    <div className="id-box ">
        <div className="avatar">D</div>
        <p>Demo User</p>
        </div>
    
    
    </>
  );
};

export default Navbar

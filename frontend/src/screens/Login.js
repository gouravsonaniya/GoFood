import { useState } from "react"
import React from 'react'
import Navbar from '../components/Navbar';
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const [credentials, setcredentials] = useState({email:"",password:""})
  let navigate = useNavigate();

  const handleSubmit = async (e)=>{
      e.preventDefault();
      console.log(JSON.stringify({email:credentials.email,password:credentials.password}))
     const response = await fetch("https://gofood-o0bz.onrender.com/api/loginuser",{
      method:'POST', 
      headers:{
          'Content-Type':'application/json'
      },
      body: JSON.stringify({email:credentials.email,password:credentials.password})
     });
  
     const json = await response.json()
     console.log(json);

  
     if(json.success){
        localStorage.setItem('userEmail', credentials.email);
        localStorage.setItem("authToken",json.authToken);
        console.log(localStorage.getItem("authToken"))
        navigate("/");
     } else{
      alert("Enter Valid Credentials")
     }
  }
  const onChange = (event) =>{
      setcredentials({...credentials,[event.target.name]: event.target.value})
  }

  return (
    // <div style={{backgroundImage: 'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', height: '100vh', backgroundSize: 'cover' }}>
    // <div>
    // <Navbar />
  
    <div>
         <div className='container mt-5'>
  <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1"/>
  </div>
 
  <button type="submit" className="m-3 btn btn-success">Submit</button>
  <Link to="/creatuser" className='m-3 btn btn-danger'>I'm a new user</Link>
</form>
</div>

    </div>
  
  )
}

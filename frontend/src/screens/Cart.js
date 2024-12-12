import React from 'react'
import trash from "../trash.svg"
import { useCart, useDispatchCart } from '../components/ContextReducer';
export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 text-white w-100 text-center fs-3'>The Cart is Empty!</div>
      </div>
    )
  }
  const handleCheckOut = async()=>{
  
    let userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      alert("User email not found. Please log in again.");
      return;
    }
    let response = await fetch("https://gofood-o0bz.onrender.com/api/orderData",{
      method:'POST',  
      headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify({
      order_data:data,
      email:userEmail,
      order_date: new Date().toDateString()
    })
    });
     
    const result = await response.json();
    console.log("Order Response", result);
    
    if(response.status === 200){
      dispatch({type:"DROP"})
    }
  
};
  
  let totalPrice = data.reduce((total, food) => total + food.price, 0)
    return (
      
    <div>
      <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
        <table className='table text-white'>
          <thead className='text-success fs-4'>
            <tr>
              <th scope='col' >#</th>
              <th scope='col' >Name</th>
              <th scope='col' >Quantity</th>
              <th scope='col' >Option</th>
              <th scope='col' >Amount</th>
              <th scope='col' ></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr>
                <th scope='row' >{index + 1}</th>
                <td >{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td ><button type="button" className="btn bg-white  p-0"><img src={trash} alt='delete' onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button> </td></tr>
            ))}
          </tbody>
        </table>
        <div><h1 className='fs-2 text-white'>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn bg-success mt-5 ' onClick={handleCheckOut}> Check Out </button>
        </div>
      </div>

    </div>
  )
}

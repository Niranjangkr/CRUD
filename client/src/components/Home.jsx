import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Home = () => {

  const [ userData, getUserData ] = useState([]);
  const getData = async () => {
     const res = await fetch('http://localhost:5000/getdata', {
      method: "GET", 
      headers: {
        "Content-type": "application/json"
      },
     })
     const data = await res.json()
     console.log(data) 
     if(res.status === 500){
      console.log("something went wrong")
      alert("something went wrong") 
     }else{
      getUserData(data)
     }
  }

  useEffect(() => {
    getData();
  }, [])



  return (
    <div className="mt-5">
      <div className="container">
        <div className="add_btn mt-2 mb-2">
        <NavLink to='Register'><button className='btn btn-primary '>Add Data</button></NavLink>
        </div>
        <table className="table">
          <thead className='table-dark'>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Job</th>
              <th scope="col">Number</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
           {
             userData.map((data, index) => (
              <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{data.name}</td>
              <td>{data.email}</td>
              <td>{data.work}</td>
              <td>{data.mobile}</td> 
              <td className='d-flex justify-content-between'>
                <NavLink to={`view/${data._id}`}><button type='button' className='btn btn-primary '><RemoveRedEyeIcon /></button></NavLink>
                <NavLink to={`edit/${data._id}`}><button type='button' className='btn btn-success '><EditIcon /></button></NavLink>
                <button type='button' className='btn btn-danger '><DeleteIcon /></button>
              </td>
            </tr>
             ))
           }
            
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Home
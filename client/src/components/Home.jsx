import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { addData, deleteData, updateData } from './context/ContextProvider';

const Home = () => {

  const { udata, setUdata } = useContext(addData)
  const { delData, setDelData } = useContext(deleteData)
  const { upData, setUpData } = useContext(updateData)

  const [userData, getUserData] = useState([]);
  const getData = async () => {
    const res = await fetch('http://localhost:5000/getdata', {
      method: "GET",
      headers: {
        "Content-type": "application/json"
      },
    })
    const data = await res.json()
    console.log(data)
    if (res.status === 500) {
      console.log("something went wrong") 
      alert("something went wrong")
    } else if(res.status === 422){
      alert("fill all data")
    }else {
      getUserData(data)
    }
  }

  useEffect(() => {
    getData();
  }, [])


  const deleteDoc = async (_id) => {
    const res = await fetch(`http://localhost:5000/deleteuser/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json"
      }
    })
    const data = await res.json()
    console.log(data)
    if (res.status === 500) {
      alert(error, "Invalid entry")
    } else {
      console.log("data deleted")
      getData()
      setDelData(data)
    }
  }

  return (
    <>
      {
        udata ? (<div class="alert alert-success alert-dismissible fade show" role="alert">
          <strong>{udata.name}</strong> New User Added successfully!
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>) : "" 
         }
 {
          delData ? (<div class="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>{delData.name}</strong> User has been deleted!
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>) : "" 
        }
        {
            upData ? (<div class="alert alert-warning alert-dismissible fade show" role="alert">
              <strong>{upData.name}</strong> User data has been Updated!
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>) : ""
      }

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
                      <button type='button' className='btn btn-danger' onClick={() => deleteDoc(data._id)}><DeleteIcon /></button>
                    </td>
                  </tr>
                ))
              }

            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Home
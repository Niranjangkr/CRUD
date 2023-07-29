import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import CardContent from '@mui/material/CardContent';
import EmailIcon from '@mui/icons-material/Email';
import WorkIcon from '@mui/icons-material/Work';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import PlaceIcon from '@mui/icons-material/Place';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useParams, NavLink, useNavigate } from 'react-router-dom';


const Details = () => {
    
    const navigate = useNavigate()

    const {id} = useParams("")

    const [ userDetail, setUserDetails ] = useState({})

    const getUserDetails = async () => {
        const res = await fetch(`http://localhost:5000/getUserData/${id}`, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
        if(res.status === 500){
            console.log("Internal server error")
            alert("something went wrong")
        }
        const data = await res.json()
        setUserDetails(data)

    }

    useEffect(() => {
        getUserDetails()
    }, [])

    const deleteDoc = async (_id) => {
        const res = await fetch(`http://localhost:5000/deleteuser/${_id}`, {
          method: "DELETE",
          headers:{
            "Content-type":"application/json"
          }
        })
        const data = await res.json()
        console.log(data)
        if(res.status===500){
          alert(error, "Invalid entry")
        }else{
          console.log("data deleted")
          navigate('/')
        }
      }

    return (
        <div className="conatiner mt-3">
            <h1 style={{ fontWeight: 400 }}>Welcome {userDetail.name}</h1>
            <Card sx={{ maxWidth: 700 }} className='mt-4'>
                <CardContent>
                    <div className="add_btn">
                    <NavLink to={`view/${id}`}><button type='button' className='btn btn-success mx-2 '><EditIcon /></button></NavLink>
                        <button type='button' className='btn btn-danger ' onClick={() => deleteDoc(id)}><DeleteIcon /></button>
                    </div>
                    <div className="row">
                        <div className="left_view col-lg-6 col-md-6 col-12">
                            <Avatar src="/OIP.jpeg" alt='profile' />
                            <h3 className='mt-3'>Name: <span>{userDetail.name}</span></h3>
                            <h3 className='mt-3'>Age: <span>{userDetail.age}</span></h3>
                            <p className='mt-3'><EmailIcon /> Email: <span>{userDetail.email}</span></p>
                            <p className='mr-3'><WorkIcon /> Occupation: <span>{userDetail.work}</span></p>
                        </div>
                        <div className="right_view col-lg-6 col-md-6 col-12">
                            <p className='m-5'><SmartphoneIcon /> Mobile: <span>+91 {userDetail.mobile}</span></p>
                            <p className='m-5'><PlaceIcon /> Location: <span>{userDetail.address}</span></p>
                            <p className='m-5'>Description: <span>{userDetail.description}</span></p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Details
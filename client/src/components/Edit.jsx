import React, { useEffect, useState } from 'react'
import { NavLink, useParams, useNavigate } from 'react-router-dom';

const Edit = () => {
    
    const Navigate = useNavigate() 

    const {id} = useParams('')

    const [ userData, setUserData ] = useState({});

    const [ formData, setFormData ] = React.useState({
        name: "",
        email: "",
        age: "",
        mobile: "",
        work: "",
        address: "",
        description: "",
    });
    
    const handleChange = (e) => {
        const { value, name } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const getData = async () => {   
        const res = await fetch(`http://localhost:5000/getUserData/${id}`, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
        if(res.status === 500){
            console.log("Internal server error")
            alert("something went wrong")

        }else{
            const data = await res.json()
            setUserData(data);
            console.log(data)
        }
        
    }

    useEffect(() => {
        getData()
    }, [])

    useEffect(() =>{
        setFormData(userData )
    }, [userData])
    
    const submitForm = async(e) =>{
        const { name, age, mobile, work, address, description } = formData
        e.preventDefault()
        const res = await fetch(`http://localhost:5000/updateuser/${id}`, {
            method: "PATCH",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({
                name, age, mobile, work, address, description 
            })
        })
        const data = await res.json()
        console.log(data)
        if(res.status === 500 || !data){
            alert("fill the data")
        }else{
            alert("data added")
            Navigate('/')
        }
    }
    

    return (
        <div className="container ">
            <form className='mt-4' onSubmit={submitForm}>
                <div className="row">
                    <div className="mb-3 col-lg-6 col-md-6 col12">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" name='name' onChange={handleChange} className="form-control" id="name" aria-describedby="emailHelp" value={formData.name} />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" name='email' onChange={handleChange} className="form-control" id="email" value={formData.email} />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="age" className="form-label">Age</label>
                        <input type="number" name='age' onChange={handleChange} className="form-control" id="age" value={formData.age} />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="mobile" className="form-label">Mobile</label>
                        <input type="text" name='mobile' onChange={handleChange} className="form-control" id="mobile" value={formData.mobile} />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="work" className="form-label">Work</label>
                        <input type="text" name='work' onChange={handleChange} className="form-control" id="work" value={formData.work} />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input type="text" name='address' onChange={handleChange} className="form-control" id="address" value={formData.address} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea type="text" name='description' onChange={handleChange} className="form-control" id="description" cols="30" rows="5" value={formData.description} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Edit
import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { addData } from './context/ContextProvider'

const Register = () => {
    const {udata, setUdata} = useContext(addData)
    const navigate = useNavigate()
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

    const saveInput =  async (e) => {
        console.log("okkkau")
        e.preventDefault()

        const {name, email, age, mobile, work, address, description} = formData

        const res = await fetch('http://localhost:5000/register', { //"proxy": "http://localhost:5000", in package.json we defined proxy so need to mention full route \\if not working then mention the path
            method: "POST",
            headers:{
                "Content-type": "application/json"
            },
            body:JSON.stringify({
                name, email, age, mobile, work, address, description
            })
        })
        
        const data = await res.json()
        console.log(data)
        if(res.status === 400 || !data){ 
            alert("Something went wrong")
            console.log(error);
        }else if(res.status === 409){
            alert("User already present")
            console.log(data)
        }else{
            alert("Data added Succesfully")
            console.log("data added")
            setUdata(data )
            navigate('/')
        }
    }

    return (
        <div className="container ">
            <NavLink to='/'>Home</NavLink>
            <form className='mt-4' onSubmit={saveInput}>
                <div className="row">
                    <div className="mb-3 col-lg-6 col-md-6 col12">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" name='name' onChange={ handleChange } className="form-control" id="name" aria-describedby="emailHelp" value={formData.name}/>
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" name='email' onChange={ handleChange } className="form-control" id="email" value={formData.email} />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="age" className="form-label">Age</label>
                        <input type="number" name='age' onChange={ handleChange } className="form-control" id="age" value={formData.age} />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="mobile" className="form-label">Mobile</label>
                        <input type="number" name='mobile' onChange={ handleChange } className="form-control" id="mobile"  value={formData.mobile}/>
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="work" className="form-label">Work</label>
                        <input type="text" name='work' onChange={ handleChange } className="form-control" id="work" value={formData.work}/>
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input type="text" name='address' onChange={ handleChange } className="form-control" id="address" value={formData.address} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea type="text" name='description' onChange={ handleChange } className="form-control" id="description" cols="30" rows="5" value={formData.description}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Register
import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom';

const Signup = (props) => {
  const [credentials, setCredentials] = useState({name:"", email: "", password: "", cpassword:""}) 
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name, email, password}=credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {        
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, email, password}) 
    });
    const json = await response.json()
    console.log(json);
    if(json.success){
        localStorage.setItem('token' , json.authToken);
        navigate("/");
        props.showALert("SignUp success", "success");
        }
        
    else{
        props.showALert("Invalid Credentials", "danger");
    }
  }
  
    const onChange = (e)=>{
      setCredentials({...credentials, [e.target.name]: e.target.value})
    }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div class="form-group">
          <label for="exampleInputEmail1">Name</label>
          <input type="text" class="form-control" id="name" aria-describedby="emailHelp" name="name" onChange={onChange} />

        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Email</label>
          <input type="email" class="form-control" id="exampleInputEmail1" name="email" onChange={onChange}/>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" class="form-control" id="password" name="password" onChange={onChange} minLength={5} required/>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Confirm Password</label>
          <input type="password" class="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required/>
        </div>

        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
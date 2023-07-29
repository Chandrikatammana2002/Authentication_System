import React,{useState} from 'react'
import axios from 'axios';

const Register = () => {
    const [data,setData] = useState({
        username:'',
        email:'',
        password:'',
        confirmpassword:''
    })
    const changeHandler = e =>{
        setData({...data,[e.target.name]:e.target.value})  //e.target.name ante okavela username ane field ni change cheste username anedi di assign avutadi
                                                            //eg. username:'john' ila ani mata john manam enter chestamu
    }

    //sending data to the backend
    //data ni req body lo ki post method ni use chesi pampistamu
    const submitHandler = e =>{
        e.preventDefault();
        axios.post('http://localhost:5000/register',data).then(   //sending data to the register route and next making all as empty
            res => alert(res.data)  //register avvagane manaki vache response enti server nundi adi user ichina data like usernaem password ala
            //manam res.send() em rastamo adi vastadi server.js file lo 
        )

    }
    return (
        <div>
            <center>
            <form onSubmit={submitHandler} autocomplete="off">
                <h3>Register</h3>
                <input type="text" onChange={changeHandler} name="username" placeholder="User Name" /><br />
                <input type="email" onChange={changeHandler} name="email" placeholder="Email" /><br />
                <input type="password" onChange={changeHandler} name="password" placeholder="Password" /><br />
                <input type="password" onChange={changeHandler} name="confirmpassword" placeholder="Confirm Password" /><br />
                <input type="submit" value="Register" /><br />
            </form>
            </center>
        </div>
    )
}

export default Register;
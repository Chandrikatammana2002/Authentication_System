import React,{useContext,useState,useEffect} from 'react'
import {store} from './App';
import axios from 'axios';
import {  Navigate } from 'react-router-dom';

const Myprofile = () => {
    const [token,setToken] = useContext(store);
    const [data,setData] = useState(null);
    useEffect(() =>{
        axios.get('http://localhost:5000/myprofile',{
            headers: {
                'x-token' : token
            }
        }).then(res => setData(res.data)).catch((err) => console.log(err))
    },[])
    if(!token){
        return <Navigate to='/login' />
    }
    console.log("data is")
    console.log({data});
    return (
        <div>
            {
                data &&
    
        
                <div>
                    <h5>Welcome : {data.exist.username}</h5>
                    <button onClick={() => setToken(null)}>Logout</button>
                
                </div>
              
            
        }
        
        </div>
    )
}

export default Myprofile;
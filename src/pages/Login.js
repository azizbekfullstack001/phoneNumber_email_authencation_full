import React,{useState} from 'react';
import {auth, firestore} from '../fireBaseConfig'
import {signInWithEmailAndPassword} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'
import { collection, getDocs } from 'firebase/firestore';
function Login(props) {
    const navigate = useNavigate()
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")


    function login(){
        let ref = collection(firestore,"users")
getDocs(ref).then((res)=>{
    const {email,password,uid}=res.docs[0].data()
    if(email===email ){
        localStorage.setItem("token",uid)
      navigate("/admin")
    }else{

    }
})
    }
    return (
        <div>
           <div className='card w-50 offset-4 my-5'>
            <div className='card-header'>
                LOGIN

            </div>
            <div className='card-body'>
               <input value={email} onChange={(e)=>setEmail(e.target.value)} type={"text"} placeholder="email" className='form-control my-2'/>
               <input value={password} onChange={(e)=>setPassword(e.target.value)} type={"password"} placeholder="password" className='form-control my-2'/>
               
            </div>
            <div className='card-footer'>
                <button onClick={login} className='btn btn-success'>login</button>
            </div>

           </div>
        </div>
    );
}

export default Login;
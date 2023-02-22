import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom'
import {collection,addDoc} from 'firebase/firestore'
import {createUserWithEmailAndPassword,RecaptchaVerifier, signInWithPhoneNumber} from 'firebase/auth'
import { auth, firestore } from '../fireBaseConfig';
function Register(props) {
    const navigate = useNavigate()
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [repeatPassword,setRepeatPassword] = useState("")
    const [phoneNumber,setPhoneNumber] = useState("")
    const [code,setCode] = useState("")
    const [active,setActive] = useState(false)
    function register(){
        if(password===repeatPassword){
            window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
                'size': 'normal',
                'callback': (response) => {
                },
                'expired-callback': () => {
                }
              }, auth);
              signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier)
              .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                setActive(true)
                
              }).catch((error) => {
              });

         
        }else{
            alert("password error")
        }
  
    }
    function kirish(){
          window.confirmationResult.confirm(code).then((res)=>{
            const ref = collection(firestore,"users")
            let uid = res.user.uid
            addDoc(ref,{
                email,
                password,
                phoneNumber,
                uid
            }).then((res)=>{
                navigate("/login")
            })
          })
    }
    return (
        <div>
            {
                active ?<div className='card w-50 offset-4 my-5'>
                <div className='card-header'>
                    Register
    
                </div>
                <div className='card-body'>
                   <input value={code} onChange={(e)=>setCode(e.target.value)} type={"text"} placeholder="phoneNumber" className='form-control my-2'/>
                               </div>
                <div className='card-footer'>
                    <button onClick={kirish} className='btn btn-success'>kirish</button>
                    <div id='recaptcha-container'>
    
                    </div>
                </div>
    
               </div>
                
                :        <div className='card w-50 offset-4 my-5'>
                <div className='card-header'>
                    Register
    
                </div>
                <div className='card-body'>
                   <input value={email} onChange={(e)=>setEmail(e.target.value)} type={"text"} placeholder="email" className='form-control my-2'/>
                   <input value={password} onChange={(e)=>setPassword(e.target.value)} type={"password"} placeholder="password" className='form-control my-2'/>
                   <input value={repeatPassword} onChange={(e)=>setRepeatPassword(e.target.value)} type={"password"} placeholder="repeatpassword" className='form-control my-2'/>
                   <input value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)} type={"text"} placeholder="phoneNumber" className='form-control my-2'/>
                               </div>
                <div className='card-footer'>
                    <button onClick={register} className='btn btn-success'>register</button>
                    <div id='recaptcha-container'>
    
                    </div>
                </div>
    
               </div>
            }
         
        </div>
    );
}

export default Register;
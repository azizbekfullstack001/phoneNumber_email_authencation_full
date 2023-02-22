import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection,getDocs,query,where } from 'firebase/firestore';
import React from 'react';
import { useEffect } from 'react';
import {Routes,Route,useLocation,useNavigate} from 'react-router-dom'
import { auth, firestore } from './fireBaseConfig';
import Admin from './pages/Admin';
import Home from './pages/Home';
import Login from './pages/Login';
import PageNotFount from './pages/PageNotFount';
import Register from './pages/Register';
function App(props) {
  const location = useLocation()
  const navigate = useNavigate()
  const openPage = ["/","/login","/404","/register"]
  useEffect(()=>{
    let token = localStorage.getItem("token")
    const userRef = collection(firestore,"users")
    let q = query(userRef,where("uid","==",token))
    getDocs(q).then((res)=>{
      const {email,password,uid} = res.docs[0].data();
      signInWithEmailAndPassword(auth,email,password).then((res)=>{
      })
    }).catch((err)=>{
      if(!openPage.includes(location.pathname)){
         navigate("/404")
      } 
    })

  },[location.pathname])
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/404' element={<PageNotFount/>}/>
      </Routes>
    </div>
  );
}

export default App;
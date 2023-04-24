import React, { useEffect, useState } from 'react'
import {useForm} from "react-hook-form"
import { Link } from 'react-router-dom'
import axios from 'axios'
import "../css/signup.css"

function Signup() {
    const [user, setUser] = useState('');
  const [listUsers, setListUsers] = useState([]);

  const addUser = async (e) => {

    try{
      const res = await axios.post('http://localhost:9000/api/user', {email: user,pass:user})
      setListUsers(prev => [...prev, res.data]);
      setUser('');
  
   
    }catch(err){
      console.log(err);
    }
  }
  useEffect(()=>{
    const getItemsList = async () => {
      try{
        const res = await axios.get('http://localhost:9000/api/users')
        setListUsers(res.data);
        console.log('return')
      }catch(err){
        console.log(err);
      }
    }
    getItemsList()
  },[]);


    const {register,handleSubmit,reset, formState:{errors}}=useForm()
    console.log(errors)
        const login=(data)=>{
            console.log(data)
            reset()
            user(data)
        }
      return (
        <div className='div__all--sign'>
            <form className='all-form' onSubmit={handleSubmit(login)}>
                <input type='text' placeholder='Email'{...register("email",{required:"vacio porfavor rellene"})} /><br/>
                <input type='text' placeholder='Password'{...register("password",{required:"vacio porfavor rellene"})} /><br/>
                <Link to={"/todolist"} >Enter</Link><hr/>
                <button onSubmit={e => addUser(e)}>Register</button>
            </form>
        </div>
      )
    }

export default Signup
import React, {useState} from 'react';
import { connect } from 'react-redux';
import { Login } from '@/components/auth/Login';
import { useDispatch } from 'react-redux';
import { loginRequest, logoutRequest, loginCancelled} from '@/modules/auth/login'

const LoginPage = () => {
      const [login, setLogin] =useState({
        userid:'', password:''
    })
    const dispatch = useDispatch()
    const onChange = e =>{
        e.preventDefault()
        const{name, value} = e.target;
        setLogin({...login,[name]: value})
    }
    const onSubmit = e =>{
        e.preventDefault()
        alert('로그인'+JSON.stringify(login))
        dispatch(loginRequest(login))
    }  
    return (
      <Login onChange={onChange} onSubmit={onSubmit}/>
    );
};

const mapStateToProps = state => ({isLoggined: state.login.isLoggined})
const loginActions = {loginRequest, loginCancelled, logoutRequest}
export default connect(mapStateToProps, loginActions)(LoginPage)


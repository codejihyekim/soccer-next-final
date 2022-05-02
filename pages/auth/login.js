import React, {useState} from 'react';
import {connect, useDispatch} from 'react-redux';
import {loginRequest} from '@/modules/auth/login';
import {Login} from '@/components';
import {useRouter} from "next/router"
import { round } from 'lodash';

const LoginPage = () => {
    const [login, setLogin] = useState({userid: '', password: ''})
    const dispatch = useDispatch()
    const router = useRouter()
    const onChange = e => {
        e.preventDefault()
        const {name, value} = e.target;
        setLogin({
            ...login,
            [name]: value
        })
    }
    const onSubmit = e => {
        e.preventDefault()
        alert(`로그인 정보 ${JSON.stringify(login)}`)
        dispatch(loginRequest(login))
        
    }
    return (<Login onChange={onChange} onSubmit={onSubmit}/>);
};
const mapStateToProps = state => ({isLoggined: state.login.isLoggined})
const loginActions = {loginRequest}
export default connect(mapStateToProps, loginActions)(LoginPage);
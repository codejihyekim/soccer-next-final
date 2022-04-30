import React, { useEffect } from "react";
import Router from "next/router";
import { useSelector } from 'react-redux';
import { Profile } from "@/components/user/Profile";
const ProfilePage = () => {
    const {loginUser} = useSelector(state => state.login)
    useEffect(() => {
        console.log('모듈에 저장된 로그인값: '+JSON.stringify(loginUser))
      }, [loginUser && loginUser.userid]);

    return (<Profile loginUser={loginUser}/>)
}
export default ProfilePage
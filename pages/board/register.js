import React, {useCallback, useState} from 'react';
import {connect, useDispatch} from 'react-redux';
import { BoardRegister } from '@/components'

const BoardRegisterPage = () => {
    const [board, setBoard] = useState({
        date:'', title:''
    })
    const dispatch = useDispatch()
    const onChange = e => {
        e.preventDefault()
        const{name, value} = e.target;
        setBoard({...user,[name]: value})
    }
    const onSubmit = e => {
        e.preventDefault()
        alert('게시판 등록정보:'+JSON.stringify(board))
        dispatch(registerRequest(board))
    }
    return(
        <BoardRegister onChange={onChange} onSubmit={onSubmit}/>
    )
}
const mapStateToProps = state => ({})
const boardActions = {}
export default connect(mapStateToProps, boardActions)(BoardRegisterPage)


import React from 'react'
import { useSelector } from 'react-redux'

const ForgetPassword = () => {
  const user = useSelector(store => store.user)
  return (
    <div>ForgetPassword of {user?.firstName}</div>
  )
}

export default ForgetPassword
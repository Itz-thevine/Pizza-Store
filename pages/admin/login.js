import { useRouter } from 'next/router'
import React, { useState } from 'react'
import styles from '../../styles/login.module.css'

const Login = () => {
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [error, setError] = useState(false)
    const router = useRouter();
     
  return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
            <h1>Admin Dashboard</h1>
        </div>
    </div>
  )
}

export default Login
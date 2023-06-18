import React from 'react'
import styles from '../../styles/LoginButton.module.css'
import demoIcon from '../../public/demo.png'
import Image from 'next/image'
import { useRouter } from 'next/router'


function DemoButton() {
    const router = useRouter()
  return (
    <button className={styles.loginButton} onClick={() => router.push(`/rooms/64859dd6f4426f0a02e49da7`)}>
        <span className={styles.loginIconContainer}>
        <Image src={demoIcon} width={40}
        alt="google"
        height={40} className={styles.iconImage}/>
        </span>
        <span className={styles.loginText}>Want to try Demo first!</span>
    </button>
  )
}

export default DemoButton
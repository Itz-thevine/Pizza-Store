import React from 'react';
import styles from '../styles/addButton.module.css';


export const AddButton = ({setClose}) => {
  return (
    <div className={styles.mainAddButton} onClick={()=>setClose(false)}>
        <p>Add New Pizza</p>
    </div>
  )
}

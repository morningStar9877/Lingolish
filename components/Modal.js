import styles from "../styles/Modal.module.css";

const Modal = ({children, title}) => {
  return (
    <div className={styles.bgDark}>
      <div className={styles.centered}>
      <div className={styles.modal}>
        <h3>{title}</h3>
        <div className={styles.modalContent}>
        {children}
        </div>
      </div>
      </div>
    </div>
  )
}

export default Modal;
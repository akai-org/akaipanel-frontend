import React, { useEffect, useState } from 'react';

import styles from '../../styles/components/widgets/ModalWidget.module.scss';


const ModalWidget = ({header, paragraph, cancelText, confirmText, onConfirm,}) => {
    const [openModal, setOpenModal] = useState(true);
    const switchModal = () => {
        setOpenModal(!openModal);
    }

    const pressEscape = (e) => {
        if (e.key == "Escape") {
            setOpenModal(false);
        }
    }

    document.body.addEventListener('keydown', pressEscape);
    useEffect(() => {
        return () => {document.body.removeEventListener('keydown', pressEscape)}
    }, [])

    const pressConfirm = () => {
        switchModal();
        onConfirm(true);
    }
    
    return (
        <div>
            <button onClick={switchModal}> Show modal </button>
            {openModal && <>
                <div className={styles.modalBackground}>
                    <div className={styles.overlay} onClick={switchModal}></div>
                    <div className={styles.modalContainer}>
                        <div className={styles.header}>
                            <h2 className={styles.headerText}>{header}</h2>
                        </div>
                        <div className={styles.paragraph}>
                            <p>{paragraph}</p>
                        </div>
                        <div className={styles.footer}>
                            <button className={`${styles.modalButton} ${styles.cancel}`} onClick={switchModal}>
                                {cancelText}
                            </button>
                            <button className={`${styles.modalButton} ${styles.confirm}`} onClick={pressConfirm}>
                                {confirmText}
                            </button>
                        </div>
                    </div>
                </div>                
                </>
            }
        </div>
    );
};

export default ModalWidget;

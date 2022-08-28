import React from 'react';

import styles from './Modal.module.scss';

type ModalProps = {
  value: string;
  clickedYes: () => void;
  clickedNo: () => void;
};

export const Modal: React.FC<ModalProps> = ({ value, clickedYes, clickedNo }) => {
  return (
    <div className={styles.root}>
      <div className={styles.modal}>
        {value}
        <div className={styles.buttons}>
          <button onClick={clickedYes} className="button button--outline">
            Да
          </button>
          <button onClick={clickedNo} className="button button--outline">
            Нет
          </button>
        </div>
      </div>
    </div>
  );
};

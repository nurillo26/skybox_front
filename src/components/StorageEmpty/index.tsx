import React from 'react';
import styles from './StorageEmpty.module.css';

const StorageEmpty = () => {
  return (
    <div className={styles.storage_empty_wrap}>
      <p>Файлов нет ☹</p>
      <p>Загрузите файл, или перетащите его в это поле</p>
    </div>
  );
};

export default StorageEmpty;

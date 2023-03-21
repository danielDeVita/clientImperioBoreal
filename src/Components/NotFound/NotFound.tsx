import React from 'react';
import styles from './NotFound.module.css';

const NotFound: React.FC = () => {
  return (
    <div className={styles.notFound}>
      <h1>404 página no encontrada</h1>
      <p>Disculpas, la página que intenta acceder no fue encontrada.</p>
    </div>
  );
};

export default NotFound;

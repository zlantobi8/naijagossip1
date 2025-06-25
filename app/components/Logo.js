import styles from './Logo.module.css';

export default function Logo() {
  return (
    <div className={styles.logo}>
      <div className={styles.piechart}></div>
      <div className={styles.text}>Daily Crust</div>
    </div>
  );
}

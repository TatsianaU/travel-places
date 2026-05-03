import styles from './Footer.module.css'

export default function Footer() {
  return (
    // styles.footer - уникальное имя класса, которое сгенерится автоматически. Это гарантирует, что стили этого компонента не пересекутся с другими
    <footer className={styles.footer}>
      <p className={styles.text}>Travel Places App &copy; {new Date().getFullYear()}</p>
      <p className={styles.note}>Сделано на React.js, Vite и TypeScript</p>
    </footer>
  )
}

import { Link } from "react-router-dom"
import styles from "../notFound/notFound.module.css"

export default function NotFound() {
    return(
        <div className={styles.error}>
            <div className={styles.text}>PAGE NOT FOUND</div>
            <Link to={'/home'}>
              <button className={styles.home} type="button">HOME</button>
            </Link>
        </div>
    )
}
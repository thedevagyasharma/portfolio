import styles from './Breadcrumbs.module.css';

type BreadcrumbsProps = {
    currentPage: string;
}

export default function Breadcrumbs({ currentPage }: BreadcrumbsProps) {
    return (
        <section>
            <div className="container">
                <div className={styles.breadcrumbs}>
                    <a href="/" className={styles.breadcrumbLink}>Home</a>
                    <span className={styles.breadcrumbSeparator}>/</span>
                    {/* <a href="/work" className={styles.breadcrumbLink}>Work</a> */}
                    <span>Work</span>
                    <span className={styles.breadcrumbSeparator}>/</span>
                    <span className={styles.breadcrumbCurrent}>{currentPage}</span>
                </div>
            </div>
        </section>
    );
}

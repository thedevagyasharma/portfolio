import { ReactNode } from "react"
import styles from "./Project.module.css";

interface ProjectSectionProps{
    children: ReactNode,
    id: string;
}

export function ProjectSection({children, id}: ProjectSectionProps) {
    return (
        <>
            <hr className={styles.projectSectionDivider} />

            <section id={id}>
                {children}
            </section>
        </>
    )
}
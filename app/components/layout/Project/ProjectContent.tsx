import { ReactNode } from "react";
import styles from "./Project.module.css";

interface ProjectContentProps {
    children: ReactNode;
    ref: any;
}

export function ProjectContent({ children, ref }: ProjectContentProps) {
    return (
        <>
            <article className="container">
                <div className={styles.projectContentBox} ref={ref}>
                    {children}
                </div>
            </article>
        </>
    )
}

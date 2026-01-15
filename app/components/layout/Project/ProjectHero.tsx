import { ReactNode } from "react";

import styles from "./Project.module.css";

interface ProjectHeroProps {
    title: string | ReactNode;
    description: string | ReactNode;
    role: string | ReactNode;
    tags: string[];
    footnote?: string | ReactNode;
    cta?: ReactNode;
}

export function ProjectHero({ title, description, role, tags, footnote, cta }: ProjectHeroProps) {
    return (
        <>
            <section>
                <h1>{title}</h1>
                <p className="large">{description}</p>
                <div className={styles.projectMetaCards}>
                    <div className={styles.projectMetaCard}>
                        <div className={styles.projectMetaLabel}>
                            My Role
                        </div>
                        <div className={styles.projectMetaValue}>
                            {role}
                        </div>
                    </div>
                    <div className={styles.projectMetaCard}>
                        <div className={styles.projectMetaLabel}>
                            Tools
                        </div>
                        <div className={styles.projectMetaValue}>
                            <div className={styles.projectTools}>
                                {tags.map((tag, index) => <div className={styles.projectToolTag} key={index}>{tag}</div>)}
                            </div>
                        </div>
                    </div>
                </div>
                {cta}
                <small>{footnote}</small>
            </section>
        </>
    )
}
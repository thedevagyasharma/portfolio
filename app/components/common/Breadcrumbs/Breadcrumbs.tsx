import './Breadcrumbs.styles.css';

type BreadcrumbsProps = {
    currentPage: string;
}

export default function Breadcrumbs({ currentPage }: BreadcrumbsProps) {
    return (
        <section>
            <div className="container">
                <div className="aspire-breadcrumbs">
                    <a href="/" className="aspire-breadcrumb-link">Home</a>
                    <span className="aspire-breadcrumb-separator">/</span>
                    <a href="/work" className="aspire-breadcrumb-link">Work</a>
                    <span className="aspire-breadcrumb-separator">/</span>
                    <span className="aspire-breadcrumb-current">{currentPage}</span>
                </div>
            </div>
        </section>
    );
}

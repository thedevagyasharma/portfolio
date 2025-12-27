'use client';
import './MultisigTransactionFlow.styles.css';
import Navbar from '@/app/components/layout/Navbar/Navbar';
import NavLogo from '@/app/components/layout/Navbar/NavLogo';
import { useGridSnap } from '@/app/hooks/useGridSnap';

export default function MultisigTransactionFlow() {
    const contentBoxRef = useGridSnap();

    return (
        <>
            <header className="header-wrapper">
                <div className="container">
                    <div className="header-content">
                        <NavLogo />
                        <Navbar />
                    </div>
                </div>
            </header>

            <main>
                {/* Breadcrumbs */}
                <section>
                    <div className="container">
                        <div className="aspire-breadcrumbs">
                            <a href="/" className="aspire-breadcrumb-link">Home</a>
                            <span className="aspire-breadcrumb-separator">/</span>
                            <a href="/work" className="aspire-breadcrumb-link">Work</a>
                            <span className="aspire-breadcrumb-separator">/</span>
                            <span className="aspire-breadcrumb-current">Multi-Signature Transaction Flow</span>
                        </div>
                    </div>
                </section>

                {/* Main Content Box */}
                <section className="aspire-content-section">
                    <div className="container">
                        <div ref={contentBoxRef} className="aspire-content-box">

                            {/* Hero */}
                            <div className="aspire-hero">
                                <div className="aspire-tags">
                                    <div className="aspire-tag">Product Design</div>
                                    <div className="aspire-tag">Visual Design</div>
                                </div>

                                <h1 className="aspire-title">Designing Scalable Multi-Signature Transaction Flows for Institutional Crypto Wallets</h1>

                                <p className="large">An exploratory case study that adapts a single initiation flow across Ethereum and Solana while addressing multi-sig wallet needs.</p>

                                <div className="aspire-meta-cards">
                                    <div className="aspire-meta-card">
                                        <div className="aspire-meta-label">My Role</div>
                                        <div className="aspire-meta-value">Product Designer</div>
                                    </div>
                                    <div className="aspire-meta-card">
                                        <div className="aspire-meta-label">Tools</div>
                                        <div className="aspire-tools">
                                            <div className="aspire-tool-tag">Figma</div>
                                            <div className="aspire-tool-tag">Draw.io</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr className="aspire-divider" />

                            {/* Project Context */}
                            <h2>Project Context</h2>
                            <p>This project explores the design of a transaction initiation flow for custodial multi-signature (multi-sig) wallets used by financial institutions. It focuses on Ethereum (ETH) and Solana (SOL) to demonstrate how a single UX pattern can scale across different blockchains while handling core transaction details and chain specific considerations.</p>

                            <hr className="aspire-divider" />

                            {/* Objectives */}
                            <h2>Objectives</h2>
                            <p>Financial institutions using multi-sig wallets need a clear, auditable, and predictable transaction initation experience. The goals of this exploratory study were to:</p>

                            <div className="aspire-card-group aspire-card-group-with-text">
                                <div className="aspire-card">
                                    <div className="aspire-card-icon">#1</div>
                                    <h3>Chain-Agnostic Flow</h3>
                                    <p>Design a chain-agnostic flow that handles transaction details, signers, and network-specific considerations in a straightforward way.</p>
                                </div>
                                <div className="aspire-card">
                                    <div className="aspire-card-icon">#2</div>
                                    <h3>UX Patterns for Complex Workflows</h3>
                                    <p>Explore UX patterns for complex financial workflows, including edge cases like streaming payments, fee selection, and validation errors.</p>
                                </div>
                                <div className="aspire-card">
                                    <div className="aspire-card-icon">#3</div>
                                    <h3>Visual Design Execution</h3>
                                    <p>Demonstrate visual design execution, highlighting how the interface communicates critical information to users without overwhelming them.</p>
                                </div>
                            </div>

                            <p><strong>Note</strong>: This study is exploratory and does not include formal user research. It is intended to showcase design thinking, problem-solving, and scalable UX patterns for complex financial workflows.</p>

                            <hr className="aspire-divider" />

                            {/* Assumptions */}
                            <h2>Assumptions</h2>
                            <ul>
                                <li>Approval policies are preset per wallet/transaction type: Users cannot modify the M-of-N approval rules during transaction initiation.</li>
                                <li>Signers are pre-selected by policy; initiators cannot change them.</li>
                                <li>Sender already knows the recipient's address and copy/paste it.</li>
                                <li>Signatures are collected off-chain to reduce network usage and cost efficiency.</li>
                                <li>The interface will be used on desktop/laptop by financial institution staff, not for retail or mobile users.</li>
                            </ul>

                            <hr className="aspire-divider" />

                            {/* User Flow Diagram */}
                            <h2>User Flow Diagram</h2>
                            <img src="/assets/projects/multisig-transaction-flow/user-flow-light.png" alt="Transaction initiation user flow diagram" className="aspire-image" />

                            <hr className="aspire-divider" />

                            {/* Form Design Decisions */}
                            <h2>Form Design Decisions</h2>

                            <h3>Modal Placement</h3>
                            <img src="/assets/projects/multisig-transaction-flow/modal-placement.jpg" alt="Modal placement design decisions" className="aspire-image" />

                            <h3>Blank State</h3>
                            <img src="/assets/projects/multisig-transaction-flow/blank-state.jpg" alt="Blank state design" className="aspire-image" />

                            <h3>Form Validations</h3>
                            <img src="/assets/projects/multisig-transaction-flow/form-validations.jpg" alt="Form validation patterns" className="aspire-image" />

                            <h3>Chain-Specific Fields and Behaviors</h3>
                            <img src="/assets/projects/multisig-transaction-flow/chain-specific.jpg" alt="Chain-specific fields and behaviors" className="aspire-image" />

                            <h3>Confirmation Actions</h3>
                            <img src="/assets/projects/multisig-transaction-flow/confirmation-actions.jpg" alt="Confirmation action states" className="aspire-image" />

                            <h3>Confirmation</h3>
                            <img src="/assets/projects/multisig-transaction-flow/confirmation.jpg" alt="Transaction confirmation screen" className="aspire-image" />

                            <h3>Failed State</h3>
                            <img src="/assets/projects/multisig-transaction-flow/failed.jpg" alt="Failed transaction state" className="aspire-image" />

                            <hr className="aspire-divider" />

                            {/* Reflection */}
                            <h2>Reflection</h2>

                            <div className="aspire-card-group aspire-card-group-with-text">
                                <div className="aspire-card">
                                    <h3>Outcome</h3>
                                    <ul>
                                        <li>Comprehensive user flow</li>
                                        <li>Annotated, high-fidelity UIs</li>
                                        <li>Scalable, reusable patterns</li>
                                    </ul>
                                </div>
                                <div className="aspire-card">
                                    <h3>Learnings</h3>
                                    <ul>
                                        <li>ERC-20/SPL chain-specific nuances</li>
                                        <li>Handling complex flows</li>
                                        <li>Detailed UX annotations</li>
                                    </ul>
                                </div>
                                <div className="aspire-card">
                                    <h3>Next Steps</h3>
                                    <ul>
                                        <li>Scalability for other coins/chains</li>
                                        <li>Streaming and Scheduling UIs</li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

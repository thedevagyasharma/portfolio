'use client';

import { useState } from 'react';
import NavLogo from '../components/layout/Navbar/NavLogo';
import Navbar from '../components/layout/Navbar/Navbar';
import '../globals.css';

export default function TestTransitionsPage() {
  const [testResults, setTestResults] = useState<string[]>([]);

  const logTest = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

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
        <section style={{ minHeight: '100vh', paddingTop: '120px' }}>
          <div className="container">
            <h1 style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              marginBottom: '2rem',
              fontFamily: 'var(--font-playfair-display)'
            }}>
              Page Transition Test Suite
            </h1>

            <p style={{ marginBottom: '3rem', fontSize: '1.2rem' }}>
              This page tests all navigation scenarios for the page transition system.
            </p>

            {/* Test Category 1: Internal Page Navigation */}
            <div style={{
              marginBottom: '3rem',
              padding: '2rem',
              border: '2px solid black',
              background: 'white'
            }}>
              <h2 style={{
                fontSize: '2rem',
                marginBottom: '1.5rem',
                fontFamily: 'var(--font-playfair-display)'
              }}>
                1. Internal Page Navigation (Should Transition)
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <a
                  href="/"
                  style={{
                    padding: '1rem',
                    background: '#f0f0f0',
                    border: '1px solid black',
                    textDecoration: 'none',
                    color: 'black'
                  }}
                  onClick={() => logTest('Clicked: Home link')}
                >
                  → Home Page (/)
                </a>

                <a
                  href="/about"
                  style={{
                    padding: '1rem',
                    background: '#f0f0f0',
                    border: '1px solid black',
                    textDecoration: 'none',
                    color: 'black'
                  }}
                  onClick={() => logTest('Clicked: About link')}
                >
                  → About Page (/about)
                </a>

                <a
                  href="/projects/aspire"
                  style={{
                    padding: '1rem',
                    background: '#f0f0f0',
                    border: '1px solid black',
                    textDecoration: 'none',
                    color: 'black'
                  }}
                  onClick={() => logTest('Clicked: Project link')}
                >
                  → Project Page (/projects/aspire)
                </a>
              </div>
            </div>

            {/* Test Category 2: Hash Links */}
            <div style={{
              marginBottom: '3rem',
              padding: '2rem',
              border: '2px solid black',
              background: 'white'
            }}>
              <h2 style={{
                fontSize: '2rem',
                marginBottom: '1.5rem',
                fontFamily: 'var(--font-playfair-display)'
              }}>
                2. Hash Links (Should NOT Transition)
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <a
                  href="#section-test-1"
                  style={{
                    padding: '1rem',
                    background: '#e0e0e0',
                    border: '1px solid black',
                    textDecoration: 'none',
                    color: 'black'
                  }}
                  onClick={() => logTest('Clicked: Hash link #section-test-1')}
                >
                  → Jump to Section Test 1 (#section-test-1)
                </a>

                <a
                  href="#section-test-2"
                  style={{
                    padding: '1rem',
                    background: '#e0e0e0',
                    border: '1px solid black',
                    textDecoration: 'none',
                    color: 'black'
                  }}
                  onClick={() => logTest('Clicked: Hash link #section-test-2')}
                >
                  → Jump to Section Test 2 (#section-test-2)
                </a>
              </div>
            </div>

            {/* Test Category 3: External Links */}
            <div style={{
              marginBottom: '3rem',
              padding: '2rem',
              border: '2px solid black',
              background: 'white'
            }}>
              <h2 style={{
                fontSize: '2rem',
                marginBottom: '1.5rem',
                fontFamily: 'var(--font-playfair-display)'
              }}>
                3. External Links (Should NOT Transition)
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <a
                  href="https://github.com"
                  style={{
                    padding: '1rem',
                    background: '#d0d0d0',
                    border: '1px solid black',
                    textDecoration: 'none',
                    color: 'black'
                  }}
                  onClick={() => logTest('Clicked: External link (GitHub)')}
                >
                  → External Link (https://github.com)
                </a>

                <a
                  href="https://anthropic.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '1rem',
                    background: '#d0d0d0',
                    border: '1px solid black',
                    textDecoration: 'none',
                    color: 'black'
                  }}
                  onClick={() => logTest('Clicked: External link with target="_blank"')}
                >
                  → External Link with target="_blank" (https://anthropic.com)
                </a>
              </div>
            </div>

            {/* Test Category 4: Special Cases */}
            <div style={{
              marginBottom: '3rem',
              padding: '2rem',
              border: '2px solid black',
              background: 'white'
            }}>
              <h2 style={{
                fontSize: '2rem',
                marginBottom: '1.5rem',
                fontFamily: 'var(--font-playfair-display)'
              }}>
                4. Special Cases
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <a
                  href="/test-transitions"
                  style={{
                    padding: '1rem',
                    background: '#c0c0c0',
                    border: '1px solid black',
                    textDecoration: 'none',
                    color: 'black'
                  }}
                  onClick={() => logTest('Clicked: Same page link (should be ignored)')}
                >
                  → Same Page Link (Should NOT Transition)
                </a>

                <button
                  onClick={() => {
                    logTest('Browser Back Button Test: Click browser back button now');
                  }}
                  style={{
                    padding: '1rem',
                    background: '#ffeb3b',
                    border: '2px solid black',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontWeight: 'bold'
                  }}
                >
                  📝 Test Browser Back: Navigate to another page, then click browser back button
                </button>

                <div style={{
                  padding: '1rem',
                  background: '#e3f2fd',
                  border: '1px solid black'
                }}>
                  <strong>Cmd/Ctrl+Click Test:</strong> Hold Cmd (Mac) or Ctrl (Windows) and click the Home link above.
                  Should open in new tab WITHOUT transition.
                </div>
              </div>
            </div>

            {/* Test Log */}
            <div style={{
              marginBottom: '3rem',
              padding: '2rem',
              border: '2px solid black',
              background: '#f5f5f5'
            }}>
              <h2 style={{
                fontSize: '2rem',
                marginBottom: '1.5rem',
                fontFamily: 'var(--font-playfair-display)'
              }}>
                Test Log
              </h2>

              <div style={{
                maxHeight: '300px',
                overflowY: 'auto',
                fontFamily: 'monospace',
                fontSize: '0.9rem'
              }}>
                {testResults.length === 0 ? (
                  <p>No actions logged yet. Click links above to test.</p>
                ) : (
                  testResults.map((result, i) => (
                    <div key={i} style={{ padding: '0.25rem 0', borderBottom: '1px solid #ddd' }}>
                      {result}
                    </div>
                  ))
                )}
              </div>

              <button
                onClick={() => setTestResults([])}
                style={{
                  marginTop: '1rem',
                  padding: '0.5rem 1rem',
                  background: 'white',
                  border: '1px solid black',
                  cursor: 'pointer'
                }}
              >
                Clear Log
              </button>
            </div>

            {/* Expected Behavior */}
            <div style={{
              padding: '2rem',
              border: '2px solid #4caf50',
              background: '#e8f5e9',
              marginBottom: '3rem'
            }}>
              <h2 style={{
                fontSize: '2rem',
                marginBottom: '1.5rem',
                fontFamily: 'var(--font-playfair-display)'
              }}>
                Expected Behavior
              </h2>

              <ul style={{ lineHeight: '2', marginLeft: '1.5rem' }}>
                <li>✅ <strong>Internal page links</strong>: Alternating column transition (bars from bottom/top)</li>
                <li>✅ <strong>Hash links</strong>: Smooth scroll, no transition animation</li>
                <li>✅ <strong>External links</strong>: Open normally, no transition</li>
                <li>✅ <strong>Same page link</strong>: No action, no transition</li>
                <li>✅ <strong>Browser back/forward</strong>: Enter animation only (bars shrink)</li>
                <li>✅ <strong>Cmd/Ctrl+Click</strong>: Opens in new tab, no transition</li>
                <li>✅ <strong>target="_blank"</strong>: Opens in new tab, no transition</li>
              </ul>
            </div>

            {/* Scroll Test Sections */}
            <div id="section-test-1" style={{
              minHeight: '80vh',
              padding: '3rem 2rem',
              border: '2px solid black',
              background: '#fff3e0',
              marginBottom: '2rem'
            }}>
              <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-playfair-display)' }}>
                Section Test 1
              </h2>
              <p style={{ fontSize: '1.2rem', marginTop: '1rem' }}>
                This section is for testing hash link navigation. When you click the hash link above,
                the page should smoothly scroll here WITHOUT triggering the transition animation.
              </p>
            </div>

            <div id="section-test-2" style={{
              minHeight: '80vh',
              padding: '3rem 2rem',
              border: '2px solid black',
              background: '#f3e5f5',
              marginBottom: '2rem'
            }}>
              <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-playfair-display)' }}>
                Section Test 2
              </h2>
              <p style={{ fontSize: '1.2rem', marginTop: '1rem' }}>
                Another test section for hash navigation. The smooth scroll should work
                without triggering the page transition effect.
              </p>
            </div>

          </div>
        </section>
      </main>
    </>
  );
}

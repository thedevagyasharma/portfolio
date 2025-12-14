import './Hero.styles.css';
import HeroBackground from './HeroBackground';


export default function Hero() {
    return (
        <section className='hero'>
            <HeroBackground />
            <div className="content container">
                <div className="hero-avatar"><img src="/assets/general/pixel_face.png" alt="" /></div>
                <div className="hero-text">
                    <h1 className="font-display-1"><span className="toHighlight">Design Engineer</span> crafting faster production pipelines with AI.</h1>
                </div>
                <div className="hero-featured">
                    <h2>Previously Designed For</h2>
                    <div className="featured-logos">
                        <img src="/assets/general/do_logo.webp" alt="" />
                        <img src="/assets/general/mm_logo.png" alt="" />
                        <img src="/assets/general/csa_logo.png" alt="" />
                    </div>
                </div>
            </div>
            {/* <div className="container">
                <h1>Designer–engineer specializing in scalable UI and design systems.</h1>
                <h2>I create accessible, consistent components that teams can trust.</h2>
            </div> */}
        </section>
    )
}
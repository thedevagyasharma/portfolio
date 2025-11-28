import './Hero.styles.css';
import HeroBackground from './HeroBackground';


export default function Hero() {
    return (
        <section className='hero'>
            <HeroBackground />
            <div className="content">

            </div>
            {/* <div className="container">
                <h1>Designer–engineer specializing in scalable UI and design systems.</h1>
                <h2>I create accessible, consistent components that teams can trust.</h2>
            </div> */}
        </section>
    )
}
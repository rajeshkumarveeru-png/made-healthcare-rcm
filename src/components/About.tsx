import {type CSSProperties} from 'react'
import {ArrowRight, BarChart3, BriefcaseBusiness, Code2, Laptop2, RefreshCw, Workflow} from 'lucide-react'
import {pillars} from './data-bridge'
import {spotlight, useReveal} from './shared'

/* the five things your own "Our approach" paragraph says we bring together */
const BRING = [
    {icon: Code2, label: 'Medical billing knowledge'},
    {icon: Workflow, label: 'Revenue-cycle workflows'},
    {icon: Laptop2, label: 'Technology'},
    {icon: BarChart3, label: 'Analytics'},
    {icon: RefreshCw, label: 'Continuous process improvement'}
]

export function About() {
    const [visualRef, visualIn] = useReveal<HTMLDivElement>()
    const [copyRef, copyIn] = useReveal<HTMLDivElement>()
    return (
        <section id="about" className="mh-section mh-about" aria-labelledby="mh-about-title">
            <div className="mh-wrap mh-about-grid">
                <div className={`mh-about-visual mh-fade${visualIn ? ' in' : ''}`} ref={visualRef}>
                    <div className="mh-about-card">
                        <i className="mh-glow g1" aria-hidden="true"/><i className="mh-glow g2" aria-hidden="true"/>
                        <div className="mh-about-badge"><span>MADE</span><b>HEALTHCARE</b><small>RCM · TRAINING · TECHNOLOGY</small></div>
                        <div className="mh-about-quote">Healthcare expertise<br/><em>with an operational mindset.</em></div>
                        <ul className="mh-bring" aria-label="What we bring together">
                            {BRING.map((b, i) => {
                                const Icon = b.icon
                                return <li key={b.label} style={{'--i': i} as CSSProperties}><Icon size={15}/> {b.label}</li>
                            })}
                        </ul>
                    </div>
                </div>

                <div className={`mh-about-copy mh-fade${copyIn ? ' in' : ''}`} ref={copyRef} style={{'--d': '.1s'} as CSSProperties}>
                    <span className="mh-index">04</span>
                    <div className="mh-eyebrow-dark"><span>ABOUT</span> OUR APPROACH</div>
                    <h2 id="mh-about-title">Healthcare expertise with an <em>operational mindset.</em></h2>
                    <p>MADE Healthcare RCM is focused on the connection between healthcare operations, revenue cycle performance and professional development.</p>
                    <p>Our approach brings together medical billing knowledge, revenue-cycle workflows, technology, analytics and continuous process improvement.</p>
                    <div className="mh-pillars">
                        {pillars.map(([title, subtitle, text], i) => (
                            <div className="mh-pillar" key={title} onMouseMove={spotlight} style={{'--i': i} as CSSProperties}>
                                <small>{title}</small>
                                <strong>{subtitle}</strong>
                                <p>{text}</p>
                                <i className="mh-pillar-line"/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export function Statement({scrollTo}: {scrollTo: (id: string) => void}) {
    const [ref, inView] = useReveal<HTMLDivElement>()
    return (
        <section className="mh-statement" aria-label="Our belief">
            <i className="mh-glow g1" aria-hidden="true"/><i className="mh-glow g2" aria-hidden="true"/>
            <div className={`mh-wrap mh-statement-inner mh-fade${inView ? ' in' : ''}`} ref={ref}>
                <div className="mh-statement-mark"><BriefcaseBusiness size={26}/></div>
                <p>Better revenue operations are built through <em>knowledge, discipline, visibility and technology.</em></p>
                <button type="button" className="mh-btn mh-btn-light" onClick={() => scrollTo('contact')}>Start a conversation <ArrowRight size={16}/></button>
            </div>
        </section>
    )
}

import {useEffect, useMemo, useRef, useState, type CSSProperties, type MouseEvent} from 'react'
import {ArrowRight, CheckCircle2, ChevronDown, GraduationCap, HeartPulse, Laptop2, Users} from 'lucide-react'
import {STAGES, services, trainingModules} from './data'
import {prefersReducedMotion, useReveal} from './shared'

type HeroProps = {
    scrollTo: (id: string) => void
    pickStage: (key: string) => void
}

/* which training module relates to which stage (my pairing - edit freely) */
const STAGE_MODULE: Record<string, string> = {access: '01', coding: '02', billing: '03', denials: '04', compliance: '06'}

const FACTS = [
    {icon: HeartPulse, title: 'RCM', text: 'Healthcare revenue cycle'},
    {icon: Laptop2, title: 'TECH', text: 'Technology-enabled workflows'},
    {icon: Users, title: 'PEOPLE', text: 'Expertise behind every process'}
]

/** the hero visual: an interactive revenue cycle. Stage text comes from your service descriptions. */
export function Hero({scrollTo, pickStage}: HeroProps) {
    const [stage, setStage] = useState(0)
    const [paused, setPaused] = useState(false)
    const picked = useRef(false)
    const reduced = useMemo(prefersReducedMotion, [])
    const [copyRef, copyIn] = useReveal<HTMLDivElement>(0.05)
    const heroRef = useRef<HTMLElement>(null)

    useEffect(() => {
        if (reduced || picked.current || paused) return
        const t = window.setTimeout(() => setStage(s => (s + 1) % STAGES.length), 4200)
        return () => window.clearTimeout(t)
    }, [stage, paused, reduced])

    const onMove = (event: MouseEvent<HTMLElement>) => {
        const hero = heroRef.current
        if (!hero) return
        const r = hero.getBoundingClientRect()
        hero.style.setProperty('--gx', `${event.clientX - r.left}px`)
        hero.style.setProperty('--gy', `${event.clientY - r.top}px`)
    }

    const current = STAGES[stage]
    const related = services.filter(s => (current.services as readonly string[]).includes(s[0]))
    const module = trainingModules.find(m => m[0] === STAGE_MODULE[current.key])

    return (
        <section id="home" className="mh-hero" ref={heroRef} onMouseMove={onMove}>
            <div className="mh-hero-bg" aria-hidden="true">
                <i className="mh-glow g1"/><i className="mh-glow g2"/>
                <div className="mh-grid"/>
                <div className="mh-pointer-glow"/>
                <img className="mh-doctor" src="/images/hero-doctor-hd.png" alt="" onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}/>
                <svg className="mh-ecg" viewBox="0 0 1200 120" preserveAspectRatio="none"><path d="M0 60 H260 l24 -34 l32 84 l30 -110 l28 60 H520 l22 -28 l26 52 l20 -24 H760 l24 -44 l34 96 l28 -92 l26 40 H1200"/></svg>
            </div>

            <div className="mh-wrap mh-hero-inner">
                <div className={`mh-hero-copy mh-fade${copyIn ? ' in' : ''}`} ref={copyRef}>
                    <div className="mh-eyebrow"><span className="mh-pulse"/> MADE HEALTHCARE · RCM</div>
                    <h1>Healthcare revenue.<em>Smarter operations.</em>Better outcomes.</h1>
                    <p className="mh-lead">
                        MADE Healthcare combines medical billing expertise, revenue cycle operations, technology and analytics to help healthcare organizations
                        strengthen financial performance while allowing care teams to focus on patients.
                    </p>
                    <div className="mh-actions">
                        <button type="button" className="mh-btn mh-btn-primary" onClick={() => scrollTo('contact')}>Talk to our team <ArrowRight size={17}/></button>
                        <button type="button" className="mh-btn mh-btn-glass" onClick={() => scrollTo('services')}>Explore services</button>
                        <button type="button" className="mh-btn mh-btn-ghost" onClick={() => scrollTo('training')}><GraduationCap size={17}/> Training</button>
                    </div>
                    <ul className="mh-facts" aria-label="At a glance">
                        {FACTS.map((f, i) => {
                            const Icon = f.icon
                            return (
                                <li key={f.title} style={{'--i': i} as CSSProperties}>
                                    <span className="mh-fact-icon"><Icon size={20}/></span>
                                    <span><b>{f.title}</b><small>{f.text}</small></span>
                                </li>
                            )
                        })}
                    </ul>
                </div>

                <div className={`mh-cycle-wrap mh-fade${copyIn ? ' in' : ''}`} style={{'--d': '.15s'} as CSSProperties} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
                    <div className="mh-cycle" role="group" aria-label="The healthcare revenue cycle">
                        <div className="mh-cycle-head">
                            <div><small>REVENUE CYCLE</small><strong>From front desk to performance</strong></div>
                            <span className="mh-live"><i/> INTERACTIVE</span>
                        </div>

                        <ol className="mh-stages">
                            {STAGES.map((s, i) => (
                                <li key={s.key} className={i === stage ? 'on' : i < stage ? 'done' : ''}>
                                    <button type="button" aria-current={i === stage ? 'step' : undefined} onClick={() => { picked.current = true; setStage(i) }}>
                                        <span className="mh-stage-dot">{i < stage ? <CheckCircle2 size={14}/> : i + 1}</span>
                                        <span className="mh-stage-label"><b>{s.label}</b><small>{s.short}</small></span>
                                        {i === stage && !picked.current && !reduced && <i className="mh-stage-progress" key={`${stage}-${paused}`}/>}
                                    </button>
                                </li>
                            ))}
                        </ol>

                        <div className="mh-cycle-body" key={current.key} aria-live="polite">
                            {related.map(s => {
                                const Icon = s[3]
                                return (
                                    <div className="mh-cycle-card" key={s[0]}>
                                        <span className="mh-cycle-icon"><Icon size={20}/></span>
                                        <div><b>{s[1]}</b><p>{s[2]}</p></div>
                                    </div>
                                )
                            })}
                            {module && (
                                <div className="mh-cycle-card learn">
                                    <span className="mh-cycle-icon"><GraduationCap size={20}/></span>
                                    <div><small>RELATED TRAINING</small><b>{module[1]}</b><p>{module[2]}</p></div>
                                </div>
                            )}
                        </div>

                        <div className="mh-cycle-foot">
                            <span>Stage {String(stage + 1).padStart(2, '0')} / {String(STAGES.length).padStart(2, '0')}</span>
                            <button type="button" onClick={() => pickStage(current.key)}>See these services <ArrowRight size={14}/></button>
                        </div>
                    </div>
                    <div className="mh-float-chip c1"><HeartPulse size={15}/> Care teams focus on patients</div>
                    <div className="mh-float-chip c2"><CheckCircle2 size={15}/> Compliance-aware workflows</div>
                </div>
            </div>

            <button type="button" className="mh-scroll-cue" onClick={() => scrollTo('services')} aria-label="Scroll to services"><span>Scroll</span><ChevronDown size={18}/></button>
        </section>
    )
}

/** pausing ticker under the hero */
export function Ticker() {
    const items = services.map(s => s[1])
    return (
        <section className="mh-ticker" aria-label="What we support">
            <div className="mh-ticker-label"><HeartPulse size={14}/> WHAT WE SUPPORT</div>
            <div className="mh-ticker-viewport">
                <div className="mh-ticker-track">
                    {[0, 1].map(g => (
                        <ul key={g} aria-hidden={g === 1}>{items.map(t => <li key={t}><i/>{t.toUpperCase()}</li>)}</ul>
                    ))}
                </div>
            </div>
        </section>
    )
}

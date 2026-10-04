import {useEffect, useMemo, useState, type CSSProperties} from 'react'
import {ArrowRight, Check, CheckCircle2, RotateCcw} from 'lucide-react'
import {trainingModules, type FocusRequest} from './data-bridge'
import {spotlight, useReveal} from './shared'

type Props = {
    focus: FocusRequest | null
    enquire: (topic: string, message: string) => void
}

const LEARNERS = ['Fresh Graduates', 'Career Changers', 'International Learners', 'Junior Billers']
const STORAGE_KEY = 'mh_modules_explored'

const readExplored = (): string[] => {
    try {
        const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
        return Array.isArray(parsed) ? parsed.filter((x: unknown) => typeof x === 'string') : []
    } catch {
        return []
    }
}

export function Training({focus, enquire}: Props) {
    const [active, setActive] = useState(0)
    const [explored, setExplored] = useState<string[]>(readExplored)
    const [learner, setLearner] = useState<string | null>(null)
    const [headRef, headIn] = useReveal<HTMLDivElement>()
    const [bodyRef, bodyIn] = useReveal<HTMLDivElement>()

    useEffect(() => {
        if (focus?.kind !== 'module') return
        const index = trainingModules.findIndex(m => m[0] === focus.id)
        if (index >= 0) setActive(index)
    }, [focus])

    // reading a module marks it "explored" (kept in the visitor's own browser)
    useEffect(() => {
        const id = trainingModules[active][0]
        setExplored(prev => {
            if (prev.includes(id)) return prev
            const next = [...prev, id]
            try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch { /* private mode */ }
            return next
        })
    }, [active])

    const reset = () => {
        setExplored([trainingModules[active][0]])
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify([trainingModules[active][0]])) } catch { /* ignore */ }
    }

    const percent = Math.round((explored.length / trainingModules.length) * 100)
    const current = trainingModules[active]
    const CurrentIcon = current[3]
    const done = explored.length === trainingModules.length
    const learnerLine = useMemo(() => learner ? ` I am a ${learner.toLowerCase().replace(/s$/, '')}.` : '', [learner])

    return (
        <section id="training" className="mh-section mh-training" aria-labelledby="mh-training-title">
            <div className="mh-dark-bg" aria-hidden="true"><i className="mh-glow g1"/><i className="mh-glow g2"/><div className="mh-grid"/></div>
            <div className="mh-wrap mh-above">
                <div className={`mh-intro dark mh-fade${headIn ? ' in' : ''}`} ref={headRef}>
                    <div>
                        <span className="mh-index inv">03</span>
                        <div className="mh-eyebrow-dark inv"><span>TRAINING</span> PROFESSIONAL DEVELOPMENT</div>
                        <h2 id="mh-training-title">Medical billing knowledge<br/><em>that connects to real workflows.</em></h2>
                    </div>
                    <div className="mh-note dark"><strong>Structured learning</strong><p>Build practical knowledge from billing fundamentals through claims, denials, AR, compliance and billing technology.</p></div>
                </div>

                <div className={`mh-training-layout mh-fade${bodyIn ? ' in' : ''}`} ref={bodyRef}>
                    <div className="mh-path">
                        <div className="mh-progress-card">
                            <div className="mh-progress-top"><b>Your learning path</b><span>{explored.length} of {trainingModules.length} modules explored</span></div>
                            <div className="mh-meter" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent} aria-label="Modules explored"><i style={{width: `${percent}%`}}/></div>
                            {explored.length > 1 && <button type="button" className="mh-reset" onClick={reset}><RotateCcw size={13}/> Reset</button>}
                        </div>

                        <ol className="mh-modules" role="tablist" aria-label="Training modules" aria-orientation="vertical">
                            {trainingModules.map(([number, title, , Icon], i) => {
                                const seen = explored.includes(number)
                                return (
                                    <li key={number} style={{'--i': i} as CSSProperties}>
                                        <button type="button" role="tab" aria-selected={active === i} className={`mh-module${active === i ? ' on' : ''}${seen ? ' seen' : ''}`} onClick={() => setActive(i)} onMouseMove={spotlight}>
                                            <span className="mh-module-no">{seen && active !== i ? <Check size={13}/> : number}</span>
                                            <span className="mh-module-icon"><Icon size={19}/></span>
                                            <b>{title}</b>
                                        </button>
                                    </li>
                                )
                            })}
                        </ol>
                    </div>

                    <div className="mh-training-side">
                        <article className="mh-module-detail" key={current[0]} role="tabpanel" aria-live="polite">
                            <span className="mh-detail-icon"><CurrentIcon size={28}/></span>
                            <small>MODULE {current[0]} OF {String(trainingModules.length).padStart(2, '0')}</small>
                            <h3>{current[1]}</h3>
                            <p>{current[2]}</p>
                            <div className="mh-detail-nav">
                                <button type="button" onClick={() => setActive(a => (a - 1 + trainingModules.length) % trainingModules.length)}>Previous</button>
                                <button type="button" className="next" onClick={() => setActive(a => (a + 1) % trainingModules.length)}>Next module <ArrowRight size={15}/></button>
                            </div>
                        </article>

                        <aside className="mh-aside">
                            <div className="mh-aside-eyebrow">LEARNER FIT</div>
                            <h3>A clear professional foundation for the healthcare billing industry.</h3>
                            <div className="mh-learners" role="group" aria-label="Who is this for?">
                                {LEARNERS.map(item => (
                                    <button key={item} type="button" className={learner === item ? 'on' : ''} aria-pressed={learner === item} onClick={() => setLearner(learner === item ? null : item)}>
                                        <CheckCircle2 size={17}/> <span>{item}</span>
                                    </button>
                                ))}
                            </div>
                            <button type="button" className="mh-btn mh-btn-primary" onClick={() => enquire('Training', `I would like to talk about training.${learnerLine}${done ? ' I have explored all 8 modules.' : ''}`)}>Talk about training <ArrowRight size={16}/></button>
                        </aside>
                    </div>
                </div>
            </div>
        </section>
    )
}

import {useEffect, useMemo, useState, type CSSProperties} from 'react'
import {ArrowRight, ArrowUpRight, Check, GraduationCap, X} from 'lucide-react'
import {STAGES, services, stageOfService, trainingModules, type FocusRequest} from './data-bridge'
import {spotlight, useReveal} from './shared'

type Props = {
    stage: {key: string; nonce: number}
    focus: FocusRequest | null
    enquire: (topic: string, message: string) => void
    scrollTo: (id: string) => void
}

/* which training module relates to which service (my pairing - edit freely) */
const RELATED_MODULE: Record<string, string> = {'01': '03', '02': '02', '03': '01', '04': '06', '05': '04', '06': '05', '07': '08', '08': '08'}

export function Services({stage, focus, enquire, scrollTo}: Props) {
    const [filter, setFilter] = useState<string>('all')
    const [open, setOpen] = useState<string | null>(null)
    const [headRef, headIn] = useReveal<HTMLDivElement>()
    const [gridRef, gridIn] = useReveal<HTMLDivElement>()

    // the hero's "See these services" button and the search palette drive this section
    useEffect(() => { if (stage.nonce) setFilter(stage.key) }, [stage.nonce, stage.key])
    useEffect(() => { if (focus?.kind === 'service') { setFilter('all'); setOpen(focus.id) } }, [focus])

    useEffect(() => {
        if (!open) return
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(null) }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [open])

    const visible = useMemo(() => services.filter(s => filter === 'all' || stageOfService(s[0])?.key === filter), [filter])
    const selected = services.find(s => s[0] === open)
    const SelectedIcon = selected?.[3]
    const selectedStage = selected ? stageOfService(selected[0]) : undefined
    const relatedModule = selected ? trainingModules.find(m => m[0] === RELATED_MODULE[selected[0]]) : undefined

    return (
        <section id="services" className="mh-section mh-services" aria-labelledby="mh-services-title">
            <div className="mh-wrap">
                <div className={`mh-intro mh-fade${headIn ? ' in' : ''}`} ref={headRef}>
                    <div>
                        <span className="mh-index">01</span>
                        <div className="mh-eyebrow-dark"><span>SERVICES</span> HEALTHCARE RCM</div>
                        <h2 id="mh-services-title">Complete revenue-cycle<br/><em>support built around your workflow.</em></h2>
                    </div>
                    <div className="mh-note"><strong>People + process + technology</strong><p>We bring together billing expertise, operational discipline, analytics and technology to support the financial side of healthcare delivery.</p></div>
                </div>

                <div className="mh-filters" role="group" aria-label="Filter services by revenue-cycle stage">
                    <button type="button" className={filter === 'all' ? 'on' : ''} aria-pressed={filter === 'all'} onClick={() => setFilter('all')}>All services <em>{services.length}</em></button>
                    {STAGES.map(s => (
                        <button key={s.key} type="button" className={filter === s.key ? 'on' : ''} aria-pressed={filter === s.key} onClick={() => setFilter(s.key)}>{s.label} <em>{s.services.length}</em></button>
                    ))}
                </div>

                <div className={`mh-service-grid mh-fade${gridIn ? ' in' : ''}`} ref={gridRef}>
                    {visible.map(([number, title, text, Icon], i) => {
                        const st = stageOfService(number)
                        return (
                            <article key={number} className="mh-service" style={{'--i': i} as CSSProperties} onMouseMove={spotlight}>
                                <button type="button" className="mh-service-btn" onClick={() => setOpen(number)} aria-haspopup="dialog" aria-label={`${title} - open details`}>
                                    <div className="mh-service-top"><span className="mh-service-no">{number}</span><span className="mh-service-stage">{st?.label}</span></div>
                                    <span className="mh-service-icon"><Icon size={24} strokeWidth={1.7}/></span>
                                    <h3>{title}</h3>
                                    <p>{text}</p>
                                    <span className="mh-service-more">Details <ArrowUpRight size={16}/></span>
                                    <i className="mh-service-line"/>
                                </button>
                            </article>
                        )
                    })}
                </div>
            </div>

            {selected && SelectedIcon && (
                <div className="mh-modal-overlay" onClick={() => setOpen(null)} role="presentation">
                    <div className="mh-modal" role="dialog" aria-modal="true" aria-labelledby="mh-modal-title" onClick={e => e.stopPropagation()}>
                        <button type="button" className="mh-modal-close" onClick={() => setOpen(null)} aria-label="Close details" autoFocus><X size={18}/></button>
                        <div className="mh-modal-head">
                            <span className="mh-modal-icon"><SelectedIcon size={28}/></span>
                            <div>
                                <span className="mh-kicker">SERVICE {selected[0]} · {selectedStage?.label.toUpperCase()}</span>
                                <h3 id="mh-modal-title">{selected[1]}</h3>
                            </div>
                        </div>
                        <p className="mh-modal-text">{selected[2]}</p>
                        <div className="mh-modal-cycle" aria-label="Where it sits in the revenue cycle">
                            {STAGES.map(s => <span key={s.key} className={s.key === selectedStage?.key ? 'on' : ''}>{s.key === selectedStage?.key && <Check size={12}/>}{s.label}</span>)}
                        </div>
                        {relatedModule && (
                            <button type="button" className="mh-modal-module" onClick={() => { setOpen(null); window.setTimeout(() => scrollTo('training'), 60) }}>
                                <GraduationCap size={18}/>
                                <span><small>RELATED TRAINING MODULE</small><b>{relatedModule[1]}</b></span>
                                <ArrowRight size={16}/>
                            </button>
                        )}
                        <div className="mh-modal-actions">
                            <button type="button" className="mh-btn mh-btn-primary" onClick={() => { setOpen(null); enquire('Revenue-cycle operations', `I would like to discuss ${selected[1]}.`) }}>Ask about {selected[1]} <ArrowRight size={16}/></button>
                            <button type="button" className="mh-btn mh-btn-outline-dark" onClick={() => setOpen(null)}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}

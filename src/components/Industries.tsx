import {useEffect, useState, type CSSProperties} from 'react'
import {ArrowRight} from 'lucide-react'
import {industries, type FocusRequest} from './data-bridge'
import {spotlight, useReveal} from './shared'

type Props = {
    focus: FocusRequest | null
    enquire: (topic: string, message: string) => void
}

export function Industries({focus, enquire}: Props) {
    const [selected, setSelected] = useState(0)
    const [headRef, headIn] = useReveal<HTMLDivElement>()
    const [bodyRef, bodyIn] = useReveal<HTMLDivElement>()

    useEffect(() => {
        if (focus?.kind !== 'industry') return
        const index = industries.findIndex(i => i[0] === focus.id)
        if (index >= 0) setSelected(index)
    }, [focus])

    const pick = industries[selected]
    const PickIcon = pick[3]

    return (
        <section id="industries" className="mh-section mh-industries" aria-labelledby="mh-ind-title">
            <div className="mh-dark-bg" aria-hidden="true"><i className="mh-glow g1"/><i className="mh-glow g2"/><div className="mh-grid"/></div>
            <div className="mh-wrap mh-above">
                <div className={`mh-intro dark mh-fade${headIn ? ' in' : ''}`} ref={headRef}>
                    <div>
                        <span className="mh-index inv">02</span>
                        <div className="mh-eyebrow-dark inv"><span>INDUSTRIES</span> HEALTHCARE ORGANIZATIONS</div>
                        <h2 id="mh-ind-title">Support that adapts<br/><em>to the way healthcare works.</em></h2>
                    </div>
                    <div className="mh-note dark"><strong>Operational context matters</strong><p>Revenue-cycle workflows differ by care environment. Our approach starts with the organization's operating model and priorities.</p></div>
                </div>

                <div className={`mh-ind-body mh-fade${bodyIn ? ' in' : ''}`} ref={bodyRef}>
                    <div className="mh-ind-grid" role="tablist" aria-label="Choose a type of healthcare organization">
                        {industries.map(([number, title, , Icon], i) => (
                            <button
                                key={number}
                                type="button"
                                role="tab"
                                aria-selected={selected === i}
                                className={`mh-ind tone-${industries[i][4]}${selected === i ? ' on' : ''}`}
                                onClick={() => setSelected(i)}
                                onMouseEnter={() => setSelected(i)}
                                onFocus={() => setSelected(i)}
                                onMouseMove={spotlight}
                                style={{'--i': i} as CSSProperties}
                            >
                                <span className="mh-ind-no">{number}</span>
                                <span className="mh-ind-icon"><Icon size={20} strokeWidth={1.7}/></span>
                                <strong>{title}</strong>
                                <ArrowRight className="mh-ind-arrow" size={16}/>
                            </button>
                        ))}
                    </div>

                    <aside className={`mh-fit tone-${pick[4]}`} key={pick[0]} aria-live="polite">
                        <span className="mh-fit-icon"><PickIcon size={26}/></span>
                        <small>HOW WE SUPPORT</small>
                        <h3>{pick[1]}</h3>
                        <p>{pick[2]}</p>
                        <button type="button" className="mh-btn mh-btn-light" onClick={() => enquire('Revenue-cycle operations', `We are a ${pick[1].toLowerCase()} organization and would like to discuss revenue-cycle support.`)}>Discuss {pick[1]} <ArrowRight size={16}/></button>
                    </aside>
                </div>
            </div>
        </section>
    )
}

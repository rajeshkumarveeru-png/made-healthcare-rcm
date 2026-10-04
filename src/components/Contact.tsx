import {useEffect, useMemo, useRef, useState, type CSSProperties, type FormEvent} from 'react'
import {ArrowRight, Check, ChevronDown, Copy, ExternalLink, Loader2, Mail, MapPin, MessageCircle, Phone, Send, ShieldAlert, ShieldCheck} from 'lucide-react'
import {ENQUIRY_TOPICS, FAQ, email, officeLines, phonePrimary, phoneSecondary, whatsapp, whatsappNumber} from './data'
import {useReveal, type EnquiryPrefill} from './shared'

type Props = {
    prefill: EnquiryPrefill
    /** optional URL (Formspree, Getform, your own API). When set, enquiries are POSTed there as JSON. */
    endpoint?: string
}

const DRAFT_KEY = 'mh_enquiry_draft'
const MAX_MESSAGE = 600
const waLink = (text: string) => `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`
const officeFlat = officeLines.join(' ')
const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(officeFlat)}`

type Form = {name: string; email: string; phone: string; organization: string; topic: string; message: string; website: string}
const EMPTY: Form = {name: '', email: '', phone: '', organization: '', topic: '', message: '', website: ''}

const loadDraft = (): Form => {
    try {
        return {...EMPTY, ...JSON.parse(sessionStorage.getItem(DRAFT_KEY) || '{}'), website: ''}
    } catch {
        return EMPTY
    }
}

export function Contact({prefill, endpoint}: Props) {
    const [form, setForm] = useState<Form>(loadDraft)
    const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({})
    const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'failed'>('idle')
    const [copied, setCopied] = useState('')
    const [openFaq, setOpenFaq] = useState(0)
    const [leftRef, leftIn] = useReveal<HTMLDivElement>()
    const [rightRef, rightIn] = useReveal<HTMLFormElement>()
    const first = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (!prefill.nonce) return
        setForm(f => ({...f, topic: prefill.topic ?? f.topic, message: prefill.message ? prefill.message : f.message}))
        setStatus('idle')
        const t = window.setTimeout(() => first.current?.focus({preventScroll: true}), 700)
        return () => window.clearTimeout(t)
    }, [prefill.nonce, prefill.topic, prefill.message])

    useEffect(() => {
        try { sessionStorage.setItem(DRAFT_KEY, JSON.stringify({...form, website: ''})) } catch { /* private mode */ }
    }, [form])

    const set = <K extends keyof Form>(key: K, value: Form[K]) => {
        setForm(f => ({...f, [key]: value}))
        if (errors[key]) setErrors(e => ({...e, [key]: undefined}))
    }

    const validate = () => {
        const next: Partial<Record<keyof Form, string>> = {}
        if (form.name.trim().length < 2) next.name = 'Please enter your name.'
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = 'Enter a valid email address.'
        if (form.phone.trim() && !/^[+\d][\d\s-]{6,}$/.test(form.phone.trim())) next.phone = 'Check the phone number.'
        if (form.message.trim().length < 10) next.message = 'Tell us a little about what you are working on (at least 10 characters).'
        setErrors(next)
        return Object.keys(next).length === 0
    }

    const summary = useMemo(() => {
        const lines = ['Enquiry - MADE Healthcare RCM', `Name: ${form.name.trim()}`, `Email: ${form.email.trim()}`]
        if (form.phone.trim()) lines.push(`Phone: ${form.phone.trim()}`)
        if (form.organization.trim()) lines.push(`Organization: ${form.organization.trim()}`)
        if (form.topic) lines.push(`Topic: ${form.topic}`)
        lines.push('', form.message.trim())
        return lines.join('\n')
    }, [form])

    const submit = async (event: FormEvent) => {
        event.preventDefault()
        if (form.website) return                                  // honeypot
        if (!validate()) {
            document.querySelector<HTMLElement>('.mh-field.bad input, .mh-field.bad textarea')?.focus()
            return
        }
        if (!endpoint) { setStatus('done'); return }              // no backend: visitor picks how to send
        setStatus('sending')
        try {
            const response = await fetch(endpoint, {method: 'POST', headers: {'Content-Type': 'application/json', Accept: 'application/json'}, body: JSON.stringify({...form, website: undefined, summary})})
            if (!response.ok) throw new Error(String(response.status))
            setStatus('done')
            try { sessionStorage.removeItem(DRAFT_KEY) } catch { /* ignore */ }
        } catch {
            setStatus('failed')
        }
    }

    const copy = async (text: string, key: string) => {
        try {
            await navigator.clipboard.writeText(text)
            setCopied(key)
            window.setTimeout(() => setCopied(''), 1600)
        } catch { /* clipboard blocked */ }
    }

    const delivered = !!endpoint && status === 'done'
    const field = (key: keyof Form) => `mh-field${errors[key] ? ' bad' : ''}`

    return (
        <section id="contact" className="mh-section mh-contact" aria-labelledby="mh-contact-title">
            <div className="mh-dark-bg" aria-hidden="true"><i className="mh-glow g1"/><i className="mh-glow g2"/><div className="mh-grid"/><i className="mh-orbit a"/><i className="mh-orbit b"/></div>
            <div className="mh-wrap mh-contact-grid mh-above">
                <div className={`mh-contact-left mh-fade${leftIn ? ' in' : ''}`} ref={leftRef}>
                    <span className="mh-index inv">05</span>
                    <div className="mh-eyebrow-dark inv"><span>CONTACT</span> MADE HEALTHCARE</div>
                    <h2 id="mh-contact-title">Let's build a better<br/><em>healthcare operation.</em></h2>
                    <p className="mh-contact-lead">Tell us what you are working on. We can connect around healthcare revenue-cycle operations, training, technology or general enquiries.</p>

                    <div className="mh-actions-col">
                        <a className="mh-contact-card wa" href={whatsapp} target="_blank" rel="noreferrer"><span className="mh-contact-icon"><MessageCircle size={19}/></span><span><small>WHATSAPP</small><strong>Chat with us</strong></span><ArrowRight size={16}/></a>
                        <div className="mh-contact-card">
                            <a href={`tel:${phonePrimary}`}><span className="mh-contact-icon"><Phone size={19}/></span><span><small>CALL US</small><strong>+91 {phonePrimary}</strong><strong>+91 {phoneSecondary}</strong></span><ArrowRight size={16}/></a>
                            <button type="button" className="mh-copy" onClick={() => void copy(`+91 ${phonePrimary}`, 'ph')} aria-label="Copy phone number" title="Copy">{copied === 'ph' ? <Check size={15}/> : <Copy size={15}/>}</button>
                        </div>
                        <div className="mh-contact-card">
                            <a href={`mailto:${email}`}><span className="mh-contact-icon"><Mail size={19}/></span><span><small>EMAIL</small><strong>{email}</strong></span><ArrowRight size={16}/></a>
                            <button type="button" className="mh-copy" onClick={() => void copy(email, 'em')} aria-label="Copy email address" title="Copy">{copied === 'em' ? <Check size={15}/> : <Copy size={15}/>}</button>
                        </div>
                    </div>

                    <div className="mh-address">
                        <span className="mh-address-pin"><MapPin size={18}/></span>
                        <div>
                            <small>OFFICE</small>
                            <address>{officeLines.map((line, i) => <span key={i}>{line}<br/></span>)}</address>
                            <div className="mh-address-actions">
                                <a href={mapsLink} target="_blank" rel="noreferrer"><ExternalLink size={14}/> Open in Maps</a>
                                <button type="button" onClick={() => void copy(officeLines.join(', '), 'addr')}>{copied === 'addr' ? <Check size={14}/> : <Copy size={14}/>} {copied === 'addr' ? 'Copied' : 'Copy address'}</button>
                            </div>
                        </div>
                    </div>

                    <div className="mh-faq" role="region" aria-label="Frequently asked questions">
                        <strong>Common questions</strong>
                        {FAQ.map((item, i) => (
                            <div className={`mh-faq-item${openFaq === i ? ' open' : ''}`} key={item.q}>
                                <button type="button" aria-expanded={openFaq === i} aria-controls={`mh-faq-${i}`} onClick={() => setOpenFaq(openFaq === i ? -1 : i)}><span>{item.q}</span><ChevronDown size={17}/></button>
                                <div id={`mh-faq-${i}`} className="mh-faq-answer"><p>{item.a}</p></div>
                            </div>
                        ))}
                    </div>
                </div>

                {status === 'done' ? (
                    <div className={`mh-form mh-done mh-fade${rightIn ? ' in' : ''}`} style={{'--d': '.1s'} as CSSProperties} role="status">
                        <span className="mh-done-icon"><Check size={30}/></span>
                        <h3>{delivered ? 'Thank you - enquiry sent' : 'Your enquiry is ready'}</h3>
                        <p>{delivered ? 'We have received your enquiry and will get back to you soon.' : 'Choose how you would like to send it to us. It only takes one tap.'}</p>
                        <pre className="mh-summary">{summary}</pre>
                        <div className="mh-done-actions">
                            {!delivered && (
                                <>
                                    <a className="mh-btn mh-btn-wa" href={waLink(summary)} target="_blank" rel="noreferrer"><MessageCircle size={17}/> Send on WhatsApp</a>
                                    <a className="mh-btn mh-btn-light" href={`mailto:${email}?subject=${encodeURIComponent(`Enquiry - ${form.topic || 'General'}`)}&body=${encodeURIComponent(summary)}`}><Mail size={17}/> Send by email</a>
                                </>
                            )}
                            <button type="button" className="mh-btn mh-btn-outline" onClick={() => void copy(summary, 'sum')}>{copied === 'sum' ? <Check size={16}/> : <Copy size={16}/>} {copied === 'sum' ? 'Copied' : 'Copy details'}</button>
                        </div>
                        <button type="button" className="mh-link-btn inv" onClick={() => { setStatus('idle'); if (delivered) setForm(EMPTY) }}>{delivered ? 'Send another enquiry' : 'Edit my enquiry'}</button>
                    </div>
                ) : (
                    <form className={`mh-form mh-fade${rightIn ? ' in' : ''}`} ref={rightRef} onSubmit={event => void submit(event)} noValidate style={{'--d': '.1s'} as CSSProperties}>
                        <div className="mh-form-title"><span>ENQUIRY</span><strong>Let's talk about your needs.</strong><small>Usually the first step is simply understanding what you are working on.</small></div>

                        <div className="mh-phi" role="note"><ShieldAlert size={18}/><span><b>Please do not include patient information.</b> Do not enter PHI or any patient-identifiable details in this form.</span></div>

                        <div className="mh-row">
                            <label className={field('name')}><span>Your name <i>*</i></span><input ref={first} value={form.name} onChange={e => set('name', e.target.value)} placeholder="Your name" autoComplete="name" aria-invalid={!!errors.name}/>{errors.name && <em role="alert">{errors.name}</em>}</label>
                            <label className={field('email')}><span>Email address <i>*</i></span><input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="name@organization.com" autoComplete="email" aria-invalid={!!errors.email}/>{errors.email && <em role="alert">{errors.email}</em>}</label>
                        </div>
                        <div className="mh-row">
                            <label className={field('phone')}><span>Phone number</span><input value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+91 ..." inputMode="tel" autoComplete="tel" aria-invalid={!!errors.phone}/>{errors.phone && <em role="alert">{errors.phone}</em>}</label>
                            <label className="mh-field"><span>Organization</span><input value={form.organization} onChange={e => set('organization', e.target.value)} placeholder="Practice, hospital or company" autoComplete="organization"/></label>
                        </div>

                        <fieldset className="mh-chipset">
                            <legend>What would you like to discuss?</legend>
                            <div className="mh-chips">
                                {ENQUIRY_TOPICS.map(t => (
                                    <button key={t} type="button" className={form.topic === t ? 'on' : ''} aria-pressed={form.topic === t} onClick={() => set('topic', form.topic === t ? '' : t)}>{form.topic === t && <Check size={13}/>}{t}</button>
                                ))}
                            </div>
                        </fieldset>

                        <label className={`${field('message')} full`}>
                            <span>Message <i>*</i></span>
                            <textarea rows={5} maxLength={MAX_MESSAGE} value={form.message} onChange={e => set('message', e.target.value)} placeholder="Briefly describe what you are working on" aria-invalid={!!errors.message}/>
                            <small className={form.message.length > MAX_MESSAGE - 40 ? 'warn' : ''}>{form.message.length} / {MAX_MESSAGE}</small>
                            {errors.message && <em role="alert">{errors.message}</em>}
                        </label>

                        <input className="mh-hp" tabIndex={-1} autoComplete="off" aria-hidden="true" value={form.website} onChange={e => set('website', e.target.value)} name="website"/>

                        <button className="mh-btn mh-btn-primary mh-submit" type="submit" disabled={status === 'sending'}>
                            {status === 'sending' ? <><Loader2 className="mh-spin" size={17}/> Sending…</> : <>Send enquiry <Send size={16}/></>}
                        </button>
                        {status === 'failed' && <div className="mh-form-error" role="alert">We could not send this right now. Please use WhatsApp instead:<a href={waLink(summary)} target="_blank" rel="noreferrer"> Send on WhatsApp</a></div>}
                        <div className="mh-form-foot"><ShieldCheck size={15}/><span>Your enquiry stays focused on healthcare operations, training or technology.</span></div>
                    </form>
                )}
            </div>
        </section>
    )
}

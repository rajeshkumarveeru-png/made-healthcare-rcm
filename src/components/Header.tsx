import {useEffect, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent} from 'react'
import {ArrowRight, ArrowUp, ArrowUpRight, CornerDownLeft, Mail, Menu, MessageCircle, Phone, Search, X} from 'lucide-react'
import {email, industries, phonePrimary, services, trainingModules, whatsapp, type SearchItem} from './data'
import {useScrollState} from './shared'

export const NAV = [
    ['home', 'Home'], ['services', 'Services'], ['industries', 'Industries'], ['training', 'Training'], ['about', 'About'], ['contact', 'Contact']
] as const

const SECTION_HINTS: Record<string, string> = {
    home: 'Healthcare revenue and operations',
    services: 'Billing, coding, access, analytics and automation',
    industries: 'Healthcare organizations we support',
    training: 'Medical billing professional development',
    about: 'Our approach and operating philosophy',
    contact: 'Connect with MADE Healthcare'
}

/** one flat list for the Ctrl+K palette: sections + services + training modules + industries */
const SEARCH_ITEMS: SearchItem[] = [
    ...NAV.map(([id, label]) => ({id: `s-${id}`, kind: 'Section' as const, title: label, hint: SECTION_HINTS[id], target: id})),
    ...services.map(s => ({id: `svc-${s[0]}`, kind: 'Service' as const, title: s[1], hint: s[2], target: `service:${s[0]}`})),
    ...trainingModules.map(m => ({id: `mod-${m[0]}`, kind: 'Training' as const, title: m[1], hint: m[2], target: `module:${m[0]}`})),
    ...industries.map(i => ({id: `ind-${i[0]}`, kind: 'Industry' as const, title: i[1], hint: i[2], target: `industry:${i[0]}`}))
]

type HeaderProps = {
    active: string
    scrollTo: (id: string) => void
    openItem: (target: string) => void
    searchOpen: boolean
    setSearchOpen: (open: boolean) => void
}

export function Header({active, scrollTo, openItem, searchOpen, setSearchOpen}: HeaderProps) {
    const {scrolled, progress} = useScrollState()
    const [menu, setMenu] = useState(false)
    const burger = useRef<HTMLButtonElement>(null)
    const drawer = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!menu) return
        const previous = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        const onKey = (e: globalThis.KeyboardEvent) => {
            if (e.key === 'Escape') setMenu(false)
            if (e.key === 'Tab' && drawer.current) {
                const items = drawer.current.querySelectorAll<HTMLElement>('button, a[href]')
                if (!items.length) return
                const first = items[0]
                const last = items[items.length - 1]
                if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
                else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
            }
        }
        window.addEventListener('keydown', onKey)
        const t = window.setTimeout(() => drawer.current?.querySelector<HTMLElement>('button')?.focus(), 50)
        const button = burger.current
        return () => {
            document.body.style.overflow = previous
            window.removeEventListener('keydown', onKey)
            window.clearTimeout(t)
            button?.focus()
        }
    }, [menu])

    const go = (id: string) => {
        setMenu(false)
        window.setTimeout(() => scrollTo(id), 30)
    }

    return (
        <>
            <div className="mh-progress" aria-hidden="true"><i style={{transform: `scaleX(${progress})`}}/></div>
            <header className={`mh-header${scrolled ? ' is-scrolled' : ''}`}>
                <div className="mh-wrap mh-nav">
                    <a className="mh-brand" href="#home" onClick={e => { e.preventDefault(); scrollTo('home') }} aria-label="MADE Healthcare RCM home">
                        <Logo className="mh-brand-logo" src="/images/made-healthcare-logo.jpeg" alt="MADE Healthcare - Care. Community. Compassion."/>
                        <span className="mh-brand-words"><strong>MADE HEALTHCARE RCM</strong><small>Medical Billing · Revenue Cycle Management</small></span>
                    </a>

                    <nav className="mh-links" aria-label="Primary navigation">
                        {NAV.map(([id, label]) => (
                            <button key={id} type="button" className={active === id ? 'on' : ''} aria-current={active === id ? 'true' : undefined} onClick={() => scrollTo(id)}><span>{label}</span></button>
                        ))}
                    </nav>

                    <div className="mh-nav-end">
                        <button type="button" className="mh-search-btn" onClick={() => setSearchOpen(true)} aria-label="Open site search (Ctrl+K)" title="Search  (Ctrl + K)">
                            <Search size={17}/><span>Search</span><kbd>Ctrl K</kbd>
                        </button>
                        <button type="button" className="mh-cta" onClick={() => scrollTo('contact')}><span>Get in touch</span><ArrowRight size={15}/></button>
                        <button ref={burger} type="button" className="mh-burger" onClick={() => setMenu(true)} aria-label="Open navigation" aria-expanded={menu} aria-controls="mh-drawer"><Menu size={22}/></button>
                    </div>
                </div>
            </header>

            <div className={`mh-drawer-wrap${menu ? ' open' : ''}`} aria-hidden={!menu}>
                <div className="mh-drawer-backdrop" onClick={() => setMenu(false)}/>
                <div id="mh-drawer" className="mh-drawer" role="dialog" aria-modal="true" aria-label="Navigation" ref={drawer}>
                    <div className="mh-drawer-head">
                        <span className="mh-brand-words"><strong>MADE HEALTHCARE RCM</strong><small>Revenue Cycle Management</small></span>
                        <button type="button" className="mh-drawer-close" onClick={() => setMenu(false)} aria-label="Close navigation"><X size={20}/></button>
                    </div>
                    <button type="button" className="mh-drawer-search" onClick={() => { setMenu(false); setSearchOpen(true) }}><Search size={17}/> Search the site</button>
                    <nav className="mh-drawer-links" aria-label="Mobile navigation">
                        {NAV.map(([id, label], i) => (
                            <button key={id} type="button" className={active === id ? 'on' : ''} onClick={() => go(id)} style={{'--i': i} as CSSProperties}>
                                <small>{String(i + 1).padStart(2, '0')}</small><span>{label}</span><ArrowRight size={18}/>
                            </button>
                        ))}
                    </nav>
                    <div className="mh-drawer-foot">
                        <a href={`tel:${phonePrimary}`}><Phone size={16}/> +91 {phonePrimary}</a>
                        <a href={`mailto:${email}`}><Mail size={16}/> {email}</a>
                        <a className="wa" href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={16}/> Chat on WhatsApp</a>
                    </div>
                </div>
            </div>

            {searchOpen && <SearchPalette onClose={() => setSearchOpen(false)} onPick={item => { setSearchOpen(false); window.setTimeout(() => (item.target.includes(':') ? openItem(item.target) : scrollTo(item.target)), 60) }}/>}
        </>
    )
}

/** Ctrl+K palette: real search across sections, services, training modules and industries; arrows + Enter */
function SearchPalette({onClose, onPick}: {onClose: () => void; onPick: (item: SearchItem) => void}) {
    const [query, setQuery] = useState('')
    const [cursor, setCursor] = useState(0)
    const input = useRef<HTMLInputElement>(null)
    const list = useRef<HTMLDivElement>(null)

    const results = useMemo(() => {
        const q = query.trim().toLowerCase()
        if (!q) return SEARCH_ITEMS.filter(i => i.kind === 'Section')
        const words = q.split(/\s+/)
        return SEARCH_ITEMS
            .map(item => {
                const hay = `${item.title} ${item.hint} ${item.kind}`.toLowerCase()
                if (!words.every(w => hay.includes(w))) return null
                const score = (item.title.toLowerCase().startsWith(q) ? 0 : item.title.toLowerCase().includes(q) ? 1 : 2)
                return {item, score}
            })
            .filter((r): r is {item: SearchItem; score: number} => r !== null)
            .sort((a, b) => a.score - b.score)
            .map(r => r.item)
            .slice(0, 12)
    }, [query])

    useEffect(() => { setCursor(0) }, [query])
    useEffect(() => { input.current?.focus() }, [])
    useEffect(() => {
        const previous = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        return () => { document.body.style.overflow = previous }
    }, [])
    useEffect(() => {
        list.current?.querySelector<HTMLElement>('[data-active="true"]')?.scrollIntoView({block: 'nearest'})
    }, [cursor])

    const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Escape') { e.preventDefault(); onClose() }
        else if (e.key === 'ArrowDown') { e.preventDefault(); setCursor(c => Math.min(results.length - 1, c + 1)) }
        else if (e.key === 'ArrowUp') { e.preventDefault(); setCursor(c => Math.max(0, c - 1)) }
        else if (e.key === 'Enter' && results[cursor]) { e.preventDefault(); onPick(results[cursor]) }
    }

    return (
        <div className="mh-search-overlay" role="dialog" aria-modal="true" aria-label="Site search" onClick={onClose} onKeyDown={onKey}>
            <div className="mh-search-panel" onClick={e => e.stopPropagation()}>
                <div className="mh-search-top">
                    <div><span className="mh-kicker">MADE HEALTHCARE RCM</span><h2>Find your way around.</h2></div>
                    <button type="button" className="mh-search-close" onClick={onClose} aria-label="Close search"><X size={20}/></button>
                </div>
                <label className="mh-search-field">
                    <Search size={19}/>
                    <input ref={input} value={query} onChange={e => setQuery(e.target.value)} placeholder="Search services, training, industries…" aria-label="Search the site" role="combobox" aria-expanded="true" aria-controls="mh-search-list" aria-activedescendant={results[cursor] ? `mh-res-${results[cursor].id}` : undefined}/>
                    <kbd>ESC</kbd>
                </label>
                <div className="mh-search-list" id="mh-search-list" role="listbox" ref={list}>
                    {results.length === 0 && <div className="mh-search-empty"><b>No results for “{query}”</b><small>Try “billing”, “denials”, “HIPAA” or “hospital”.</small></div>}
                    {results.map((item, i) => (
                        <button key={item.id} id={`mh-res-${item.id}`} type="button" role="option" aria-selected={i === cursor} data-active={i === cursor} className={i === cursor ? 'on' : ''} onMouseEnter={() => setCursor(i)} onClick={() => onPick(item)}>
                            <span className={`mh-kind k-${item.kind.toLowerCase()}`}>{item.kind}</span>
                            <span className="mh-res-text"><b>{item.title}</b><small>{item.hint}</small></span>
                            {i === cursor ? <CornerDownLeft size={16}/> : <ArrowUpRight size={16}/>}
                        </button>
                    ))}
                </div>
                <div className="mh-search-hint"><span><kbd>↑</kbd><kbd>↓</kbd> to move</span><span><kbd>Enter</kbd> to open</span><span><kbd>Ctrl</kbd>+<kbd>K</kbd> anytime</span></div>
            </div>
        </div>
    )
}

/** logo with a graceful fallback when the image file is missing */
export function Logo({src, alt, className}: {src: string; alt: string; className?: string}) {
    const [ok, setOk] = useState(true)
    if (!ok) return <span className="mh-logo-fallback" role="img" aria-label={alt}>MADE</span>
    return <img className={className} src={src} alt={alt} onError={() => setOk(false)}/>
}

/** Floating WhatsApp button + back-to-top with a progress ring. */
export function FloatingActions({scrollTo}: {scrollTo: (id: string) => void}) {
    const {y, progress} = useScrollState()
    const showTop = y > 700
    const C = 2 * Math.PI * 20
    return (
        <div className="mh-float">
            <button type="button" className={`mh-top${showTop ? ' show' : ''}`} onClick={() => scrollTo('home')} aria-label="Back to top" tabIndex={showTop ? 0 : -1}>
                <svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="20"/><circle className="ring" cx="24" cy="24" r="20" style={{strokeDasharray: C, strokeDashoffset: C * (1 - progress)}}/></svg>
                <ArrowUp size={18}/>
            </button>
            <a className="mh-wa" href={whatsapp} target="_blank" rel="noreferrer" aria-label="Chat with us on WhatsApp">
                <MessageCircle size={24}/><span className="mh-wa-tip">Chat with us</span><i aria-hidden="true"/>
            </a>
        </div>
    )
}

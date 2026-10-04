import {useCallback, useEffect, useMemo, useState} from 'react'

import {Header, FloatingActions, NAV} from './components/Header'
import {Hero, Ticker} from './components/Hero'
import {Services} from './components/Services'
import {Industries} from './components/Industries'
import {Training} from './components/Training'
import {About, Statement} from './components/About'
import {Contact} from './components/Contact'
import {Footer} from './components/Footer'
import {prefersReducedMotion, useActiveSection, type EnquiryPrefill, type FocusRequest} from './components/shared'

/*
 * Optional: put VITE_ENQUIRY_ENDPOINT=https://... (Formspree, Getform, your own API) in a .env file and the
 * contact form will POST each enquiry there. Without it the visitor sends the prepared enquiry by WhatsApp or email.
 */
const enquiryEndpoint: string | undefined = (import.meta as unknown as {env?: Record<string, string | undefined>}).env?.VITE_ENQUIRY_ENDPOINT || undefined

function App() {
    const [searchOpen, setSearchOpen] = useState(false)
    const [prefill, setPrefill] = useState<EnquiryPrefill>({nonce: 0})
    const [focus, setFocus] = useState<FocusRequest | null>(null)
    const [stage, setStage] = useState({key: 'all', nonce: 0})
    const active = useActiveSection(useMemo(() => NAV.map(([id]) => id), []))

    const scrollTo = useCallback((id: string) => {
        document.getElementById(id)?.scrollIntoView({behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start'})
    }, [])

    /** buttons in every section land on the contact form with the topic / message already filled in */
    const enquire = useCallback((topic: string, message: string) => {
        setPrefill(p => ({topic: topic || undefined, message: message || undefined, nonce: p.nonce + 1}))
        scrollTo('contact')
    }, [scrollTo])

    /** the hero's "See these services" button */
    const pickStage = useCallback((key: string) => {
        setStage(s => ({key, nonce: s.nonce + 1}))
        scrollTo('services')
    }, [scrollTo])

    /** search palette targets look like "service:03", "module:05", "industry:02" */
    const openItem = useCallback((target: string) => {
        const [kind, id] = target.split(':')
        const section = kind === 'service' ? 'services' : kind === 'module' ? 'training' : 'industries'
        setFocus(f => ({kind: kind as FocusRequest['kind'], id, nonce: (f?.nonce ?? 0) + 1}))
        scrollTo(section)
    }, [scrollTo])

    // Ctrl/Cmd + K opens search anywhere (same shortcut as before)
    useEffect(() => {
        const onKey = (event: KeyboardEvent) => {
            if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
                event.preventDefault()
                setSearchOpen(true)
            }
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [])

    return (
        <div className="mh-site">
            <a className="mh-skip" href="#main">Skip to content</a>
            <Header active={active} scrollTo={scrollTo} openItem={openItem} searchOpen={searchOpen} setSearchOpen={setSearchOpen}/>

            <main id="main">
                <Hero scrollTo={scrollTo} pickStage={pickStage}/>
                <Ticker/>
                <Services stage={stage} focus={focus} enquire={enquire} scrollTo={scrollTo}/>
                <Industries focus={focus} enquire={enquire}/>
                <Training focus={focus} enquire={enquire}/>
                <About/>
                <Statement scrollTo={scrollTo}/>
                <Contact prefill={prefill} endpoint={enquiryEndpoint}/>
            </main>

            <Footer scrollTo={scrollTo}/>
            <FloatingActions scrollTo={scrollTo}/>
        </div>
    )
}

export default App

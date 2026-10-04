import {ArrowRight, ArrowUp, Mail, MapPin, MessageCircle, Phone} from 'lucide-react'
import {email, officeLines, phonePrimary, whatsapp} from './data'
import {Logo} from './Header'

const LINKS = [['services', 'Services'], ['training', 'Training'], ['industries', 'Industries'], ['about', 'About'], ['contact', 'Contact']] as const
const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(officeLines.join(' '))}`

export function Footer({scrollTo}: {scrollTo: (id: string) => void}) {
    return (
        <footer className="mh-footer">
            <div className="mh-footer-glow" aria-hidden="true"/>
            <div className="mh-wrap mh-footer-cta">
                <div><h3>Ready to strengthen your revenue operations?</h3><p>Tell us what you are working on. We will help you find the right starting point.</p></div>
                <button type="button" className="mh-btn mh-btn-light" onClick={() => scrollTo('contact')}>Get in touch <ArrowRight size={16}/></button>
            </div>
            <div className="mh-wrap mh-footer-main">
                <div className="mh-footer-brand">
                    <a href="#home" onClick={e => { e.preventDefault(); scrollTo('home') }} className="mh-footer-logo"><Logo src="/images/made-healthcare-logo-hd.svg" alt="MADE Healthcare"/></a>
                    <p>Medical billing expertise, revenue-cycle operations, technology, analytics and training for healthcare organizations.</p>
                    <div className="mh-footer-social">
                        <a href={whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle size={18}/></a>
                        <a href={`mailto:${email}`} aria-label="Email"><Mail size={18}/></a>
                        <a href={`tel:${phonePrimary}`} aria-label="Call"><Phone size={18}/></a>
                        <a href={mapsLink} target="_blank" rel="noreferrer" aria-label="Find us on the map"><MapPin size={18}/></a>
                    </div>
                </div>
                <div className="mh-footer-links"><strong>Explore</strong>{LINKS.map(([id, label]) => <button key={id} type="button" onClick={() => scrollTo(id)}>{label}</button>)}</div>
                <div className="mh-footer-links"><strong>Contact</strong><a href={`tel:${phonePrimary}`}>+91 {phonePrimary}</a><a href={`mailto:${email}`}>{email}</a><span className="mh-footer-addr">{officeLines.join(', ')}</span></div>
            </div>
            <div className="mh-wrap mh-footer-bottom">
                <span>© {new Date().getFullYear()} MADE Healthcare. All rights reserved.</span>
                <button type="button" onClick={() => scrollTo('home')}>Back to top <ArrowUp size={14}/></button>
            </div>
        </footer>
    )
}

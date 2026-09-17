import {useEffect, useState} from 'react'
import {
    ArrowRight, ArrowUpRight, BarChart3, BriefcaseBusiness, CheckCircle2, Code2,
    FileCheck2, HeartPulse, Laptop2, Menu, MessageCircle, Phone, Search,
    ShieldCheck, Stethoscope, Target, Users, Workflow, X,
    Building2, Sparkles, House, BrainCircuit,
} from 'lucide-react'

const whatsapp = 'https://wa.me/8667053636?text=Hello%2C%20I%20have%20a%20question'
const phonePrimary = '8098311291'
const phoneSecondary = '9003204951'
const email = 'info@madehealthcare.com'

const services = [
    ['01', 'Medical Billing', 'Accurate billing workflows designed to support cleaner claims, timely reimbursement and stronger revenue visibility.', HeartPulse],
    ['02', 'Medical Coding', 'Coding support, chart review and compliance-focused processes that connect documentation with reimbursement.', Code2],
    ['03', 'Patient Access', 'Registration, eligibility and benefits verification, authorization and front-end revenue-cycle support.', Users],
    ['04', 'Compliance & Audits', 'Structured reviews and compliance-aware workflows designed to identify process gaps and reduce avoidable billing issues.', ShieldCheck],
    ['05', 'Denials & AR', 'Denial analysis, payer follow-up, accounts receivable, appeals and revenue-recovery workflows.', Target],
    ['06', 'Analytics', 'Actionable reporting and operational visibility across claims, payments, denials, collections and revenue performance.', BarChart3],
    ['07', 'Technology Integration', 'Technology-enabled workflows that connect billing, clinical information, operational systems and reporting.', Laptop2],
    ['08', 'Automation', 'Intelligent workflow automation for repetitive processes, prioritization, monitoring and operational efficiency.', Workflow],
] as const

const trainingModules = [
    ['01', 'Fundamentals', 'Build a clear mental model of the US healthcare billing cycle.', HeartPulse],
    ['02', 'ICD-10 & CPT', 'Connect diagnosis and procedure coding concepts to reimbursement workflows.', Code2],
    ['03', 'Claims & Clearinghouses', 'Understand submission, payer processing, edits, rejections and clean-claim thinking.', FileCheck2],
    ['04', 'Denial Management', 'Follow rejection reasons, payer follow-up, corrections, appeals and prevention.', ShieldCheck],
    ['05', 'Accounts Receivable', 'Work with ageing, payer follow-up, outstanding balances, collections and recovery.', Target],
    ['06', 'HIPAA & Compliance', 'Build practical awareness of PHI, privacy, security and responsible billing workflows.', ShieldCheck],
    ['07', 'Medicare & Medicaid', 'Understand major US government payer workflows and reimbursement concepts.', Stethoscope],
    ['08', 'Billing Technology', 'Understand practice-management, clearinghouse and billing platforms in daily operations.', Laptop2],
] as const

const industries = [
    ['01', 'Physician Practices', 'Revenue-cycle support designed around the pace and operating model of physician-led practices.', Stethoscope, 'teal'],
    ['02', 'Specialty Practices', 'Structured billing, coding, denial and analytics workflows for specialized care environments.', Sparkles, 'violet'],
    ['03', 'Hospitals & Health Systems', 'Scalable revenue-cycle processes, operational visibility and workflow support across complex organizations.', Building2, 'blue'],
    ['04', 'Post-Acute & Long-Term Care', 'Revenue-cycle knowledge and process support for organizations managing continuing and long-term care.', House, 'amber'],
    ['05', 'Behavioral Health', 'Compliance-aware workflows that respect the operational complexity of behavioral healthcare billing.', BrainCircuit, 'rose'],
    ['06', 'Growing Healthcare Organizations', 'Flexible people, process and technology support as healthcare organizations expand.', ArrowUpRight, 'indigo'],
] as const

const pillars = [
    ['Expertise', 'Healthcare billing & RCM knowledge', 'Domain understanding that connects front-end operations, claims, payments and recovery.'],
    ['Efficiency', 'Process + technology', 'Practical workflows that use technology and automation to reduce friction and repetitive work.'],
    ['Visibility', 'Analytics + actionable insight', 'Clear operational information that helps teams understand performance and improvement opportunities.'],
] as const

function App() {
    const [menu, setMenu] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)
    const [activeService, setActiveService] = useState<string | null>(null)

    const go = (id: string) => {
        document.getElementById(id)?.scrollIntoView({behavior: 'smooth', block: 'start'})
        setMenu(false)
        setSearchOpen(false)
    }

    useEffect(() => {
        const onKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setMenu(false)
                setSearchOpen(false)
            }
            if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
                event.preventDefault()
                setSearchOpen(true)
                setMenu(false)
            }
        }

        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [])

    return (
        <div className="siteShell">
            <header className="header">
                <div className="wrap headerInner">
                    <a className="brandLockup" href="#home" onClick={() => setMenu(false)}
                       aria-label="MADE Healthcare RCM home">
            <span className="brandLogo">
              <img src="/images/made-healthcare-logo.jpeg" alt="MADE Healthcare — Care. Community. Compassion."/>
            </span>
                        <span className="brandWords">
              <strong>MADE HEALTHCARE RCM</strong>
              <small>Medical Billing · Revenue Cycle Management</small>
            </span>
                    </a>

                    <nav className={menu ? 'nav show' : 'nav'} aria-label="Primary navigation">
                        {['home', 'services', 'industries', 'training', 'about', 'contact'].map((id) => (
                            <button key={id} onClick={() => go(id)}>{id[0].toUpperCase() + id.slice(1)}</button>
                        ))}
                        <button className="searchBtn" onClick={() => {
                            setSearchOpen(true);
                            setMenu(false)
                        }} aria-label="Open site search" title="Search">
                            <Search size={19} strokeWidth={1.8}/>
                        </button>
                    </nav>

                    <button className="menuBtn" onClick={() => setMenu((value) => !value)}
                            aria-label={menu ? 'Close menu' : 'Open menu'} aria-expanded={menu}>
                        {menu ? <X/> : <Menu/>}
                    </button>
                </div>
            </header>

            {searchOpen && (
                <div className="searchOverlay" role="dialog" aria-modal="true" aria-label="Site search"
                     onClick={() => setSearchOpen(false)}>
                    <div className="searchPanel" onClick={(event) => event.stopPropagation()}>
                        <div className="searchPanelTop">
                            <div>
                                <span className="searchKicker">MADE HEALTHCARE RCM</span>
                                <h2>Find your way around.</h2>
                            </div>
                            <button className="searchClose" onClick={() => setSearchOpen(false)}
                                    aria-label="Close search"><X size={20}/></button>
                        </div>
                        <div className="searchField"><Search size={19}/><span>Search sections</span><kbd>ESC</kbd></div>
                        <div className="searchLinks">
                            {[
                                ['Home', 'home', 'Healthcare revenue and operations'],
                                ['Services', 'services', 'Billing, coding, access, analytics and automation'],
                                ['Industries', 'industries', 'Healthcare organizations we support'],
                                ['Training', 'training', 'Medical billing professional development'],
                                ['About', 'about', 'Our approach and operating philosophy'],
                                ['Contact', 'contact', 'Connect with MADE Healthcare'],
                            ].map(([label, id, description]) => (
                                <button key={id} onClick={() => go(id)}>
                                    <span><b>{label}</b><small>{description}</small></span><ArrowUpRight size={17}/>
                                </button>
                            ))}
                        </div>
                        <div className="searchHint">Tip: press <strong>Ctrl + K</strong> anytime to open search.</div>
                    </div>
                </div>
            )}

            <main>
              <section id="home" className="hero heroMedical">
                <div className="heroMedicalGlow heroMedicalGlowOne" />
                <div className="heroMedicalGlow heroMedicalGlowTwo" />
                <div className="heroMedicalGrid" />

                <div className="heroHeartDecor" aria-hidden="true">
                  <div className="heartDecorPulse">
                    <HeartPulse size={31} strokeWidth={1.35} />
                  </div>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

                <div className="heroEcgLine" aria-hidden="true">
                  <HeartPulse size={112} strokeWidth={1.05} />
                </div>

                <div className="heroCurve" aria-hidden="true" />

                <div className="wrap heroMedicalInner">

                  {/* HERO CONTENT */}
                  <div className="heroMedicalCopy reveal">

                    <div className="heroMedicalEyebrow">
                      <span>00</span> MADE HEALTHCARE · RCM
                    </div>

                    <h1>
                      Healthcare revenue.
                      <br />
                      <em>Smarter operations.</em>
                      <br />
                      Better outcomes.
                    </h1>

                    <p className="heroLead">
                      MADE Healthcare combines medical billing expertise, revenue cycle
                      operations, technology and analytics to help healthcare organizations
                      strengthen financial performance while allowing care teams to focus
                      on patients.
                    </p>

                    {/* HERO FACTS */}
                    <div className="heroFacts">

                      <div>
          <span className="factIcon">
            <HeartPulse size={21} strokeWidth={1.8} />
          </span>

                        <span className="factText">
            <strong>RCM</strong>
            <span>Healthcare revenue cycle</span>
          </span>
                      </div>

                      <div>
          <span className="factIcon">
            <Laptop2 size={21} strokeWidth={1.8} />
          </span>

                        <span className="factText">
            <strong>TECH</strong>
            <span>Technology-enabled workflows</span>
          </span>
                      </div>

                      <div>
          <span className="factIcon">
            <Users size={21} strokeWidth={1.8} />
          </span>

                        <span className="factText">
            <strong>PEOPLE</strong>
            <span>Expertise behind every process</span>
          </span>
                      </div>

                    </div>
                  </div>

                  {/* DOCTOR VISUAL */}
                  <div
                      className="heroMedicalVisual reveal delayOne"
                      aria-hidden="true"
                  >
                    <div className="doctorBackdrop">

                      <div className="doctorHalo" />

                      <div className="doctorImageWrap">
                        <img
                            src="/images/hero-doctor-hd.png"
                            alt="Healthcare professional"
                        />
                      </div>

                      <div className="doctorRing doctorRingOne" />
                      <div className="doctorRing doctorRingTwo" />

                    </div>
                  </div>

                </div>
              </section>

                <section id="services" className="servicesSection section">
                    <div className="wrap">
                        <div className="sectionIntro">
                            <div>
                                <span className="sectionIndex">01</span>
                                <div className="eyebrow"><span>SERVICES</span> HEALTHCARE RCM</div>
                                <h2>Complete revenue-cycle<br/><em>support built around your workflow.</em></h2>
                            </div>
                            <div className="introNote"><strong>People + process + technology</strong><p>We bring
                                together billing expertise, operational discipline, analytics and technology to support
                                the financial side of healthcare delivery.</p></div>
                        </div>

                        <div className="gridFrame servicesFrame">
                            <div className="serviceGrid">
                                {services.map(([number, title, text, Icon]) => (
                                    <article key={number}
                                             className={`serviceCard ${activeService === number ? 'selected' : ''}`}
                                             onMouseEnter={() => setActiveService(number)}
                                             onMouseLeave={() => setActiveService(null)}>
                                        <div className="cardTop"><span>{number}</span><Icon size={22}
                                                                                            strokeWidth={1.7}/></div>
                                        <h3>{title}</h3><p>{text}</p>
                                        <div className="cardArrow"><ArrowUpRight size={17}/></div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section id="industries" className="industriesSection section">
                    <div className="wrap">
                        <div className="sectionIntro">
                            <div><span className="sectionIndex">02</span>
                                <div className="eyebrow"><span>INDUSTRIES</span> HEALTHCARE ORGANIZATIONS</div>
                                <h2>Support that adapts<br/><em>to the way healthcare works.</em></h2></div>
                            <div className="introNote"><strong>Operational context matters</strong><p>Revenue-cycle
                                workflows differ by care environment. Our approach starts with the organization's
                                operating model and priorities.</p></div>
                        </div>
                        <div className="industryGrid">
                            {industries.map(([number, title, text, Icon, tone]) => (
                                <article className={`industryCard industry-${tone}`} key={number}>
                                    <div className="industryNumber">{number}</div>
                                    <div className="industryIcon"><Icon size={20} strokeWidth={1.7}/></div>
                                    <div className="industryContent"><h3>{title}</h3><p>{text}</p></div>
                                    <ArrowUpRight className="industryArrow" size={17}/>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

<section id="training" className="trainingSection section">
                    <div className="wrap">
                        <div className="sectionIntro trainingIntro">
                            <div>
                                <span className="sectionIndex">03</span>
                                <div className="eyebrow light"><span>TRAINING</span> PROFESSIONAL DEVELOPMENT</div>
                                <h2>Medical billing knowledge<br/><em>that connects to real workflows.</em></h2>
                            </div>
                            <div className="introNote lightNote"><strong>Structured learning</strong><p>Build practical
                                knowledge from billing fundamentals through claims, denials, AR, compliance and billing
                                technology.</p></div>
                        </div>

                        <div className="trainingLayout">
                            <div className="trainingModules gridFrameDark">
                                {trainingModules.map(([number, title, text, Icon]) => (
                                    <article className="trainingCard" key={number}>
                                        <span className="moduleNumber">{number}</span>
                                        <div className="moduleIcon"><Icon size={20}/></div>
                                        <div><h3>{title}</h3><p>{text}</p></div>
                                    </article>
                                ))}
                            </div>

                            <aside className="trainingAside">
                                <div className="asideEyebrow">LEARNER FIT</div>
                                <h3>A clear professional foundation for the healthcare billing industry.</h3>
                                {['Fresh Graduates', 'Career Changers', 'International Learners', 'Junior Billers'].map((item) => (
                                    <div className="checkItem" key={item}><CheckCircle2 size={18}/> <span>{item}</span>
                                    </div>
                                ))}
                                <button className="textBtn" onClick={() => go('contact')}>Talk about
                                    training <ArrowRight size={16}/></button>
                            </aside>
                        </div>
                    </div>
                </section>

                <section id="about" className="aboutSection section">
                    <div className="wrap aboutGrid">
                        <div className="aboutVisual">
                            <div className="aboutBadge"><span>MADE</span><b>HEALTHCARE</b><small>RCM · TRAINING ·
                                TECHNOLOGY</small></div>
                            <div className="aboutQuote">Healthcare expertise<br/><em>with an operational mindset.</em>
                            </div>
                        </div>
                        <div className="aboutCopy"><span className="sectionIndex">04</span>
                            <div className="eyebrow"><span>ABOUT</span> OUR APPROACH</div>
                            <h2>Healthcare expertise with an <em>operational mindset.</em></h2><p>MADE Healthcare RCM is
                                focused on the connection between healthcare operations, revenue cycle performance and
                                professional development.</p><p>Our approach brings together medical billing knowledge,
                                revenue-cycle workflows, technology, analytics and continuous process improvement.</p>
                            <div className="pillarGrid">{pillars.map(([title, subtitle, text]) => <div
                                className="pillar" key={title}><small>{title}</small><strong>{subtitle}</strong>
                                <p>{text}</p></div>)}</div>
                        </div>
                    </div>
                </section>

                <section className="statementSection">
                    <div className="wrap statementInner">
                        <div className="statementMark"><BriefcaseBusiness size={24}/></div>
                        <p>Better revenue operations are built through <em>knowledge, discipline, visibility and
                            technology.</em></p>
                        <button className="textBtn darkBtn" onClick={() => go('contact')}>Start a
                            conversation <ArrowRight size={16}/></button>
                    </div>
                </section>

                <section id="contact" className="contactSection section">
                    <div className="wrap contactGrid">
                        <div className="contactCopy"><span className="sectionIndex">05</span>
                            <div className="eyebrow light"><span>CONTACT</span> MADE HEALTHCARE</div>
                            <h2>Let's build a better<br/><em>healthcare operation.</em></h2><p>Tell us what you are
                                working on. We can connect around healthcare revenue-cycle operations, training,
                                technology or general enquiries.</p>
                            <div className="contactDetails">
                                <div>
                                    <small>OFFICE</small>
                                    <strong>
                                        No. 5/246,<br/> Thiruvallur - Redhills High Road,<br/>
                                        Rajiv Gandhinagar,<br/> Chennai, Tamil Nadu — 600052
                                    </strong>
                                </div>

                                <div>
                                    <small>CONTACT</small>

                                    <a href={`tel:${phonePrimary}`}>
                                        +91 {phonePrimary}
                                    </a>

                                    <a href={`tel:${phoneSecondary}`}>
                                        +91 {phoneSecondary}
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="contactActions"><a className="contactAction whatsappAction" href={whatsapp}
                                                           target="_blank" rel="noreferrer"><span><MessageCircle
                            size={19}/></span><b><small>WHATSAPP</small>Chat with us</b><ArrowUpRight size={17}/></a><a
                            className="contactAction callAction"
                            href={`tel:${phonePrimary}`}
                        >
    <span>
        <Phone size={19}/>
    </span>

                            <b>
                                <small>CALL US</small>
                                <span>+91 {phonePrimary}</span>
                                <span>+91 {phoneSecondary}</span>
                            </b>

                            <ArrowUpRight size={17}/>
                        </a><a
                            className="emailAction" href={`mailto:${email}`}>{email}<ArrowUpRight size={16}/></a></div>
                    </div>
                </section>
            </main>

            <footer className="footer">
                <div className="wrap footerInner"><a href="#home" className="footerBrand"
                                                     onClick={() => setMenu(false)}><img
                    src="/images/made-healthcare-logo-hd.svg" alt="MADE Healthcare"/></a>
                    <div className="footerLinks">
                        <button onClick={() => go('services')}>Services</button>
                        <button onClick={() => go('training')}>Training</button>
                        <button onClick={() => go('industries')}>Industries</button>
                        <button onClick={() => go('about')}>About</button>
                        <button onClick={() => go('contact')}>Contact</button>
                    </div>
                    <span
                        className="copyright">© {new Date().getFullYear()} MADE Healthcare. All rights reserved.</span>
                </div>
            </footer>
        </div>
    )
}

export default App

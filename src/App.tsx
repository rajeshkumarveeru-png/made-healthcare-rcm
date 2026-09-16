import { useState } from 'react'
import {
  ArrowUpRight,
  BookOpen,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  Code2,
  FileCheck2,
  GraduationCap,
  HeartPulse,
  Laptop2,
  Menu,
  MessageCircle,
  Phone,
  ShieldCheck,
  Stethoscope,
  Target,
  Users,
  X,
  type LucideIcon,
} from 'lucide-react'
import { company } from './config/company'
import './styles.css'

const calendly = 'https://calendly.com/mbgenius1111/free-30-minute-billing-audit'
const whatsapp = 'https://wa.me/923014490726?text=Hello%2C%20I%20have%20a%20question'

type Module = {
  number: string
  title: string
  description: string
  icon: LucideIcon
}

const iconMap: Record<string, LucideIcon> = {
  'heart-pulse': HeartPulse,
  code: Code2,
  'file-check': FileCheck2,
  target: Target,
  shield: ShieldCheck,
  laptop: Laptop2,
  stethoscope: Stethoscope,
}

const baseModules: Module[] = company.services.map((item, index) => ({
  number: String(index + 1).padStart(2, '0'),
  title: item.title,
  description: item.description,
  icon: iconMap[item.icon] ?? HeartPulse,
}))

const extraModules: Module[] = [
  {
    number: '07',
    title: 'Medicare & Medicaid',
    description: 'Understand the role of major US government healthcare programmes within billing and reimbursement workflows.',
    icon: Stethoscope,
  },
  {
    number: '08',
    title: 'Revenue Cycle Workflow',
    description: 'Connect patient registration, coding, claims, payments, denials and follow-up into one complete revenue-cycle view.',
    icon: BriefcaseBusiness,
  },
]

const modules = [...baseModules, ...extraModules].slice(0, 8)

const learners = [
  ['Fresh Graduates', 'Build a practical foundation before entering your first billing role.', GraduationCap],
  ['Career Changers', 'Move into healthcare revenue-cycle work with a clear learning sequence.', ArrowUpRight],
  ['International Learners', 'Study US medical billing online from wherever you are.', Users],
  ['Junior Billers', 'Deepen your knowledge of claims, denials, AR and compliance.', BriefcaseBusiness],
] as const

const journey = [
  ['01', 'Explore', 'Start with the free introduction and understand the US billing environment.'],
  ['02', 'Learn', 'Build knowledge across the core curriculum at your own pace.'],
  ['03', 'Validate', 'Review your learning and complete the programme assessment.'],
  ['04', 'Prepare', 'Use practical career resources as you prepare for opportunities.'],
  ['05', 'Progress', 'Continue into advanced topics as your experience develops.'],
]

const principles = [
  ['01', 'Workflow first', 'Concepts are connected to the sequence of work rather than presented as isolated terminology.'],
  ['02', 'US-focused', 'The programme is designed around the language, processes and ecosystem of US medical billing.'],
  ['03', 'Built for beginners', 'The structure starts from fundamentals and gradually adds professional context.'],
  ['04', 'Flexible access', 'Online, self-paced learning gives students flexibility across locations and schedules.'],
]

export default function App() {
  const [menu, setMenu] = useState(false)
  const [active, setActive] = useState('01')

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMenu(false)
  }

  return (
    <div
      className="mbc"
      style={{
        '--ink': '#0b1720',
        '--paper': '#f4f1e9',
        '--white': '#ffffff',
        '--teal': company.theme.primary,
        '--mint': company.theme.accent,
      } as React.CSSProperties}
    >
      <header className="header">
        <div className="wrap headerInner">
          <button className="brand" onClick={() => go('home')} aria-label="Go home">
            <span className="brandMark"><HeartPulse size={20} /></span>
            <span>
              <strong>{company.name}</strong>
              <small>Medical Billing Consultancy</small>
            </span>
          </button>

          <nav className={menu ? 'navLinks show' : 'navLinks'}>
            <button onClick={() => go('curriculum')}>Programme</button>
            <button onClick={() => go('learners')}>Learners</button>
            <button onClick={() => go('path')}>Learning Path</button>
            <button onClick={() => go('contact')}>Contact</button>
            <a href={calendly} target="_blank" rel="noreferrer">Book Free Audit <ArrowUpRight size={15} /></a>
          </nav>

          <button className="menuButton" onClick={() => setMenu(!menu)} aria-label="Toggle navigation">
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="heroNoise" />
          <div className="wrap heroInner">
            <div className="heroTopline">
              <span>MEDICAL BILLING EDUCATION</span>
              <span>01 — 08</span>
            </div>

            <div className="heroGrid">
              <div className="heroCopy">
                <p className="eyebrow">A PRACTICAL START TO US MEDICAL BILLING</p>
                <h1>
                  Build the skillset
                  <span>behind the claim.</span>
                </h1>
                <p className="heroText">
                  {company.heroText}
                </p>

                <div className="heroActions">
                  <a className="button buttonPrimary" href={calendly} target="_blank" rel="noreferrer">
                    Book a free 30-min audit <ArrowUpRight size={17} />
                  </a>
                  <button className="textButton" onClick={() => go('curriculum')}>
                    View programme <ChevronRight size={17} />
                  </button>
                </div>

                <div className="heroMeta">
                  <div><span>FORMAT</span><b>ONLINE · SELF-PACED</b></div>
                  <div><span>ACCESS</span><b>GLOBAL</b></div>
                  <div><span>ENTRY</span><b>BEGINNER FRIENDLY</b></div>
                </div>
              </div>

              <div className="heroCard">
                <div className="cardLabel">PROGRAMME / 2026</div>
                <div className="cardOrb"><HeartPulse size={54} strokeWidth={1.4} /></div>
                <div className="cardBottom">
                  <span>FROM ZERO</span>
                  <strong>TO PROFESSIONAL CONTEXT</strong>
                  <p>Billing · Coding · Claims · Denials · AR · Compliance</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="ticker">
          <div className="tickerTrack">
            <span>US MEDICAL BILLING</span><i>✦</i><span>CLAIMS</span><i>✦</i>
            <span>DENIALS</span><i>✦</i><span>AR MANAGEMENT</span><i>✦</i>
            <span>HIPAA</span><i>✦</i><span>CODING</span><i>✦</i>
            <span>US MEDICAL BILLING</span>
          </div>
        </section>

        <section id="curriculum" className="section programme">
          <div className="wrap">
            <div className="sectionIntro">
              <div>
                <p className="eyebrow">01 / THE PROGRAMME</p>
                <h2>Eight focused modules.<br /><em>One connected workflow.</em></h2>
              </div>
              <p className="introCopy">
                A structured route through the fundamentals of US medical billing, designed to make the relationship between coding, claims, reimbursement and follow-up easier to understand.
              </p>
            </div>

            <div className="moduleLayout">
              <div className="moduleIndex">
                <span>CURRICULUM</span>
                <strong>08</strong>
                <small>CORE MODULES</small>
              </div>

              <div className="moduleList">
                {modules.map(({ number, title, description, icon: Icon }) => (
                  <button
                    className={active === number ? 'moduleRow active' : 'moduleRow'}
                    key={number}
                    onClick={() => setActive(number)}
                  >
                    <span className="moduleNo">{number}</span>
                    <span className="moduleIcon"><Icon size={19} /></span>
                    <span className="moduleText">
                      <strong>{title}</strong>
                      <small>{description}</small>
                    </span>
                    <ChevronRight className="moduleArrow" size={19} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="manifesto">
          <div className="wrap manifestoGrid">
            <p className="eyebrow">THE {company.name} APPROACH</p>
            <h2>Less memorisation.<br /><span>More understanding.</span></h2>
            <p>
              The goal is not simply to collect terminology. It is to understand how a medical billing workflow moves from patient information and coding to claim submission, payer response, payment and follow-up.
            </p>
          </div>
        </section>

        <section id="learners" className="section">
          <div className="wrap">
            <div className="sectionIntro">
              <div>
                <p className="eyebrow">02 / WHO IT'S FOR</p>
                <h2>A programme for<br /><em>the next step.</em></h2>
              </div>
              <p className="introCopy">Whether you are entering the field, changing direction, learning internationally or strengthening existing knowledge.</p>
            </div>

            <div className="learnerGrid">
              {learners.map(([title, description, Icon], index) => (
                <article className="learnerCard" key={title}>
                  <div className="learnerTop"><span>0{index + 1}</span><Icon size={22} /></div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <span className="cardLine" />
                </article>
              ))}
            </div>

            <div className="globalBand">
              <span className="globalGlobe">◎</span>
              <div><small>GLOBAL ACCESS</small><strong>Learn US medical billing from South Asia, Southeast Asia, Africa, Latin America, the UK, Canada and the United States.</strong></div>
              <ArrowUpRight size={22} />
            </div>
          </div>
        </section>

        <section className="darkSection">
          <div className="wrap">
            <div className="darkHeader">
              <div>
                <p className="eyebrow light">03 / WHY THE STRUCTURE MATTERS</p>
                <h2>Professional context<br /><em>from the beginning.</em></h2>
              </div>
              <p>Clear sequencing helps learners see how individual billing tasks connect to the wider revenue cycle.</p>
            </div>

            <div className="principleGrid">
              {principles.map(([no, title, description]) => (
                <article key={no}>
                  <span>{no}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="path" className="section pathSection">
          <div className="wrap">
            <div className="sectionIntro">
              <div>
                <p className="eyebrow">04 / YOUR LEARNING PATH</p>
                <h2>Five stages.<br /><em>Clear progression.</em></h2>
              </div>
              <p className="introCopy">Move from introduction to core learning, assessment, career preparation and continued development.</p>
            </div>

            <div className="journey">
              {journey.map(([no, title, description]) => (
                <article key={no} className="journeyRow">
                  <span className="journeyNo">{no}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <ArrowUpRight size={19} />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="contactSection">
          <div className="wrap contactGrid">
            <div>
              <p className="eyebrow light">05 / START HERE</p>

              <h2>
                Ready to build
                <br />
                <em>your foundation?</em>
              </h2>

              <p>
                Explore the programme, ask your questions and discover a structured
                way to learn practical US medical billing online.
              </p>

              <div className="contactDetails">
                <div className="contactDetail">
                  <span>OFFICE</span>
                  <strong>
                    No. 5/246, Thiruvallur - Redhills High Road,
                    <br />
                    Rajiv Gandhinagar, Chennai - 52
                  </strong>
                </div>

                <div className="contactDetail">
                  <span>CONTACT</span>
                  <a href="tel:8098311291">
                    8098311291
                  </a>
                </div>
              </div>
            </div>

            <div className="contactActions">
              <a
                  className="button lightButton"
                  href={calendly}
                  target="_blank"
                  rel="noreferrer"
              >
                Book Free 30-Min Audit
                <ArrowUpRight size={17} />
              </a>
              <a
                  className="contactLink whatsappLink"
                  href={whatsapp}
                  target="_blank"
                  rel="noreferrer"
              >
  <span className="contactIcon">
    <MessageCircle size={18} />
  </span>
                <span>
    <small>WHATSAPP</small>
    <strong>Chat with us</strong>
  </span>
                <ArrowUpRight size={16} />
              </a>

              <a
                  className="contactLink callLink"
                  href="tel:8098311291"
              >
  <span className="contactIcon">
    <Phone size={18} />
  </span>
                <span>
    <small>CALL US</small>
    <strong>8098311291</strong>
  </span>
                <ArrowUpRight size={16} />
              </a>

              <a
                  className="contactEmail"
                  href={`mailto:${company.email}`}
              >
                {company.email}
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap footerTop">
          <div><strong>{company.name}</strong></div>
          <div className="footerTags"><span>ICD-10</span><span>CPT</span><span>HIPAA</span><span>CLAIMS</span><span>AR</span><span>DENIALS</span><span>MEDICARE</span></div>
        </div>
        <div className="wrap footerBottom"><span>© {new Date().getFullYear()} {company.name}</span><span>{company.email} · Global Online Training Programme</span></div>
      </footer>
    </div>
  )
}

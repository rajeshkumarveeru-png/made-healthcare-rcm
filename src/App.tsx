import { useState } from 'react'
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronDown,
  Code2,
  FileCheck2,
  GraduationCap,
  HeartPulse,
  Laptop2,
  Menu,
  MessageCircle,
  ShieldCheck,
  Stethoscope,
  Target,
  Users,
  X,
  Zap,
  type LucideIcon,
} from 'lucide-react'

import { company } from './config/company'
import './styles.css'

const calendly =
  'https://calendly.com/mbgenius1111/free-30-minute-billing-audit'

const whatsapp =
  'https://wa.me/923014490726?text=Hello%2C%20I%20have%20a%20question'

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

const modules: Module[] = company.services.slice(0, 8).map((item, index) => ({
  number: String(index + 1).padStart(2, '0'),
  title: item.title,
  description: item.description,
  icon: iconMap[item.icon] ?? HeartPulse,
}))

const learners = [
  [
    'Fresh Graduates',
    'Start with the fundamentals and build practical knowledge you can demonstrate when applying for entry-level billing roles.',
    GraduationCap,
  ],
  [
    'Career Changers',
    'Move into healthcare revenue-cycle work with a structured learning path designed for people coming from another field.',
    ArrowRight,
  ],
  [
    'International Learners',
    'Learn US medical billing online from anywhere and build familiarity with workflows used by US healthcare organizations.',
    Users,
  ],
  [
    'Junior Billers',
    'Strengthen your existing knowledge with deeper exposure to claims, denials, AR, compliance and billing workflows.',
    BriefcaseBusiness,
  ],
] as const

const journey = [
  [
    '01',
    'Start with the Free Introduction',
    'Begin with clear, beginner-friendly lessons that introduce the healthcare billing environment.',
    'FREE · ONLINE',
  ],
  [
    '02',
    'Complete the Core Curriculum',
    'Work through the core modules covering billing, coding, claims, denials, AR, compliance and tools.',
    'SELF-PACED · ONLINE',
  ],
  [
    '03',
    'Complete the Assessment',
    'Review what you have learned and complete the assessment associated with the training programme.',
    'ASSESSMENT · CERTIFICATE',
  ],
  [
    '04',
    'Prepare for Opportunities',
    'Use practical guidance, CV support and job-application resources as you prepare for billing opportunities.',
    'CAREER SUPPORT',
  ],
  [
    '05',
    'Continue Building Your Skills',
    'Move into advanced learning areas as your experience grows and your career goals become clearer.',
    'ADVANCED LEARNING',
  ],
]

const problems = [
  [
    '01',
    'Experience requirements',
    'Entry-level candidates often find that job descriptions ask for experience before they have had the opportunity to build it.',
  ],
  [
    '02',
    'Theory without workflow',
    'Knowing terminology is different from understanding how claims, denials, EOBs and AR activities fit together.',
  ],
  [
    '03',
    'Unclear career path',
    'People entering a new field need a structured sequence that shows what to learn first and what to build next.',
  ],
  [
    '04',
    'Limited access',
    'US medical billing knowledge can be difficult to access for learners who are studying outside the United States.',
  ],
]

export default function App() {
  const [menu, setMenu] = useState(false)
  const [open, setOpen] = useState<string | null>(null)

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
    setMenu(false)
  }

  return (
    <div
      className="mbc"
      style={
        {
          '--primary': company.theme.primary,
          '--dark': company.theme.dark,
          '--accent': company.theme.accent,
        } as React.CSSProperties
      }
    >
      <header className="site-header">
        <div className="wrap nav">
          <button className="logo" onClick={() => go('home')} aria-label="Go to home">
            <span className="logoMark">
              <HeartPulse size={19} />
            </span>

            <span className="logoText">
              <b>{company.name}</b>
              <small>Medical Billing Consultancy</small>
            </span>
          </button>

          <nav className={menu ? 'links open' : 'links'}>
            <button onClick={() => go('curriculum')}>Curriculum</button>
            <button onClick={() => go('learners')}>Who It’s For</button>
            <button onClick={() => go('path')}>Your Path</button>
            <button onClick={() => go('contact')}>Contact</button>

            <a href={calendly} target="_blank" rel="noreferrer">
              Book Free Audit
              <ArrowRight size={14} />
            </a>
          </nav>

          <button
            className="menu"
            onClick={() => setMenu(!menu)}
            aria-label="Toggle menu"
            aria-expanded={menu}
          >
            {menu ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="heroGlow" />

          <div className="wrap heroGrid">
            <div className="heroCopy">
              <div className="kicker">GLOBAL ENROLMENT · ONLINE · SELF-PACED</div>

              <h1>
                {company.heroTitle.split('. ')[0]}.
                <em>{company.heroTitle.split('. ').slice(1).join('. ')}</em>
              </h1>

              <p className="heroLead">{company.heroText}</p>

              <div className="actions">
                <a
                  className="btn primary"
                  href={calendly}
                  target="_blank"
                  rel="noreferrer"
                >
                  Book Free 30-Min Audit
                  <ArrowRight size={16} />
                </a>

                <button className="btn secondary" onClick={() => go('curriculum')}>
                  Explore Curriculum
                  <BookOpen size={16} />
                </button>
              </div>

              <div className="globalAccess">
                <span className="globalIcon">🌍</span>
                <div>
                  <strong>GLOBAL ACCESS</strong>
                  <p>
                    Learners welcome from India, Pakistan, the Philippines,
                    South Africa, Latin America, the United States, United
                    Kingdom and Canada.
                  </p>
                </div>
              </div>
            </div>

            <div className="panel">
              <div className="panelTop">
                <span>GLOBAL TRAINING PROGRAMME</span>
                <b className="live">● OPEN</b>
              </div>

              <div className="ring">
                <div className="ringIn">
                  <GraduationCap size={30} />
                  <strong>0 → PRO</strong>
                  <span>US BILLING STANDARD</span>
                </div>
              </div>

              <div className="stats">
                {company.stats.map((stat) => (
                  <div key={stat.label}>
                    <b>{stat.value}</b>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>

              <div className="note">
                <CheckCircle2 size={15} />
                Free starter learning · Start without commitment
              </div>
            </div>
          </div>
        </section>

        <div className="strip">
          <div className="wrap stripIn">
            <span><Zap size={14} /> PRACTICAL</span>
            <span><ShieldCheck size={14} /> COMPLIANCE</span>
            <span><BriefcaseBusiness size={14} /> CAREER FOCUSED</span>
            <span><Users size={14} /> GLOBAL COMMUNITY</span>
          </div>
        </div>

        <section id="curriculum" className="section">
          <div className="wrap">
            <div className="head">
              <div>
                <span className="label">THE CURRICULUM</span>
                <h2>
                  {company.services.length} modules.
                  <br />
                  <em>One structured path.</em>
                </h2>
              </div>

              <p>{company.aboutText}</p>
            </div>

            <div className="modules">
              {modules.map(({ number, title, description, icon: Icon }) => (
                <article
                  className={open === number ? 'module open' : 'module'}
                  key={number}
                  onClick={() => setOpen(open === number ? null : number)}
                >
                  <span className="num">{number}</span>

                  <span className="icon">
                    <Icon size={19} />
                  </span>

                  <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>

                  <ChevronDown className="moduleChevron" size={18} />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="problem">
          <div className="wrap problemGrid">
            <div className="problemIntro">
              <span className="label light">THE PROBLEM WE SOLVE</span>
              <h2>
                Learn what the job actually
                <em>looks like.</em>
              </h2>
              <p>
                Medical billing can look complicated when it is presented as
                disconnected terminology. A structured learning path helps
                connect the concepts, workflows and practical activities.
              </p>
            </div>

            <div className="cards">
              {problems.map(([number, title, description]) => (
                <article key={number}>
                  <span>{number}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="learners" className="section">
          <div className="wrap">
            <div className="head center">
              <span className="label">WHO IT’S FOR</span>

              <h2>
                Training built around
                <br />
                <em>your next step.</em>
              </h2>

              <p>
                Whether you are starting from zero, changing careers,
                learning internationally or already working in billing.
              </p>
            </div>

            <div className="learnerGrid">
              {learners.map(([title, description, Icon]) => (
                <article className="learner" key={title}>
                  <div className="learnerIcon">
                    <Icon />
                  </div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>

            <div className="country">
              <span className="countryIcon">🌍</span>
              <div>
                <b>GLOBAL ENROLMENT</b>
                <p>
                  Online learning for students and professionals across
                  South Asia, Southeast Asia, Africa, Latin America, the UK,
                  Canada and the United States.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section why">
          <div className="wrap problemGrid">
            <div>
              <span className="label">WHY CHOOSE {company.name}</span>

              <h2>
                Practical learning.
                <br />
                <em>Professional context.</em>
              </h2>

              <p className="whyIntro">{company.aboutText}</p>
            </div>

            <div className="checkList">
              {company.reasons.map((reason, index) => (
                <div className="check" key={reason.title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <CheckCircle2 size={18} />
                  <div>
                    <p className="reasonTitle">{reason.title}</p>
                    <p>{reason.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="path" className="path">
          <div className="wrap">
            <div className="head">
              <div>
                <span className="label light">YOUR LEARNING JOURNEY</span>

                <h2>
                  From first lesson to
                  <br />
                  <em>career preparation.</em>
                </h2>
              </div>

              <p>
                Follow a clear five-stage path from introductory learning to
                core billing knowledge, assessment, career preparation and
                continued development.
              </p>
            </div>

            <div className="timeline">
              {journey.map(([number, title, description, tag]) => (
                <article className="step" key={number}>
                  <div className="dot">{number}</div>

                  <div>
                    <span>{tag}</span>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>

                  <ArrowRight size={18} />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="cta">
          <div className="wrap ctaGrid">
            <div>
              <span className="label light">START YOUR JOURNEY</span>

              <h2>
                No previous billing experience.
                <br />
                <em>Just a willingness to learn.</em>
              </h2>

              <p>
                Explore the programme, ask your questions and discover a
                structured way to build practical medical billing knowledge
                online.
              </p>
            </div>

            <div className="ctaActions">
              <a
                className="btn primary"
                href={calendly}
                target="_blank"
                rel="noreferrer"
              >
                Book a Free 30-Min Audit
                <ArrowRight size={16} />
              </a>

              <a
                className="whatsapp"
                href={whatsapp}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle size={18} />
                WhatsApp Us
              </a>

              <a className="email" href={`mailto:${company.email}`}>
                {company.email}
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap footTop">
          <div>
            <b>{company.name}</b>
            <p>{company.tagline}</p>
          </div>

          <div className="tags">
            <span>ICD-10</span>
            <span>CPT</span>
            <span>HIPAA</span>
            <span>Claims</span>
            <span>AR Management</span>
            <span>Denial Management</span>
            <span>Medicare</span>
          </div>
        </div>

        <div className="wrap footBottom">
          <span>© {new Date().getFullYear()} {company.name}</span>
          <span>{company.address} · {company.email}</span>
        </div>
      </footer>
    </div>
  )
}

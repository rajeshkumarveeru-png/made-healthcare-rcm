import { useState } from 'react'
import {
  ArrowRight, ArrowUpRight, BarChart3, BriefcaseBusiness, CheckCircle2, ChevronRight,
  Code2, FileCheck2, HeartPulse, Laptop2, Menu, MessageCircle, Phone, ShieldCheck,
  Sparkles, Stethoscope, Target, Users, Workflow, X
} from 'lucide-react'
import './styles.css'

const calendly = 'https://calendly.com/mbgenius1111/free-30-minute-billing-audit'
const whatsapp = 'https://wa.me/923014490726?text=Hello%2C%20I%20have%20a%20question'

type Tab = 'training' | 'industry'

const trainingModules = [
  ['01', 'How Healthcare Billing Works', 'Understand providers, payers, patients, billers and the flow of a US healthcare claim.', HeartPulse],
  ['02', 'ICD-10 & CPT', 'Learn diagnosis and procedure coding concepts and how coding supports clean claims.', Code2],
  ['03', 'Claims & Clearinghouses', 'Follow the claim journey from charge entry and CMS-1500 concepts through electronic submission.', FileCheck2],
  ['04', 'Denial Management', 'Understand rejection reasons, EOBs, payer follow-up, corrections, appeals and prevention.', ShieldCheck],
  ['05', 'Accounts Receivable', 'Work with ageing, payer follow-up, outstanding balances, collections and revenue recovery.', Target],
  ['06', 'HIPAA & Compliance', 'Build practical awareness of PHI, privacy, security, compliance and responsible billing workflows.', ShieldCheck],
  ['07', 'Medicare & Medicaid', 'Understand major US government payer workflows and reimbursement concepts.', Stethoscope],
  ['08', 'Billing Technology', 'Understand the role of practice-management, clearinghouse and billing platforms in daily operations.', Laptop2],
] as const

const trainingExtras = [
  ['01', 'Fundamentals', 'Build the vocabulary and workflow map before touching complex billing tasks.'],
  ['02', 'Coding', 'Connect ICD-10 diagnosis coding and CPT procedure coding to reimbursement workflows.'],
  ['03', 'Claims', 'Understand submission, payer processing, edits, rejections and clean-claim thinking.'],
  ['04', 'Revenue Recovery', 'Connect denials, A/R follow-up, payment posting and collections into one picture.'],
]

const industryStages = [
  ['01', 'Patient Access', 'Scheduling and registration, insurance eligibility and benefits verification, and prior authorization.', Users],
  ['02', 'Mid-Revenue Cycle', 'Charge capture and audit, medical records coding, clinical documentation improvement, chart audit and HCC coding review.', Code2],
  ['03', 'Business Office', 'Claims and billing, payment posting and reconciliation, A/R and collections, denials and appeals, and underpayment recovery.', BriefcaseBusiness],
  ['04', 'Analytics', 'Measure business-office performance, benchmark results, identify patterns and turn data into improvement opportunities.', BarChart3],
] as const

const industryTechnology = [
  ['01', 'ConnectIQ', 'Patient Access', 'Scheduling & registration, eligibility and benefits verification, and prior authorization.'],
  ['02', 'CodifyIQ', 'Mid-Revenue Cycle', 'Medical records coding, clinical documentation improvement, chart audit, charge capture and HCC coding review.'],
  ['03', 'CollectIQ', 'Business Office', 'Claims management, payment posting, A/R, collections, denials, appeals and underpayment recovery.'],
  ['04', 'InsightIQ', 'Analytics', 'Decision support, operational visibility, benchmarking and actionable revenue-cycle intelligence.'],
]

const automation = [
  ['AI + ML', 'Predictive signals can help identify denial risk, prioritize work and surface opportunities earlier.'],
  ['Workflow', 'Automation and workflow orchestration connect insight to the people and processes that execute the work.'],
  ['RPA + Bots', 'Repetitive administrative tasks can be automated so teams can spend more time on exceptions and higher-value work.'],
  ['Human + Technology', 'The operating model combines domain expertise with technology rather than treating automation as a replacement for people.'],
]

const learnerFit = ['Fresh Graduates', 'Career Changers', 'International Learners', 'Junior Billers']
const journey = [
  ['01', 'Start with the fundamentals', 'Build a clear mental model of the US medical billing cycle.'],
  ['02', 'Move into coding and claims', 'Understand how documentation, coding and claim submission connect.'],
  ['03', 'Learn denials and A/R', 'Follow the revenue after the claim and understand recovery workflows.'],
  ['04', 'Build compliance awareness', 'Understand privacy, payer rules and responsible handling of healthcare information.'],
  ['05', 'Prepare for the workplace', 'Turn the learning into practical workflow knowledge and a stronger professional foundation.'],
]

export default function App() {
  const [menu, setMenu] = useState(false)
  const [tab, setTab] = useState<Tab>('training')
  const [activeTraining, setActiveTraining] = useState('01')

  const switchTab = (next: Tab) => {
    setTab(next)
    setMenu(false)
    window.setTimeout(() => document.getElementById('workspace')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 20)
  }

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenu(false)
  }

  return (
    <div className="site">
      <header className="header">
        <div className="wrap headerInner">
          <button className="brand" onClick={() => go('home')}>
            <span className="brandIcon"><HeartPulse size={21} /></span>
            <span><strong>MADE HEALTHCARE RCM</strong><small>Medical Billing · RCM · Professional Path</small></span>
          </button>
          <nav className={menu ? 'nav show' : 'nav'}>
            <button className={tab === 'training' ? 'navActive' : ''} onClick={() => switchTab('training')}>Training</button>
            <button className={tab === 'industry' ? 'navActive' : ''} onClick={() => switchTab('industry')}>Industry</button>
            <button onClick={() => go('contact')}>Contact</button>
            <a href={calendly} target="_blank" rel="noreferrer">Book Free Audit <ArrowUpRight size={15} /></a>
          </nav>
          <button className="menuBtn" onClick={() => setMenu(!menu)} aria-label="Open menu">{menu ? <X /> : <Menu />}</button>
        </div>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="heroGrid wrap">
            <div className="heroCopy">
              <div className="eyebrow"><span>01</span> MBC · MEDICAL BILLING & RCM</div>
              <h1>Learn the work.<br /><em>See the industry.</em></h1>
              <p className="heroLead">A focused professional experience with two independent views: practical medical billing training and the wider healthcare revenue-cycle operating model.</p>
              <div className="heroActions">
                <button className="primaryBtn" onClick={() => switchTab('training')}>Explore Training <ArrowRight size={17} /></button>
                <button className="ghostBtn" onClick={() => switchTab('industry')}>Explore Industry <ArrowRight size={17} /></button>
              </div>
              <div className="heroStats">
                <div><b>01</b><span>TRAINING</span></div>
                <div><b>02</b><span>INDUSTRY</span></div>
                <div><b>08</b><span>CORE MODULES</span></div>
              </div>
            </div>
            <div className="heroVisual">
              <div className="heroCard heroCardMain">
                <div className="heroCardTop"><span>RCM WORKFLOW</span><span>LIVE VIEW</span></div>
                <div className="heroDiagram">
                  <div className="diagramNode"><span>01</span><strong>Access</strong><small>Patient</small></div>
                  <div className="diagramLine" />
                  <div className="diagramNode"><span>02</span><strong>Code</strong><small>Mid-cycle</small></div>
                  <div className="diagramLine" />
                  <div className="diagramNode"><span>03</span><strong>Collect</strong><small>Business office</small></div>
                </div>
                <div className="heroCardBottom"><Sparkles size={15} /> Knowledge → Workflow → Revenue</div>
              </div>
              <div className="floatingCard one"><span>TRAINING</span><strong>8 modules</strong><small>beginner → professional</small></div>
              <div className="floatingCard two"><span>INDUSTRY</span><strong>Front · Mid · Back</strong><small>technology + analytics</small></div>
            </div>
          </div>
        </section>

        <section id="workspace" className="workspace">
          <div className="wrap">
            <div className="workspaceTop">
              <div>
                <div className="eyebrow"><span>02</span> SELECT VIEW</div>
                <h2>Two views.<br /><em>Two information spaces.</em></h2>
              </div>
              <p>Only the selected view is rendered below. Training stays focused on learning content; Industry stays focused on RCM operations. The header and footer remain common.</p>
            </div>

            <div className="viewSwitch" role="tablist" aria-label="MBC sections">
              <button className={tab === 'training' ? 'viewTab active' : 'viewTab'} onClick={() => switchTab('training')} role="tab" aria-selected={tab === 'training'}>
                <span className="viewIndex">01</span><span><small>LEARNING VIEW</small><strong>Training</strong><em>Medical billing knowledge, curriculum and career foundation.</em></span><ArrowUpRight size={18} />
              </button>
              <button className={tab === 'industry' ? 'viewTab active industryTab' : 'viewTab industryTab'} onClick={() => switchTab('industry')} role="tab" aria-selected={tab === 'industry'}>
                <span className="viewIndex">02</span><span><small>OPERATING VIEW</small><strong>Industry</strong><em>Revenue-cycle operations, technology, automation and analytics.</em></span><ArrowUpRight size={18} />
              </button>
            </div>
          </div>

          {tab === 'training' ? (
            <section className="viewContent trainingView">
              <div className="wrap">
                <div className="sectionIntro">
                  <div><span className="sectionIndex">01</span><div className="eyebrow"><span>TRAINING</span> MEDICAL BILLING</div><h2>Build the foundation<br /><em>before the workflow.</em></h2></div>
                  <div className="introNote"><strong>Focused learning space</strong><p>Training content is kept separate from the industry operating model so a learner can scroll this area without unrelated RCM material appearing.</p></div>
                </div>

                <div className="trainingGrid">
                  <aside className="trainingSide">
                    <div className="sideCard highlight"><small>CURRICULUM</small><strong>08</strong><span>CORE MODULES</span><p>Begin with fundamentals, then move through coding, claims, denials, A/R, compliance and billing technology.</p></div>
                    <div className="sideCard"><small>LEARNER FIT</small>{learnerFit.map((x, i) => <div className="miniRow" key={x}><span>0{i + 1}</span><strong>{x}</strong></div>)}</div>
                  </aside>
                  <div className="moduleGrid">
                    {trainingModules.map(([no, title, desc, Icon]) => (
                      <button key={no} className={activeTraining === no ? 'moduleCard active' : 'moduleCard'} onClick={() => setActiveTraining(no)}>
                        <span className="moduleIndex">{no}</span><span className="moduleIcon"><Icon size={19} /></span><strong>{title}</strong><p>{desc}</p><ChevronRight className="moduleArrow" size={17} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="trainingDetail">
                  <div className="detailHeading"><span>TRAINING PATH</span><strong>Knowledge in sequence.</strong></div>
                  <div className="detailGrid">{trainingExtras.map(([no, title, text]) => <article key={no}><span>{no}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
                </div>

                <div className="journeyGrid">
                  <div><div className="eyebrow"><span>LEARNING FLOW</span> FIVE STEPS</div><h3>Learn → understand → practice → prepare.</h3><p>The training view stays about building medical billing knowledge and professional context.</p></div>
                  <div className="journeyList">{journey.map(([no, title, text]) => <article key={no}><span>{no}</span><div><strong>{title}</strong><p>{text}</p></div><CheckCircle2 size={17} /></article>)}</div>
                </div>
              </div>
            </section>
          ) : (
            <section className="viewContent industryView">
              <div className="wrap">
                <div className="sectionIntro">
                  <div><span className="sectionIndex">02</span><div className="eyebrow purple"><span>INDUSTRY</span> RCM OPERATIONS</div><h2>See how the revenue cycle<br /><em>operates end to end.</em></h2></div>
                  <div className="introNote"><strong>Operations-only space</strong><p>This view focuses on patient access, mid-cycle work, business office operations, analytics and technology-enabled automation.</p></div>
                </div>

                <div className="industryStages">{industryStages.map(([no, title, desc, Icon]) => <article key={no} className="industryCard"><div className="industryCardTop"><span>{no}</span><Icon size={20} /></div><h3>{title}</h3><p>{desc}</p><div className="cardLine" /></article>)}</div>

                <div className="operationFlow"><div className="eyebrow purple"><span>END-TO-END RCM</span> OPERATING FLOW</div><div className="flowNodes"><span>Patient Access</span><i>→</i><span>Mid-Revenue Cycle</span><i>→</i><span>Business Office</span><i>→</i><span>Analytics</span></div><p>Public Omega material describes RCM as connected front-, middle- and back-office operations, with analytics used to measure performance and identify opportunities.</p></div>

                <div className="technologySection">
                  <div className="technologyHeader"><div><div className="eyebrow purple"><span>TECHNOLOGY</span> OPERATING LAYER</div><h3>Technology that sits<br /><em>inside the workflow.</em></h3></div><p>Technology is presented here as an operating layer: workflow, automation, analytics and human expertise working together across the revenue cycle.</p></div>
                  <div className="technologyGrid">{industryTechnology.map(([no, title, stage, desc]) => <article key={no}><span>{no}</span><small>{stage}</small><h4>{title}</h4><p>{desc}</p><ArrowUpRight size={16} /></article>)}</div>
                </div>

                <div className="automationSection"><div className="automationHeader"><div className="eyebrow purple"><span>AUTOMATION</span> INTELLIGENCE + EXECUTION</div><h3>From insight<br /><em>to action.</em></h3><p>Current Omega material describes AI, automation, analytics, workflow and human expertise as connected capabilities across revenue-cycle operations.</p></div><div className="automationGrid">{automation.map(([title, text]) => <article key={title}><span><Workflow size={16} /></span><strong>{title}</strong><p>{text}</p></article>)}</div></div>
              </div>
            </section>
          )}
        </section>

        <section id="contact" className="contactSection">
          <div className="wrap contactGrid">
            <div>
              <div className="eyebrow light"><span>03</span> COMMON CONTACT</div>
              <h2>Ready to take<br /><em>the next step?</em></h2>
              <p>Use the common contact area for questions, a free billing audit or a direct conversation with MBC.</p>
              <div className="contactDetails"><div><small>OFFICE</small><strong>No. 5/246, Thiruvallur - Redhills High Road,<br />Rajiv Gandhinagar, Chennai - 52</strong></div><div><small>CONTACT</small><a href="tel:8098311291">8098311291</a></div></div>
            </div>
            <div className="contactActions">
              <a className="contactAction primaryContact" href={calendly} target="_blank" rel="noreferrer"><span><ArrowUpRight size={18} /></span><b><small>BOOK A CALL</small>Free 30-minute billing audit</b></a>
              <a className="contactAction whatsappAction" href={whatsapp} target="_blank" rel="noreferrer"><span><MessageCircle size={18} /></span><b><small>WHATSAPP</small>Chat with us</b><ArrowUpRight size={16} /></a>
              <a className="contactAction callAction" href="tel:8098311291"><span><Phone size={18} /></span><b><small>CALL US</small>8098311291</b><ArrowUpRight size={16} /></a>
              <a className="emailAction" href="mailto:info@mbcrcm.com">info@mbcrcm.com</a>
            </div>
          </div>
        </section>
      </main>

      <footer><div className="wrap"><div className="footerMain"><strong>MADE HEALTHCARE RCM</strong><span>MEDICAL BILLING · RCM · PROFESSIONAL LEARNING</span></div><div className="footerBottom"><span>© 2026 MBC. ALL RIGHTS RESERVED.</span><span>TRAINING + INDUSTRY</span></div></div></footer>
    </div>
  )
}

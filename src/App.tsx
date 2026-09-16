import { useState } from 'react'
import { ArrowRight, ArrowUpRight, BarChart3, BriefcaseBusiness, Check, ChevronRight, Code2, FileCheck2, HeartPulse, Laptop2, Menu, MessageCircle, Phone, ShieldCheck, Sparkles, Stethoscope, Target, Users, Workflow, X } from 'lucide-react'
import { company } from './config/company'
import './styles.css'

const calendly='https://calendly.com/mbgenius1111/free-30-minute-billing-audit'
const whatsapp='https://wa.me/923014490726?text=Hello%2C%20I%20have%20a%20question'

const modules=[
['01','How Healthcare Billing Works','Providers, payers, billers and how money moves through the US healthcare system.',HeartPulse],
['02','ICD-10 & CPT Coding','Diagnosis and procedure coding for accurate, clean claims.',Code2],
['03','Submitting Claims','CMS-1500, electronic claims, clearinghouses and the claim journey.',FileCheck2],
['04','Denial Management','Rejections, EOBs, appeals and revenue recovery workflows.',ShieldCheck],
['05','Accounts Receivable','Ageing, payer follow-up, collections and AR management.',Target],
['06','HIPAA & Compliance','Privacy, protected health information and compliance responsibilities.',ShieldCheck],
['07','Medicare & Medicaid','Major government-payer concepts within US billing workflows.',Stethoscope],
['08','Billing Software & Tools','The role of practice-management and billing platforms.',Laptop2],
] as const
const rcm=[
['01','Patient Access','Scheduling, registration, insurance eligibility and benefits verification, and prior authorization.',Users],
['02','Mid-Revenue Cycle','Charge capture, medical records coding, clinical documentation improvement, chart audit and HCC review.',Code2],
['03','Business Office','Claims and billing, payment posting, reconciliation, A/R, collections, denials and appeals.',BriefcaseBusiness],
['04','Analytics','Operational data used to measure performance and identify improvement opportunities.',BarChart3],
] as const
const platform=[
['ConnectIQ','Patient Access','Scheduling, registration, eligibility, benefits and prior authorization.'],
['CodeIQ','Mid-Revenue Cycle','Coding, documentation improvement, chart audit, education, charge capture and HCC review.'],
['CollectIQ','Business Office','Claims, billing, payment posting, reconciliation, A/R, collections, denials and underpayment recovery.'],
]
const path=[
['01','Learn the foundation','Start with medical billing fundamentals, coding, claims, denials, AR and compliance.'],
['02','Build practical understanding','Connect individual billing tasks into a working revenue-cycle picture.'],
['03','Validate your learning','Complete the assessment and certification steps described by the training programme.'],
['04','Enter the industry','Use career resources and practical knowledge when pursuing billing opportunities.'],
['05','Understand wider RCM','See how access, coding, business-office operations and analytics connect.'],
]

export default function App(){
 const [menu,setMenu]=useState(false); const [active,setActive]=useState('01')
 const go=(id:string)=>{document.getElementById(id)?.scrollIntoView({behavior:'smooth'});setMenu(false)}
 return <div className="site">
  <header className="header"><div className="wrap headerInner">
   <button className="brand" onClick={()=>go('home')}><span className="brandIcon"><HeartPulse size={21}/></span><span><strong>{company.name}</strong><small>Medical Billing · RCM · Career Path</small></span></button>
   <nav className={menu?'nav show':'nav'}><button onClick={()=>go('training')}>Training</button><button onClick={()=>go('industry')}>Industry</button><button onClick={()=>go('platform')}>Solutions</button><button onClick={()=>go('path')}>Path</button><a href={calendly} target="_blank" rel="noreferrer">Book Free Audit <ArrowUpRight size={15}/></a></nav>
   <button className="menuBtn" onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button>
  </div></header>

  <main>
   <section id="home" className="hero"><div className="heroGlow one"/><div className="heroGlow two"/><div className="wrap heroGrid">
    <div><div className="eyebrow"><span>01</span> TRAIN → UNDERSTAND → ENTER RCM</div><h1>Learn the workflow.<br/><em>See where it leads.</em></h1><p className="heroLead">A premium learning experience that starts with practical US medical-billing training and then connects that knowledge to the wider revenue-cycle operating model.</p><div className="heroActions"><a className="primaryBtn" href={calendly} target="_blank" rel="noreferrer">Book a free 30-min audit <ArrowUpRight size={17}/></a><button className="ghostBtn" onClick={()=>go('training')}>Explore training <ArrowRight size={17}/></button></div><div className="heroStats"><div><b>08</b><span>CORE MODULES</span></div><div><b>04</b><span>RCM AREAS</span></div><div><b>01</b><span>CONNECTED VIEW</span></div></div></div>
    <div className="heroVisual"><div className="visualTop"><span>MEDICAL BILLING / RCM</span><span>2026</span></div><div className="visualCenter"><div className="orb"><HeartPulse size={66}/></div><div className="orbit orbitA"/><div className="orbit orbitB"/></div><div className="workflowMini"><span>Patient</span><i>→</i><span>Code</span><i>→</i><span>Claim</span><i>→</i><span>Payment</span><i>→</i><span>AR</span></div></div>
   </div></section>

   <section className="trustStrip"><div className="wrap trustInner"><span>US BILLING</span><i>•</i><span>ICD-10-CM</span><i>•</i><span>CPT</span><i>•</i><span>HIPAA</span><i>•</i><span>CLAIMS</span><i>•</i><span>DENIALS</span><i>•</i><span>REVENUE CYCLE</span></div></section>

   <section id="training" className="section"><div className="wrap"><div className="sectionHead"><div><div className="eyebrow"><span>02</span> THE TRAINING LAYER</div><h2>From zero<br/><em>to billing context.</em></h2></div><p>The training source presents eight practical modules covering healthcare billing, coding, claims, denials, AR, compliance, government payers and billing tools. It is positioned as online, self-paced and beginner-friendly.</p></div>
    <div className="trainingLayout"><aside className="trainingRail"><span>CURRICULUM</span><strong>08</strong><small>CORE MODULES</small><div className="railNote">Practical US medical billing training for new learners.</div></aside><div className="moduleList">{modules.map(([no,title,desc,Icon])=><button key={no} className={active===no?'module active':'module'} onClick={()=>setActive(no)}><span className="moduleNo">{no}</span><span className="moduleIcon"><Icon size={20}/></span><span className="moduleBody"><strong>{title}</strong><small>{desc}</small></span><ChevronRight size={18}/></button>)}</div></div>
   </div></section>

   <section className="brightStatement"><div className="wrap statementGrid"><div className="statementBadge"><Sparkles size={18}/> THE DIFFERENCE</div><h2>Don't stop at terminology.<br/><span>Understand the movement of money.</span></h2><p>Claims are submitted, processed, paid, denied, corrected and followed up. Training becomes more useful when learners can see how those actions connect across the revenue cycle.</p></div></section>

   <section className="bridge"><div className="wrap bridgeGrid"><div><div className="eyebrow light"><span>03</span> THE BRIDGE</div><h2>Training is the<br/><em>first layer.</em></h2></div><div className="bridgeCopy"><div className="bridgeLine"><span>KNOWLEDGE</span><i>→</i><span>WORKFLOW</span><i>→</i><span>OPERATIONS</span><i>→</i><span>OUTCOME</span></div><p>Once the learner understands billing fundamentals, the wider RCM picture becomes easier to see: access, coding, claims, payment, denials, collections and analytics are connected rather than separate departments.</p></div></div></section>

   <section id="industry" className="section"><div className="wrap"><div className="sectionHead"><div><div className="eyebrow"><span>04</span> THE INDUSTRY LAYER</div><h2>Where the workflow<br/><em>operates at scale.</em></h2></div><p>Omega Healthcare publicly describes an end-to-end RCM model spanning patient access, mid-revenue-cycle activities, business-office operations and analytics. This section presents those public categories as an educational overview.</p></div><div className="stageGrid">{rcm.map(([no,title,desc,Icon])=><article className="stageCard" key={no}><div className="stageTop"><span>{no}</span><Icon size={24}/></div><h3>{title}</h3><p>{desc}</p><a href="https://www.omegahms.com/solution/revenue-cycle-management-paid-lp/" target="_blank" rel="noreferrer">Explore RCM area <ArrowUpRight size={15}/></a></article>)}</div></div></section>

   <section id="platform" className="platformSection"><div className="wrap"><div className="platformHeader"><div><div className="eyebrow light"><span>05</span> TECHNOLOGY + EXPERTISE</div><h2>A modern operating<br/><em>layer for RCM.</em></h2></div><p>Omega Healthcare describes a technology-enabled model combining automation, analytics, AI and human expertise. Its public RCM page groups capabilities into ConnectIQ, CodeIQ and CollectIQ.</p></div><div className="platformGrid">{platform.map(([name,area,desc],i)=><article key={name}><span className="platformIndex">0{i+1}</span><h3>{name}</h3><small>{area}</small><p>{desc}</p><ArrowUpRight size={18}/></article>)}</div><div className="platformFooter"><span><Workflow size={18}/> PEOPLE + PROCESS + TECHNOLOGY</span><a href="https://www.omegahms.com/" target="_blank" rel="noreferrer">View Omega Healthcare <ArrowUpRight size={16}/></a></div></div></section>

   <section id="path" className="section"><div className="wrap"><div className="sectionHead"><div><div className="eyebrow"><span>06</span> THE COMPLETE PATH</div><h2>Learn it.<br/><em>Connect it.</em></h2></div><p>A single journey from first exposure to medical billing through the broader operational picture of revenue cycle management.</p></div><div className="pathList">{path.map(([no,title,desc])=><article key={no}><span>{no}</span><h3>{title}</h3><p>{desc}</p><ArrowUpRight size={18}/></article>)}</div></div></section>

   <section id="contact" className="contactSection"><div className="wrap contactGrid"><div><div className="eyebrow light"><span>07</span> START HERE</div><h2>Build the skill.<br/><em>See the industry.</em></h2><p>Begin with practical medical-billing training, then understand how that knowledge fits into a larger revenue-cycle environment.</p><div className="contactDetails"><div><small>OFFICE</small><strong>No. 5/246, Thiruvallur - Redhills High Road,<br/>Rajiv Gandhinagar, Chennai - 52</strong></div><div><small>CONTACT</small><a href="tel:8098311291">8098311291</a></div></div></div><div className="contactActions"><a className="contactPrimary" href={calendly} target="_blank" rel="noreferrer">Book Free 30-Min Audit <ArrowUpRight size={17}/></a><a className="action whatsapp" href={whatsapp} target="_blank" rel="noreferrer"><span><MessageCircle size={19}/></span><b><small>WHATSAPP</small>Chat with us</b><ArrowUpRight size={16}/></a><a className="action phone" href="tel:8098311291"><span><Phone size={19}/></span><b><small>CALL US</small>8098311291</b><ArrowUpRight size={16}/></a><a className="email" href={`mailto:${company.email}`}>{company.email}</a></div></div></section>
  </main>
  <footer><div className="wrap footerMain"><strong>{company.name}</strong><span>TRAINING · BILLING · RCM · CAREER PATH</span></div><div className="wrap footerBottom"><span>© {new Date().getFullYear()} {company.name}</span><span>Global Online Training Programme</span></div></footer>
 </div>
}

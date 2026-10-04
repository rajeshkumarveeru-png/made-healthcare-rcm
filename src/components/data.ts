import {
    ArrowUpRight, BarChart3, Code2, FileCheck2, HeartPulse, Laptop2, ShieldCheck, Stethoscope, Target, Users, Workflow, Building2, Sparkles, House, BrainCircuit
} from 'lucide-react'

/* ---------------------------------------------------------------------------------------------
   Contact details (unchanged from your site)
   --------------------------------------------------------------------------------------------- */
export const whatsapp = 'https://wa.me/8667053636?text=Hello%2C%20I%20have%20a%20question'
export const whatsappNumber = '8667053636'
export const phonePrimary = '8098311291'
export const phoneSecondary = '9003204951'
export const email = 'info@madehealthcare.com'
export const officeLines = ['No. 5/246,', 'Thiruvallur - Redhills High Road,', 'Rajiv Gandhinagar,', 'Chennai, Tamil Nadu \u2014 600052']

/* ---------------------------------------------------------------------------------------------
   Your content, copied verbatim from the previous App.tsx
   --------------------------------------------------------------------------------------------- */
export const services = [
    ['01', 'Medical Billing', 'Accurate billing workflows designed to support cleaner claims, timely reimbursement and stronger revenue visibility.', HeartPulse],
    ['02', 'Medical Coding', 'Coding support, chart review and compliance-focused processes that connect documentation with reimbursement.', Code2],
    ['03', 'Patient Access', 'Registration, eligibility and benefits verification, authorization and front-end revenue-cycle support.', Users],
    ['04', 'Compliance & Audits', 'Structured reviews and compliance-aware workflows designed to identify process gaps and reduce avoidable billing issues.', ShieldCheck],
    ['05', 'Denials & AR', 'Denial analysis, payer follow-up, accounts receivable, appeals and revenue-recovery workflows.', Target],
    ['06', 'Analytics', 'Actionable reporting and operational visibility across claims, payments, denials, collections and revenue performance.', BarChart3],
    ['07', 'Technology Integration', 'Technology-enabled workflows that connect billing, clinical information, operational systems and reporting.', Laptop2],
    ['08', 'Automation', 'Intelligent workflow automation for repetitive processes, prioritization, monitoring and operational efficiency.', Workflow],
] as const

export const trainingModules = [
    ['01', 'Fundamentals', 'Build a clear mental model of the US healthcare billing cycle.', HeartPulse],
    ['02', 'ICD-10 & CPT', 'Connect diagnosis and procedure coding concepts to reimbursement workflows.', Code2],
    ['03', 'Claims & Clearinghouses', 'Understand submission, payer processing, edits, rejections and clean-claim thinking.', FileCheck2],
    ['04', 'Denial Management', 'Follow rejection reasons, payer follow-up, corrections, appeals and prevention.', ShieldCheck],
    ['05', 'Accounts Receivable', 'Work with ageing, payer follow-up, outstanding balances, collections and recovery.', Target],
    ['06', 'HIPAA & Compliance', 'Build practical awareness of PHI, privacy, security and responsible billing workflows.', ShieldCheck],
    ['07', 'Medicare & Medicaid', 'Understand major US government payer workflows and reimbursement concepts.', Stethoscope],
    ['08', 'Billing Technology', 'Understand practice-management, clearinghouse and billing platforms in daily operations.', Laptop2],
] as const

export const industries = [
    ['01', 'Physician Practices', 'Revenue-cycle support designed around the pace and operating model of physician-led practices.', Stethoscope, 'teal'],
    ['02', 'Specialty Practices', 'Structured billing, coding, denial and analytics workflows for specialized care environments.', Sparkles, 'violet'],
    ['03', 'Hospitals & Health Systems', 'Scalable revenue-cycle processes, operational visibility and workflow support across complex organizations.', Building2, 'blue'],
    ['04', 'Post-Acute & Long-Term Care', 'Revenue-cycle knowledge and process support for organizations managing continuing and long-term care.', House, 'amber'],
    ['05', 'Behavioral Health', 'Compliance-aware workflows that respect the operational complexity of behavioral healthcare billing.', BrainCircuit, 'rose'],
    ['06', 'Growing Healthcare Organizations', 'Flexible people, process and technology support as healthcare organizations expand.', ArrowUpRight, 'indigo'],
] as const

export const pillars = [
    ['Expertise', 'Healthcare billing & RCM knowledge', 'Domain understanding that connects front-end operations, claims, payments and recovery.'],
    ['Efficiency', 'Process + technology', 'Practical workflows that use technology and automation to reduce friction and repetitive work.'],
    ['Visibility', 'Analytics + actionable insight', 'Clear operational information that helps teams understand performance and improvement opportunities.'],
] as const

/* ---------------------------------------------------------------------------------------------
   NEW - organisation helpers (my grouping of YOUR services; edit freely)
   The 6 stages follow the order of a revenue cycle. Each service number maps to one stage.
   --------------------------------------------------------------------------------------------- */
export const STAGES = [
    {key: 'access', label: 'Patient Access', short: 'Front end', services: ['03']},
    {key: 'coding', label: 'Coding', short: 'Documentation', services: ['02']},
    {key: 'billing', label: 'Billing', short: 'Claims', services: ['01']},
    {key: 'denials', label: 'Denials & AR', short: 'Recovery', services: ['05']},
    {key: 'compliance', label: 'Compliance', short: 'Governance', services: ['04']},
    {key: 'insight', label: 'Insight & Automation', short: 'Performance', services: ['06', '07', '08']}
] as const

export const stageOfService = (number: string) => STAGES.find(s => (s.services as readonly string[]).includes(number))

export const ENQUIRY_TOPICS = ['Revenue-cycle operations', 'Training', 'Technology', 'General enquiry'] as const

export const FAQ = [
    {q: 'What does MADE Healthcare RCM do?', a: 'We combine medical billing expertise, revenue-cycle operations, technology and analytics to help healthcare organizations strengthen financial performance while care teams focus on patients.'},
    {q: 'Which organizations do you support?', a: 'Physician practices, specialty practices, hospitals and health systems, post-acute and long-term care, behavioral health and growing healthcare organizations.'},
    {q: 'Who is the training for?', a: 'Fresh graduates, career changers, international learners and junior billers who want a clear professional foundation in the healthcare billing industry.'},
    {q: 'How do we get started?', a: 'Tell us what you are working on - revenue-cycle operations, training, technology or a general question. You can send the form, call us or message us on WhatsApp.'}
]

/** one searchable list for the Ctrl+K palette */
export type SearchItem = {id: string; kind: 'Section' | 'Service' | 'Training' | 'Industry'; title: string; hint: string; target: string}

export type CompanyConfig = {
  name: string
  shortName: string
  tagline: string
  heroTitle: string
  heroText: string
  aboutTitle: string
  aboutText: string
  logo: string
  heroImage: string
  aboutImage: string
  phone: string
  email: string
  address: string

  services: {
    title: string
    description: string
    icon: string
  }[]

  clients: {
    name: string
    logo?: string
  }[]

  products: {
    name: string
    description: string
    image: string
  }[]

  stats: {
    value: string
    label: string
  }[]

  reasons: {
    title: string
    description: string
  }[]

  testimonials: {
    quote: string
    name: string
    role: string
  }[]

  theme: {
    primary: string
    dark: string
    accent: string
  }
}

export const company: CompanyConfig = {
  /* ============================================================
     BRAND
     ============================================================ */

  name: 'MADE HEALTHCARE RCM',
  shortName: 'MBC',
  tagline: 'Practical US Medical Billing Training. Built for Your Next Step.',

  /* ============================================================
     HERO
     ============================================================ */

  heroTitle: 'Build the skills. Start your path.',
  heroText:
    'Learn practical US medical billing from the fundamentals through claims, denials, accounts receivable, compliance and billing workflows — with a structured online path for new and developing billing professionals.',

  /* ============================================================
     ABOUT
     ============================================================ */

  aboutTitle: 'Learn medical billing with a clear, practical path.',
  aboutText:
    'MADE HEALTHCARE RCM provides structured medical billing training for learners who want to understand how US healthcare billing works in practice. Start with the fundamentals, build your knowledge across the revenue cycle and prepare for your next professional step.',

  /* ============================================================
     BRAND ASSETS
     ============================================================ */

  logo: '/images/logo-placeholder.svg',

  heroImage:
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1800&q=85',

  aboutImage:
    'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=85',

  /* ============================================================
     CONTACT
     ============================================================ */

  phone: '+92 301 4490726',
  email: 'info@mbcrcm.com',
  address: 'Global Online Training Programme',

  /* ============================================================
     TRAINING FEATURES / SERVICES
     ============================================================ */

  services: [
    {
      title: 'US Medical Billing Fundamentals',
      description:
        'Understand providers, payers, patients and the healthcare revenue cycle from the ground up.',
      icon: 'heart-pulse',
    },
    {
      title: 'ICD-10 & CPT',
      description:
        'Learn the purpose of diagnosis and procedure codes and how coding supports clean claims.',
      icon: 'code',
    },
    {
      title: 'Claims & Denials',
      description:
        'Understand CMS-1500 claims, clearinghouses, payer processing and practical denial workflows.',
      icon: 'file-check',
    },
    {
      title: 'Accounts Receivable',
      description:
        'Explore ageing reports, payer follow-up, outstanding balances and collections workflows.',
      icon: 'target',
    },
    {
      title: 'HIPAA & Compliance',
      description:
        'Build awareness of patient privacy, protected health information and compliance responsibilities.',
      icon: 'shield',
    },
    {
      title: 'Billing Software & Tools',
      description:
        'Understand the role of practice-management and billing platforms used in healthcare workflows.',
      icon: 'laptop',
    },
  ],

  /* ============================================================
     LEARNER GROUPS
     ============================================================ */

  clients: [
    { name: 'Fresh Graduates' },
    { name: 'Career Changers' },
    { name: 'International Learners' },
    { name: 'Junior Billers' },
    { name: 'Healthcare Students' },
    { name: 'Entry-Level Candidates' },
    { name: 'Working Professionals' },
    { name: 'Remote Learners' },
  ],

  /* ============================================================
     PROGRAMMES / SOLUTIONS
     ============================================================ */

  products: [
    {
      name: 'Free Starter Learning',
      description:
        'Begin with introductory medical billing concepts and understand what the field involves before moving forward.',
      image:
        'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80',
    },
    {
      name: 'Core Medical Billing Programme',
      description:
        'Build structured knowledge across healthcare billing, coding, claims, denials, AR, compliance and payer workflows.',
      image:
        'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=900&q=80',
    },
    {
      name: 'Career Preparation',
      description:
        'Use practical guidance, CV support and job-application resources as you prepare for billing opportunities.',
      image:
        'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=80',
    },
  ],

  /* ============================================================
     KEY HIGHLIGHTS
     ============================================================ */

  stats: [
    { value: '8', label: 'Core Modules' },
    { value: '100%', label: 'Online Learning' },
    { value: 'GLOBAL', label: 'Learner Access' },
    { value: 'FREE', label: 'Starter Learning' },
  ],

  /* ============================================================
     WHY MBC
     ============================================================ */

  reasons: [
    {
      title: 'Practical Learning',
      description:
        'Connect medical billing concepts with practical workplace workflows and realistic scenarios.',
    },
    {
      title: 'Structured Curriculum',
      description:
        'Follow a clear sequence from healthcare billing fundamentals through claims, denials, AR and compliance.',
    },
    {
      title: 'Online & Self-Paced',
      description:
        'Study online with flexibility that works around your existing schedule and location.',
    },
    {
      title: 'Global Access',
      description:
        'Learn US medical billing from South Asia, Southeast Asia, Africa, Latin America, the UK, Canada or the US.',
    },
    {
      title: 'Career Guidance',
      description:
        'Get practical guidance around CV preparation and job applications as you build your skills.',
    },
    {
      title: 'Community Support',
      description:
        'Learn with access to support, discussion and a community-oriented training environment.',
    },
  ],

  /* ============================================================
     TESTIMONIALS
     ============================================================ */

  testimonials: [
    {
      quote:
        'The structured approach made medical billing much easier to understand and helped me see how the different parts of the revenue cycle connect.',
      name: 'Training Learner',
      role: 'International Learner',
    },
    {
      quote:
        'I wanted a clear starting point without already having billing experience. The programme gives me a path to follow.',
      name: 'Programme Learner',
      role: 'Career Starter',
    },
  ],

  /* ============================================================
     THEME
     ============================================================ */

  theme: {
    primary: '#08b69f',
    dark: '#061821',
    accent: '#54dfcc',
  },
}

import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import {
  Sparkles, ArrowRight, Database, Search, Users, Shield, Heart,
  BarChart3, Workflow, Award, Bot, BrainCircuit, FileText,
  Link2, GraduationCap, Settings, ChevronDown, ChevronUp,
  Speaker, MessageSquareMore, Check, Zap, ShieldCheck,
  ArrowLeft, Megaphone, Globe, Eye, FileCheck, Scale, ShoppingCart,
  MessageCircle, TrendingUp, Briefcase, PenTool, LineChart
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import FunnelCollapseSection from '@/components/FunnelCollapseSection'
import { Badge } from '@/components/ui/badge'
import Navigation from '@/components/Navigation'
import QueryCustomizer from '@/components/QueryCustomizer'

export default function HomePage() {
  useEffect(() => {
    document.documentElement.classList.remove('dark')
  }, [])

  const [openFaqIndex, setOpenFaqIndex] = useState(null)
  const [step, setStep] = useState(1)
  const [brandUrl, setBrandUrl] = useState('')
  const [email, setEmail] = useState('')
  const [customQueries, setCustomQueries] = useState(null)
  const [customKeywords, setCustomKeywords] = useState(null)
  const [showAdvanced, setShowAdvanced] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [preview, setPreview] = useState(null)
  const inputRef = useRef(null)
  const mainSectionRef = useRef(null)

  const aiEngines = ['ChatGPT', 'Gemini', 'Claude', 'Perplexity', 'Copilot', 'DeepSeek', 'Grok', 'Cohere']

  const handleUrlSubmit = (e) => {
    e.preventDefault()
    if (!brandUrl.trim()) {
      setError('Please enter a valid URL')
      return
    }

    let formattedUrl = brandUrl.trim()
    if (!formattedUrl.match(/^https?:\/\//i)) {
      formattedUrl = 'https://' + formattedUrl
      setBrandUrl(formattedUrl)
    }

    setError('')
    setStep(2)
  }

  const handleEmailSubmit = async (e) => {
    e.preventDefault()

    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address')
      return
    }

    setLoading(true)
    setError('')

    try {
      // TEMPORARY: Skip OpenAI analysis, just send email notification
      // Use simplified brand-analysis endpoint instead of waitlist endpoint
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000'
      const response = await fetch(`${apiUrl}/api/brand-analysis`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          brand_url: brandUrl,
          email: email,
          custom_queries: customQueries,
          custom_keywords: customKeywords,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit brand analysis request')
      }

      const data = await response.json()

      // Set a simple preview object without OpenAI data
      setPreview({
        brand_name: brandUrl.replace(/^https?:\/\/(www\.)?/, '').split('/')[0],
        mentions: '-',
        citations: '-',
        visibility: '-',
        sentiment: 'PENDING'
      })
      setStep(3)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setStep(1)
    setBrandUrl('')
    setEmail('')
    setCustomQueries(null)
    setCustomKeywords(null)
    setPreview(null)
    setError('')
  }

  const scrollToForm = () => {
    mainSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setTimeout(() => {
      inputRef.current?.focus()
    }, 500)
  }

  const geoMeans = [
    {
      icon: Database,
      title: 'AI Visibility (GEO)',
      description: 'Make your brand discoverable, trusted, and accurately represented inside ChatGPT, Gemini, Claude, Perplexity, Copilot, and the AI engines where customers now begin their journey.'
    },
    {
      icon: Bot,
      title: 'AI Agents',
      description: 'Deploy autonomous, safe, integrated AI agents that complete real business tasks across marketing, sales, support, finance, HR, operations, and more, helping your teams increase efficiency, reduce manual effort, and speed up processes. Our agents seamlessly integrate with major platforms and existing systems, ensuring a smooth implementation process that reassures leaders of its feasibility and minimal disruption.'
    }
  ]

  const services = [
    {
      icon: BrainCircuit,
      title: 'GEO - Generative Engine Optimisation',
      description: 'Get Found & Recommended by AI Engines. AI engines now interpret, classify, compare, and recommend brands. GEO ensures your brand is discoverable, machine-understood, trusted, cited, referenced, contextually accurate, recommended more often, and positioned above competitors.',
      bullets: [
        'AIO - AI Optimisation Layer: Machine-readable entity modelling, structured data, schema, embeddings, and factual alignment.',
        'EEAT & Content Intelligence: LLM-ready content frameworks for reasoning, accuracy, and contextual relevance.',
        'Citation & Sentiment Engineering: Shape how AI describes your brand - tone, trust signals, factual stability.',
        'Authority Context Optimisation (ACO): Align PR, publishers, and earned media with the signals AI engines infer as authority.',
        'AI Visibility Analytics: Track citations, mentions, sentiment, and competitor presence across AI platforms.'
      ],
      footer: 'If AI can\'t interpret your brand, it can\'t recommend your brand. GEO fixes that.'
    },
    {
      icon: Bot,
      title: 'AI Agent Development',
      description: 'Your New Digital Workforce. AI agents are not chatbots - they are autonomous systems that analyse, plan, decide, execute, transact, escalate, coordinate, and integrate with your business tools.',
      agents: [
        { type: 'Marketing', tasks: 'content generation, reporting, and optimisation to save time and boost campaign effectiveness' },
        { type: 'Sales', tasks: 'qualification, routing, CRM updates to accelerate deal flow' },
        { type: 'Support', tasks: 'triage, response generation, escalation to improve customer experience' },
        { type: 'HR', tasks: 'screening, onboarding, policy Q&A to streamline hiring and support' },
        { type: 'Finance', tasks: 'reconciliation, forecasting, reporting for accurate, speedy finances' },
        { type: 'Operations', tasks: 'workflow orchestration, diagnostics to increase productivity, IT log analysis, and troubleshooting for faster issue resolution' },
        { type: 'eCommerce', tasks: 'recommendations, AI checkout, cart automation to enhance sales flow' }
      ],
      footer: 'Built using: LangGraph, CrewAI, Agno, Autogen, Swarm, Boomi AgentStudio. We build autonomous workers - not assistants.'
    }
  ]

  const whyVisibi = [
    {
      icon: Award,
      title: 'Founded by Industry Experts',
      description: 'Built by senior specialists with 60+ years combined expertise across software engineering, SEO & digital strategy, AI visibility (GEO), autonomous agent development, brand & UX design, and technical execution.'
    },
    {
      icon: BarChart3,
      title: 'Trusted Experience',
      description: 'Experienced enough to trust. Modern enough to innovate. Technical enough to execute.'
    },
    {
      icon: Workflow,
      title: 'Human + Machine Precision',
      description: 'We blend human creativity with machine precision - delivering measurable visibility, trust, and operational efficiency in the AI era.'
    }
  ]

  const insights = [
    {
      icon: Sparkles,
      title: 'How Agentic Commerce Collapses the Funnel',
      description: 'AI agents convert directly inside the chat interface. 8 min read'
    },
    {
      icon: Settings,
      title: 'Building Digital Workers With Multi-Agent Systems',
      description: 'A practical guide for enterprises. 7 min read'
    }
  ]

  const faqs = [
    {
      question: 'Who is VISIBI for?',
      answer: 'VISIBI is built for brands, agencies, and enterprises who want to be visible, trusted, and recommended by AI engines. Are you serious about a structured, measurable AI strategy, not hype? See AI as both a new discovery layer and a new workforce. If you care about how AI finds you and how AI helps you work, you are our fit.'
    },
    {
      question: 'What exactly is GEO?',
      answer: 'GEO (Generative Engine Optimisation) is the discipline of making your brand understandable to AI models, accurately described in AI answers, cited and recommended in relevant prompts, and positioned correctly against your competitors. If SEO is about ranking in search results, GEO is about being chosen inside AI answers and agent workflows.'
    },
    {
      question: 'How is GEO different from SEO?',
      answer: 'SEO optimises content and websites for traditional search engines. GEO optimises entities, context, citations, and signals so AI engines and agents can interpret and recommend your brand. You still need SEO - it feeds data into AI systems. GEO sits on top of SEO, shaping how AI uses that data.'
    },
    {
      question: 'Which AI platforms do you optimise for?',
      answer: 'We focus on the AI systems that people actually use to make decisions: ChatGPT, Gemini, Claude, Perplexity, Copilot, DeepSeek, Grok, Cohere. Plus, emerging AI assistants and agent frameworks as they gain adoption.'
    },
    {
      question: 'What types of AI agents do you build?',
      answer: 'We design and deploy agents that do real work, not just chat: Marketing agents (content, reporting, optimisation), Sales agents (qualification, routing, CRM updates), Support agents (triage, resolutions, escalations), HR agents (screening, onboarding, policy Q&A), Finance agents (reconciliation, forecasting, reporting), Operations & IT agents (workflows, diagnostics, log analysis), eCommerce agents (recommendations, checkout, cart logic). All built with governance, guardrails, and auditability in mind.'
    },
    {
      question: 'How long until we see results?',
      answer: 'GEO / AI Visibility: Early improvements in how AI describes your brand can appear in weeks, as we fix entities, structure, and authority signals. Deeper impact (citations, recommendation frequency, sentiment) typically builds over 1-3 quarters, depending on your starting point. AI Agents: Targeted, single-domain agents (e.g., a single workflow) can go live in 2-8 weeks, depending on complexity, integrations, and risk requirements. We\'ll give you a realistic timeline during the initial audit.'
    },
    {
      question: 'Do we need a large internal AI team to work with you?',
      answer: 'No. You need: A decision maker, a technical or product owner for integration, and stakeholders from key teams (e.g., marketing, sales, ops). We handle GEO strategy, technical implementation, and agent design. You stay focused on priorities, approvals, and adoption.'
    },
    {
      question: 'How do you handle data privacy and security?',
      answer: 'We design with safety and compliance first: Clear guardrails and permissions for each agent, use of approved APIs and secure connectors, no unnecessary data sharing with third-party models, configurable access control, logging, and audit trails. We work with your internal security and legal teams to ensure compliance with your standards. Additionally, our service includes continuous compliance monitoring and regular security reviews to provide ongoing support and reassurance to decision makers.'
    },
    {
      question: 'What does working with VISIBI look like in practice?',
      answer: 'Most engagements follow this structure: 1. Free AI Visibility & GEO Audit, 2. Prioritisation of GEO and/or agent opportunities, 3. Implementation sprint (GEO foundations and/or first agent), 4. Measurement & iteration (visibility, performance, usage), 5. Scale up phase (more entities, more agents, more workflows). You can start small and expand once you see value.'
    },
    {
      question: 'Can we start with just the free audit?',
      answer: 'Yes. The Free AI Visibility Audit is the safest first step: No obligation, no heavy lift from your side, gives you a clear view of where you stand in AI today. From there, you decide whether to move forward with GEO, agents, or both.'
    }
  ]

  return (
    <div className="min-h-screen relative line-pattern">
      <Helmet>
        <title>Generative Engine Optimisation (GEO) - AI Visibility Services | VISIBI</title>
        <meta name="description" content="Optimise your brand for ChatGPT, Gemini, and Perplexity. VISIBI ensures your content is visible, accurately interpreted, and positively referenced by Gen AI systems." />
        <meta name="keywords" content="GEO, generative engine optimization, AI visibility, ChatGPT optimization, Gemini SEO, Perplexity marketing, AI-ready content" />
        <link rel="canonical" href="https://visibi.com/" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://visibi.com/" />
        <meta property="og:title" content="Generative Engine Optimisation (GEO) | VISIBI" />
        <meta property="og:description" content="Visibility that moves beyond search. Optimise for AI platforms like ChatGPT, Gemini, and Perplexity." />
        <meta property="og:site_name" content="VISIBI" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="GEO - Visibility Beyond Search | VISIBI" />
        <meta name="twitter:description" content="Optimise your brand for AI platforms. Ensure accurate representation in ChatGPT, Gemini, and Perplexity." />
      </Helmet>

      <div className="absolute inset-0 -z-10 h-full w-full bg-slate-300/60 bg-[linear-gradient(to_right,#1d4ed80A_1px,transparent_1px),linear-gradient(to_bottom,#1d4ed80A_1px,transparent_1px)] bg-[size:128px_104px]"></div>

      <Navigation currentPage="home" />

      {/* Hero */}
      <section className="max-w-[90%] mx-auto items-left lg:px-[5rem] mb-0 mt-12 relative bg-[#FAFAFB] border border-b border-slate-200 rounded-xl rounded-bl-none rounded-br-none overflow-hidden">
        {/* Graph paper style background with gradient fade at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-64 pointer-events-none">
          {/* Graph paper grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[length:14px_14px]"></div>
          {/* Gradient fade from white to gray-50 */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAFB] via-white/40 to-[#FAFAFB]"></div>
        </div>

        <div className="lg:block h-full w-full">
          <div className="relative z-10 py-24 border-l border-r border-slate-200">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center px-16">
              {/* Left Column - 60% (3 out of 5 columns) */}
              <div className="lg:col-span-3 space-y-6 text-left">
                <h1 className="font-open-sans text-4xl md:text-5xl font-bold tracking-tight text-slate-950 leading-tight">
                  Make Your Brand Visible to AI.<br />
                  Make Your Business More Productive With AI.
                </h1>
                <p className="text-lg md:text-xl leading-relaxed text-slate-700">
                  AI engines decide what brands appear.<br />
                  AI agents decide how work gets done.
                </p>
                <p className="text-base md:text-lg leading-relaxed text-slate-600">
                  If AI systems can't find your brand, you're out of buyer consideration. If your teams don't use agents, competitors move faster.
                </p>
                <div className="pt-4">
                  <Link to="/contact">
                    <Button className="bg-slate-950 text-white hover:bg-slate-800 px-8 py-6 text-lg rounded-full font-semibold">
                      Talk to an Expert
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right Column - 40% (2 out of 5 columns) */}
              <div className="lg:col-span-2 flex items-center justify-center">
                <img 
                  src="/vi/visibi-llms.png" 
                  alt="AI platforms and visibility optimization illustration" 
                  className="w-full h-auto max-w-md"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Engines Marquee */}
      <section className="max-w-[90%] mx-auto bg-white border-l border-r border-b border-slate-200 py-16">
        <div className="px-4 lg:px-8">
          <p className="font-space-mono text-sm text-slate-950 text-center mb-8 uppercase tracking-wide">
            Trusted Across the AI Discovery Layer
          </p>

          <div className="relative overflow-hidden">
            <style>{`
              @keyframes marquee {
                0% { transform: translateX(0%); }
                100% { transform: translateX(-33.33%); }
              }
              .animate-marquee {
                animation: marquee 30s linear infinite;
              }
            `}</style>
            <div className="flex gap-4 animate-marquee whitespace-nowrap">
              {[...aiEngines, ...aiEngines, ...aiEngines].map((engine, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-full font-space-mono text-sm text-slate-950"
                >
                  <Bot className="w-4 h-4" />
                  {engine}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What VISIBI Does */}
      <section className="max-w-[90%] mx-auto bg-white border-l border-r border-b border-slate-200 py-20">
        <div className="max-w-5xl mx-auto px-8">
          <div className="text-center mb-12 space-y-6">
            <p className="font-open-sans text-xl md:text-2xl leading-relaxed text-slate-950">
              VISIBI helps you win in both worlds:<br />
              <span className="font-semibold">AI discovery</span> and <span className="font-semibold">AI automation</span>.
            </p>
            <p className="font-open-sans text-lg leading-relaxed text-slate-700 max-w-4xl mx-auto">
              VISIBI is the only agency engineered to optimise your brand for AI engines and build autonomous agents that transform how your business operates.
            </p>
            <p className="font-open-sans text-lg leading-relaxed text-slate-700 max-w-4xl mx-auto">
              Experience a surge in business growth with increased leads, faster workflows, and significant cost savings. Our solutions ensure your brand is not only visible but also more efficient, providing tangible results that drive business success.
            </p>
          </div>

          <div className="pt-12">
            <h2 className="font-space-mono text-2xl md:text-3xl font-bold text-slate-950 mb-10 text-center uppercase tracking-wide">
              The Two Core VISIBI Solutions
            </h2>

            <div className="space-y-10">
              {/* Solution 1: AI Visibility (GEO) */}
              <div className="space-y-4 p-8 bg-slate-50 rounded-2xl border border-slate-200">
                <h3 className="font-space-mono text-xl md:text-2xl font-bold text-slate-950">
                  1. AI Visibility (GEO)
                </h3>
                <p className="font-open-sans text-lg font-semibold text-slate-950">
                  Get found, understood, and recommended by AI.
                </p>
                <p className="font-open-sans text-base leading-relaxed text-slate-700">
                  Make your brand discoverable, trusted, and accurately represented inside ChatGPT, Gemini, Claude, Perplexity, Copilot, and the AI engines where customers now begin their journey.
                </p>
              </div>

              {/* Solution 2: AI Agents */}
              <div className="space-y-4 p-8 bg-slate-50 rounded-2xl border border-slate-200">
                <h3 className="font-space-mono text-xl md:text-2xl font-bold text-slate-950">
                  2. AI Agents
                </h3>
                <p className="font-open-sans text-lg font-semibold text-slate-950">
                  Automate workflows with autonomous digital workers.
                </p>
                <p className="font-open-sans text-base leading-relaxed text-slate-700">
                  Deploy autonomous, safe, integrated AI agents that complete real business tasks across marketing, sales, support, finance, HR, operations, and more, helping your teams increase efficiency, reduce manual effort, and speed up processes. Our agents seamlessly integrate with major platforms and existing systems, ensuring a smooth implementation process that reassures leaders of its feasibility and minimal disruption.
                </p>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-12">
            <Link to="/tool">
              <Button className="inline-flex items-center px-8 py-6 bg-slate-950 text-white rounded-full font-semibold hover:bg-slate-800 transition-colors">
                <Sparkles className="w-5 h-5 mr-2" />
                Get Your Free AI Visibility Audit
              </Button>
            </Link>
            <Link to="/contact">
              <Button className="inline-flex items-center px-8 py-6 bg-white text-slate-950 border-2 border-slate-950 rounded-full font-semibold hover:bg-slate-50 transition-colors">
                Talk to an Expert
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* The AI Shift Section */}
      <section className="max-w-[90%] mx-auto py-20 mb-2 bg-slate-50 border-l border-r border-b border-slate-300">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="font-space-mono text-3xl md:text-4xl font-bold text-slate-950 mb-8 uppercase tracking-wide">
              The AI Shift
            </h2>
          </div>

          <div className="max-w-5xl mx-auto space-y-8">
            {/* Consumers Questions */}
            <div className="space-y-4 text-center">
              <p className="font-open-sans text-lg leading-relaxed text-slate-700">
                Consumers no longer start with Google.
              </p>
              <p className="font-open-sans text-lg leading-relaxed text-slate-950 font-semibold">
                They begin by asking AI:
              </p>
              <ul className="space-y-2 text-left max-w-2xl mx-auto pl-6">
                <li className="font-open-sans text-base text-slate-700">
                  <span className="font-semibold text-slate-950">•</span> "What's the best solution for my team?"
                </li>
                <li className="font-open-sans text-base text-slate-700">
                  <span className="font-semibold text-slate-950">•</span> "Which product is most reliable?"
                </li>
                <li className="font-open-sans text-base text-slate-700">
                  <span className="font-semibold text-slate-950">•</span> "Plan my trip - and book the best options."
                </li>
                <li className="font-open-sans text-base text-slate-700">
                  <span className="font-semibold text-slate-950">•</span> "Find the top software for small businesses."
                </li>
              </ul>
              <p className="font-open-sans text-lg leading-relaxed text-slate-950 font-semibold pt-4">
                AI engines generate the answers.<br />
                Agentic systems complete the actions.
              </p>
            </div>

            {/* How the Funnel Has Changed */}
            <div className="space-y-6 pt-8">
              <h3 className="font-space-mono text-2xl font-bold text-slate-950 text-center">
                How the Funnel Has Changed
              </h3>
              
              {/* Traditional Funnel - Single Row */}
              <div className="bg-white p-6 rounded-xl border border-slate-300">
                <p className="font-space-mono text-sm font-semibold text-slate-700 mb-4 text-center">
                  The classic funnel:
                </p>
                <div className="flex items-center justify-center gap-2 text-sm md:text-base flex-wrap">
                  <span className="font-open-sans text-slate-950">Awareness</span>
                  <span className="text-slate-400">→</span>
                  <span className="font-open-sans text-slate-950">Search</span>
                  <span className="text-slate-400">→</span>
                  <span className="font-open-sans text-slate-950">Click</span>
                  <span className="text-slate-400">→</span>
                  <span className="font-open-sans text-slate-950">Visit</span>
                  <span className="text-slate-400">→</span>
                  <span className="font-open-sans text-slate-950">Compare</span>
                  <span className="text-slate-400">→</span>
                  <span className="font-open-sans text-slate-950">Purchase</span>
                </div>
              </div>

              <p className="font-open-sans text-lg text-center text-slate-700 italic">
                is collapsing into a single AI-led interaction:
              </p>

              {/* AI Funnel - Single Row */}
              <div className="bg-slate-950 p-6 rounded-xl">
                <div className="flex items-center justify-center gap-3 text-base md:text-lg flex-wrap">
                  <span className="font-open-sans text-white font-semibold">Query</span>
                  <span className="text-slate-400">→</span>
                  <span className="font-open-sans text-white font-semibold">AI Recommendation</span>
                  <span className="text-slate-400">→</span>
                  <span className="font-open-sans text-white font-semibold">Purchase</span>
                </div>
              </div>

              {/* What Disappears */}
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <p className="font-space-mono text-lg font-bold text-slate-950 mb-4 text-center">
                  What disappears?
                </p>
                <div className="flex items-center justify-center gap-4 flex-wrap text-sm">
                  <span className="font-open-sans text-slate-700">There are no pageviews.</span>
                  <span className="font-open-sans text-slate-700">No landing pages.</span>
                  <span className="font-open-sans text-slate-700">No scroll depth.</span>
                  <span className="font-open-sans text-slate-700">No retargeting window.</span>
                </div>
              </div>
            </div>

            {/* Organizational Transformation */}
            <div className="space-y-4 pt-6 text-center">
              <p className="font-open-sans text-lg leading-relaxed text-slate-700">
                Meanwhile, inside organisations, the same transformation is happening:
              </p>
              <p className="font-open-sans text-lg leading-relaxed text-slate-950">
                AI agents are now automating research, writing, analysis, operations, planning, reporting, and thousands of micro tasks per day.
              </p>
            </div>

            {/* Final Message */}
            <div className="space-y-4 bg-slate-950 text-white p-8 rounded-2xl mt-8 text-center">
              <p className="font-open-sans text-xl md:text-2xl leading-relaxed font-semibold">
                If your brand doesn't surface in AI, you're invisible.
              </p>
              <p className="font-open-sans text-xl md:text-2xl leading-relaxed font-semibold">
                If your teams don't leverage agents, you're slow.
              </p>
              <p className="font-open-sans text-lg leading-relaxed pt-4">
                VISIBI ensures you stay visible and competitive.
              </p>
              <div className="pt-4">
                <Link to="/contact">
                  <Button className="inline-flex items-center px-8 py-6 bg-white text-slate-950 rounded-full font-semibold hover:bg-slate-100 transition-colors">
                    Talk to our AI Expert
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Analysis Section */}
      <main ref={mainSectionRef} className="max-w-[90%] mx-auto px-8 py-12 relative z-10 bg-white border-l border-r border-slate-300 mb-2">
        <div className="lg:block absolute h-full w-0 md:w-20 bg-slate-200/20 border-0 md:border-r md:border-t-0 md:border-slate-200 left-0 top-0 pattern-background"></div>
        <div className="lg:block absolute h-full w-0 md:w-20 bg-slate-200/20 border-0 md:border-l md:border-t-0 md:border-slate-200 right-0 top-0 pattern-background"></div>

        {step === 1 && (
          <div className="space-y-8">
            <Card className="max-w-4xl mx-auto border-0 shadow-none bg-white">
              <CardHeader className="text-center">
                <CardTitle className="font-open-sans text-slate-950 font-semibold text-3xl">VISIBI AI Scanner <span className='text-blue-700'><Sparkles size={10} strokeWidth={1.25} className="inline-block h-6 w-6 text-blue-700" /></span></CardTitle>
                <CardDescription className="font-open-sans text-lg">
                  See How AI Engines Understand Your Brand. Enter your domain and up to five keywords.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUrlSubmit} className="space-y-4">
                  <div className="flex gap-3 md:flex-row flex-col">
                    <Input
                      ref={inputRef}
                      type="text"
                      placeholder="www.yourbrand.com or yourbrand.com"
                      value={brandUrl}
                      onChange={(e) => setBrandUrl(e.target.value)}
                      className="flex-1 h-14 px-8 text-md font-space-mono placeholder-blue-500 border-blue-400 bg-slate-200/20 text-blue-700 rounded-full"
                      required
                    />
                    <Button type="submit" size="xl" className="h-14 px-8 bg-blue-700 text-white text-lg font-semibold rounded-full">
                      Get Analysis
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                </form>
                <div className="mt-6 space-y-4">
                  <p className="text-sm font-semibold text-slate-950 text-center mb-4">
                    VISIBI instantly analyses AI engines for:
                  </p>
                  <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 max-w-4xl mx-auto text-sm text-slate-950">
                    <div className="flex items-center gap-2">
                      <span className="text-blue-700">•</span>
                      <span>brand mentions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-blue-700">•</span>
                      <span>accuracy of description</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-blue-700">•</span>
                      <span>sentiment & trust indicators</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-blue-700">•</span>
                      <span>citation frequency</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-blue-700">•</span>
                      <span>competitor comparisons</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-blue-700">•</span>
                      <span>knowledge gaps</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-blue-700">•</span>
                      <span>entity conflicts</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-blue-700">•</span>
                      <span>structured data issues</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-blue-700">•</span>
                      <span>recommendation likelihood</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 text-center italic mt-4">
                    Delivered in seconds with actionable fixes.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {step === 2 && (
          <div className="mx-auto space-y-6 max-w-7xl">
            <Card className="bg-white border-0 max-w-4xl mx-auto">
              <CardHeader className="text-center mb-8">
                <CardTitle className="text-2xl font-open-sans font-semibold">VISIBI AI Scanner - <span className='text-blue-700'>Free</span> <Sparkles size={10} strokeWidth={1.25} className="inline-block h-6 w-6 text-blue-700" /></CardTitle>
                <CardDescription className="font-open-sans text-slate-950 text-base">
                  Add custom queries or keywords (optional) and enter your email to get your free analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium font-space-mono">Brand URL</label>
                    <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-gray-700 font-space-mono">{brandUrl}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setStep(1)}
                        className="ml-auto"
                      >
                        Change
                      </Button>
                    </div>
                  </div>

                  {customQueries && customQueries.length > 0 && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium font-space-mono">Custom Questions ({customQueries.length})</label>
                      <div className="space-y-2 p-3 bg-purple-50 rounded-lg">
                        {customQueries.map((query, index) => (
                          <div
                            key={index}
                            className="text-sm p-2 bg-white rounded border border-purple-200 font-space-mono"
                          >
                            {query}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {customKeywords && customKeywords.length > 0 && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium font-space-mono">Added Keywords ({customKeywords.length})</label>
                      <div className="flex flex-wrap gap-2 p-3 bg-green-50 rounded-lg">
                        {customKeywords.map((keyword, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="bg-white"
                          >
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="border border-slate-100">
                    <Button
                      type="button"
                      variant="ghost"
                      size="lg"
                      onClick={() => setShowAdvanced(!showAdvanced)}
                      className="w-full justify-between text-muted-foreground hover:text-foreground rounded-none py-2 px-4"
                    >
                      <span className="flex items-center gap-2 font-space-mono text-slate-950">
                        <Zap className="h-4 w-4" />
                         Advanced Options (Custom Queries & Keywords)
                      </span>
                      {showAdvanced ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>

                    {showAdvanced && (
                      <div className="mt-4">
                        <QueryCustomizer
                          onQueriesChange={setCustomQueries}
                          onKeywordsChange={setCustomKeywords}
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium font-space-mono">Email Address</label>
                    <Input
                      type="email"
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 text-base bg-white placeholder-gray-500 border-gray-300 font-space-mono"
                      required
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      className="flex-1 h-12 rounded-3xl"
                      onClick={() => setStep(1)}
                    >
                      <ArrowLeft className="mr-2 h-5 w-5" />Back
                    </Button>
                    
                    <Button type="submit" size="lg" className="flex-1 h-12 rounded-3xl bg-blue-700 text-white" disabled={loading}>
                      {loading ? 'Analyzing...' : 'Get my Free Analysis'}
                      {!loading && <ArrowRight className="ml-2 h-5 w-5" />}
                    </Button>
                  </div>

                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {step === 3 && preview && (
          <div className="max-w-4xl mx-auto space-y-8">
            <Card className="bg-white border-2 border-blue-700">
              <CardHeader className="text-center py-12">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="h-10 w-10 text-blue-700" />
                </div>
                <CardTitle className="text-3xl font-open-sans font-semibold text-slate-950 mb-4">
                  Thank You!
                </CardTitle>
                <CardDescription className="text-lg text-gray-700 font-open-sans max-w-2xl mx-auto">
                  We've received your request for <strong className="font-semibold text-blue-700">{preview.brand_name}</strong>.
                  Our team will analyze your brand's AI visibility and send a detailed report to <strong className="font-semibold text-blue-700">{email}</strong> within 24-48 hours.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center pb-8">
                <div className="space-y-4 mb-8">
                  <h4 className="font-space-mono text-sm uppercase text-slate-950 font-semibold">What's included in your report:</h4>
                  <ul className="text-left max-w-md mx-auto space-y-3 font-open-sans text-md text-slate-950">
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-blue-700 flex-shrink-0 mt-0.5" />
                      <span>AI visibility analysis across ChatGPT, Gemini, Perplexity</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-blue-700 flex-shrink-0 mt-0.5" />
                      <span>Brand mention frequency and sentiment analysis</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-blue-700 flex-shrink-0 mt-0.5" />
                      <span>Competitive positioning insights</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-blue-700 flex-shrink-0 mt-0.5" />
                      <span>Actionable recommendations for improvement</span>
                    </li>
                  </ul>
                </div>
                <button
                  onClick={resetForm}
                  className="inline-flex items-center px-6 py-3 bg-blue-700 text-white rounded-full font-medium hover:bg-blue-800 transition-colors"
                >
                  Analyse Another Brand
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      {/* Main Content */}
      <main className="max-w-[90%] mx-auto px-12 py-12 relative z-10 bg-white rounded-xl rounded-tl-none rounded-tr-none border-t border-b border-r border-l border-slate-300 mb-2">
        <div className="lg:block absolute h-full w-0 md:w-20 bg-slate-200/20 border-0 md:border-r md:border-t-0 md:border-slate-200 left-0 top-0 pattern-background rounded-bl-xl"></div>
        <div className="lg:block absolute h-full w-0 md:w-20 bg-slate-200/20 border-0 md:border-l md:border-t-0 md:border-slate-200 right-0 top-0 pattern-background rounded-br-xl"></div>

        <div className="max-w-7xl mx-auto">
          {/* What We Do */}
          <section className="py-16 mb-12 border-b border-slate-200 mx-auto">
            <div className="max-w-7xl mx-auto md:px-16">
              <div className="text-center mb-12">
                <h2 className="font-open-sans font-thin text-3xl md:text-5xl md:leading-[1.3] text-slate-950 mb-4">
                  What We Do
                </h2>
                <p className="font-open-sans text-xl leading-[1.5] text-slate-950 max-w-3xl mx-auto">
                  VISIBI is the only agency engineered to optimise your brand for AI engines and build autonomous agents that transform how your business operates.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-slate-300 border transition-colors pattern-background mb-8">
                {geoMeans.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <div key={index} className="bg-white p-8">
                      <div className="w-12 h-12 bg-white flex items-center justify-center mb-6 flex-shrink-0">
                        <Icon size={32} strokeWidth={1.25} className="text-slate-950" />
                      </div>
                      <h3 className="font-space-mono pb-2 text-xl font-normal uppercase text-slate-950 mb-3">{item.title}</h3>
                      <p className="font-open-sans text-md text-slate-950">{item.description}</p>
                    </div>
                  )
                })}
              </div>

              <p className="font-open-sans text-lg leading-[1.7] text-gray-600 italic text-center max-w-3xl mx-auto">
                One partner for AI discovery + AI productivity.
              </p>
            </div>
          </section>

          {/* Core Services */}
          <section className="py-16 mb-12">
            <div className="max-w-7xl mx-auto md:px-16">
              <div className="text-center mb-12">
                <h2 className="font-open-sans font-thin text-3xl md:text-5xl md:leading-[1.3] text-slate-950 mb-4">
                  The Two Core VISIBI Solutions
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6 pattern-background p-4 border-slate-300 border">
                {services.map((service, index) => {
                  const Icon = service.icon
                  return (
                    <div key={index} className="bg-white border border-slate-300 p-8">
                      <div className="mb-6">
                        <Icon size={32} strokeWidth={1.25} className="text-slate-950" />
                      </div>
                      <h3 className="font-space-mono font-normal text-xl leading-[1.3] text-slate-950 mb-4 uppercase">
                        {service.title}
                      </h3>
                      <p className="font-open-sans text-md leading-[1.5] text-slate-950 mb-4">
                        {service.description}
                      </p>
                      {service.footer && (
                        <p className="font-open-sans text-sm italic text-slate-600">
                          {service.footer}
                        </p>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </section>

          {/* Core Services List */}
          <section className="py-16 mb-12 border-b border-slate-200">
            <div className="max-w-5xl mx-auto md:px-16">
              <h2 className="font-open-sans font-thin text-3xl md:text-5xl md:leading-[1.3] text-slate-950 mb-12 text-center">
                Core Services
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border-2 border-slate-200 p-6 rounded-lg hover:border-blue-700 hover:bg-blue-50/20 transition-all">
                  <div className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-12 h-12 bg-blue-700 text-white rounded-lg flex items-center justify-center">
                      <BrainCircuit className="w-6 h-6" />
                    </span>
                    <div>
                      <h3 className="font-space-mono font-bold text-lg text-slate-950 mb-2">GEO Consultancy & Implementation</h3>
                      <p className="font-open-sans text-sm text-slate-700">Comprehensive optimisation for visibility across ChatGPT, Gemini, Copilot, Claude, Perplexity, and beyond.</p>
                    </div>
                  </div>
                </div>
                <div className="border-2 border-slate-200 p-6 rounded-lg hover:border-blue-700 hover:bg-blue-50/20 transition-all">
                  <div className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-12 h-12 bg-blue-700 text-white rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6" />
                    </span>
                    <div>
                      <h3 className="font-space-mono font-bold text-lg text-slate-950 mb-2">SEO & Content Intelligence</h3>
                      <p className="font-open-sans text-sm text-slate-700">EEAT driven, NLP optimised content that builds topical and AI authority.</p>
                    </div>
                  </div>
                </div>
                <div className="border-2 border-slate-200 p-6 rounded-lg hover:border-blue-700 hover:bg-blue-50/20 transition-all">
                  <div className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-12 h-12 bg-blue-700 text-white rounded-lg flex items-center justify-center">
                      <Award className="w-6 h-6" />
                    </span>
                    <div>
                      <h3 className="font-space-mono font-bold text-lg text-slate-950 mb-2">Authority Context Optimisation (ACO)</h3>
                      <p className="font-open-sans text-sm text-slate-700">Guide PR and content to create signals AI interprets as authoritative.</p>
                    </div>
                  </div>
                </div>
                <div className="border-2 border-slate-200 p-6 rounded-lg hover:border-blue-700 hover:bg-blue-50/20 transition-all">
                  <div className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-12 h-12 bg-blue-700 text-white rounded-lg flex items-center justify-center">
                      <Bot className="w-6 h-6" />
                    </span>
                    <div>
                      <h3 className="font-space-mono font-bold text-lg text-slate-950 mb-2">AI Agent Development</h3>
                      <p className="font-open-sans text-sm text-slate-700">Autonomous, integrated AI workers for real operational tasks.</p>
                    </div>
                  </div>
                </div>
                <div className="border-2 border-slate-200 p-6 rounded-lg hover:border-blue-700 hover:bg-blue-50/20 transition-all">
                  <div className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-12 h-12 bg-blue-700 text-white rounded-lg flex items-center justify-center">
                      <ShieldCheck className="w-6 h-6" />
                    </span>
                    <div>
                      <h3 className="font-space-mono font-bold text-lg text-slate-950 mb-2">Agent Governance & Guardrails</h3>
                      <p className="font-open-sans text-sm text-slate-700">Safety, compliance, auditability, and transparency of reasoning.</p>
                    </div>
                  </div>
                </div>
                <div className="border-2 border-slate-200 p-6 rounded-lg hover:border-blue-700 hover:bg-blue-50/20 transition-all">
                  <div className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-12 h-12 bg-blue-700 text-white rounded-lg flex items-center justify-center">
                      <GraduationCap className="w-6 h-6" />
                    </span>
                    <div>
                      <h3 className="font-space-mono font-bold text-lg text-slate-950 mb-2">GEO & AI Training</h3>
                      <p className="font-open-sans text-sm text-slate-700">Workshops on LLM alignment, AIO content architecture, prompt engineering, and agent operations.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Why VISIBI */}
          <section className="py-24 mb-12">
            <div className="max-w-7xl mx-auto md:px-16">
              <div className="text-center mb-12">
                <h2 className="font-open-sans font-thin text-3xl md:text-5xl md:leading-[1.3] text-slate-950 mb-4">
                  Why VISIBI
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {whyVisibi.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <div key={index} className="text-center">
                      <div className="flex justify-center mb-6">
                        <Icon size={32} strokeWidth={1.25} className="text-slate-950" />
                      </div>
                      <h3 className="font-space-mono font-normal text-xl leading-[1.3] text-slate-950 mb-3 uppercase">
                        {item.title}
                      </h3>
                      <p className="font-open-sans text-md leading-[1.5] text-slate-950">
                        {item.description}
                      </p>
                    </div>
                  )
                })}
              </div>
              <div className="text-center mt-12 max-w-3xl mx-auto space-y-4">
                <p className="font-open-sans text-lg text-slate-950">
                  We blend human creativity with machine precision -
                </p>
                <p className="font-open-sans text-lg text-slate-950">
                  Delivering measurable visibility, trust, and operational efficiency in the AI era.
                </p>
              </div>
            </div>
          </section>

          {/* How We Work: Path A / Path B */}
          <section className="py-24 mb-12 bg-slate-50 border-y border-slate-200">
            <div className="max-w-7xl mx-auto px-8">
              <div className="text-center mb-16">
                <h2 className="font-space-mono text-3xl md:text-4xl font-bold text-slate-950 mb-6">
                  How We Work
                </h2>
                <p className="font-open-sans text-xl leading-relaxed text-slate-700 max-w-3xl mx-auto">
                  Two clear pathways. One mission: make you discoverable and fast.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                {/* Path A: GEO */}
                <div className="bg-white p-8 rounded-2xl border-2 border-slate-300 space-y-6">
                  <div className="space-y-3">
                    <h3 className="font-space-mono text-2xl font-bold text-slate-950">
                      Path A: GEO
                    </h3>
                    <p className="font-open-sans text-lg text-slate-700">
                      For brands that want to appear, rank, and convert in AI-driven discovery.
                    </p>
                  </div>
                  
                  <div className="space-y-4 pt-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-slate-950 text-white rounded-full flex items-center justify-center font-space-mono font-bold text-sm">
                        1
                      </div>
                      <div className="pt-1">
                        <h4 className="font-space-mono font-semibold text-base text-slate-950 mb-1">Audit</h4>
                        <p className="font-open-sans text-sm text-slate-700">Run your brand through 15+ AI engines. Identify gaps, conflicts, and missed opportunities.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-slate-950 text-white rounded-full flex items-center justify-center font-space-mono font-bold text-sm">
                        2
                      </div>
                      <div className="pt-1">
                        <h4 className="font-space-mono font-semibold text-base text-slate-950 mb-1">Optimise</h4>
                        <p className="font-open-sans text-sm text-slate-700">Fix structured data, entities, citations. Build AI-ready content. Guide authority signals.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-slate-950 text-white rounded-full flex items-center justify-center font-space-mono font-bold text-sm">
                        3
                      </div>
                      <div className="pt-1">
                        <h4 className="font-space-mono font-semibold text-base text-slate-950 mb-1">Implement</h4>
                        <p className="font-open-sans text-sm text-slate-700">Deploy across your site, CMS, and distribution channels.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-slate-950 text-white rounded-full flex items-center justify-center font-space-mono font-bold text-sm">
                        4
                      </div>
                      <div className="pt-1">
                        <h4 className="font-space-mono font-semibold text-base text-slate-950 mb-1">Monitor</h4>
                        <p className="font-open-sans text-sm text-slate-700">Track how LLMs interpret you. Watch mentions, sentiment, citation frequency.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-slate-950 text-white rounded-full flex items-center justify-center font-space-mono font-bold text-sm">
                        5
                      </div>
                      <div className="pt-1">
                        <h4 className="font-space-mono font-semibold text-base text-slate-950 mb-1">Refine</h4>
                        <p className="font-open-sans text-sm text-slate-700">Continuous iteration as AI models update and new engines emerge.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Path B: AI Agents */}
                <div className="bg-white p-8 rounded-2xl border-2 border-slate-300 space-y-6">
                  <div className="space-y-3">
                    <h3 className="font-space-mono text-2xl font-bold text-slate-950">
                      Path B: AI Agents
                    </h3>
                    <p className="font-open-sans text-lg text-slate-700">
                      For teams that want to automate workflows and scale execution.
                    </p>
                  </div>
                  
                  <div className="space-y-4 pt-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-slate-950 text-white rounded-full flex items-center justify-center font-space-mono font-bold text-sm">
                        1
                      </div>
                      <div className="pt-1">
                        <h4 className="font-space-mono font-semibold text-base text-slate-950 mb-1">Map</h4>
                        <p className="font-open-sans text-sm text-slate-700">Identify workflows that are repetitive, data-heavy, or time-consuming.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-slate-950 text-white rounded-full flex items-center justify-center font-space-mono font-bold text-sm">
                        2
                      </div>
                      <div className="pt-1">
                        <h4 className="font-space-mono font-semibold text-base text-slate-950 mb-1">Design</h4>
                        <p className="font-open-sans text-sm text-slate-700">Architect agent logic, set permissions, define guardrails and handoffs.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-slate-950 text-white rounded-full flex items-center justify-center font-space-mono font-bold text-sm">
                        3
                      </div>
                      <div className="pt-1">
                        <h4 className="font-space-mono font-semibold text-base text-slate-950 mb-1">Build</h4>
                        <p className="font-open-sans text-sm text-slate-700">Develop agents. Integrate with your tools (Slack, CRM, email, calendars, DBs).</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-slate-950 text-white rounded-full flex items-center justify-center font-space-mono font-bold text-sm">
                        4
                      </div>
                      <div className="pt-1">
                        <h4 className="font-space-mono font-semibold text-base text-slate-950 mb-1">Deploy</h4>
                        <p className="font-open-sans text-sm text-slate-700">Launch with oversight. Let agents run—with human review loops and logging.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-slate-950 text-white rounded-full flex items-center justify-center font-space-mono font-bold text-sm">
                        5
                      </div>
                      <div className="pt-1">
                        <h4 className="font-space-mono font-semibold text-base text-slate-950 mb-1">Scale</h4>
                        <p className="font-open-sans text-sm text-slate-700">Add agents for more functions. Train teams. Evolve governance as adoption grows.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center mt-12">
                <p className="font-open-sans text-lg text-slate-700 max-w-3xl mx-auto">
                  <span className="font-semibold text-slate-950">Not sure which path fits?</span> Book a discovery call. We'll assess where you are and recommend a starting point.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Divider */}
          <section className="py-16 border-b border-slate-200">
            <div className="text-center">
              <Link to="/tool">
                <Button className="inline-flex items-center px-6 py-6 bg-white text-slate-950 border border-slate-950 rounded-full font-medium hover:bg-slate-950 hover:text-white transition-colors">
                  Talk to our GEO Experts
                   <MessageSquareMore className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </section>

          {/* Featured Insights */}
          <section className="py-24 mb-12 border-b border-slate-200">
            <div className="max-w-7xl mx-auto md:px-16">
              <div className="text-center mb-12">
                <h2 className="font-open-sans font-thin text-3xl md:text-5xl md:leading-[1.3] text-slate-950 mb-4">
                  Insights
                </h2>
                <p className="font-open-sans text-lg leading-[1.5] text-slate-950 max-w-3xl mx-auto">
                  Explore the Next Wave of AI Discovery, Commerce, and Operations
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8 border-slate-300 border pattern-background p-4">
                {insights.map((insight, index) => {
                  const Icon = insight.icon
                  return (
                    <div key={index} className="bg-white border border-slate-300 p-8">
                      <div className="mb-6">
                        <Icon size={32} strokeWidth={1.25} className="text-slate-950" />
                      </div>
                      <h3 className="font-space-mono font-normal text-xl leading-[1.3] text-slate-950 mb-4 uppercase">
                        {insight.title}
                      </h3>
                      <p className="font-open-sans text-md leading-[1.5] text-slate-950 mb-6">
                        {insight.description}
                      </p>
                      <Link to="/insights">
                        <Button className="inline-flex items-center px-4 py-2 bg-white text-slate-950 border border-slate-300 rounded-full text-sm font-medium hover:bg-slate-50 transition-colors">
                          Read More
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  )
                })}
              </div>

              <div className="text-right">
                <Link to="/insights">
                  <Button className="inline-flex items-center px-6 py-3 bg-white text-slate-950 border border-slate-300 rounded-full font-medium hover:bg-slate-50 transition-colors">
                    View All Insights
                     <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="py-24 mb-12 border-b border-slate-200">
            <div className="max-w-4xl mx-auto md:px-16">
              <div className="text-center mb-12">
                <h2 className="font-open-sans font-thin text-3xl md:text-5xl md:leading-[1.3] text-slate-950 mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="font-open-sans text-lg text-slate-600">Everything you need to know about AI visibility and agents</p>
              </div>
              <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-white border-2 border-slate-200 overflow-hidden rounded-lg hover:border-blue-700 transition-all">
                    <button
                      onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                      className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-blue-50/30 transition-colors"
                    >
                      <div className="flex items-start gap-4 flex-1">
                        <span className="flex-shrink-0 w-8 h-8 bg-blue-700 text-white rounded-full flex items-center justify-center text-sm font-bold font-space-mono">
                          {index + 1}
                        </span>
                        <h3 className="font-open-sans font-semibold text-lg text-slate-950 pr-4">{faq.question}</h3>
                      </div>
                      <div className="flex-shrink-0 w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                        {openFaqIndex === index ? (
                          <ChevronUp className="w-5 h-5 text-slate-950" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-slate-950" />
                        )}
                      </div>
                    </button>
                    {openFaqIndex === index && (
                      <div className="px-6 pb-5 pt-2 bg-blue-50/20 border-t border-slate-200">
                        <div className="ml-12">
                          <p className="font-open-sans text-base leading-relaxed text-slate-700">{faq.answer}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Divider */}
          <section className="py-8 border-b border-slate-200">
            <div className="text-center">
              <Link to="/how-we-work">
                <Button className="inline-flex items-center px-6 py-3 bg-white text-slate-950 border border-slate-950 rounded-full font-medium hover:bg-slate-950 hover:text-white transition-colors">
                  Learn more about our strategies
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </main>

      {/* Final CTA Section */}
      <section className="max-w-[90%] mx-auto px-12 py-12 relative z-10 bg-white rounded-xl rounded-tl-none rounded-tr-none border-t border-b border-r border-l border-slate-300 mb-32">
        <div className="lg:block absolute h-full w-0 md:w-10 bg-slate-200/20 border-0 md:border-r md:border-t-0 md:border-slate-200 left-0 top-0 pattern-background rounded-bl-xl"></div>
        <div className="lg:block absolute h-full w-0 md:w-10 bg-slate-200/20 border-0 md:border-l md:border-t-0 md:border-slate-200 right-0 top-0 pattern-background rounded-br-xl"></div>

        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="font-open-sans font-thin text-4xl md:text-5xl md:leading-[1.3] text-slate-950">
            Be the Brand AI Finds. Be the Business AI Accelerates.
          </h2>
          <p className="font-open-sans text-xl leading-[1.7] text-slate-950 pb-8">
            Start your AI visibility and automation journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/tool">
              <Button className="inline-flex items-center px-8 py-6 bg-slate-950 text-white rounded-full font-semibold hover:bg-slate-800 transition-colors">
                <Sparkles className="w-5 h-5 mr-2" />
                Get Your Free AI Visibility Audit
              </Button>
            </Link>
            <Link to="/contact">
              <Button className="inline-flex items-center px-8 py-6 bg-white text-slate-950 border-2 border-slate-950 rounded-full font-semibold hover:bg-slate-50 transition-colors">
                Book a Strategy Call
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-[90%] mx-auto px-8 py-12 mt-24 border-t border-gray-200 bg-white rounded-xl rounded-tl-none rounded-tr-none mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <img src="/goVisibi-icon.svg" alt="VISIBI Logo" className="h-8 w-8" />
              <span className="text-2xl font-bold bg-slate-950 bg-clip-text text-transparent">VISIBI</span>
            </div>
            <p className="font-open-sans text-lg text-slate-900 max-w-md leading-relaxed">
              Track and manage your brand's presence across leading AI platforms.
            </p>
            <div className="flex gap-6">
              <a href="https://github.com" className="font-space-mono text-sm text-gray-600 hover:text-blue-700 uppercase tracking-wide">
                Github
              </a>
              <a href="https://linkedin.com" className="font-space-mono text-sm text-gray-600 hover:text-blue-700 uppercase tracking-wide">
                LinkedIn
              </a>
            </div>
          </div>
          <div className="space-y-8">
            <div>
              <h3 className="font-sans text-xl text-slate-950 mb-2">
                Want your brand to stand out in the age of AI conversations?
              </h3>
              <p className="text-sm text-slate-600">
                Stay informed with expert updates on brand visibility across AI platforms.
              </p>
            </div>
            <div className="flex gap-2">
              <Input type="email" placeholder="Email Address" className="flex-1 font-space-mono text-sm placeholder:text-gray-400 rounded-full text-gray-900" />
              <Button className="bg-slate-900 text-white hover:bg-gray-800 font-space-mono text-sm uppercase px-6 rounded-full">Start Now</Button>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-space-mono text-xs text-gray-500">© 2025 VISIBI - ALL RIGHTS RESERVED</p>
          <div className="flex gap-6">
            <a href="#" className="font-space-mono text-xs text-gray-600 hover:text-blue-700 uppercase tracking-wide">
              Terms of Use
            </a>
            <a href="#" className="font-space-mono text-xs text-gray-600 hover:text-blue-700 uppercase tracking-wide">
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

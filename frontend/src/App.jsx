import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ComingSoon from './pages/ComingSoon'
import AboutPage from './pages/AboutPage'
import GEOPage from './pages/GEOPage'
import SEOPage from './pages/SEOPage'
import PPCPage from './pages/PPCPage'
import InsightsPage from './pages/insights/InsightsPage'
import BlogPostPage from './components/pages/BlogPostPage'
import ToolPage from './pages/ToolPage'
import HowWeWorkPage from './pages/HowWeWorkPage'
import ContactPage from './pages/ContactPage'
import AIAgentsPage from './pages/AIAgentsPage'
import ScrollToTop from './components/ScrollToTop'
import './index.css'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/coming-soon" element={<ComingSoon />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/geo" element={<GEOPage />} />
        <Route path="/seo" element={<SEOPage />} />
        <Route path="/ppc" element={<PPCPage />} />
        <Route path="/ai-agents" element={<AIAgentsPage />} />
        <Route path="/insights" element={<InsightsPage />} />
        <Route path="/insights/:slug" element={<BlogPostPage />} />
        <Route path="/tool" element={<ToolPage />} />
        <Route path="/how-we-work" element={<HowWeWorkPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Router>
  )
}

export default App

import { useParams, Link, useNavigate } from 'react-router-dom'
import { blogPosts } from '@/data/blogPosts'
import { Button } from '@/components/ui/button'
import Navigation from '@/components/Navigation'
import { Input } from '@/components/ui/input'

export default function BlogPostPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const post = blogPosts.find(p => p.slug === slug)
  if (!post) return <div className="p-12 text-center">Post not found.</div>
  const related = blogPosts.filter(p => post.relatedPosts.includes(p.id))

  return (
    <div className="min-h-screen relative line-pattern bg-slate-50">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      <Navigation currentPage="insights" />
      
      {/* Hero Section with Title */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-16">
          {/* Tags */}
          <div className="flex gap-2 mb-6">
            {post.tags.map(tag => (
              <span key={tag} className="font-space-mono text-xs bg-slate-950 text-white rounded-full px-4 py-1.5 uppercase tracking-wide">{tag}</span>
            ))}
          </div>
          {/* Title */}
          <h1 className="font-open-sans text-4xl md:text-5xl lg:text-6xl font-bold text-slate-950 mb-6 leading-tight">{post.title}</h1>
          {/* Meta info */}
          <div className="flex items-center gap-6 text-sm text-slate-600 mb-8">
            <span className="font-space-mono">{post.date}</span>
            <span className="font-space-mono">{post.readTime}</span>
          </div>
          {/* Author */}
          <div className="flex items-center gap-4">
            <img src={post.author.avatar} alt={post.author.name} className="w-14 h-14 rounded-full border-2 border-slate-300" />
            <div>
              <div className="font-open-sans font-semibold text-slate-950 text-lg">{post.author.name}</div>
              <div className="font-space-mono text-sm text-slate-500">{post.author.position}</div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero image */}
        <img src={post.heroImage} alt={post.title} className="w-full h-[400px] object-cover rounded-2xl mb-12 shadow-lg" />
        
        {/* Article content with better typography */}
        <article 
          className="prose prose-lg prose-slate max-w-none mb-16
            prose-headings:font-open-sans prose-headings:font-bold prose-headings:text-slate-950
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b prose-h2:border-slate-200 prose-h2:pb-4
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-slate-800
            prose-p:font-open-sans prose-p:text-lg prose-p:text-slate-700 prose-p:leading-relaxed prose-p:mb-6
            prose-li:font-open-sans prose-li:text-lg prose-li:text-slate-700 prose-li:leading-relaxed
            prose-ul:my-6 prose-ol:my-6
            prose-strong:text-slate-950 prose-strong:font-semibold
            prose-em:text-slate-800
            prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
            bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12"
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />
        {/* Social share */}
        <div className="bg-slate-100 border border-slate-200 rounded-xl p-6 mb-12">
          <h3 className="font-open-sans font-semibold text-slate-950 mb-4">Share this article</h3>
          <div className="flex gap-3">
            <a 
              href={`https://www.linkedin.com/shareArticle?url=https://visibi.com/insights/${post.slug}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-space-mono text-sm bg-slate-950 text-white px-6 py-3 rounded-full hover:bg-slate-800 transition-colors uppercase tracking-wide"
            >
              LinkedIn
            </a>
            <a 
              href={`https://twitter.com/intent/tweet?url=https://visibi.com/insights/${post.slug}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-space-mono text-sm bg-slate-950 text-white px-6 py-3 rounded-full hover:bg-slate-800 transition-colors uppercase tracking-wide"
            >
              Twitter
            </a>
            <a 
              href={`mailto:?subject=${encodeURIComponent(post.title)}&body=https://visibi.com/insights/${post.slug}`} 
              className="font-space-mono text-sm bg-slate-950 text-white px-6 py-3 rounded-full hover:bg-slate-800 transition-colors uppercase tracking-wide"
            >
              Email
            </a>
          </div>
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <div className="mb-16">
            <h2 className="font-open-sans text-3xl font-bold text-slate-950 mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {related.map(rp => (
                <Link 
                  key={rp.id} 
                  to={`/insights/${rp.slug}`} 
                  className="group block bg-white border border-slate-200 rounded-xl p-6 hover:border-slate-950 hover:shadow-lg transition-all"
                >
                  <div className="font-open-sans font-semibold text-slate-950 mb-2 text-lg group-hover:text-blue-600 transition-colors">{rp.title}</div>
                  <div className="font-space-mono text-xs text-slate-500 mb-3">{rp.date} • {rp.readTime}</div>
                  <div className="font-open-sans text-slate-600 text-sm leading-relaxed">{rp.excerpt}</div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Newsletter CTA */}
        <section className="py-16 px-8 mt-16 bg-slate-950 rounded-2xl text-white text-center shadow-xl">
          <h2 className="font-open-sans text-3xl md:text-4xl font-bold mb-4">Stay Ahead of AI Search Evolution</h2>
          <p className="font-open-sans text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            Get monthly insights, research findings, and strategic frameworks delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
            <Input 
              type="email" 
              placeholder="your@email.com" 
              className="flex-1 bg-white text-slate-950 rounded-full px-6 py-3 font-open-sans border-0" 
            />
            <Button className="bg-white text-slate-950 hover:bg-slate-100 font-space-mono font-bold px-8 py-3 rounded-full uppercase tracking-wide">
              Subscribe
            </Button>
          </div>
        </section>

        <div className="mt-12 text-center">
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
            className="font-space-mono border-slate-300 hover:border-slate-950 hover:bg-slate-50 px-8 py-3 rounded-full uppercase tracking-wide"
          >
            ← Back to Insights
          </Button>
        </div>
      </main>
      {/* Footer */}
      <footer className="max-w-[90%] mx-auto px-8 py-12 mt-24 border-t border-gray-200 bg-white rounded-xl rounded-bl-none rounded-br-none z-10">
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
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-space-mono text-sm text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-400 uppercase tracking-wide"
              >
                Github
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-space-mono text-sm text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-400 uppercase tracking-wide"
              >
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
          <p className="font-space-mono text-xs text-gray-500">© 2025 VISIBI — ALL RIGHTS RESERVED</p>
        </div>
      </footer>
    </div>
  )
}

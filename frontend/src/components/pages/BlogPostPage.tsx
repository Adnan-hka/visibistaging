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
    <div className="min-h-screen relative line-pattern">
      <Navigation currentPage="insights" />
      <main className="max-w-4xl mx-auto py-12">
        {/* Tags */}
        <div className="flex gap-2 mb-4">
          {post.tags.map(tag => (
            <span key={tag} className="text-xs bg-slate-100 border border-slate-300 rounded-full px-2 py-0.5 text-slate-700">{tag}</span>
          ))}
        </div>
        {/* Title, date, read time */}
        <h1 className="text-3xl md:text-5xl font-bold text-slate-950 mb-2">{post.title}</h1>
        <div className="flex gap-4 text-xs text-slate-500 mb-6">
          <span>{post.date}</span>
          <span>{post.readTime}</span>
        </div>
        {/* Hero image */}
        <img src={post.heroImage} alt={post.title} className="w-full h-64 object-cover rounded-xl mb-8" />
        {/* Author */}
        <div className="flex items-center gap-4 mb-8">
          <img src={post.author.avatar} alt={post.author.name} className="w-12 h-12 rounded-full border border-slate-300" />
          <div>
            <div className="font-semibold text-slate-950">{post.author.name}</div>
            <div className="text-xs text-slate-500">{post.author.position}</div>
          </div>
        </div>
        {/* Article content */}
        <article className="prose prose-lg max-w-none mb-12" dangerouslySetInnerHTML={{ __html: post.content }} />
        {/* Social share */}
        <div className="flex gap-4 mb-12">
          <a href={`https://www.linkedin.com/shareArticle?url=https://visibi.com/insights/${post.slug}`} target="_blank" rel="noopener noreferrer" className="text-blue-700 font-bold">LinkedIn</a>
          <a href={`https://twitter.com/intent/tweet?url=https://visibi.com/insights/${post.slug}`} target="_blank" rel="noopener noreferrer" className="text-blue-700 font-bold">Twitter</a>
          <a href={`mailto:?subject=${encodeURIComponent(post.title)}&body=https://visibi.com/insights/${post.slug}`} className="text-blue-700 font-bold">Email</a>
        </div>
        {/* Related articles */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Related Articles</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {related.map(rp => (
              <Link key={rp.id} to={`/insights/${rp.slug}`} className="block bg-white border border-slate-300 rounded-xl p-4 hover:border-blue-700">
                <div className="font-semibold text-slate-950 mb-1">{rp.title}</div>
                <div className="text-xs text-slate-500 mb-2">{rp.date} • {rp.readTime}</div>
                <div className="text-slate-700">{rp.excerpt}</div>
              </Link>
            ))}
          </div>
        </div>
        {/* Newsletter CTA */}
        <section className="py-12 mt-16 bg-black rounded-xl text-white text-center">
          <h2 className="text-3xl font-bold mb-2">Stay Ahead of AI Search Evolution</h2>
          <p className="mb-6">Get monthly insights, research findings, and strategic frameworks delivered to your inbox.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Input type="email" placeholder="your@email.com" className="flex-1 text-black rounded-full px-4 py-2" />
            <Button className="bg-white text-black hover:bg-slate-200 font-bold px-6 rounded-full">Subscribe</Button>
          </div>
        </section>
        <div className="mt-8">
          <Button variant="outline" onClick={() => navigate(-1)}>Back to Insights</Button>
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

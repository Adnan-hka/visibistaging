# Blog System Guide for VISIBI

This guide explains how to use and extend the blog system for the Insights section.

## Structure

- **Blog Data:**
  - `frontend/src/data/blogPosts.ts` — All blog post data. Add new posts here.
- **Blog Listing Page:**
  - `frontend/src/pages/insights/InsightsPage.jsx` — Displays all blog posts, category filters, and newsletter section.
- **Individual Blog Post Page:**
  - `frontend/src/components/pages/BlogPostPage.tsx` — Renders a full article, author, sidebar, social sharing, related posts, and newsletter.

## Adding a New Blog Post

1. Open `frontend/src/data/blogPosts.ts`.
2. Add a new object to the `blogPosts` array:

```typescript
{
  id: "unique-id",
  title: "Article Title",
  slug: "url-slug",
  category: "GEO",
  tags: ["Tag 1", "Tag 2"],
  date: "November 15, 2025",
  readTime: "8 min read",
  excerpt: "Brief description...",
  heroImage: "https://images.unsplash.com/...",
  author: { name, position, avatar },
  content: `<h2>Your HTML content...</h2>`,
  relatedPosts: ["id1", "id2"]
}
```

- Use valid HTML in the `content` field for rich formatting.
- Use the `relatedPosts` array to link to other articles by their `id`.

## Routing

- Blog listing: `/insights`
- Individual post: `/insights/:slug`

## Design & UX

- Consistent with VISIBI's black/white theme, Inter + Space Mono fonts, and border styling.
- Responsive grid layouts and hover effects.
- Newsletter CTA appears on both listing and post pages.

## Extending

- To add new categories, simply use a new category string in a post.
- To customize the sidebar or social sharing, edit `BlogPostPage.tsx`.

## Example Navigation

- Go to Insights → Click a blog card or "Read More" → View full article → Explore related articles → Back to Insights

---
For questions or improvements, see the code comments or contact the VISIBI dev team.

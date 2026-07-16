import './TravelPostCard.css'

import { Clock, Heart, MapPin } from 'lucide-react'

import { TRAVEL_POST_CATEGORY_LABEL } from '../../data/travelPosts'

const dateFormatter = new Intl.DateTimeFormat('ru-RU', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

export default function TravelPostCard({ post }) {
  return (
    <article className="travel-post-card">
      <div className="travel-post-card-top">
        <span className={`travel-post-card-category travel-post-card-category--${post.category}`}>
          {TRAVEL_POST_CATEGORY_LABEL[post.category]}
        </span>
        <span className="travel-post-card-reading">
          <Clock size={14} />
          {post.readingTime} мин
        </span>
      </div>

      <h3 className="travel-post-card-title">{post.title}</h3>
      <p className="travel-post-card-excerpt">{post.excerpt}</p>

      <div className="travel-post-card-meta">
        <span className="travel-post-card-place">
          <MapPin size={14} />
          {post.city}, {post.country}
        </span>

        <span className="travel-post-card-author">{post.author}</span>

        <span className="travel-post-card-likes">
          <Heart size={14} />
          {post.likes}
        </span>

        <time className="travel-post-card-date">{dateFormatter.format(new Date(post.createdAt))}</time>
      </div>
    </article>
  )
}

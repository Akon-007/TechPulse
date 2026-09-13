import { ArrowUpRight } from "lucide-react";
import { Post } from "../types";

export default function PostCard({ post, index }: { post: Post; index: number }) {
  return (
    <article 
      id={`post-card-${index}`}
      className="group flex flex-col rounded-2xl bg-white overflow-hidden border border-slate-100 hover:border-purple-200 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/5"
    >
      <div className="aspect-[3/2] w-full overflow-hidden rounded-2xl bg-slate-100 relative">
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-xs font-semibold text-purple-700 shadow-sm">
          {post.category}
        </span>
      </div>
      <div className="flex flex-col flex-1 p-5 gap-3">
        <a 
          href={`#read-${index}`}
          className="group/link flex items-start justify-between gap-2"
        >
          <h3 className="text-lg font-semibold text-slate-900 leading-snug group-hover/link:text-purple-600 transition-colors">
            {post.title}
          </h3>
          <ArrowUpRight
            className="mt-1 h-4 w-4 shrink-0 text-slate-400 transition-transform group-hover/link:text-purple-600 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
            strokeWidth={2}
          />
        </a>
        <p className="text-sm leading-relaxed text-slate-500 flex-1">
          {post.excerpt}
        </p>
        <div className="mt-3 flex items-center gap-3 pt-4 border-t border-slate-100">
          <img
            src={post.avatar}
            alt={post.author}
            className="h-10 w-10 rounded-full object-cover ring-2 ring-purple-100"
          />
          <div className="text-sm">
            <div className="font-medium text-slate-900">{post.author}</div>
            <div className="text-xs text-slate-500">{post.date}</div>
          </div>
        </div>
      </div>
    </article>
  );
}

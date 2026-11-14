import { Link } from 'react-router-dom'

export function SiteHeader({ meta }: { meta: string }) {
  return (
    <header className="site-header">
      <Link className="brand" to="/">
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <rect x="3" y="14" width="26" height="8" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path d="M8 14 L11.2 8.5 H20.8 L24 14" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="9.5" cy="23.5" r="2.1" fill="currentColor" />
          <circle cx="22.5" cy="23.5" r="2.1" fill="currentColor" />
        </svg>
        <div>
          <strong>Hệ thống ô tô xăng</strong>
          <span>Nhìn xe như một hệ thống</span>
        </div>
      </Link>
      <p className="header-meta">{meta}</p>
    </header>
  )
}

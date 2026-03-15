'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/client/lib/cn'

const NAV_ITEMS = [
  { label: 'ダッシュボード', href: '/',           icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { label: 'チーム管理',     href: '/team',        icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
  { label: '要件定義',       href: '/requirements', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
  { label: 'AI分析・生成',   href: '/ai',          icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
  { label: 'ロードマップ',   href: '/roadmap',     icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7' },
  { label: 'タスク管理',     href: '/tasks',       icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
  { label: '学習リソース',   href: '/learning',    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
] as const

export function DashboardSidebar() {
  const pathname = usePathname()

  function isActive(href: string) {
    if (href === '/') return pathname === '/'
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <aside className="w-[256px] shrink-0 flex flex-col h-full bg-white border-r border-[#CBCCC9]">
      {/* Logo */}
      <div className="flex items-center h-[72px] px-6 border-b border-[#CBCCC9]">
        <span className="font-[family-name:var(--font-jetbrains-mono)] text-[#FF8400] font-bold text-lg tracking-tight">
          ROADMAP AI
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <p className="px-3 mb-2 text-xs font-semibold text-[#999999] uppercase tracking-wider font-[family-name:var(--font-geist-sans)]">
          メインメニュー
        </p>
        <ul className="flex flex-col gap-0.5">
          {NAV_ITEMS.map(item => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors font-[family-name:var(--font-geist-sans)]',
                  isActive(item.href)
                    ? 'bg-[#FF8400]/10 text-[#FF8400] font-semibold'
                    : 'text-[#444444] hover:bg-[#F2F3F0] font-normal'
                )}
              >
                <svg
                  className="w-4 h-4 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                </svg>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* User */}
      <div className="px-4 py-4 border-t border-[#CBCCC9]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#F2F3F0] flex items-center justify-center shrink-0">
            <span className="font-[family-name:var(--font-jetbrains-mono)] text-[#111111] text-sm font-bold">田</span>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-[#111111] truncate font-[family-name:var(--font-geist-sans)]">田中 太郎</p>
            <p className="text-xs text-[#999999] truncate font-[family-name:var(--font-geist-sans)]">tanaka@example.com</p>
          </div>
        </div>
      </div>
    </aside>
  )
}

import {
  Home, Bot, GitBranch, AudioLines, BookOpen,
  Megaphone, Phone, ShieldCheck, PhoneIncoming, Radio, Clock,
  Users, CalendarCheck, CalendarClock, BarChart3, TrendingUp,
  FileBarChart, PhoneCall, ArrowRightLeft, Puzzle, AppWindow,
  Receipt, Coins, FileText, CreditCard, Key, Webhook, Gauge,
  ScrollText, Scale, Fence, Ban, BookMarked, FlaskConical,
  Sparkles, MessageCircle, Settings, Blocks, Server, Code2,
  Shield, LifeBuoy, Activity, Sliders, Rocket, Package,
  Plus, PenLine, Star, Mic, Globe, Type, FolderOpen,
} from 'lucide-react'

export interface SubNavItem {
  title: string
  href: string
  icon: React.ElementType
}

export interface SubNavSection {
  heading: string
  items: SubNavItem[]
}

export interface NavEntry {
  key: string
  label: string
  icon: React.ElementType
  href: string
  items?: SubNavItem[]
  sections?: SubNavSection[]
  subNavWidth?: number
}

export interface NavGroup {
  entries: NavEntry[]
}

export const navigation: NavGroup[] = [
  {
    entries: [
      { key: 'home', label: 'Home', icon: Home, href: '/' },
    ],
  },
  {
    entries: [
      {
        key: 'build', label: 'Build', icon: Blocks, href: '/agents',
        subNavWidth: 240,
        sections: [
          {
            heading: 'Agents',
            items: [
              { title: 'All Agents', href: '/agents', icon: Bot },
              { title: 'Curated Agents', href: '/agents/curated', icon: Sparkles },
              { title: 'Custom Agents', href: '/agents/custom', icon: PenLine },
              { title: 'Build New Agent', href: '/agents/new', icon: Plus },
            ],
          },
          {
            heading: 'Workflows',
            items: [
              { title: 'All Workflows', href: '/workflows', icon: GitBranch },
              { title: 'Curated Workflows', href: '/workflows/curated', icon: Sparkles },
              { title: 'Custom Workflows', href: '/workflows/custom', icon: PenLine },
              { title: 'Build New Workflow', href: '/workflows/new', icon: Plus },
            ],
          },
          {
            heading: 'Voices',
            items: [
              { title: 'Favorites', href: '/voices/favorites', icon: Star },
              { title: 'Voice Library', href: '/voices', icon: AudioLines },
              { title: 'Clone a Voice', href: '/voices/clone', icon: Mic },
            ],
          },
          {
            heading: 'Intelligence',
            items: [
              { title: 'Knowledge Base', href: '/knowledge', icon: BookOpen },
              { title: 'Websites', href: '/knowledge/websites', icon: Globe },
              { title: 'Documentation', href: '/knowledge/docs', icon: FileText },
              { title: 'Text Based', href: '/knowledge/text', icon: Type },
              { title: 'Assets & Files', href: '/knowledge/assets', icon: FolderOpen },
            ],
          },
        ],
      },
      {
        key: 'system', label: 'System', icon: Server, href: '/phone-numbers',
        items: [
          { title: 'Phone Numbers', href: '/phone-numbers', icon: PhoneCall },
          { title: 'Call Transfers', href: '/transfers', icon: ArrowRightLeft },
          { title: 'Integrations', href: '/integrations', icon: Puzzle },
          { title: 'Apps', href: '/apps', icon: AppWindow },
        ],
      },
      {
        key: 'outreach', label: 'Outreach', icon: Megaphone, href: '/campaigns',
        items: [
          { title: 'Campaigns', href: '/campaigns', icon: Megaphone },
          { title: 'Call History', href: '/calls', icon: Phone },
          { title: 'Call Rules', href: '/call-rules', icon: ShieldCheck },
        ],
      },
      {
        key: 'inbound', label: 'Inbound', icon: PhoneIncoming, href: '/routing',
        items: [
          { title: 'Call Routing', href: '/routing', icon: PhoneIncoming },
          { title: 'Live Calls', href: '/live-calls', icon: Radio },
          { title: 'Business Hours', href: '/business-hours', icon: Clock },
        ],
      },
      {
        key: 'leads', label: 'Leads', icon: Users, href: '/leads',
        items: [
          { title: 'Lead Lists', href: '/leads', icon: Users },
          { title: 'Appointments', href: '/appointments', icon: CalendarCheck },
          { title: 'Call Schedules', href: '/schedules', icon: CalendarClock },
        ],
      },
    ],
  },
  {
    entries: [
      {
        key: 'insights', label: 'Insights', icon: BarChart3, href: '/analytics',
        items: [
          { title: 'Analytics', href: '/analytics', icon: BarChart3 },
          { title: 'Metrics', href: '/metrics', icon: TrendingUp },
          { title: 'Reports', href: '/reports', icon: FileBarChart },
        ],
      },
      { key: 'event-logs', label: 'Event Logs', icon: Activity, href: '/event-logs' },
    ],
  },
  {
    entries: [
      {
        key: 'billing', label: 'Billing', icon: CreditCard, href: '/usage',
        items: [
          { title: 'Usage', href: '/usage', icon: Receipt },
          { title: 'Credits', href: '/credits', icon: Coins },
          { title: 'Invoices', href: '/invoices', icon: FileText },
          { title: 'Payment Method', href: '/payment', icon: CreditCard },
        ],
      },
      {
        key: 'developer', label: 'Developer', icon: Code2, href: '/api-keys',
        items: [
          { title: 'API Keys', href: '/api-keys', icon: Key },
          { title: 'Webhooks', href: '/webhooks', icon: Webhook },
          { title: 'Rate Limits', href: '/rate-limits', icon: Gauge },
          { title: 'Logs', href: '/logs', icon: ScrollText },
        ],
      },
      {
        key: 'privacy', label: 'Privacy', icon: Shield, href: '/compliance',
        items: [
          { title: 'Compliance', href: '/compliance', icon: Scale },
          { title: 'Guardrails', href: '/guardrails', icon: Fence },
          { title: 'DNC Lists', href: '/dnc', icon: Ban },
        ],
      },
    ],
  },
  {
    entries: [
      {
        key: 'support', label: 'Support', icon: LifeBuoy, href: '/sandbox',
        items: [
          { title: 'Sandbox', href: '/sandbox', icon: FlaskConical },
          { title: 'Composer', href: '/composer', icon: Sparkles },
          { title: 'Get in Touch', href: '/contact', icon: MessageCircle },
        ],
      },
      {
        key: 'docs', label: 'Documentation', icon: BookMarked, href: '/docs/introduction',
        subNavWidth: 280,
        items: [
          { title: 'Introduction', href: '/docs/introduction', icon: BookOpen },
          { title: 'Quickstart', href: '/docs/quickstart', icon: Rocket },
          { title: 'Voice Agents', href: '/docs/voice-agents', icon: Bot },
          { title: 'Campaigns', href: '/docs/campaigns', icon: Megaphone },
          { title: 'Webhooks & Events', href: '/docs/webhooks', icon: Webhook },
          { title: 'API Reference', href: '/docs/api-reference', icon: Code2 },
          { title: 'SDKs', href: '/docs/sdks', icon: Package },
        ],
      },
    ],
  },
  {
    entries: [
      {
        key: 'settings', label: 'Settings', icon: Settings, href: '/settings/general',
        items: [
          { title: 'General', href: '/settings/general', icon: Sliders },
          { title: 'Members', href: '/settings/members', icon: Users },
          { title: 'API Keys', href: '/settings/api-keys', icon: Key },
          { title: 'Billing', href: '/settings/billing', icon: CreditCard },
        ],
      },
    ],
  },
]

export function findActiveSection(pathname: string): string | null {
  for (const group of navigation) {
    for (const entry of group.entries) {
      if (entry.href === pathname && !entry.items && !entry.sections) return entry.key
      if (entry.items) {
        for (const item of entry.items) {
          if (pathname === item.href || pathname.startsWith(item.href + '/')) {
            return entry.key
          }
        }
      }
      if (entry.sections) {
        for (const sec of entry.sections) {
          for (const item of sec.items) {
            if (pathname === item.href || pathname.startsWith(item.href + '/')) {
              return entry.key
            }
          }
        }
      }
    }
  }
  return null
}

export function getSection(key: string): NavEntry | null {
  for (const group of navigation) {
    for (const entry of group.entries) {
      if (entry.key === key) return entry
    }
  }
  return null
}

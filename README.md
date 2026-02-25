# Boilerplate Webapp

A production-ready Next.js dashboard boilerplate with two apps: **Studio** (tenant-facing dashboard) and **Console** (admin panel). Features collapsible sidebar, sub-navigation sections, dark/light theme, accent color picker, global search, org switcher, and responsive layout — all built with React 19, Next.js 15, and Tailwind CSS 4.

## Quick Start

### Docker (recommended)

```bash
# Studio (port 3000)
docker compose -f infra/docker-compose.dev.yml up studio

# Console (port 3001)
docker compose -f infra/docker-compose.dev.yml up console
```

### Local

```bash
cd apps/studio && npm install && npm run dev    # http://localhost:3000
cd apps/console && npm install && npm run dev   # http://localhost:3001
```

## Structure

```
boilerplate-webapp/
├── apps/
│   ├── studio/              # Tenant dashboard (port 3000)
│   │   ├── src/
│   │   │   ├── app/         # Next.js pages (dashboard, settings, docs, etc.)
│   │   │   ├── components/
│   │   │   │   ├── layout/  # Sidebar, top-nav, sub-nav, org-switcher, search
│   │   │   │   └── ui/      # Shared components (cards, tables, badges, tabs)
│   │   │   └── lib/         # API client, theme context, page header context
│   │   └── Dockerfile
│   └── console/             # Admin panel (port 3001)
│       ├── src/
│       │   ├── app/         # Dashboard, status, tenants, analytics, settings
│       │   ├── components/  # Layout, status tabs, theme toggle
│       │   ├── lib/         # API client
│       │   └── styles/      # CSS modules
│       └── Dockerfile
├── infra/
│   └── docker-compose.dev.yml
└── README.md
```

## Customization

- **Brand name**: Search and replace "Aerwave" in layout components
- **Nav structure**: Edit `apps/studio/src/components/layout/nav-data.ts`
- **Theme colors**: Edit accent options in `apps/studio/src/lib/theme-context.tsx`
- **Pages**: Add/remove route folders under `src/app/(dashboard)/`
- **API integration**: Update `src/lib/api.ts` with your backend URL

## Tech Stack

- React 19, Next.js 15, TypeScript 5.7
- Tailwind CSS 4 (PostCSS)
- Lucide React icons (studio)
- Docker multi-stage builds

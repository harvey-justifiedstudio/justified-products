import { useState } from 'react'
import {
  Button,
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Separator,
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@justified/ui'
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Download,
  Plus,
  TrendingUp,
  Users,
  Target,
  Zap,
  DollarSign,
  BarChart3,
} from 'lucide-react'

const SLIDES = [
  'Cover',
  'Problem',
  'Solution',
  'Market',
  'Traction',
  'Team',
  'The Ask',
]

// ── Individual slide layouts ──────────────────────────────────────────────────

function CoverSlide() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center gap-6">
      <Badge variant="outline" className="text-xs tracking-widest uppercase">Seed Round · 2025</Badge>
      <div>
        <h1 className="font-display text-6xl font-bold text-foreground tracking-tight leading-none mb-3">
          Justified Studio
        </h1>
        <p className="text-xl text-muted-foreground max-w-md">
          The creative workspace built for modern agency teams.
        </p>
      </div>
      <Separator className="w-16" />
      <div className="flex gap-3">
        <Button size="lg">View Demo</Button>
        <Button size="lg" variant="outline">Download Deck</Button>
      </div>
    </div>
  )
}

function ProblemSlide() {
  const problems = [
    {
      icon: <Users className="w-5 h-5" />,
      title: 'Fragmented tools',
      body: 'Teams juggle Figma, Notion, Slack and five other apps just to ship a single project.',
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      title: 'No visibility',
      body: 'Managers have no real-time view of progress. Status updates are always stale.',
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: 'Slow delivery',
      body: 'Handoffs between design, copy and dev take days. Approval loops kill momentum.',
    },
  ]
  return (
    <div className="flex flex-col h-full gap-8">
      <div>
        <Badge className="mb-3">The Problem</Badge>
        <h2 className="font-display text-4xl font-bold text-foreground">
          Creative work is broken.
        </h2>
        <p className="text-muted-foreground mt-2 text-lg">
          Agencies lose 30% of billable hours to coordination overhead alone.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4 flex-1">
        {problems.map((p) => (
          <Card key={p.title} className="flex flex-col">
            <CardHeader>
              <div className="w-9 h-9 rounded-md bg-secondary flex items-center justify-center mb-2 text-foreground">
                {p.icon}
              </div>
              <CardTitle className="text-base">{p.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{p.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function SolutionSlide() {
  const features = [
    { label: 'Unified workspace', desc: 'Brief, design and delivery in one place.' },
    { label: 'AI-assisted briefs', desc: 'Turn a sentence into a structured project brief.' },
    { label: 'Live handoffs', desc: 'Design tokens push directly to dev environments.' },
    { label: 'Client portals', desc: 'Branded approval flows your clients will love.' },
  ]
  return (
    <div className="flex flex-col h-full gap-8">
      <div>
        <Badge className="mb-3">Our Solution</Badge>
        <h2 className="font-display text-4xl font-bold text-foreground">
          One platform. Start to ship.
        </h2>
        <p className="text-muted-foreground mt-2 text-lg">
          Justified replaces the chaos with a single creative operating system.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 flex-1">
        {features.map((f) => (
          <Card key={f.label} className="flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="text-base">{f.label}</CardTitle>
              <CardDescription>{f.desc}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}

function MarketSlide() {
  const segments = [
    { label: 'TAM', value: '$84B', desc: 'Global creative software market' },
    { label: 'SAM', value: '$12B', desc: 'Agency & studio teams under 200' },
    { label: 'SOM', value: '$480M', desc: '5-year serviceable target' },
  ]
  return (
    <div className="flex flex-col h-full gap-8">
      <div>
        <Badge className="mb-3">Market Size</Badge>
        <h2 className="font-display text-4xl font-bold text-foreground">
          A massive, underserved market.
        </h2>
        <p className="text-muted-foreground mt-2 text-lg">
          250,000 creative agencies globally. Only 3% use purpose-built tooling.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-6 flex-1 items-center">
        {segments.map((s, i) => (
          <Card key={s.label} className="text-center py-6">
            <CardContent className="flex flex-col items-center gap-2 pt-0">
              <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">{s.label}</span>
              <span className={`font-display font-bold text-foreground ${i === 0 ? 'text-5xl' : i === 1 ? 'text-4xl' : 'text-3xl'}`}>
                {s.value}
              </span>
              <span className="text-sm text-muted-foreground">{s.desc}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function TractionSlide() {
  const metrics = [
    { icon: <TrendingUp className="w-4 h-4" />, value: '$42K', label: 'MRR', growth: '+18% MoM' },
    { icon: <Users className="w-4 h-4" />, value: '340', label: 'Teams', growth: '+40 this month' },
    { icon: <Target className="w-4 h-4" />, value: '94%', label: 'Retention', growth: '12-month cohort' },
    { icon: <DollarSign className="w-4 h-4" />, value: '£1.2M', label: 'ARR run-rate', growth: 'As of Oct 2025' },
  ]
  return (
    <div className="flex flex-col h-full gap-8">
      <div>
        <Badge className="mb-3">Traction</Badge>
        <h2 className="font-display text-4xl font-bold text-foreground">
          Strong early signals.
        </h2>
        <p className="text-muted-foreground mt-2 text-lg">
          18 months post-launch. Profitable in month 14.
        </p>
      </div>
      <div className="grid grid-cols-4 gap-4 flex-1 items-center">
        {metrics.map((m) => (
          <Card key={m.label} className="flex flex-col gap-2 p-6">
            <CardContent className="p-0 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                {m.icon}
                <span className="text-xs font-medium uppercase tracking-wide">{m.label}</span>
              </div>
              <span className="font-display text-4xl font-bold text-foreground">{m.value}</span>
              <Badge variant="secondary" className="w-fit text-xs">{m.growth}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function TeamSlide() {
  const team = [
    { name: 'Harvey Robinson', role: 'CEO & Co-founder', bg: 'Previously Adobe, 12 yrs product' },
    { name: 'Alex Chen', role: 'CTO & Co-founder', bg: 'Ex-Figma eng lead, 3 exits' },
    { name: 'Sara Okafor', role: 'Head of Design', bg: 'Former design director, Monzo' },
  ]
  return (
    <div className="flex flex-col h-full gap-8">
      <div>
        <Badge className="mb-3">Team</Badge>
        <h2 className="font-display text-4xl font-bold text-foreground">
          Built by operators, for creators.
        </h2>
        <p className="text-muted-foreground mt-2 text-lg">
          Founders have shipped products used by millions.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-6 flex-1 items-start">
        {team.map((t) => (
          <Card key={t.name}>
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-lg font-semibold text-foreground mb-3">
                {t.name.charAt(0)}
              </div>
              <CardTitle className="text-base">{t.name}</CardTitle>
              <CardDescription>{t.role}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{t.bg}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function AskSlide() {
  const uses = [
    { label: 'Product & Eng', pct: '45%' },
    { label: 'GTM & Sales', pct: '30%' },
    { label: 'Ops & Infra', pct: '15%' },
    { label: 'Reserve', pct: '10%' },
  ]
  return (
    <div className="flex flex-col h-full gap-8">
      <div>
        <Badge className="mb-3">The Ask</Badge>
        <h2 className="font-display text-4xl font-bold text-foreground">
          Raising £2.5M Seed.
        </h2>
        <p className="text-muted-foreground mt-2 text-lg">
          18-month runway to £5M ARR and Series A readiness.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-6 flex-1">
        <Card className="flex flex-col justify-center p-8">
          <CardContent className="p-0 flex flex-col gap-4">
            <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">Round size</span>
            <span className="font-display text-6xl font-bold text-foreground">£2.5M</span>
            <div className="flex gap-2 flex-wrap">
              <Badge variant="outline">Pre-money: £9M</Badge>
              <Badge variant="outline">Lead TBC</Badge>
              <Badge variant="secondary">£600K committed</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm tracking-widest uppercase text-muted-foreground">Use of funds</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {uses.map((u) => (
              <div key={u.label} className="flex items-center justify-between">
                <span className="text-sm text-foreground">{u.label}</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-foreground rounded-full" style={{ width: u.pct }} />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground w-8 text-right">{u.pct}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

const SLIDE_COMPONENTS = [
  CoverSlide,
  ProblemSlide,
  SolutionSlide,
  MarketSlide,
  TractionSlide,
  TeamSlide,
  AskSlide,
]

// ── App shell ─────────────────────────────────────────────────────────────────

export default function App() {
  const [active, setActive] = useState(0)
  const SlideComponent = SLIDE_COMPONENTS[active]

  return (
    <TooltipProvider>
      <SidebarProvider>
        <div className="flex h-screen w-screen bg-background overflow-hidden">

          {/* Slide panel */}
          <Sidebar className="border-r border-border w-52" collapsible="none">
            <SidebarHeader className="px-4 py-4 border-b border-border">
              <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">Pitch Maker</p>
              <p className="text-sm font-medium text-foreground truncate">Justified Studio · Seed</p>
            </SidebarHeader>

            <SidebarContent className="py-2">
              <SidebarMenu>
                {SLIDES.map((name, i) => (
                  <SidebarMenuItem key={name}>
                    <SidebarMenuButton
                      onClick={() => setActive(i)}
                      isActive={active === i}
                      className="gap-3"
                    >
                      <span className="w-5 text-right text-xs text-muted-foreground shrink-0">{i + 1}</span>
                      <span className="text-sm">{name}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarContent>

            <SidebarFooter className="border-t border-border p-3">
              <Button variant="outline" size="sm" className="w-full gap-2">
                <Plus className="w-3 h-3" />
                Add slide
              </Button>
            </SidebarFooter>
          </Sidebar>

          {/* Main area */}
          <SidebarInset className="flex flex-col flex-1 min-w-0">

            {/* Toolbar */}
            <header className="flex items-center justify-between px-6 py-3 border-b border-border shrink-0">
              <div className="flex items-center gap-3">
                <h1 className="text-sm font-medium text-foreground">Justified Studio — Seed Deck</h1>
                <Badge variant="secondary">Draft</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Download className="w-3.5 h-3.5" />
                      Export
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Export as PDF</TooltipContent>
                </Tooltip>
                <Button size="sm" className="gap-2">
                  <Play className="w-3.5 h-3.5" />
                  Present
                </Button>
              </div>
            </header>

            {/* Slide canvas */}
            <main className="flex-1 flex items-center justify-center p-8 overflow-hidden">
              <div className="w-full max-w-4xl aspect-[16/9] bg-card border border-border rounded-xl shadow-lg p-12 flex flex-col overflow-hidden">
                <SlideComponent />
              </div>
            </main>

            {/* Navigation */}
            <footer className="flex items-center justify-between px-6 py-3 border-t border-border shrink-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActive((v) => Math.max(0, v - 1))}
                disabled={active === 0}
                className="gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>
              <span className="text-xs text-muted-foreground">
                {active + 1} / {SLIDES.length}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActive((v) => Math.min(SLIDES.length - 1, v + 1))}
                disabled={active === SLIDES.length - 1}
                className="gap-2"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </footer>

          </SidebarInset>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  )
}

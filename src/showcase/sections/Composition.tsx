import { useEffect, useState } from 'react';
import { Check, Sparkles, TrendingUp, Users, Zap } from 'lucide-react';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Tabs } from '../../components/Tabs';
import { Accordion } from '../../components/Accordion';
import { Progress } from '../../components/Progress';
import { Slider } from '../../components/Slider';
import { Badge } from '../../components/Badge';
import { Section, Demo } from '../Section';

export function Composition() {
  return (
    <Section
      id="composition"
      eyebrow="Tier 5"
      title="Composition"
      description="Cards, tabs, accordions. Combine the primitives into surfaces users actually look at."
    >
      <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
        <Demo label="Tabs — animated underline indicator" className="md:col-span-2">
          <TabsDemo />
        </Demo>

        <Demo label="Accordion — smooth height animation" className="md:col-span-2">
          <FAQAccordion />
        </Demo>

        <Demo label="Progress — determinate, animated, indeterminate">
          <ProgressDemo />
        </Demo>

        <Demo label="Slider — single thumb & range">
          <SliderDemo />
        </Demo>
      </div>

      <div className="mt-4 sm:mt-5">
        <Demo label="Pricing cards — composed surface" fullBleed>
          <PricingDemo />
        </Demo>
      </div>
    </Section>
  );
}

function TabsDemo() {
  return (
    <Tabs defaultValue="overview" className="w-full max-w-xl">
      <Tabs.List variant="underline">
        <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
        <Tabs.Trigger value="analytics">Analytics</Tabs.Trigger>
        <Tabs.Trigger value="reports">Reports</Tabs.Trigger>
        <Tabs.Trigger value="notifications">Notifications</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="overview" className="pt-4">
        <div className="grid grid-cols-3 gap-3">
          {[
            { l: 'Sessions',  v: '12,403', d: '+24%', i: <Users className="size-4" /> },
            { l: 'Revenue',   v: '$48,210', d: '+12%', i: <TrendingUp className="size-4" /> },
            { l: 'Latency',   v: '184ms',  d: '-8%',  i: <Zap className="size-4" /> },
          ].map((s) => (
            <div
              key={s.l}
              className="rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)] p-3"
            >
              <div className="flex items-center gap-2 text-xs text-[var(--color-fg-muted)]">
                {s.i} {s.l}
              </div>
              <p className="mt-1 text-lg font-semibold tracking-[-0.02em]">{s.v}</p>
              <p className="text-xs font-medium text-[var(--color-success)]">{s.d}</p>
            </div>
          ))}
        </div>
      </Tabs.Content>
      <Tabs.Content value="analytics" className="pt-4">
        <p className="text-sm text-[var(--color-fg-muted)]">
          Detailed analytics view — chart placeholder.
        </p>
      </Tabs.Content>
      <Tabs.Content value="reports" className="pt-4">
        <p className="text-sm text-[var(--color-fg-muted)]">
          Generate, schedule, and share reports.
        </p>
      </Tabs.Content>
      <Tabs.Content value="notifications" className="pt-4">
        <p className="text-sm text-[var(--color-fg-muted)]">
          You're all caught up. ✨
        </p>
      </Tabs.Content>
    </Tabs>
  );
}

function FAQAccordion() {
  const items = [
    {
      v: 'a',
      q: 'Is there a free trial available?',
      a: 'Yes — try us for 30 days. We will provide you with a free 30-minute onboarding call to get you up and running.',
    },
    {
      v: 'b',
      q: 'Can I change my plan later?',
      a: 'Of course. Our pricing scales with your company. Chat to our team to find a solution that works as you grow.',
    },
    {
      v: 'c',
      q: 'What is your cancellation policy?',
      a: 'We understand things change. Cancel anytime and we will refund any unused balance.',
    },
    {
      v: 'd',
      q: 'How does billing work?',
      a: 'Plans are billed per workspace, not per account. You can upgrade, downgrade, or cancel from your billing settings.',
    },
  ];

  return (
    <Accordion type="single" collapsible defaultValue="a" className="w-full max-w-xl">
      {items.map((i) => (
        <Accordion.Item key={i.v} value={i.v}>
          <Accordion.Trigger>{i.q}</Accordion.Trigger>
          <Accordion.Content>{i.a}</Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}

function ProgressDemo() {
  const [v, setV] = useState(20);
  useEffect(() => {
    const id = setInterval(() => {
      setV((x) => (x >= 100 ? 0 : x + 7));
    }, 600);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full max-w-xs space-y-3">
      <div>
        <p className="mb-1 text-xs font-medium text-[var(--color-fg-muted)]">Uploading…</p>
        <Progress value={v} />
      </div>
      <div>
        <p className="mb-1 text-xs font-medium text-[var(--color-fg-muted)]">Synced</p>
        <Progress value={100} tone="success" />
      </div>
      <div>
        <p className="mb-1 text-xs font-medium text-[var(--color-fg-muted)]">Indeterminate</p>
        <Progress />
      </div>
    </div>
  );
}

function SliderDemo() {
  return (
    <div className="w-full max-w-xs space-y-6">
      <div>
        <p className="mb-3 text-xs font-medium text-[var(--color-fg-muted)]">Volume</p>
        <Slider defaultValue={[60]} max={100} step={1} />
      </div>
      <div>
        <p className="mb-3 text-xs font-medium text-[var(--color-fg-muted)]">Price range</p>
        <Slider defaultValue={[20, 80]} max={100} step={1} />
      </div>
    </div>
  );
}

function PricingDemo() {
  const tiers = [
    {
      name: 'Individuals',
      price: '$0',
      cadence: 'per month',
      blurb: 'Good for individuals just starting out who simply want the essentials.',
      cta: 'Get started',
      variant: 'secondary' as const,
      featured: false,
      perks: [
        '1 user',
        'Unlimited calendars',
        'Unlimited event types',
        'Workflows',
        'Integrate with your favorite apps',
      ],
    },
    {
      name: 'Teams',
      price: '$12',
      cadence: 'per month / user',
      blurb: 'Highly recommended for small teams looking to upgrade their time and perform.',
      cta: 'Start trial',
      variant: 'primary' as const,
      featured: true,
      perks: [
        '1 team',
        'Schedule meetings as a team',
        'Round-Robin & Fixed Round-Robin',
        'Collective events',
        'Advanced routing forms',
      ],
    },
    {
      name: 'Enterprise',
      price: '$15k',
      cadence: 'per year',
      blurb: 'Robust scheduling for larger teams who need control, privacy, and security.',
      cta: 'Contact us',
      variant: 'secondary' as const,
      featured: false,
      perks: [
        '1 parent team and unlimited sub-teams',
        'Organization workflows',
        'Insights — analyze booking data',
        'Active directory sync',
        '24/7 chat & phone support',
      ],
    },
  ];

  return (
    <div className="grid w-full grid-cols-1 gap-4 p-4 sm:gap-5 sm:p-8 md:grid-cols-3 lg:p-12">
      {tiers.map((t) => (
        <Card
          key={t.name}
          variant={t.featured ? 'featured' : 'flat'}
          className={t.featured ? 'md:-translate-y-2' : ''}
        >
          {t.featured && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
              <Badge variant="solid" size="sm" className="shadow-[var(--shadow-sm)]">
                <Sparkles className="size-3" /> 30 days free trial
              </Badge>
            </div>
          )}
          <Card.Header>
            <Card.Title>{t.name}</Card.Title>
            <p className="mt-2 text-xs uppercase tracking-[0.16em] text-[var(--color-fg-subtle)]">
              Starts at
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-semibold tracking-[-0.04em]">{t.price}</span>
              <span className="text-sm text-[var(--color-fg-muted)]">{t.cadence}</span>
            </div>
            <Card.Description>{t.blurb}</Card.Description>
          </Card.Header>
          <Card.Content>
            <Button fullWidth variant={t.variant}>
              {t.cta}
            </Button>
          </Card.Content>
          <Card.Footer className="flex-col items-start gap-2 border-t-0 pt-2">
            <p className="text-xs font-medium text-[var(--color-fg-subtle)]">Includes:</p>
            <ul className="space-y-1.5 text-sm">
              {t.perks.map((p) => (
                <li key={p} className="flex items-start gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-[var(--color-accent-base)]" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </Card.Footer>
        </Card>
      ))}
    </div>
  );
}

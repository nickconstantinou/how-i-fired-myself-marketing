-- ── Marketing Infrastructure ────────────────────────────────────────────────
-- Shared across all book/content projects. One row in marketing_projects per
-- campaign; one row in marketing_leads per email+project combination.

-- ── Projects ─────────────────────────────────────────────────────────────────
create table if not exists public.marketing_projects (
  id          text primary key,          -- slug: 'anti-retirement-guide', 'book-2'
  name        text        not null,
  url         text,                      -- canonical site URL
  created_at  timestamptz not null default now()
);

insert into public.marketing_projects (id, name, url)
values ('anti-retirement-guide', 'The Anti-Retirement Guide', 'https://theantiretirementguide.co.uk')
on conflict (id) do nothing;

-- ── Leads ─────────────────────────────────────────────────────────────────────
create table if not exists public.marketing_leads (
  id              uuid        primary key default gen_random_uuid(),
  email           text        not null,
  name            text,
  project_id      text        not null references public.marketing_projects(id),
  source          text        not null default 'default',
  status          text        not null default 'active'
                              check (status in ('active', 'unsubscribed')),
  metadata        jsonb,
  subscribed_at   timestamptz not null default now(),
  unsubscribed_at timestamptz,
  created_at      timestamptz not null default now()
);

-- One email per project (re-subscribe via upsert sets status back to active)
create unique index if not exists marketing_leads_email_project_idx
  on public.marketing_leads (email, project_id);

create index if not exists marketing_leads_email_idx
  on public.marketing_leads (email);

create index if not exists marketing_leads_project_status_idx
  on public.marketing_leads (project_id, status);

-- ── RLS ───────────────────────────────────────────────────────────────────────
-- Edge functions use service_role (bypasses RLS). Anon cannot touch lead data.
alter table public.marketing_projects enable row level security;
alter table public.marketing_leads    enable row level security;

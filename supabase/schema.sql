-- Dojo do Foco: tabela de progresso com uma linha por conta.
-- Rode tudo isto uma vez no Supabase, em SQL Editor > New query > Run.
-- Pode rodar de novo sem problema: nada é apagado.

create table if not exists public.saves (
  user_id  uuid primary key references auth.users (id) on delete cascade,
  state    jsonb not null,
  saved_at timestamptz not null default now(),
  -- Barra abusos: um progresso normal tem poucas dezenas de KB.
  constraint saves_state_size check (pg_column_size(state) < 1000000)
);

-- A proteção principal: com RLS ligada, ninguém lê nem grava nada,
-- a não ser o que as regras abaixo permitirem.
alter table public.saves enable row level security;
alter table public.saves force row level security;

-- Visitantes sem login não têm acesso nenhum.
revoke all on public.saves from anon;
grant select, insert, update, delete on public.saves to authenticated;

drop policy if exists "ler o próprio progresso" on public.saves;
create policy "ler o próprio progresso" on public.saves
  for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "criar o próprio progresso" on public.saves;
create policy "criar o próprio progresso" on public.saves
  for insert to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "atualizar o próprio progresso" on public.saves;
create policy "atualizar o próprio progresso" on public.saves
  for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "apagar o próprio progresso" on public.saves;
create policy "apagar o próprio progresso" on public.saves
  for delete to authenticated
  using ((select auth.uid()) = user_id);

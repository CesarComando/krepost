-- 23.11.2026 · «Мозг» по «да» Дайниса: случайный номер посетителя в статистике (krepost_events.device).
-- До этого триггер стирал поле device во всех таблицах. Теперь стирает везде, КРОМЕ krepost_events.
-- Номер — случайный UUID из телефона (krepost.visitor), ни с чем не связан.
-- Откат: вернуть строку `new.device := null;` в ветку krepost_events.
create or replace function public.krepost_rate_limit()
 returns trigger
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
declare n int;
begin
  if tg_table_name = 'krepost_events' then
    -- device не стираем: случайный номер посетителя (с 23.11.2026)
    select count(*) into n from public.krepost_events where created_at > now() - interval '10 minutes';
    if n >= 20000 then return null; end if;
  elsif tg_table_name = 'krepost_shots' then
    new.device := null;
    select count(*) into n from public.krepost_shots where created_at > now() - interval '10 minutes';
    if n >= 3000 then return null; end if;
  elsif tg_table_name = 'krepost_feedback' then
    new.device := null;
    select count(*) into n from public.krepost_feedback where created_at > now() - interval '10 minutes';
    if n >= 500 then return null; end if;
  elsif tg_table_name = 'krepost_facts' then
    select count(*) into n from public.krepost_facts where created_at > now() - interval '1 hour';
    if n >= 30 then return null; end if;
  elsif tg_table_name = 'krepost_geo_tips' then
    select count(*) into n from public.krepost_geo_tips where created_at > now() - interval '1 hour';
    if n >= 30 then return null; end if;
  end if;
  return new;
end $function$;

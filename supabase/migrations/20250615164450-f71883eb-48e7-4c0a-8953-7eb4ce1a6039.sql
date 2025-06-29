
-- Crear tabla para los registros del formulario de inscripción
CREATE TABLE public.registration_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  email text NOT NULL,
  full_name text NOT NULL,
  age text,
  country text,
  phone text,
  hfm_id text,
  operating_time text,
  financial_goals text,
  risk_knowledge text,
  best_time_to_trade text,
  trading_style text,
  trading_session text,
  traded_assets text,
  starting_capital text
);

-- Habilitar Row-Level Security (RLS)
ALTER TABLE public.registration_submissions ENABLE ROW LEVEL SECURITY;

-- Permitir acceso público solo para INSERT de nuevos registros (si tu formulario es público)
CREATE POLICY "Allow insert for everyone" ON public.registration_submissions
  FOR INSERT
  WITH CHECK (true);

-- Permitir a todos hacer SELECT (si quieres mostrar los registros públicamente; puedes quitar esta política si solo los admins deben consultar)
-- CREATE POLICY "Allow select for everyone" ON public.registration_submissions
--   FOR SELECT
--   USING (true);

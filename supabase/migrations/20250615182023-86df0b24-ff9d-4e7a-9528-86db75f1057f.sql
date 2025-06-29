
-- Activar RLS en registration_submissions (si no está ya activo)
ALTER TABLE public.registration_submissions ENABLE ROW LEVEL SECURITY;

-- Solo el usuario con UID específico puede leer datos
CREATE POLICY "Solo yo puedo leer" ON public.registration_submissions
  FOR SELECT
  USING (auth.uid() = '269e0afc-2e3e-4e32-8f2f-98ba7a0c26a0');

-- Solo el usuario con UID específico puede insertar datos
CREATE POLICY "Solo yo puedo insertar" ON public.registration_submissions
  FOR INSERT
  WITH CHECK (auth.uid() = '269e0afc-2e3e-4e32-8f2f-98ba7a0c26a0');

-- Solo el usuario con UID específico puede actualizar datos
CREATE POLICY "Solo yo puedo editar" ON public.registration_submissions
  FOR UPDATE
  USING (auth.uid() = '269e0afc-2e3e-4e32-8f2f-98ba7a0c26a0');

-- Solo el usuario con UID específico puede borrar datos
CREATE POLICY "Solo yo puedo borrar" ON public.registration_submissions
  FOR DELETE
  USING (auth.uid() = '269e0afc-2e3e-4e32-8f2f-98ba7a0c26a0');

-- Activar RLS en a_usuarios (ya activo según migración previa, pero se refresca)
ALTER TABLE public.a_usuarios ENABLE ROW LEVEL SECURITY;

-- Solo el usuario con UID específico puede leer datos
CREATE POLICY "Solo yo puedo leer" ON public.a_usuarios
  FOR SELECT
  USING (auth.uid() = '269e0afc-2e3e-4e32-8f2f-98ba7a0c26a0');

-- Solo el usuario con UID específico puede insertar datos
CREATE POLICY "Solo yo puedo insertar" ON public.a_usuarios
  FOR INSERT
  WITH CHECK (auth.uid() = '269e0afc-2e3e-4e32-8f2f-98ba7a0c26a0');

-- Solo el usuario con UID específico puede actualizar datos
CREATE POLICY "Solo yo puedo editar" ON public.a_usuarios
  FOR UPDATE
  USING (auth.uid() = '269e0afc-2e3e-4e32-8f2f-98ba7a0c26a0');

-- Solo el usuario con UID específico puede borrar datos
CREATE POLICY "Solo yo puedo borrar" ON public.a_usuarios
  FOR DELETE
  USING (auth.uid() = '269e0afc-2e3e-4e32-8f2f-98ba7a0c26a0');

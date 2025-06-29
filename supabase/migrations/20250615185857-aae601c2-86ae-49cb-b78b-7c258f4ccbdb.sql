

-- Eliminar políticas restrictivas anteriores de la tabla registration_submissions
DROP POLICY "Solo yo puedo leer" ON public.registration_submissions;
DROP POLICY "Solo yo puedo insertar" ON public.registration_submissions;
DROP POLICY "Solo yo puedo editar" ON public.registration_submissions;
DROP POLICY "Solo yo puedo borrar" ON public.registration_submissions;

-- Nuevas políticas para registration_submissions
-- 1. Permitir que cualquier persona envíe el formulario (inserte datos)
CREATE POLICY "Allow public form submissions"
ON public.registration_submissions
FOR INSERT
WITH CHECK (true);

-- 2. Permitir que solo el administrador vea los envíos
CREATE POLICY "Allow admin to view submissions"
ON public.registration_submissions
FOR SELECT
USING (auth.uid() = '269e0afc-2e3e-4e32-8f2f-98ba7a0c26a0');

-- 3. Permitir que solo el administrador actualice los envíos
CREATE POLICY "Allow admin to update submissions"
ON public.registration_submissions
FOR UPDATE
USING (auth.uid() = '269e0afc-2e3e-4e32-8f2f-98ba7a0c26a0');

-- 4. Permitir que solo el administrador elimine los envíos
CREATE POLICY "Allow admin to delete submissions"
ON public.registration_submissions
FOR DELETE
USING (auth.uid() = '269e0afc-2e3e-4e32-8f2f-98ba7a0c26a0');


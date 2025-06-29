import { supabase } from "@/integrations/supabase/client";
import { FormData } from '@/types/form';

export const sendToSupabase = async (formData: FormData) => {
    try {
        console.log('🚀 Iniciando envío a Supabase...');
        const { data, error } = await supabase.functions.invoke('submit-registration', {
            body: { formData },
        });
        
        if (error) {
            throw error;
        }
        
        console.log('✅ Supabase: Éxito');
        return { success: true, data };
    } catch (error) {
        console.error('❌ Supabase: Error -', error.message);
        throw error;
    }
};
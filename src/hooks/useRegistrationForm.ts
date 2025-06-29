import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { FormData, FormErrors } from '@/types/form';
import { validateForm, validateInput } from '@/utils/validation';
import { sendToGoogleSheets } from '@/services/googleSheets';
import { sendToSupabase } from '@/services/supabase';

const initialFormData: FormData = {
    email: "",
    fullName: "",
    age: "",
    country: "",
    phone: "",
    hfmId: "",
    operatingTime: "",
    financialGoals: "",
    riskKnowledge: "",
    bestTimeToTrade: "",
    tradingStyle: "",
    tradingSession: "",
    tradedAssets: "",
    startingCapital: "",
};

export const useRegistrationForm = () => {
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const newErrors = validateForm(formData);
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            let googleSheetsSuccess = false;
            let supabaseSuccess = false;
            let googleSheetsError = null;
            let supabaseError = null;

            // Intentar enviar a Google Sheets
            try {
                console.log('🚀 Iniciando envío a Google Sheets...');
                await sendToGoogleSheets(formData);
                googleSheetsSuccess = true;
                console.log('✅ Google Sheets: Éxito');
            } catch (error) {
                googleSheetsError = error;
                console.error('❌ Google Sheets: Error -', error.message);
            }

            // Enviar a Supabase como respaldo
            try {
                await sendToSupabase(formData);
                supabaseSuccess = true;
            } catch (error) {
                supabaseError = error;
            }

            // Evaluar resultados y mostrar mensaje apropiado
            if (googleSheetsSuccess || supabaseSuccess) {
                let message = "Te contactaremos a la mayor brevedad posible.";
                
                if (googleSheetsSuccess && supabaseSuccess) {
                    message += " ✅ Datos guardados correctamente.";
                    console.log('🎉 Éxito total: Ambos sistemas funcionaron');
                } else if (googleSheetsSuccess) {
                    message += " ✅ Datos guardados en Google Sheets.";
                    console.log('🎉 Éxito parcial: Google Sheets funcionó');
                } else if (supabaseSuccess) {
                    message += " ✅ Datos guardados en sistema de respaldo.";
                    console.log('🎉 Éxito parcial: Supabase funcionó');
                }

                toast({
                    title: "¡Gracias por registrarte!",
                    description: message,
                });
                
                // Limpiar formulario
                setFormData(initialFormData);
                setErrors({});
            } else {
                // Ambos sistemas fallaron
                console.error('💥 Error total: Ambos sistemas fallaron');
                console.error('Google Sheets:', googleSheetsError?.message);
                console.error('Supabase:', supabaseError?.message);
                
                let errorMessage = "No se pudo guardar la información. ";
                
                if (googleSheetsError && supabaseError) {
                    errorMessage += "Por favor inténtalo de nuevo o contacta con soporte.";
                } else if (googleSheetsError) {
                    errorMessage += `Error en Google Sheets: ${googleSheetsError.message}`;
                } else if (supabaseError) {
                    errorMessage += `Error en sistema: ${supabaseError.message}`;
                }
                
                toast({
                    title: "Error al enviar los datos",
                    description: errorMessage,
                    variant: "destructive",
                });
            }
        }
        setIsSubmitting(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        
        if (validateInput(name, value)) {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSelectChange = (name: keyof FormData) => (value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return {
        formData,
        errors,
        handleChange,
        handleSelectChange,
        handleSubmit,
        isSubmitting,
    };
};
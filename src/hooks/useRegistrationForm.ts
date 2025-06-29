import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export type FormData = {
    email: string;
    fullName: string;
    age: string;
    country: string;
    phone: string;
    hfmId: string;
    operatingTime: string;
    financialGoals: string;
    riskKnowledge: string;
    bestTimeToTrade: string;
    tradingStyle: string;
    tradingSession: string;
    tradedAssets: string;
    startingCapital: string;
};

export type FormErrors = {
    [key in keyof Omit<FormData, 'operatingTime' | 'financialGoals' | 'riskKnowledge' | 'bestTimeToTrade' | 'tradingStyle' | 'tradingSession' | 'tradedAssets' | 'startingCapital'>]?: string;
};

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

// URL real de tu Google Apps Script
const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxwgIOJD_HNFngHAP0TH5IFIiXsD8fKPZlF9G1yj2YmF8CHycFRsW1YnSCn3Rzcg8kDXw/exec";

export const useRegistrationForm = () => {
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validate = (): FormErrors => {
        const newErrors: FormErrors = {};
        if (!formData.email) {
            newErrors.email = "Este campo es obligatorio.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Por favor, introduce un correo electrónico válido.";
        }
        if (!formData.fullName) newErrors.fullName = "Este campo es obligatorio.";
        if (!formData.age) newErrors.age = "Este campo es obligatorio.";
        if (!formData.country) newErrors.country = "Este campo es obligatorio.";
        if (!formData.phone) newErrors.phone = "Este campo es obligatorio.";
        if (!formData.hfmId) newErrors.hfmId = "Este campo es obligatorio.";
        return newErrors;
    };

    const sendToGoogleSheets = async (data: FormData) => {
        try {
            console.log('📊 Enviando datos a Google Sheets como JSON...', data);
            
            // Crear payload JSON que coincida con lo que espera tu Apps Script
            const jsonPayload = {
                email: data.email,
                fullName: data.fullName,
                age: data.age,
                country: data.country,
                phone: data.phone,
                hfmId: data.hfmId,
                operatingTime: data.operatingTime,
                financialGoals: data.financialGoals,
                riskKnowledge: data.riskKnowledge,
                bestTimeToTrade: data.bestTimeToTrade,
                tradingStyle: data.tradingStyle,
                tradingSession: data.tradingSession,
                tradedAssets: data.tradedAssets,
                startingCapital: data.startingCapital
            };
            
            console.log('📊 Payload JSON preparado:', jsonPayload);
            
            // Enviar como JSON con Content-Type correcto
            const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jsonPayload),
            });
            
            console.log('📊 Respuesta de Google Sheets - Status:', response.status);
            console.log('📊 Respuesta de Google Sheets - Headers:', Object.fromEntries(response.headers.entries()));
            
            // Intentar leer la respuesta como texto primero
            const responseText = await response.text();
            console.log('📊 Respuesta como texto:', responseText);
            
            if (!response.ok) {
                console.error('📊 Error en respuesta HTTP:', response.status, responseText);
                throw new Error(`HTTP ${response.status}: ${responseText}`);
            }
            
            // Intentar parsear como JSON
            let result;
            try {
                result = JSON.parse(responseText);
                console.log('📊 Resultado parseado como JSON:', result);
            } catch (parseError) {
                console.log('📊 No se pudo parsear como JSON, asumiendo éxito si status es 200');
                if (response.status === 200) {
                    result = { success: true, message: 'Datos enviados correctamente' };
                } else {
                    throw new Error('Respuesta no válida del servidor');
                }
            }
            
            if (result.success !== false) { // Asumir éxito si no hay error explícito
                console.log('✅ Datos guardados exitosamente en Google Sheets');
                return { success: true, data: result };
            } else {
                console.error('📊 Error en resultado:', result.error);
                throw new Error(result.error || 'Error desconocido en Google Sheets');
            }
            
        } catch (error) {
            console.error('📊 Error enviando a Google Sheets:', error);
            throw error;
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const newErrors = validate();
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            let googleSheetsSuccess = false;
            let supabaseSuccess = false;
            let googleSheetsError = null;
            let supabaseError = null;

            try {
                // Intentar enviar a Google Sheets primero
                console.log('🚀 Iniciando envío a Google Sheets...');
                await sendToGoogleSheets(formData);
                googleSheetsSuccess = true;
                console.log('✅ Google Sheets: Éxito');
            } catch (error) {
                googleSheetsError = error;
                console.error('❌ Google Sheets: Error -', error.message);
            }

            try {
                // Enviar a Supabase como respaldo (sin CAPTCHA)
                console.log('🚀 Iniciando envío a Supabase...');
                const { data: supabaseData, error } = await supabase.functions.invoke('submit-registration', {
                    body: { formData },
                });
                
                if (!error) {
                    supabaseSuccess = true;
                    console.log('✅ Supabase: Éxito');
                } else {
                    supabaseError = error;
                    console.error('❌ Supabase: Error -', error.message);
                }
            } catch (error) {
                supabaseError = error;
                console.error('❌ Supabase: Error -', error.message);
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
        if (name === "fullName" || name === "country") {
            if (/^[a-zA-ZÀ-ÿ\s]*$/.test(value)) {
                setFormData(prev => ({ ...prev, [name]: value }));
            }
        } else if (name === "phone") {
            if (/^[\d\s+]*$/.test(value)) {
                setFormData(prev => ({ ...prev, [name]: value }));
            }
        } else if (name === "age") {
            if (/^\d*$/.test(value)) {
                setFormData(prev => ({ ...prev, [name]: value }));
            }
        } else {
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
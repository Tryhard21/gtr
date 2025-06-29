import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { FormData, FormErrors } from '@/types/form';
import { validateForm, validateInput } from '@/utils/validation';
import { sendToGoogleSheets } from '@/services/googleSheets';

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
            let googleSheetsError = null;

            try {
                console.log('🚀 Iniciando envío a Google Sheets...');
                await sendToGoogleSheets(formData);
                googleSheetsSuccess = true;
                console.log('✅ Google Sheets: Éxito');
            } catch (error) {
                googleSheetsError = error;
                console.error('❌ Google Sheets: Error -', error.message);
            }

            if (googleSheetsSuccess) {
                toast({
                    title: "¡Gracias por registrarte!",
                    description: "Te contactaremos a la mayor brevedad posible. ✅ Datos guardados correctamente en Google Sheets.",
                });
                
                // Limpiar formulario
                setFormData(initialFormData);
                setErrors({});
            } else {
                console.error('💥 Error al enviar a Google Sheets');
                console.error('Google Sheets:', googleSheetsError?.message);
                
                let errorMessage = "No se pudo guardar la información. ";
                if (googleSheetsError) {
                    errorMessage += `Error en Google Sheets: ${googleSheetsError.message}`;
                } else {
                    errorMessage += "Por favor inténtalo de nuevo o contacta con soporte.";
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
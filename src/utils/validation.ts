import { FormData, FormErrors } from '@/types/form';

export const validateForm = (formData: FormData): FormErrors => {
    const errors: FormErrors = {};
    
    if (!formData.email) {
        errors.email = "Este campo es obligatorio.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = "Por favor, introduce un correo electrónico válido.";
    }
    
    if (!formData.fullName) errors.fullName = "Este campo es obligatorio.";
    if (!formData.age) errors.age = "Este campo es obligatorio.";
    if (!formData.country) errors.country = "Este campo es obligatorio.";
    if (!formData.phone) errors.phone = "Este campo es obligatorio.";
    if (!formData.hfmId) errors.hfmId = "Este campo es obligatorio.";
    
    return errors;
};

export const validateInput = (name: string, value: string): boolean => {
    switch (name) {
        case "fullName":
        case "country":
            return /^[a-zA-ZÀ-ÿ\s]*$/.test(value);
        case "phone":
            return /^[\d\s+]*$/.test(value);
        case "age":
            return /^\d*$/.test(value);
        default:
            return true;
    }
};
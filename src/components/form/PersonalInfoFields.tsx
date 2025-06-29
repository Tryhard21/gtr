import React from 'react';
import { FormInput } from './FormInput';
import { FormData, FormErrors } from '@/hooks/useRegistrationForm';

type PersonalInfoFieldsProps = {
    formData: FormData;
    errors: FormErrors;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const PersonalInfoFields = ({ formData, errors, handleChange }: PersonalInfoFieldsProps) => {
    return (
        <>
            <FormInput
                name="fullName"
                label="Nombre completo"
                placeholder="Tu nombre y apellidos"
                value={formData.fullName}
                onChange={handleChange}
                error={errors.fullName}
            />
            <FormInput
                name="email"
                label="Correo electrónico"
                placeholder="tu@email.com"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
            />
            <FormInput
                name="age"
                label="Edad"
                placeholder="Coméntanos tu edad"
                type="number"
                value={formData.age}
                onChange={handleChange}
                error={errors.age}
            />
            <FormInput
                name="country"
                label="País de residencia"
                placeholder="Brasil"
                value={formData.country}
                onChange={handleChange}
                error={errors.country}
            />
            <FormInput
                name="phone"
                label="Número de teléfono"
                placeholder="+55 11 91234-5678"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
            />
            <FormInput
                name="hfmId"
                label="¿Cuál es tu número de ID de tu cuenta en HFM?"
                placeholder="ID de HFM"
                value={formData.hfmId}
                onChange={handleChange}
                error={errors.hfmId}
                description="Número que la corredora te otorga en la apertura de tu cuenta."
            />
        </>
    );
};

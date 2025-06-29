import React from "react";
import { Button } from "@/components/ui/button";
import { useRegistrationForm } from "@/hooks/useRegistrationForm";
import { PersonalInfoSection } from "./form/PersonalInfoSection";
import { TradingQuestionnaireSection } from "./form/TradingQuestionnaireSection";

export const RegistrationForm: React.FC = () => {
    const {
        formData,
        errors,
        handleChange,
        handleSelectChange,
        handleSubmit,
        isSubmitting,
    } = useRegistrationForm();

    return (
        <div className="w-full bg-neutral-800/50 backdrop-blur-lg border border-neutral-700/80 p-6 sm:p-8 rounded-2xl shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <PersonalInfoSection
                        formData={formData}
                        errors={errors}
                        handleChange={handleChange}
                    />
                    <TradingQuestionnaireSection
                        formData={formData}
                        handleSelectChange={handleSelectChange}
                    />
                </div>
                <div className="flex justify-center pt-4">
                    <Button 
                        type="submit" 
                        size="lg" 
                        className="w-full max-w-xs text-lg font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 drop-shadow-gold hover:drop-shadow-gold-lg font-sans" 
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Enviando...' : 'Enviar'}
                    </Button>
                </div>
            </form>
        </div>
    );
};
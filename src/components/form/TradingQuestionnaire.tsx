import React from 'react';
import { FormSelect } from './FormSelect';
import { FormData } from '@/hooks/useRegistrationForm';

type TradingQuestionnaireProps = {
    formData: FormData;
    handleSelectChange: (name: keyof FormData) => (value: string) => void;
};

const operatingTimeOptions = [
    { value: "0-6 Meses", label: "0-6 Meses" },
    { value: "6 meses - 1 año", label: "6 meses - 1 año" },
    { value: "1 - 2 años", label: "1 - 2 años" },
    { value: "+2 años", label: "+2 años" },
    { value: "Estoy empezando", label: "Estoy empezando" },
];
const financialGoalsOptions = [
    { value: "Hacer una renta extra", label: "Hacer una renta extra" }, { value: "Vivir de trading e inversiones", label: "Vivir de trading e inversiones" }, { value: "Por diversión", label: "Por diversión" }, { value: "Aún no lo tengo claro", label: "Aún no lo tengo claro" }, { value: "Otro", label: "Otro" },
];
const riskKnowledgeOptions = [ { value: "Si", label: "Si" }, { value: "No", label: "No" } ];
const bestTimeToTradeOptions = [ { value: "Mañana", label: "Mañana" }, { value: "Tarde", label: "Tarde" }, { value: "Noche", label: "Noche" }, { value: "Madrugada", label: "Madrugada" } ];
const tradingStyleOptions = [
    { value: "Scalping", label: "Scalping" },
    { value: "Daytrade", label: "Daytrade" },
    { value: "Swing Trading", label: "Swing Trading" },
    { value: "Position Trading", label: "Position Trading" },
    { value: "Aún no lo sé", label: "Aún no lo sé" }
];
const tradingSessionOptions = [
    { value: "Sesión de Londres", label: "Sesión de Londres" },
    { value: "Sesión de Nueva York", label: "Sesión de Nueva York" },
    { value: "Sesión de Asia", label: "Sesión de Asia" },
    { value: "Todas", label: "Todas" },
    { value: "Aún no lo sé", label: "Aún no lo sé" },
];
const tradedAssetsOptions = [ { value: "Forex", label: "Forex" }, { value: "Índices", label: "Índices" }, { value: "Criptomonedas", label: "Criptomonedas" }, { value: "Materias Primas", label: "Materias Primas" }, { value: "Acciones", label: "Acciones" }, { value: "Todos", label: "Todos" }, { value: "Aún no lo sé", label: "Aún no lo sé" } ];
const startingCapitalOptions = [
    { value: "50-100 USD", label: "50-100 USD" },
    { value: "100-300 USD", label: "100-300 USD" },
    { value: "300-500 USD", label: "300-500 USD" },
    { value: "500-1000 USD", label: "500-1000 USD" }
];

export const TradingQuestionnaire = ({ formData, handleSelectChange }: TradingQuestionnaireProps) => {
    return (
        <>
            <div className="md:col-span-2 pt-4">
                <h2 className="text-lg font-semibold text-white mb-2">
                  Para conocerte mejor comparte un poco sobre ti
                </h2>
            </div>
            <FormSelect
                name="operatingTime"
                label="¿Cuánto tiempo llevas operando?"
                placeholder="Selecciona una opción"
                value={formData.operatingTime}
                onValueChange={handleSelectChange("operatingTime")}
                options={operatingTimeOptions}
            />
            <FormSelect name="financialGoals" label="¿Cuáles son tus objetivos en el mercado financiero?" placeholder="Selecciona una opción" value={formData.financialGoals} onValueChange={handleSelectChange("financialGoals")} options={financialGoalsOptions} />
            <FormSelect
                name="riskKnowledge"
                label="¿Conoces los riesgos de operar apalancado?"
                placeholder="Selecciona una opción"
                value={formData.riskKnowledge}
                onValueChange={handleSelectChange("riskKnowledge")}
                options={riskKnowledgeOptions}
            />
            <FormSelect name="bestTimeToTrade" label="¿Cuál es tu mejor horario para operar?" placeholder="Selecciona una opción" value={formData.bestTimeToTrade} onValueChange={handleSelectChange("bestTimeToTrade")} options={bestTimeToTradeOptions} />
            <FormSelect name="tradingStyle" label="¿Cuál es tu estilo de trading?" placeholder="Selecciona una opción" value={formData.tradingStyle} onValueChange={handleSelectChange("tradingStyle")} options={tradingStyleOptions} />
            <FormSelect name="tradingSession" label="¿Qué sesión sueles operar?" placeholder="Selecciona una opción" value={formData.tradingSession} onValueChange={handleSelectChange("tradingSession")} options={tradingSessionOptions} />
            <FormSelect
                name="tradedAssets"
                label="¿Qué activos te gustan?"
                placeholder="Selecciona una opción"
                value={formData.tradedAssets}
                onValueChange={handleSelectChange("tradedAssets")}
                options={tradedAssetsOptions}
            />
            <FormSelect
                name="startingCapital"
                label="¿Con qué capital tienes pensado empezar?"
                placeholder="Selecciona una opción"
                value={formData.startingCapital}
                onValueChange={handleSelectChange("startingCapital")}
                options={startingCapitalOptions}
            />
        </>
    );
};

export default TradingQuestionnaire;

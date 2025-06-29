import React from 'react';
import { FormSelect } from '@/components/ui/form-select';
import { FormData } from '@/types/form';
import {
    OPERATING_TIME_OPTIONS,
    FINANCIAL_GOALS_OPTIONS,
    RISK_KNOWLEDGE_OPTIONS,
    BEST_TIME_TO_TRADE_OPTIONS,
    TRADING_STYLE_OPTIONS,
    TRADING_SESSION_OPTIONS,
    TRADED_ASSETS_OPTIONS,
    STARTING_CAPITAL_OPTIONS
} from '@/constants/formOptions';

interface TradingQuestionnaireSectionProps {
    formData: FormData;
    handleSelectChange: (name: keyof FormData) => (value: string) => void;
}

export const TradingQuestionnaireSection: React.FC<TradingQuestionnaireSectionProps> = ({ 
    formData, 
    handleSelectChange 
}) => {
    return (
        <>
            <div className="md:col-span-2 pt-4">
                <h2 className="text-lg font-semibold text-white mb-2 font-sans">
                    Para conocerte mejor comparte un poco sobre ti
                </h2>
            </div>
            <FormSelect
                name="operatingTime"
                label="¿Cuánto tiempo llevas operando?"
                placeholder="Selecciona una opción"
                value={formData.operatingTime}
                onValueChange={handleSelectChange("operatingTime")}
                options={OPERATING_TIME_OPTIONS}
            />
            <FormSelect 
                name="financialGoals" 
                label="¿Cuáles son tus objetivos en el mercado financiero?" 
                placeholder="Selecciona una opción" 
                value={formData.financialGoals} 
                onValueChange={handleSelectChange("financialGoals")} 
                options={FINANCIAL_GOALS_OPTIONS} 
            />
            <FormSelect
                name="riskKnowledge"
                label="¿Conoces los riesgos de operar apalancado?"
                placeholder="Selecciona una opción"
                value={formData.riskKnowledge}
                onValueChange={handleSelectChange("riskKnowledge")}
                options={RISK_KNOWLEDGE_OPTIONS}
            />
            <FormSelect 
                name="bestTimeToTrade" 
                label="¿Cuál es tu mejor horario para operar?" 
                placeholder="Selecciona una opción" 
                value={formData.bestTimeToTrade} 
                onValueChange={handleSelectChange("bestTimeToTrade")} 
                options={BEST_TIME_TO_TRADE_OPTIONS} 
            />
            <FormSelect 
                name="tradingStyle" 
                label="¿Cuál es tu estilo de trading?" 
                placeholder="Selecciona una opción" 
                value={formData.tradingStyle} 
                onValueChange={handleSelectChange("tradingStyle")} 
                options={TRADING_STYLE_OPTIONS} 
            />
            <FormSelect 
                name="tradingSession" 
                label="¿Qué sesión sueles operar?" 
                placeholder="Selecciona una opción" 
                value={formData.tradingSession} 
                onValueChange={handleSelectChange("tradingSession")} 
                options={TRADING_SESSION_OPTIONS} 
            />
            <FormSelect
                name="tradedAssets"
                label="¿Qué activos te gustan?"
                placeholder="Selecciona una opción"
                value={formData.tradedAssets}
                onValueChange={handleSelectChange("tradedAssets")}
                options={TRADED_ASSETS_OPTIONS}
            />
            <FormSelect
                name="startingCapital"
                label="¿Con qué capital tienes pensado empezar?"
                placeholder="Selecciona una opción"
                value={formData.startingCapital}
                onValueChange={handleSelectChange("startingCapital")}
                options={STARTING_CAPITAL_OPTIONS}
            />
        </>
    );
};
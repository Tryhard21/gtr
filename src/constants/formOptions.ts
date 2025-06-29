import { SelectOption } from '@/types/form';

export const OPERATING_TIME_OPTIONS: SelectOption[] = [
    { value: "0-6 Meses", label: "0-6 Meses" },
    { value: "6 meses - 1 año", label: "6 meses - 1 año" },
    { value: "1 - 2 años", label: "1 - 2 años" },
    { value: "+2 años", label: "+2 años" },
    { value: "Estoy empezando", label: "Estoy empezando" },
];

export const FINANCIAL_GOALS_OPTIONS: SelectOption[] = [
    { value: "Hacer una renta extra", label: "Hacer una renta extra" },
    { value: "Vivir de trading e inversiones", label: "Vivir de trading e inversiones" },
    { value: "Por diversión", label: "Por diversión" },
    { value: "Aún no lo tengo claro", label: "Aún no lo tengo claro" },
    { value: "Otro", label: "Otro" },
];

export const RISK_KNOWLEDGE_OPTIONS: SelectOption[] = [
    { value: "Si", label: "Si" },
    { value: "No", label: "No" }
];

export const BEST_TIME_TO_TRADE_OPTIONS: SelectOption[] = [
    { value: "Mañana", label: "Mañana" },
    { value: "Tarde", label: "Tarde" },
    { value: "Noche", label: "Noche" },
    { value: "Madrugada", label: "Madrugada" }
];

export const TRADING_STYLE_OPTIONS: SelectOption[] = [
    { value: "Scalping", label: "Scalping" },
    { value: "Daytrade", label: "Daytrade" },
    { value: "Swing Trading", label: "Swing Trading" },
    { value: "Position Trading", label: "Position Trading" },
    { value: "Aún no lo sé", label: "Aún no lo sé" }
];

export const TRADING_SESSION_OPTIONS: SelectOption[] = [
    { value: "Sesión de Londres", label: "Sesión de Londres" },
    { value: "Sesión de Nueva York", label: "Sesión de Nueva York" },
    { value: "Sesión de Asia", label: "Sesión de Asia" },
    { value: "Todas", label: "Todas" },
    { value: "Aún no lo sé", label: "Aún no lo sé" },
];

export const TRADED_ASSETS_OPTIONS: SelectOption[] = [
    { value: "Forex", label: "Forex" },
    { value: "Índices", label: "Índices" },
    { value: "Criptomonedas", label: "Criptomonedas" },
    { value: "Materias Primas", label: "Materias Primas" },
    { value: "Acciones", label: "Acciones" },
    { value: "Todos", label: "Todos" },
    { value: "Aún no lo sé", label: "Aún no lo sé" }
];

export const STARTING_CAPITAL_OPTIONS: SelectOption[] = [
    { value: "50-100 USD", label: "50-100 USD" },
    { value: "100-300 USD", label: "100-300 USD" },
    { value: "300-500 USD", label: "300-500 USD" },
    { value: "500-1000 USD", label: "500-1000 USD" }
];
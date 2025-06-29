export interface FormData {
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
}

export interface FormErrors {
    [key in keyof Omit<FormData, 'operatingTime' | 'financialGoals' | 'riskKnowledge' | 'bestTimeToTrade' | 'tradingStyle' | 'tradingSession' | 'tradedAssets' | 'startingCapital'>]?: string;
}

export interface SelectOption {
    value: string;
    label: string;
}
import { FormData } from '@/types/form';

const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxwgIOJD_HNFngHAP0TH5IFIiXsD8fKPZlF9G1yj2YmF8CHycFRsW1YnSCn3Rzcg8kDXw/exec";

export const sendToGoogleSheets = async (data: FormData) => {
    try {
        console.log('📊 Enviando datos a Google Sheets como JSON...', data);
        
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
        
        const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonPayload),
        });
        
        console.log('📊 Respuesta de Google Sheets - Status:', response.status);
        
        const responseText = await response.text();
        console.log('📊 Respuesta como texto:', responseText);
        
        if (!response.ok) {
            console.error('📊 Error en respuesta HTTP:', response.status, responseText);
            throw new Error(`HTTP ${response.status}: ${responseText}`);
        }
        
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
        
        if (result.success !== false) {
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

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/cors.ts";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      }
    );

    const {
      formData,
      captchaToken,
    }: { formData: Record<string, any>; captchaToken: string } =
      await req.json();

    const secret = Deno.env.get("HCAPTCHA_SECRET_KEY");
    if (!secret) {
      console.error("HCAPTCHA_SECRET_KEY not set in Supabase secrets.");
      return new Response(JSON.stringify({ error: "El servicio de CAPTCHA no está configurado." }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    const params = new URLSearchParams();
    params.append("response", captchaToken);
    params.append("secret", secret);

    const hcaptchaRes = await fetch("https://api.hcaptcha.com/siteverify", {
      method: "POST",
      body: params,
    });
    
    const hcaptchaData = await hcaptchaRes.json();

    if (!hcaptchaData.success) {
      console.error("hCaptcha verification failed:", hcaptchaData);
      return new Response(JSON.stringify({ error: "Verificación de CAPTCHA fallida." }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    const record = {
      email: formData.email,
      full_name: formData.fullName,
      age: formData.age,
      country: formData.country,
      phone: formData.phone,
      hfm_id: formData.hfmId,
      operating_time: formData.operatingTime,
      financial_goals: formData.financialGoals,
      risk_knowledge: formData.riskKnowledge,
      best_time_to_trade: formData.bestTimeToTrade,
      trading_style: formData.tradingStyle,
      trading_session: formData.tradingSession,
      traded_assets: formData.tradedAssets,
      starting_capital: formData.startingCapital,
    };

    const { error } = await supabaseClient
      .from("registration_submissions")
      .insert([record]);

    if (error) {
      throw error;
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error submitting registration:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});

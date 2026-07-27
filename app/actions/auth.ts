"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function signIn(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: String(formData.get("email") || ""),
    password: String(formData.get("password") || ""),
  });
  if (error) redirect("/login?erro=Credenciais inválidas");
  redirect("/dashboard");
}

export async function signUp(formData: FormData) {
  const password = String(formData.get("password") || "");
  const confirmation = String(formData.get("confirmation") || "");
  if (password.length < 8 || password !== confirmation)
    redirect(
      "/cadastro?erro=Use uma senha com pelo menos 8 caracteres e confirme-a corretamente.",
    );

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email: String(formData.get("email") || ""),
    password,
    options: {
      data: {
        full_name: String(formData.get("fullName") || ""),
        whatsapp: String(formData.get("whatsapp") || ""),
        country: String(formData.get("country") || ""),
        state: String(formData.get("state") || ""),
        city: String(formData.get("city") || ""),
        school: String(formData.get("school") || ""),
        school_levels: formData.getAll("schoolLevels").map(String),
        subjects: formData.getAll("subjects").map(String),
        whatsapp_consent: formData.get("whatsappConsent") === "on",
        privacy_consent: formData.get("privacyConsent") === "on",
      },
    },
  });
  if (error) redirect("/cadastro?erro=" + encodeURIComponent(error.message));
  redirect(
    "/login?sucesso=Conta criada. Entre para acessar sua experiência de boas-vindas.",
  );
}

export async function requestPasswordReset(formData: FormData) {
  const email = String(formData.get("email") || "").trim();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (!appUrl)
    redirect("/recuperar-senha?erro=Recuperação temporariamente indisponível.");
  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: new URL("/atualizar-senha", appUrl).toString(),
  });
  if (error)
    redirect("/recuperar-senha?erro=Não foi possível enviar o link agora.");
  redirect(
    "/recuperar-senha?sucesso=Se este e-mail estiver cadastrado, você receberá um link seguro para criar uma nova senha.",
  );
}

export async function updatePassword(formData: FormData) {
  const password = String(formData.get("password") || "");
  const confirmation = String(formData.get("confirmation") || "");
  if (password.length < 8 || password !== confirmation)
    redirect(
      "/atualizar-senha?erro=Use uma senha com pelo menos 8 caracteres e confirme-a corretamente.",
    );
  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password });
  if (error)
    redirect(
      "/atualizar-senha?erro=O link expirou ou não é mais válido. Solicite um novo link.",
    );
  redirect("/login?sucesso=Senha atualizada. Você já pode entrar.");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

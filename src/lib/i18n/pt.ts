import type { Translations } from './en';

export const pt: Translations = {
  common: {
    appName:    "TEC",
    tagline:    "The Elite Consortium",
    login:      "Entrar com Pi",
    logout:     "Sair",
    loading:    "Carregando...",
    comingSoon: "Em breve",
    live:       "Disponível",
  },
  dashboard: {
    greeting:   "Bem-vindo,",
    welcomeNew: "🎉 Bem-vindo ao TEC — Sua conta está pronta",
    stats: {
      piBalance:     "Saldo de Pi",
      tecWallet:     "Carteira TEC",
      availableApps: "Apps disponíveis",
      activeApp:     "Ativo",
      subscription:  "Assinatura",
      upgradePro:    "Fazer upgrade para Pro",
    },
    appsTitle: "Ecossistema TEC",
    appsCount: "24 apps",
  },
  // The screens every app has (App Excellence Standard E1) — error, not found, loading.
  states: {
    errorTitle:    "Algo deu errado",
    errorBody:     "Não foi possível carregar esta tela. Seus dados estão seguros — tente de novo.",
    retry:         "Tentar de novo",
    goHome:        "Ir para o início",
    notFoundTitle: "Página não encontrada",
    notFoundBody:  "Esta página não existe ou foi movida.",
    loadingLabel:  "Carregando",
  },
  // Help & feedback (App Excellence Standard E12).
  help: {
    title:   "Ajuda e comentários",
    intro:   "Respostas às perguntas comuns — e uma forma de nos contar qualquer outra coisa.",
    q1:      "Como faço login?",
    a1:      "Toque em “Entrar com Pi”. No Pi Browser sua conta Pi faz o login; não é preciso mais nada.",
    q2:      "Como funcionam os pagamentos?",
    a2:      "Cada pagamento é aprovado por você na sua carteira Pi. O TEC nunca move Pi sem essa aprovação.",
    q3:      "Quem vê meus dados?",
    a3:      "Só você, e só o que você escolher compartilhar. A política de privacidade abaixo diz exatamente o que é guardado.",
    privacy: "Privacidade",
    terms:   "Termos",
    back:    "Voltar ao app",
  },
  feedback: {
    title:       "Conte o que você acha",
    placeholder: "O que funcionou, o que não funcionou, o que você gostaria que este app fizesse…",
    send:        "Enviar",
    sending:     "Enviando…",
    thanks:      "Obrigado — sua mensagem chegou.",
    thanksHint:  "A equipe lê cada mensagem. Se precisar de resposta, você a receberá dentro do TEC.",
    sendAnother: "Enviar outra",
    tooShort:    "Escreva algumas palavras primeiro.",
    tooLong:     "{n} caracteres — mantenha abaixo de 2000.",
    failed:      "Não foi possível enviar. Tente de novo em instantes.",
    privacyNote: "Enviado com seu usuário Pi e a página em que você está — nada mais.",
  },
};

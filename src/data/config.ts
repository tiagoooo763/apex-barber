/**
 * CONFIGURAÇÕES GERAIS E INTEGRAÇÃO DE PAGAMENTOS
 * 
 * Este arquivo centraliza os parâmetros do sistema de checkout e agendamento.
 * Quando for conectar com gateway real (ex: Mercado Pago, Asaas, Stripe, Pagar.me),
 * basta atualizar as chaves de API e alternar IS_DEMO_MODE para false.
 */

export const PAYMENT_CONFIG = {
  // Modo de demonstração (true = simula respostas e gera QR Code mock; false = faz requisições reais à API)
  IS_DEMO_MODE: true,

  // Configurações do PIX da Barbearia
  PIX: {
    // Chave PIX oficial da Apex Barber (Telefone / CNPJ / Aleatória)
    CHAVE_PIX: '38997475522',
    TIPO_CHAVE: 'TELEFONE',
    BENEFICIARIO: 'APEX BARBER LTDA',
    CIDADE: 'NOVA PORTEIRINHA',
    // Tempo de expiração do QR Code em minutos
    EXPIRATION_MINUTES: 15
  },

  // Gateway de Cartão de Crédito (onde plugar chaves do gateway)
  GATEWAY: {
    PROVIDER: 'DEMO / MERCADO_PAGO_READY', // 'mercadopago' | 'asaas' | 'stripe'
    PUBLIC_KEY: 'pk_test_apex_barber_demo_key_placeholder',
    WEBHOOK_URL: 'https://api.apexbarber.com.br/webhook/payment'
  },

  // Política de cancelamento e tolerância
  BOOKING_POLICY: {
    TOLERANCIA_MINUTOS: 10,
    CANCELAMENTO_ANTECEDENCIA_HORAS: 2,
    MENSAGEM_LEMBRETE: 'Chegue com 5 a 10 minutos de antecedência para aproveitar um café ou bebida cortesia.'
  }
};

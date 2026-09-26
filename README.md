# 💈 APEX BARBER | Barbeiro Visagista

Site profissional, moderno e premium desenvolvido sob medida para a **Apex Barber | Barbeiro Visagista**, localizada em **Nova Porteirinha – MG**.

---

## 🌟 Destaques do Projeto

- **Identidade Visual Premium & Editorial**: Design limpo, masculino e sofisticado, com paleta em tons de preto, grafite e detalhes metálicos dourados sutis.
- **Tipografia Nobre**: Combinação de *Cinzel* para títulos com presença e *Plus Jakarta Sans* para leitura limpa.
- **Sistema de Agendamento Interativo**:
  - Seleção de serviço com duração e valor.
  - Escolha do barbeiro especialista.
  - Seleção de data interativa para os próximos 14 dias.
  - Grid de horários dinâmicos com detecção e bloqueio de horários ocupados para evitar colisões.
  - Coleta de dados e preferências do cliente.
- **Checkout Integrado no Próprio Site**:
  - Resumo completo do pedido (serviço/plano, barbeiro, data, horário e total).
  - Opção de pagamento via **PIX** com QR Code dinâmico e Copia e Cola.
  - Opção de pagamento via **Cartão de Crédito** em até 3x.
  - Opção de **Pagamento na Barbearia** na chegada.
  - Tela de confirmação com integração direta ao **Google Agenda** e botão para **enviar comprovante no WhatsApp**.
- **Planos Mensais Recorrentes (Apex Club)**:
  - Apex Essencial, Apex Premium e Apex Black VIP, com contratação direta via checkout.
- **Time de Barbeiros Estruturado**:
  - Cards individuais com foto, especialidades, avaliação, tempo de experiência e botão de agendamento direto.
- **Galeria de Trabalhos & Lightbox**:
  - Portfólio com filtros por categoria (Cortes, Barba, Visagismo, Ambiente) e visualizador de fotos ampliado.
- **Botões de Ação Direta**:
  - Como Chegar (Google Maps com rota para Av. Castelo Branco, 127).
  - WhatsApp oficial com mensagem pré-formatada.
  - Ligação telefônica direta para `(38) 99747-5522`.
  - Instagram oficial `@apexbarberofc`.
- **SEO Local Completo**:
  - Meta tags, OpenGraph e Schema Markup `BarberShop` estruturado para ranqueamento no Google em Nova Porteirinha e região.

---

## 🚀 Como Executar o Projeto

1. Instale as dependências:
```bash
npm install
```

2. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

3. Para gerar a versão de produção otimizada:
```bash
npm run build
```

---

## 🛠️ Onde Editar os Dados da Barbearia

Todo o conteúdo foi estruturado em arquivos limpos na pasta `src/data/`:

- **Informações Gerais e Contato**: [`src/data/company.ts`](file:///c:/Users/mendo/OneDrive/Área%20de%20Trabalho/APEX%20barber/src/data/company.ts) (Endereço, telefone, horários de funcionamento, Instagram, links).
- **Serviços e Preços**: [`src/data/services.ts`](file:///c:/Users/mendo/OneDrive/Área%20de%20Trabalho/APEX%20barber/src/data/services.ts) (Nomes, descrições, preços e durações).
- **Barbeiros da Equipe**: [`src/data/barbers.ts`](file:///c:/Users/mendo/OneDrive/Área%20de%20Trabalho/APEX%20barber/src/data/barbers.ts) (Adicionar novos barbeiros, fotos, especialidades e bios).
- **Planos Mensais**: [`src/data/plans.ts`](file:///c:/Users/mendo/OneDrive/Área%20de%20Trabalho/APEX%20barber/src/data/plans.ts) (Valores e benefícios dos planos de assinatura).
- **Avaliações**: [`src/data/reviews.ts`](file:///c:/Users/mendo/OneDrive/Área%20de%20Trabalho/APEX%20barber/src/data/reviews.ts) (Depoimentos e notas do Google).
- **Portfólio**: [`src/data/portfolio.ts`](file:///c:/Users/mendo/OneDrive/Área%20de%20Trabalho/APEX%20barber/src/data/portfolio.ts) (Imagens e títulos dos cortes e ambiente).
- **Configurações de Pagamento e Gateway**: [`src/data/config.ts`](file:///c:/Users/mendo/OneDrive/Área%20de%20Trabalho/APEX%20barber/src/data/config.ts) (Chave PIX, credenciais de gateway Mercado Pago / Asaas / Stripe).

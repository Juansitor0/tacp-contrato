# TACP v4.0 - Contrato Online

Esta é a versão aprimorada da aplicação TACP, agora com suporte a notificações multiplataforma, integração com Spotify e otimizações de performance.

## 🔔 Notificações em Segundo Plano (Importante)
Para que as notificações de mensagens apareçam em segundo plano (celular bloqueado ou app fechado), o sistema utiliza o **Firebase Cloud Messaging (FCM)**. 

**Nota técnica**: Atualmente, as notificações de chat são enviadas via Realtime Database. Para que elas funcionem em segundo plano total (com o app fechado), seria necessário um servidor (Backend) para disparar o gatilho do FCM. Como esta é uma aplicação estática, as notificações de segundo plano funcionam melhor quando a aba está aberta em standby.

### Como garantir o recebimento:
1. Certifique-se de que as notificações estão **PERMITIDAS** no seu navegador/celular.
2. No Android, mantenha a aba do Chrome aberta (mesmo que em segundo plano).
3. No iOS, adicione à "Tela de Início" para melhor suporte.

## 🚀 Novidades da Versão 4.0

### 1. Notificações Multiplataforma
A aplicação agora utiliza **Firebase Cloud Messaging (FCM)** para garantir que as notificações cheguem em qualquer dispositivo:
- **Android**: Funciona nativamente via navegador ou PWA.
- **iOS**: Para receber notificações, adicione o site à sua tela de início (Compartilhar > Adicionar à Tela de Início). Requer iOS 16.4+.
- **PC**: Notificações nativas do sistema via navegador.

### 2. Seção "Sintonizados" (Spotify)
Agora vocês podem compartilhar o que estão ouvindo em tempo real:
- Cole o link de uma música ou playlist do Spotify no campo indicado.
- O player será atualizado instantaneamente para ambos os usuários.
- Suporte a reprodução direta dentro da aplicação.

### 3. Otimizações de Performance
- **Debounce no Salvamento**: As alterações nos sliders agora são enviadas ao banco de dados com um pequeno atraso para evitar sobrecarga e garantir fluidez.
- **Renderização Otimizada**: Melhorias no CSS e JavaScript para uma navegação mais suave ("lisa").
- **Correção de Bugs**: Sincronização de estados e permissões de notificação aprimoradas.

### 4. Toque Especial
- Adicionamos referências sutis ao **Minecraft** na interface, como o ícone de picareta e fontes estilizadas, para deixar o ambiente mais familiar e divertido.

## 🛠️ Como Instalar como App
1. Abra o link da aplicação no seu celular.
2. No **Android** (Chrome): Clique nos três pontinhos e selecione "Instalar aplicativo".
3. No **iOS** (Safari): Clique no ícone de compartilhar e selecione "Adicionar à Tela de Início".

---
*Desenvolvido com ❤️ para Juan e Mici.*

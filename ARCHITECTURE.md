# Arquitetura TACP v4.0

## 1. Notificações Multiplataforma
- **Firebase Cloud Messaging (FCM)**: Utilizar o FCM para envio de notificações push.
- **Service Worker**: Atualizar o `sw.js` para lidar melhor com notificações em segundo plano.
- **Compatibilidade**:
  - **Android**: Suporte nativo via Chrome/PWA.
  - **iOS**: Requer que o usuário adicione à tela de início (PWA) para habilitar notificações (iOS 16.4+).
  - **PC**: Notificações nativas do navegador.

## 2. Integração Spotify
- **Interface**: Nova aba ou seção "Sintonizados".
- **Funcionalidade**:
  - Campo para colar link do Spotify.
  - Armazenamento no Firebase Realtime Database (`music/current`).
  - Player Embed dinâmico que carrega a música/playlist atual.
  - Histórico de músicas compartilhadas.

## 3. Otimizações e Correções
- **Performance**: Reduzir chamadas excessivas ao Firebase.
- **UI/UX**: Melhorar a responsividade e o feedback visual.
- **Bugs**: Corrigir problemas de sincronização de sliders e estados de login.

## 4. Referências Minecraft
- Adicionar um "Easter Egg" ou elemento visual sutil que remeta ao Minecraft (ex: ícone de picareta no status de energia ou fonte estilo pixel).

# Análise de Bugs - TACP v4.0

## 1. Problema: Gráfico Radar Travado e Sem Sincronização

### Diagnóstico:
- **Linha 675-683**: Os sliders têm listeners que salvam no Firebase, mas não atualizam o gráfico imediatamente
- **Linha 664-671**: A função `updateChart()` só é chamada quando dados chegam do Firebase
- **Linha 485-499**: O debounce de 400ms no `save()` causa delay na sincronização
- **Problema de Performance**: Cada movimento do slider dispara uma atualização no Firebase, mesmo com debounce

### Causa Raiz:
O fluxo atual é: `Slider → save() → Firebase → listener → updateChart()`
Isso causa latência desnecessária. O gráfico deveria atualizar localmente primeiro.

### Solução:
1. Atualizar o gráfico imediatamente quando o slider muda (feedback local)
2. Manter o debounce apenas para salvar no Firebase
3. Adicionar flag para evitar loops de atualização

---

## 2. Problema: Notificações Não Funcionando

### Diagnóstico:
- **Linha 411-436**: A função `triggerNotification()` NÃO cria notificações do sistema
- Ela apenas:
  - Pisca o título da aba
  - Vibra o dispositivo
  - **NÃO** chama `new Notification()`
- **Linha 434-435**: Comentário explícito dizendo "NÃO criar Notification aqui"

### Causa Raiz:
O desenvolvedor removeu as notificações nativas, provavelmente esperando que o FCM fizesse tudo.
Mas o FCM só funciona quando a mensagem vem do servidor Firebase, não para eventos locais.

### Solução:
1. Adicionar `new Notification()` na função `triggerNotification()`
2. Verificar permissão antes de criar notificação
3. Manter FCM para notificações remotas
4. Adicionar notificações locais para eventos da aplicação

---

## 3. Problema: Integração com Spotify Limitada

### Diagnóstico:
- **Linha 502-546**: Apenas converte links do Spotify em iframes embed
- Não há integração com Spotify Web API
- Não há busca de músicas
- Não há controle de reprodução
- Usuário precisa sair do app para buscar músicas no Spotify

### Limitações Atuais:
- Apenas embute player via iframe
- Sem autenticação OAuth do Spotify
- Sem acesso à biblioteca do usuário
- Sem controle programático de play/pause

### Solução Proposta:
**Opção 1 (Simples)**: Melhorar UX do sistema atual
- Adicionar botão para abrir Spotify em nova aba
- Melhorar validação de links
- Adicionar preview da música antes de compartilhar

**Opção 2 (Completa)**: Integração com Spotify Web API
- Implementar OAuth 2.0
- Adicionar busca de músicas
- Mostrar biblioteca do usuário
- Controlar reprodução
- **Requer**: Backend para gerenciar tokens e secrets

---

## 4. Outros Bugs Identificados

### 4.1. Service Worker
- **Linha 694-701**: Registro do SW pode falhar silenciosamente
- Não há tratamento adequado de erros
- Não verifica se o SW está realmente ativo

### 4.2. Permissões de Notificação
- **Linha 269-275**: Solicita permissão apenas no login
- Se o usuário negar, nunca mais pergunta
- Não há UI para reativar notificações

### 4.3. GPS/Localização
- **Linha 598**: `watchPosition` não tem tratamento de erro adequado
- Se o usuário negar permissão, a funcionalidade quebra silenciosamente

### 4.4. Sincronização de Estado
- **Linha 486**: A flag `syncingFromFirebase` pode causar perda de dados
- Se duas alterações acontecem rapidamente, uma pode ser ignorada

---

## Prioridade de Correções

1. **CRÍTICO**: Notificações não funcionando
2. **ALTO**: Gráfico travado
3. **MÉDIO**: Melhorias no Spotify
4. **BAIXO**: Outros bugs

---

## Próximos Passos

1. Corrigir função `triggerNotification()` para criar notificações reais
2. Adicionar atualização local do gráfico nos sliders
3. Melhorar UX da integração com Spotify
4. Adicionar tratamento de erros em permissões
5. Testar em múltiplos dispositivos

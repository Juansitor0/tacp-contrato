# 🧪 Guia Rápido de Teste - TACP v4.0

## Como Testar as Correções

### ⚡ Teste Rápido (5 minutos)

#### 1️⃣ Teste do Gráfico
1. Abra a aplicação e faça login
2. Vá até a seção "MEUS STATUS"
3. **Mova qualquer slider** (Fome, Paciência, Tristeza ou Felicidade)
4. ✅ **ESPERADO**: O gráfico radar deve atualizar **instantaneamente** sem travamentos

#### 2️⃣ Teste de Notificações
1. Se aparecer solicitação de permissão, clique em **Permitir**
2. ✅ **ESPERADO**: Deve aparecer uma notificação de teste do sistema
3. Abra o chat (botão 💬 no canto inferior direito)
4. Envie uma mensagem
5. ✅ **ESPERADO**: Deve aparecer notificação do sistema operacional

#### 3️⃣ Teste do Spotify
1. Na seção "🎵 SINTONIZADOS", clique em **"🎶 ABRIR SPOTIFY"**
2. ✅ **ESPERADO**: Abre o Spotify em nova aba
3. Copie o link de qualquer música do Spotify
4. Cole no campo e pressione **Enter** (ou clique ENVIAR)
5. ✅ **ESPERADO**: 
   - Borda do campo fica verde por 1 segundo
   - Aparece notificação de sucesso
   - Player carrega a música
6. Clique em **"❌ LIMPAR"**
7. ✅ **ESPERADO**: Música é removida após confirmação

---

### 🔍 Teste Completo (15 minutos)

#### Teste de Sincronização
1. Abra a aplicação em **dois dispositivos diferentes** (ex: celular e PC)
2. Faça login com usuários diferentes (Juan e Mici)
3. No dispositivo 1, mova os sliders
4. ✅ **ESPERADO**: O gráfico no dispositivo 2 deve atualizar automaticamente

#### Teste de Notificações Avançado
1. **No PC**: Minimize a janela do navegador
2. **No celular**: Envie uma mensagem no chat
3. ✅ **ESPERADO**: Notificação aparece no PC mesmo com janela minimizada
4. Teste com biometria crítica:
   - Juan: Mova os sliders da Mici para valores extremos
   - Paciência ou Felicidade < 20%
   - ✅ **ESPERADO**: Juan recebe notificação de alerta

#### Teste de Spotify Completo
1. Teste com **música**: `https://open.spotify.com/track/...`
2. Teste com **playlist**: `https://open.spotify.com/playlist/...`
3. Teste com **álbum**: `https://open.spotify.com/album/...`
4. ✅ **ESPERADO**: Todos os tipos devem funcionar
5. Teste com link inválido (ex: "abc123")
6. ✅ **ESPERADO**: Borda vermelha e mensagem de erro clara

---

### 🐛 Verificação de Erros

#### Console do Navegador (F12)
1. Abra o Console (F12 → aba Console)
2. Recarregue a página
3. ✅ **ESPERADO**: Deve ver logs como:
   - `✅ Service Worker registrado com sucesso!`
   - `✅ Service Worker está ativo.`
   - `✅ FCM Token obtido com sucesso!`
   - `✅ Token FCM salvo no Firebase.`

4. ❌ **NÃO deve ver**:
   - Erros não tratados (vermelho)
   - Avisos excessivos
   - Mensagens confusas

---

### 📱 Teste em Dispositivos Móveis

#### Android
1. Abra no Chrome
2. Permita notificações quando solicitado
3. ✅ Notificações devem funcionar normalmente
4. **Opcional**: Instale como PWA (menu → "Instalar aplicativo")

#### iOS (iPhone/iPad)
1. Abra no Safari
2. Clique no botão de compartilhar
3. Selecione "Adicionar à Tela de Início"
4. Abra o app da tela inicial
5. Permita notificações
6. ✅ Notificações devem funcionar (requer iOS 16.4+)

---

### ⚠️ Problemas Conhecidos

Se algo não funcionar:

1. **Notificações não aparecem**:
   - Verifique se você permitiu notificações
   - Vá em Configurações do navegador → Notificações
   - Certifique-se de que o site está permitido

2. **Gráfico não atualiza**:
   - Recarregue a página (Ctrl+F5 ou Cmd+Shift+R)
   - Limpe o cache do navegador

3. **Spotify não carrega**:
   - Verifique se o link é válido
   - Certifique-se de que contém "spotify.com"
   - Tente copiar o link diretamente do Spotify

4. **Sincronização lenta**:
   - Verifique sua conexão com a internet
   - O Firebase pode ter delay de 1-2 segundos

---

### ✅ Checklist de Teste

Marque conforme testa:

- [ ] Gráfico atualiza instantaneamente ao mover sliders
- [ ] Notificação de teste aparece ao permitir permissões
- [ ] Notificações aparecem ao receber mensagens no chat
- [ ] Notificação de biometria crítica funciona
- [ ] Botão "Abrir Spotify" funciona
- [ ] Compartilhar música do Spotify funciona
- [ ] Feedback visual (borda verde) ao compartilhar música
- [ ] Notificação ao compartilhar música com sucesso
- [ ] Botão "Limpar" remove a música
- [ ] Pressionar Enter no campo de música funciona
- [ ] Sincronização entre dispositivos funciona
- [ ] Console não mostra erros não tratados
- [ ] Logs no console são claros e informativos

---

### 📞 Reportar Problemas

Se encontrar algum problema:

1. Abra o Console (F12)
2. Tire um print da tela
3. Anote:
   - Navegador e versão
   - Sistema operacional
   - O que você estava fazendo
   - Mensagens de erro no console

---

## 🎉 Tudo Funcionando?

Se todos os testes passaram, parabéns! 🎊

O sistema está funcionando perfeitamente. Aproveite:
- ⚡ Gráfico super responsivo
- 🔔 Notificações em tempo real
- 🎵 Música compartilhada facilmente
- 🐛 Sem bugs conhecidos

**Versão**: 4.0 (20/01/2026)
**Status**: ✅ ESTÁVEL

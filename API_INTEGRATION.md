# Integração com API BulBeat

Este documento descreve como configurar e usar a integração com a API do BulBeat para download de vídeos do YouTube.

## 🚀 Configuração

### 1. Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com a seguinte configuração:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1/youtube
```

Para produção, altere a URL para o endpoint do seu servidor:

```env
NEXT_PUBLIC_API_URL=https://seu-servidor.com/api/v1/youtube
```

### 2. Estrutura da Integração

A integração foi implementada com os seguintes arquivos:

- **`src/lib/api.ts`**: Serviço principal da API com todas as funções de comunicação
- **`src/hooks/useYouTubeDownload.ts`**: Hook personalizado para gerenciar estado e operações
- **`src/components/welcomeComp.tsx`**: Componente principal atualizado com a integração

## 🔧 Funcionalidades Implementadas

### 1. Obter Informações do Vídeo
- Validação de URL do YouTube
- Exibição de thumbnail, título, canal, duração
- Tratamento de erros

### 2. Download de Vídeo MP4
- Download em alta qualidade
- Barra de progresso simulada
- Download automático do arquivo

### 3. Download de Áudio M4A
- Extração apenas do áudio
- Formato M4A otimizado
- Download automático do arquivo

### 4. Interface de Usuário
- Seletor de tipo de download (vídeo/áudio)
- Botão para visualizar informações antes do download
- Mensagens de erro claras
- Animações e feedback visual

## 🎯 Como Usar

1. **Cole a URL do YouTube** no campo de entrada
2. **Escolha o tipo de download** (Vídeo MP4 ou Áudio M4A)
3. **Clique em "Ver Info"** para visualizar informações do vídeo
4. **Clique em "Baixar"** para iniciar o download

## 🛠️ Desenvolvimento

### Executando o Backend

Certifique-se de que o backend está rodando na porta 3000:

```bash
cd bulbeat-back
npm run start:dev
```

### Executando o Frontend

```bash
npm run dev
```

### Testando a Integração

1. Acesse `http://localhost:3000`
2. Cole uma URL válida do YouTube
3. Teste as funcionalidades de info e download

## 🔍 Tratamento de Erros

A aplicação trata os seguintes tipos de erro:

- **URL inválida**: Validação de formato do YouTube
- **Erro de rede**: Problemas de conectividade com a API
- **Erro da API**: Respostas de erro do backend
- **Timeout**: Downloads que demoram muito

## 📱 Responsividade

A interface é totalmente responsiva e funciona em:
- Desktop
- Tablet
- Mobile

## 🚀 Deploy

Para deploy em produção:

1. Configure a variável `NEXT_PUBLIC_API_URL` com a URL do seu servidor
2. Execute `npm run build`
3. Deploy o build resultante

## 🔧 Personalização

### Modificar Qualidade do Download

No arquivo `src/lib/api.ts`, você pode alterar o formato:

```typescript
// Para melhor qualidade
format: 'best[ext=mp4]/best'

// Para qualidade específica
format: '137' // 1080p
format: '136' // 720p
```

### Adicionar Novos Formatos

Extenda a interface `VideoFormat` em `src/lib/api.ts` para suportar novos formatos.

## 📊 Monitoramento

A aplicação inclui logs detalhados para:
- Requisições à API
- Erros de download
- Performance das operações

## 🔒 Segurança

- Validação de URLs do YouTube
- Sanitização de nomes de arquivos
- Tratamento seguro de erros
- CORS configurado no backend

# Aplicativo Mobile para Gerenciamento de Fluxo de Aprovações

## Visão Geral
Aplicativo mobile para gerenciamento de fluxo de aprovações com dois níveis de acesso (Administrador e Usuário comum).

## Funcionalidades Principais
- Sistema de autenticação com login diferenciado para admin e usuário
- Visualização clara do fluxograma de aprovação com status atual
- Histórico completo de aprovações
- Notificações push para atualizações de status

## Páginas Necessárias

### Login/Autenticação
- Tela de login com campos para email e senha
- Opção "Esqueci minha senha"
- Validação do tipo de usuário (admin/comum)

### Dashboard Principal
- Visão geral dos processos em andamento
- Indicador visual do status atual
- Lista de processos pendentes
- Filtros por data/status/departamento

### Visualização do Fluxograma
- Representação visual das etapas
- Etapa atual destacada
- Descrição detalhada de cada fase
- Timeline interativa do progresso

### Tela de Aprovação (apenas admin)
- Lista de itens pendentes para aprovação
- Detalhes completos do processo
- Botões de aprovar/rejeitar
- Campo para comentários/justificativa

### Histórico de Processos
- Lista completa de processos anteriores
- Filtros por período/status
- Exportação de relatórios
- Detalhamento de cada processo

### Configurações
- Perfil do usuário
- Preferências de notificação
- Alteração de senha
- Informações da conta

### Tela de Detalhes do Processo
- Informações completas do processo
- Histórico de aprovações
- Documentos anexados
- Comentários/observações

### Área de Notificações
- Lista de notificações recentes
- Status de leitura
- Filtros por tipo
- Configurações de alerta

## Funcionalidades Admin
- Admin pode criar vários fluxogramas e vincular a visualização desse fluxo com o usuário

## Especificações Técnicas
- React Native + Expo + Javascript (não utilizar TypeScript)
- Services com dados mockados
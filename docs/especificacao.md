# Especificação do Projeto

Esta seção apresenta a definição do problema e a proposta de solução sob a perspectiva do usuário, utilizando técnicas de modelagem que permitem compreender e detalhar as necessidades do negócio e as funcionalidades esperadas do sistema.

Nesta seção são apresentadas as personas, histórias de usuários, requisitos funcionais e não funcionais, bem como as restrições do projeto. Também são descritas as ferramentas e metodologias empregadas para elaborar essas especificações, garantindo que todos os participantes possuam uma compreensão unificada do escopo, dos objetivos e das prioridades do trabalho.

---

## Modelo de negócio (*Business Model Canvas*)

| Bloco | Descrição |
|-------|-----------|
| **Proposta de Valor** | Plataforma centralizada de registro de ocorrências, gestão de turnos e geração de indicadores operacionais para o Centro de Distribuição Shopee |
| **Segmentos de Clientes** | Operadores de segurança, supervisores de turno, analistas operacionais e gestores do SOC |
| **Canais** | Aplicação web acessível por navegadores modernos (Chrome, Edge, Firefox) em desktops e tablets |
| **Relacionamento** | Interface intuitiva com atualização em tempo real via Socket.io e notificações de ocorrências críticas |
| **Fontes de Receita** | Uso interno — redução de perdas operacionais e melhoria na eficiência da equipe de segurança |
| **Recursos Principais** | Backend Node.js + Express, banco de dados MySQL com Prisma ORM, autenticação JWT, frontend HTML/CSS/JS |
| **Atividades-Chave** | Registro de ocorrências, passagem de turno, monitoramento de câmeras, geração de relatórios |
| **Parcerias Principais** | Equipe de TI do CD, equipe de segurança patrimonial, gestão operacional |
| **Estrutura de Custos** | Infraestrutura de servidor, manutenção do sistema, treinamento da equipe |

---

## Personas

Nesta seção são detalhadas as personas identificadas para o SOC Insight — plataforma de gestão para o Centro de Distribuição Shopee. Estas representam os perfis reais de usuários que a solução busca atender, com foco em diferentes responsabilidades operacionais.

---

### Persona 1: Carlos Mendes — Operador SOC

**Perfil:** 28 anos, operador de segurança com 3 anos de experiência no CD. Trabalha em regime de turnos (manhã, tarde e noite). Tem familiaridade moderada com tecnologia — usa celular e computador no dia a dia, mas não é especialista em sistemas.

**Necessidades:**
- Registrar ocorrências rapidamente durante o turno sem perder tempo
- Consultar ocorrências abertas por outros operadores
- Fazer a passagem de turno com clareza e documentação formal

**Frustrações:**
- Registros feitos em papel que se perdem ou ficam ilegíveis
- Falta de visibilidade sobre o que aconteceu nos turnos anteriores
- Demora para comunicar incidentes para o supervisor

**Alinhamento com a Solução:**
Carlos utiliza o módulo de **Ocorrências** para registrar incidentes em tempo real e o módulo de **Passagem de Turno** para garantir continuidade entre os plantões. O dashboard exibe as ocorrências críticas ativas assim que ele faz login.

---

### Persona 2: Ana Lima — Supervisora de Turno

**Perfil:** 35 anos, supervisora com 6 anos de experiência em segurança patrimonial. Responsável por 10 operadores por turno. Boa familiaridade com tecnologia — usa sistemas de gestão no dia a dia.

**Necessidades:**
- Visualizar em tempo real todas as ocorrências do turno
- Atualizar o status de ocorrências (aberta → em andamento → resolvida)
- Gerar relatórios para apresentar à gestão
- Controlar quem pode excluir ou arquivar registros

**Frustrações:**
- Falta de visibilidade centralizada do que está acontecendo no CD
- Relatórios manuais que tomam horas para montar
- Dificuldade em rastrear a evolução de cada incidente

**Alinhamento com a Solução:**
Ana acessa o **Dashboard** com indicadores em tempo real, gerencia o status das ocorrências com controle de permissões (somente supervisores e gestores podem excluir) e exporta relatórios pelo módulo de **Relatórios**.

---

### Persona 3: Roberto Silva — Analista de Segurança

**Perfil:** 32 anos, analista focado em identificar padrões e tendências de incidentes. Perfil mais técnico — trabalha com dados e métricas operacionais para apoiar decisões estratégicas.

**Necessidades:**
- Filtrar ocorrências por categoria, prioridade e período
- Analisar tendências de incidentes ao longo do tempo
- Consultar histórico completo de ocorrências e comentários
- Cruzar dados de turnos com tipos de ocorrências

**Frustrações:**
- Dados espalhados em planilhas e cadernos físicos
- Impossibilidade de filtrar e buscar registros históricos com eficiência
- Falta de gráficos e métricas consolidadas

**Alinhamento com a Solução:**
Roberto usa o módulo de **Histórico** com filtros avançados (status, prioridade, categoria, período) e o módulo de **Relatórios** com gráficos de distribuição por tipo e hora.

---

### Persona 4: Patricia Costa — Gestora Operacional

**Perfil:** 42 anos, gestora do SOC com visão estratégica sobre a operação. Não acompanha as ocorrências em tempo real, mas precisa de relatórios consolidados e indicadores de desempenho para tomadas de decisão.

**Necessidades:**
- Visão macro do desempenho da equipe de segurança
- Indicadores de SLA (tempo médio de resolução de ocorrências)
- Controle total sobre usuários e permissões do sistema
- Confiança na integridade dos dados registrados

**Frustrações:**
- Relatórios inconsistentes gerados manualmente por cada supervisor
- Falta de auditoria sobre quem registrou ou alterou cada ocorrência
- Dificuldade em justificar investimentos em segurança sem dados confiáveis

**Alinhamento com a Solução:**
Patricia acessa o **Dashboard executivo** com os KPIs do CD e os **Relatórios** consolidados. Possui perfil GESTOR com as maiores permissões do sistema, podendo excluir ocorrências e gerenciar usuários.

---

## Histórias de usuários

Com base na análise das personas, foram identificadas as seguintes histórias de usuários:

| EU COMO... `PERSONA` | QUERO/PRECISO... `FUNCIONALIDADE` | PARA... `MOTIVO/VALOR` |
|----------------------|-----------------------------------|------------------------|
| Carlos (Operador) | Registrar uma ocorrência com título, descrição, categoria, prioridade e local | Documentar incidentes de forma rápida e padronizada durante o turno |
| Carlos (Operador) | Visualizar as ocorrências abertas e em andamento | Saber o que está acontecendo no CD sem precisar perguntar para o colega |
| Carlos (Operador) | Registrar a passagem de turno com resumo, pendências e eventos | Garantir que o próximo operador saiba exatamente o que aconteceu no turno anterior |
| Carlos (Operador) | Adicionar comentários em ocorrências existentes | Complementar informações e registrar atualizações sem sobrescrever o registro original |
| Ana (Supervisora) | Atualizar o status de uma ocorrência (Aberta → Em Andamento → Resolvida) | Controlar o ciclo de vida dos incidentes e garantir que nenhum fique sem tratamento |
| Ana (Supervisora) | Visualizar o dashboard com indicadores em tempo real | Ter visão imediata de ocorrências críticas ativas ao começar o turno |
| Ana (Supervisora) | Receber notificações em tempo real de novas ocorrências | Agir rapidamente em incidentes sem depender de rádio ou ligação |
| Roberto (Analista) | Filtrar ocorrências por status, prioridade e categoria | Identificar padrões e focar na análise sem navegar por dados irrelevantes |
| Roberto (Analista) | Consultar o histórico completo de ocorrências com seus comentários | Realizar análises retroativas e auditar a evolução de cada incidente |
| Roberto (Analista) | Visualizar gráficos de ocorrências por hora e por tipo | Identificar horários de pico e categorias mais frequentes de incidentes |
| Patricia (Gestora) | Fazer login com perfil GESTOR e ter controle total do sistema | Garantir a governança e integridade dos registros operacionais |
| Patricia (Gestora) | Visualizar relatórios exportáveis com KPIs do período | Apresentar dados consolidados à diretoria e justificar investimentos em segurança |
| Patricia (Gestora) | Excluir ocorrências incorretas ou duplicadas | Manter a qualidade e confiabilidade da base de dados operacional |

---

## Requisitos

### Requisitos funcionais

| ID | Descrição do Requisito | Prioridade |
|----|------------------------|------------|
| RF-001 | O sistema deve permitir que o usuário crie uma conta com nome, e-mail, senha e perfil de acesso | ALTA |
| RF-002 | O sistema deve permitir que o usuário faça login com e-mail e senha, recebendo um token JWT | ALTA |
| RF-003 | O sistema deve controlar o acesso por perfis (OPERADOR, ANALISTA, SUPERVISOR, GESTOR) | ALTA |
| RF-004 | O sistema deve permitir o registro de ocorrências com título, descrição, categoria, prioridade, local e status | ALTA |
| RF-005 | O sistema deve permitir a atualização do status de ocorrências (ABERTA, EM_ANDAMENTO, RESOLVIDA, ARQUIVADA) | ALTA |
| RF-006 | O sistema deve registrar automaticamente a data e hora de resolução quando o status mudar para RESOLVIDA | ALTA |
| RF-007 | O sistema deve permitir que usuários adicionem comentários em ocorrências existentes | ALTA |
| RF-008 | O sistema deve exibir um dashboard com indicadores: total, abertas, em andamento, resolvidas, por prioridade e por categoria | ALTA |
| RF-009 | O sistema deve notificar todos os usuários conectados em tempo real quando uma ocorrência for criada ou atualizada | ALTA |
| RF-010 | O sistema deve permitir o registro de passagens de turno com turno (Manhã/Tarde/Noite), resumo, pendências e eventos | ALTA |
| RF-011 | O sistema deve permitir a consulta do histórico de ocorrências com filtros por status, prioridade e categoria | MÉDIA |
| RF-012 | O sistema deve exibir relatórios com gráficos de ocorrências por hora e por tipo/categoria | MÉDIA |
| RF-013 | O sistema deve permitir a exclusão de ocorrências apenas por usuários com perfil SUPERVISOR ou GESTOR | MÉDIA |
| RF-014 | O sistema deve exibir os dados do operador logado (nome e perfil) no cabeçalho de todas as páginas | BAIXA |

### Requisitos não funcionais

| ID | Descrição do Requisito | Prioridade |
|----|------------------------|------------|
| RNF-001 | O sistema deve possuir interface moderna, intuitiva e responsiva | ALTA |
| RNF-002 | O sistema deve garantir a segurança dos dados por meio de autenticação JWT com expiração de 8 horas | ALTA |
| RNF-003 | As senhas dos usuários devem ser armazenadas com hash bcrypt (salt rounds = 10) | ALTA |
| RNF-004 | O sistema deve processar as requisições em no máximo 3 segundos em condições normais de uso | MÉDIA |
| RNF-005 | O sistema deve utilizar banco de dados relacional (MySQL) com ORM (Prisma) para garantir integridade dos dados | MÉDIA |
| RNF-006 | O sistema deve funcionar nos navegadores modernos: Chrome, Edge e Firefox | MÉDIA |
| RNF-007 | A comunicação em tempo real deve ser implementada via Socket.io | MÉDIA |
| RNF-008 | O sistema deve estar disponível 24/7, exceto em manutenções programadas | BAIXA |

---

## Restrições

| ID | Restrição |
|----|-----------|
| 001 | O projeto deverá ser entregue até o final do semestre letivo |
| 002 | O sistema deverá ser executado em ambiente Windows com Node.js instalado |
| 003 | O banco de dados utilizado deverá ser MySQL, gerenciado via Prisma ORM |
| 004 | O desenvolvimento será realizado pelos integrantes do grupo, sem contratação externa |
| 005 | O frontend deverá ser desenvolvido em HTML, CSS e JavaScript puro (sem frameworks como React ou Vue) |
| 006 | O sistema deverá ser acessível exclusivamente via navegadores web modernos |
| 007 | O projeto deverá utilizar controle de versão Git para gerenciamento do código-fonte |
| 008 | A autenticação deverá ser implementada com JWT, sem uso de serviços de terceiros |

---

## Diagrama de casos de uso

### Atores do Sistema

| Ator | Descrição |
|------|-----------|
| **Operador** | Perfil com acesso básico: registra ocorrências, faz passagem de turno e visualiza o dashboard |
| **Analista** | Mesmo acesso do Operador, com foco em consulta e análise do histórico e relatórios |
| **Supervisor** | Acesso do Operador + pode excluir ocorrências e gerenciar o fluxo de status |
| **Gestor** | Acesso total ao sistema, incluindo relatórios executivos e administração de usuários |

### Casos de Uso Principais

| ID | Caso de Uso | Ator Principal | Prioridade |
|----|-------------|----------------|------------|
| UC01 | Criar conta | Qualquer usuário | ALTA |
| UC02 | Fazer login | Qualquer usuário | ALTA |
| UC03 | Visualizar perfil do usuário logado | Qualquer usuário | BAIXA |
| UC04 | Registrar ocorrência | Operador+ | ALTA |
| UC05 | Listar e filtrar ocorrências | Operador+ | ALTA |
| UC06 | Ver detalhe completo de uma ocorrência | Operador+ | ALTA |
| UC07 | Adicionar comentário em ocorrência | Operador+ | ALTA |
| UC08 | Atualizar status da ocorrência | Operador+ | ALTA |
| UC09 | Registrar passagem de turno | Operador+ | ALTA |
| UC10 | Visualizar histórico de turnos | Operador+ | MÉDIA |
| UC11 | Visualizar dashboard com indicadores | Operador+ | ALTA |
| UC12 | Receber notificações em tempo real | Operador+ | ALTA |
| UC13 | Excluir ocorrência | Supervisor / Gestor | MÉDIA |
| UC14 | Visualizar relatórios e gráficos | Analista / Gestor | MÉDIA |

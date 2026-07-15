
# Metodologia

O desenvolvimento do ClearMind seguiu princípios da metodologia ágil Scrum, com as atividades organizadas em Sprints. As tarefas foram distribuídas entre os integrantes da equipe e acompanhadas por meio do GitHub Projects.

A comunicação entre os membros ocorreu continuamente durante o desenvolvimento, permitindo o alinhamento das atividades e a resolução de dúvidas. Para o controle de versão e integração do código, foram utilizados Git e GitHub, com o uso de branches para organizar as diferentes etapas do desenvolvimento.

Ao final de cada Sprint, as entregas eram revisadas e integradas ao projeto, garantindo a evolução contínua da documentação, da interface e da aplicação.
## Controle de versão

A ferramenta de controle de versão adotada no projeto foi o [Git](https://git-scm.com/), sendo que o [GitHub](https://github.com) foi utilizado para hospedagem do repositório.

O projeto segue a seguinte convenção para o nome de branches:

- `main`: versão estável já testada do software
- `unstable`: versão já testada do software, porém instável
- `testing`: versão em testes do software
- `dev`: versão de desenvolvimento do software

Quanto à gerência de issues, o projeto adota a seguinte convenção para etiquetas:

- `documentation`: melhorias ou acréscimos à documentação
- `bug`: uma funcionalidade encontra-se com problemas
- `enhancement`: uma funcionalidade precisa ser melhorada
- `feature`: uma nova funcionalidade precisa ser introduzida

## Planejamento do projeto

###  Divisão de papéis

#### Sprint 1
- Modelo de Negócio: Pedro Paulo
- Personas: Gustavo Venâncio
- Requisitos: Pedro Paulo
- Restrições: Samuel Marques
- Histórias de usuários: Caio Neri
- Diagrama de casos de uso: Pedro Paulo

#### Sprint 2
- Diagrama de Classes: Gustavo Venâncio
- Modelo de Dados: Pedro Paulo
- Modelo Físico do Banco de dados: Caio Neri
- Tecnologias: Gabriel Lucas
- Hospedagens: Samuel Marques
- Teste de qualidade: Cayo Vitor

#### Sprint 3
- Desenvolvimento da página inicial: Gustavo Venâncio
- Desenvolvimento da página de diário: Pedro Paulo
- Desenvolvimento da página de comunidade: Caio Neri
- Desenvolvimento das telas de cadastro e login: Cayo Vitor
- Desenvolvimento da tela de configuração: Samuel Marques
- Desenvolvimento das telas de formulários: Gabriel Lucas
- Elaboração do plano de testes: Gustavo Venâncio

###  Quadro de tarefas

#### Sprint 1

Atualizado em: 14/03/2026

| Responsável   | Tarefa/Requisito | Iniciado em    | Prazo      | Status | Terminado em    |
| :----         |    :----         |      :----:    | :----:     | :----: | :----:          |
| Gabriel Lucas | Contexto | 04/03/2026     | 15/03/2026 | ✔️    |     06/03/2026  |
| Pedro Paulo   | Modelo De Negócios    | 07/03/2026     | 15/03/2026 | ✔️    |   10/03/2026              |
| Pedro Paulo   | Requisitos | 07/03/26  | 15/03/2026 |  ✔️|   10/03/26 |
| Gustavo Venâncio  | Persona 1 - 5  | 08/03/2026     | 15/03/2026 | ✔️     |  09/03/2026               |
| Samuel Marques        | Restrições  |    06/03/2026        | 15/03/2026 | ✔️    |     06/03/2026  |

#### Sprint 2

Atualizado em: 18/04/2026

| Responsável   | Tarefa/Requisito | Iniciado em    | Prazo      | Status | Terminado em    |
| :----         |    :----         |      :----:    | :----:     | :----: | :----:          |
| Gabriel Lucas        | Tecnologias   | 10/04/2026     | 15/04/2026 | ✔️    | 11/04/2026      |
| Pedro Paulo        | Modelo de dados    | 01/04/2026     | 15/04/2026 | ✔️    | 01/04/2026                |
| Pedro Paulo        | Template da Aplicação    | 01/04/2026     | 15/04/2026 | ✔️    | 05/04/2026                |
| Gustavo Venâncio        | Projeto de interface (User flow,Diagrama de fluxo, Wireframes, Interface do sistema)  | 01/04/2026     | 15/04/2026 | ✔️     |   11/04/2026              |
| Gustavo Venâncio        | Diagrama de Classes  | 01/04/2026     | 15/04/2026 | ✔️     |   03/04/2026              |
| Samuel Marques        | Hospedagem  |  10/04/2026    | 15/04/2026 | ✔️    |   11/04/2026    |
| Cayo Vitor       | Teste de qualidade  |  10/04/2026    | 15/04/2026 | ✔️    |   12/04/2026    |
| Caio Neri      | Modelo Fisico de Banco de dados  |  13/04/2026    | 15/04/2026 | ✔️    |   16/04/2026    |

#### Sprint 3

Atualizado em: 19/06/2026

| Responsável   | Tarefa/Requisito | Iniciado em    | Prazo      | Status | Terminado em    |
| :----         |    :----         |      :----:    | :----:     | :----: | :----:          |
| Gabriel Lucas        | Telas de formulários   | 20/05/2026     | 20/05/2026 | ✔️    | 23/05/2026      |
| Pedro Paulo        | Página de diário    | 20/05/2026     | 24/05/2026 | ✔️    | 24/05/2026                |
| Gustavo Venâncio        | Página Inicial  | 20/05/2026     | 24/05/2026 | ✔️     |   24/05/2026              |
| Gustavo Venâncio        | BackLog e Kanban  | 04/05/2026     | 10/05/2026 | ✔️     |   10/05/2026              |
| Gustavo Venâncio        | Plano de testes  | 04/05/2026     | 10/05/2026 | ✔️     |   10/05/2026              |
| Samuel Marques        | Tela de Configuração  |  23/05/2026    | 24/05/2026 | ✔️    |   24/05/2026    |
| Cayo Vitor       | Tela de cadastro e login  |  16/05/2026    | 24/05/2026 | ✔️    |   24/05/2026    |
| Caio Neri      | Página de comunidade  |  20/05/2026    | 24/05/2026 | ✔️    |   24/05/2026    |

Legenda:
- ✔️: terminado
- 📝: em execução
- ⌛: atrasado
- ❌: não iniciado

## Processo

O desenvolvimento do ClearMind foi conduzido utilizando conceitos da metodologia ágil Scrum, com a organização do trabalho dividida em Sprints. As atividades foram distribuídas entre os integrantes da equipe de acordo com as competências e responsabilidades definidas para cada etapa do projeto.

Inicialmente, foi criado um Product Backlog contendo todas as funcionalidades, requisitos e artefatos necessários para o desenvolvimento da aplicação. A partir desse backlog, as tarefas foram selecionadas e distribuídas ao longo das Sprints de acordo com a prioridade e dependência entre as atividades.

Para o acompanhamento do progresso do projeto, foi utilizado o GitHub Projects com a metodologia Kanban. As tarefas foram organizadas em colunas que representam o fluxo de desenvolvimento:

- **Backlog:** tarefas identificadas, mas ainda não iniciadas;
- **A Fazer (To Do):** atividades planejadas para a Sprint atual;
- **Em Andamento (In Progress):** tarefas em desenvolvimento;
- **Em Revisão (Review):** atividades concluídas aguardando validação;
- **Concluído (Done):** tarefas finalizadas e aprovadas.

Durante o desenvolvimento, cada integrante atualizava o status de suas atividades conforme a evolução do trabalho, permitindo que toda a equipe acompanhasse o andamento do projeto em tempo real.

Além disso, o GitHub Issues foi utilizado para registrar melhorias, correções de erros e novas funcionalidades. As etiquetas definidas no processo de gerenciamento de configuração permitiram classificar cada item como documentação, correção de bugs, melhorias ou novas funcionalidades.

Ao final de cada Sprint, as entregas eram revisadas pela equipe para verificar o atendimento aos requisitos definidos e identificar possíveis ajustes antes do início da Sprint seguinte.
## Ferramentas

Os artefatos do projeto são desenvolvidos a partir de diversas plataformas. A relação dos ambientes com seus respectivos propósitos deverá ser apresentada em uma tabela que especifique e detalhe Ambiente, Plataforma e Link de Acesso. Sempre que possível, inclua também frameworks, bibliotecas e demais tecnologias utilizadas, indicando seu uso em contextos específicos, como aplicações móveis, web ou outros.

Exemplo: os artefatos do projeto são desenvolvidos a partir de diversas plataformas e a relação dos ambientes com seu respectivo propósito é apresentada na tabela que se segue.

| Ambiente                            | Plataforma                         | Link de acesso                         |
|-------------------------------------|------------------------------------|----------------------------------------|
| Repositório de código fonte         | GitHub                             | https://github.com/ICEI-PUC-Minas-PBE-ADS-TI/2026-1-p3-tidai-grupo-venancio                            |
| Documentos do projeto               | GitHub                             | https://github.com/ICEI-PUC-Minas-PBE-ADS-TI/2026-1-p3-tidai-grupo-venancio/tree/main/docs                           |
| Projeto de interface                | Figma                              | https://www.figma.com/design/6C8k8YmAzOzpUmjLIzDPot/ClearMind?node-id=7102-1266&p=f                            |
| Gerenciamento do projeto            | GitHub Projects                    | http://....                            |
| Hospedagem                          | Vercel                             | http://....                            |
 

# Plano de Testes de Software – ClearMind

## Cenários de Teste

O plano de testes foi elaborado com base nos requisitos funcionais definidos para o sistema ClearMind, uma aplicação voltada para auxiliar usuários no processo de superação de vícios.

Os testes foram realizados considerando usuários em processo de recuperação, além de membros da equipe de desenvolvimento.

As funcionalidades avaliadas incluem:

- Cadastro de usuário  
- Login  
- Validação de dados  
- Registro de informações pessoais (sobriedade, vício, importância)  
- Navegação no sistema  
- Logout
- Alteração de dados pessoais (nome, e-mail)
- Alteração de senha
- Atualização da data de sobriedade
- Atualização do tipo de vício
- Atualização do grau de importância da recuperação
- Exclusão de conta
- Validação de campos obrigatórios nas configurações
- Persistência das alterações realizadas

---

## Casos de Teste

| **Caso de teste** | **CT-001 – Fluxo de Cadastro Completo** |
|:---:|:---:|
| **Requisito associado** | RF-001 |
| **Objetivo do teste** | Verificar se o usuário consegue criar uma conta com todos os dados obrigatórios. |
| **Passos** | - Acessar a tela de cadastro <br> - Preencher nome, e-mail e senha <br> - Clicar em "Cadastrar" |
| **Critério de êxito** | O sistema cria a conta e encaminha o usuário para o onboarding de hábitos. |
| **Responsável** | Cayo Vitor |

---

| **Caso de teste** | **CT-002 – Autenticação e Sessão (Login/Logout)** |
|:---:|:---:|
| **Requisito associado** | RF-002 |
| **Objetivo do teste** | Validar o fluxo de autenticação e encerramento de sessão do usuário. |
| **Passos** | - Acessar a tela de login <br> - Inserir e-mail e senha válidos <br> - Realizar login <br> - Navegar pelo sistema <br> - Clicar em "Sair" |
| **Critério de êxito** | O usuário consegue acessar a dashboard e, após clicar em sair, a sessão é encerrada redirecionando para a tela de login. |
| **Responsável** | Samuel Marques |

---

| **Caso de teste** | **CT-003 – Seleção e Registro do Tipo de Vício** |
|:---:|:---:|
| **Requisito associado** | RF-003 |
| **Objetivo do teste** | Verificar se o sistema permite selecionar e salvar o vício que o usuário deseja acompanhar. |
| **Passos** | - Acessar a primeira etapa de onboarding (`page1.html`) <br> - Selecionar um ou mais vícios/hábitos da lista <br> - Clicar em avançar para registrar a escolha |
| **Critério de êxito** | O tipo de vício selecionado é gravado em cache no `sessionStorage` para envio final ao banco de dados. |
| **Responsável** | Gustavo Venâncio |

---

| **Caso de teste** | **CT-004 – Contador de Sobriedade em Tempo Real** |
|:---:|:---:|
| **Requisito associado** | RF-004 |
| **Objetivo do teste** | Garantir que o contador calcula o tempo correto e persiste dinamicamente a cada segundo. |
| **Passos** | - Fazer login e acessar a tela inicial (`pginicial.html`) <br> - Observar o avanço dos segundos no contador <br> - Pressionar F5 (atualizar página) e verificar a persistência do contador |
| **Critério de êxito** | O contador avança dinamicamente a cada segundo e o timer não reinicia do zero após atualizar a página. |
| **Responsável** | Gustavo Venâncio |

---

| **Caso de teste** | **CT-005 – Registro de Recaída / Reset do Contador** |
|:---:|:---:|
| **Requisito associado** | RF-005 |
| **Objetivo do teste** | Validar se o usuário consegue registrar uma recaída atualizando a data de sobriedade para o momento atual. |
| **Passos** | - Fazer login e acessar a página de configurações <br> - Alterar a data de início para a data e hora atual <br> - Salvar as configurações e verificar a tela inicial |
| **Critério de êxito** | A data de sobriedade é atualizada no banco de dados e o contador da tela inicial reinicia a contagem do zero. |
| **Responsável** | Caio Neri |

---

| **Caso de teste** | **CT-006 – Histórico de Progresso e Marcos** |
|:---:|:---:|
| **Requisito associado** | RF-006 |
| **Objetivo do teste** | Verificar se os marcos alcançados e estatísticas de sobriedade são exibidos conforme o progresso. |
| **Passos** | - Acessar a página inicial (`pginicial.html`) <br> - Visualizar o card de "Último Marco" <br> - Verificar a estimativa e o cálculo de dias restantes para a próxima meta |
| **Critério de êxito** | O sistema calcula e exibe corretamente os dias faltantes com base na data de sobriedade do banco de dados. |
| **Responsável** | Caio Neri |

---

| **Caso de teste** | **CT-007 – Exibição de Mensagens de Motivação** |
|:---:|:---:|
| **Requisito associado** | RF-009 |
| **Objetivo do teste** | Validar se o sistema exibe mensagens diárias de motivação e acolhimento para o usuário. |
| **Passos** | - Acessar a tela inicial (`pginicial.html`) <br> - Verificar se o painel exibe banners ou frases motivadoras |
| **Critério de êxito** | O sistema exibe textos motivacionais e de apoio voltados para o autocontrole. |
| **Responsável** | Pedro Paulo |

---

| **Caso de teste** | **CT-008 – Comunidade e Publicações Anônimas** |
|:---:|:---:|
| **Requisito associado** | RF-010 |
| **Objetivo do teste** | Verificar se o usuário consegue publicar e ler relatos na comunidade sob anonimato. |
| **Passos** | - Acessar a aba Comunidade (`comunidade.html`) <br> - Criar um relato com título e conteúdo e clicar em publicar <br> - Verificar se a autoria da postagem é renderizada como anônima no feed |
| **Critério de êxito** | A publicação é inserida no banco e renderizada de forma pública sem expor os dados reais do usuário. |
| **Responsável** | Pedro Paulo |

---

| **Caso de teste** | **CT-009 – Diário Pessoal (Operações CRUD)** |
|:---:|:---:|
| **Requisito associado** | RF-011 |
| **Objetivo do teste** | Validar o fluxo de registro e exclusão de anotações no diário privado. |
| **Passos** | - Acessar a página Diário (`diario.html`) <br> - Criar uma nova anotação preenchendo título e conteúdo <br> - Verificar se a nota é adicionada na listagem <br> - Clicar no botão "Excluir" |
| **Critério de êxito** | As anotações são salvas, renderizadas corretamente, e removidas sem erros ao acionar a exclusão. |
| **Responsável** | Samuel Marques |

---

| **Caso de teste** | **CT-010 – Configurações e Exclusão Permanente de Conta** |
|:---:|:---:|
| **Requisito associado** | RF-012 |
| **Objetivo do teste** | Validar a alteração de dados cadastrais e o encerramento permanente da conta. |
| **Passos** | - Acessar a tela de configurações <br> - Atualizar nome/e-mail ou alterar senha e salvar <br> - Clicar em "Excluir conta" e confirmar exclusão |
| **Critério de êxito** | Os dados do perfil são alterados e, após a exclusão de conta, o login não deve mais ser permitido com as antigas credenciais. |
| **Responsável** | Gabriel Lucas |


## Ferramentas de Testes

As seguintes ferramentas foram utilizadas para a validação do plano:

- Navegadores web (Google Chrome e Mozilla Firefox)  
- Ferramentas de desenvolvedor (DevTools) para depuração de console e rede  
- Testes manuais integrados para conferência de banco de dados  

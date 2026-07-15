# Plano de Testes de Usabilidade – ClearMind

## Objetivo

O objetivo deste plano de testes de usabilidade é avaliar a experiência dos usuários ao utilizar a aplicação **ClearMind**, verificando a facilidade de navegação, eficiência, compreensão das funcionalidades e satisfação durante a execução das principais tarefas do sistema.

Os cenários foram elaborados com base nas principais histórias de usuário e requisitos funcionais implementados, permitindo identificar possíveis dificuldades de uso e oportunidades de melhoria na interface.

---

## Participantes

Serão convidados 5 voluntários cujos perfis foram diretamente mapeados a partir das personas do projeto definidas na Etapa 02:

| ID Participante | Idade | Gênero | Ocupação | Persona Correspondente | Perfil / Nível de Afinidade Digital |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **P1** | 34 anos | Masculino | Advogado Corporativo | Lucas Pereira | Alta afinidade digital. Busca sigilo e controle de gatilhos na sua rotina de trabalho. |
| **P2** | 29 anos | Feminino | Analista de Suporte | Mariana Costa | Média afinidade digital. Busca check-in emocional e suporte em horários flexíveis. |
| **P3** | 21 anos | Masculino | Estudante de Engenharia | Ricardo Souza | Alta afinidade digital. Motivado por gamificação, resposta móvel rápida e controle de impulsos. |
| **P4** | 68 anos | Masculino | Aposentado | Seu Benedito | Baixa afinidade digital. Necessita de acessibilidade, letras grandes e navegação simplificada. |
| **P5** | 42 anos | Feminino | Professora | Ana Paula Oliveira | Média afinidade digital. Familiar de dependente, busca fóruns de apoio e conteúdos educativos. |

Em conformidade com a Lei Geral de Proteção de Dados (LGPD), nenhuma informação pessoal sensível real dos participantes será exposta.

---

## Metodologia

Os testes serão realizados de forma remota através de ferramentas de videoconferência (Google Meet / Microsoft Teams), com acompanhamento dos avaliadores.

### Métodos utilizados

*   Observação direta da interação do usuário com a tela compartilhada;
*   Medição do tempo necessário para execução das tarefas;
*   Registro de erros e dificuldades encontradas;
*   Coleta de feedback subjetivo dos participantes ao final da sessão.

---

## Métricas Coletadas

### Taxa de Sucesso
Indica se o participante conseguiu concluir a tarefa proposta de forma autônoma (Completa / Com Ajuda / Não Concluída).

### Tempo de Execução
Tempo gasto em segundos pelo participante para concluir cada atividade.

### Quantidade de Erros
Número de dificuldades, cliques errados ou falhas encontradas durante a realização da tarefa.

### Satisfação do Usuário
Avaliação subjetiva da experiência utilizando a seguinte escala de satisfação (1 a 5):
*   1 - Péssimo
*   2 - Ruim
*   3 - Regular
*   4 - Bom
*   5 - Ótimo

---

## Procedimentos

1. Apresentação da aplicação ao participante e assinatura do termo de consentimento;
2. Explicação dos objetivos do teste;
3. Apresentação dos cenários de uso reais;
4. Execução das tarefas propostas;
5. Coleta das métricas definidas;
6. Registro das observações e feedback dos participantes.

---

## Recursos Necessários

*   Computador ou smartphone com acesso à internet;
*   Navegador moderno com suporte a Javascript;
*   Sistema ClearMind hospedado ou em execução local;
*   Tabela de coleta de dados de usabilidade.

---

## Cenários de Teste de Usabilidade

Os cenários a seguir foram reformulados para cobrir as histórias de usuário reais da Etapa 02 do projeto:

| Nº | Funcionalidade Avaliada | Descrição do Cenário |
| :--- | :--- | :--- |
| **1** | Cadastro Anônimo (Lucas) | Você deseja usar a plataforma de forma segura e sem expor sua identidade profissional. Realize o cadastro criando uma conta com nome anônimo (pseudônimo) e e-mail de teste. |
| **2** | Timeline/Contador de Sobriedade (Lucas) | Acesse o painel principal e verifique seu progresso diário livre do álcool no contador em tempo real da sua timeline de sobriedade. |
| **3** | Check-in Emocional Diário (Mariana) | Realize o check-in emocional do dia para registrar seu estado de humor e nível de ansiedade atual, avaliando potenciais gatilhos de recaída. |
| **4** | Gamificação e Badges (Ricardo) | Consulte a área de conquistas da sua conta para verificar se as metas batidas de tempo de sobriedade destravaram as medalhas correspondentes. |
| **5** | Modo de Emergência (Ricardo) | Simule um momento crítico de forte impulso. Acione o botão de "Modo de Emergência" na tela inicial e verifique as opções de suporte imediato fornecidas. |
| **6** | Interface Acessível com Letras Grandes (Seu Benedito) | Acesse as opções de visualização da plataforma e ative o modo de acessibilidade para idosos, verificando se os textos aumentam e a navegação se torna simplificada. |
| **7** | Lembretes Diários de Motivação (Seu Benedito) | Encontre e leia as mensagens diárias automáticas de motivação e acolhimento enviadas para combater sentimentos de solidão. |
| **8** | Fóruns de Discussão para Familiares (Ana Paula) | Acesse a comunidade e encontre a aba dedicada aos familiares de dependentes. Busque ou envie um relato de apoio no fórum sobre co-dependência. |
| **9** | Conteúdos Educativos (Ana Paula) | Navegue até o acervo informativo do site e encontre um artigo ou vídeo explicativo sobre o ciclo da dependência e redução de danos. |

---

## Tabela de Relação Cenário × História de Usuário

| Cenário | ID História (Etapa 02) | Persona Mapeada | Funcionalidade/Objetivo Avaliado |
| :---: | :---: | :--- | :--- |
| **C1** | US-02 | Lucas Pereira | Garantia de anonimato no cadastro e perfil do usuário |
| **C2** | US-01 | Lucas Pereira | Visualização clara de vitórias na Timeline de Sobriedade |
| **C3** | US-03 | Mariana Costa | Check-in emocional diário para identificação de gatilhos |
| **C4** | US-05 | Ricardo Souza | Visualização de Badges e Conquistas de Gamificação |
| **C5** | US-06 | Ricardo Souza | Acionamento rápido do "Modo de Emergência" em impulsos críticos |
| **C6** | US-07 | Seu Benedito | Acessibilidade visual (letras grandes) e navegação simples |
| **C7** | US-08 | Seu Benedito | Lembretes diários motivacionais e de acolhimento |
| **C8** | US-09 | Ana Paula Oliveira | Fórum de discussão específico para familiares |
| **C9** | US-10 | Ana Paula Oliveira | Acesso a conteúdos educativos sobre ciclos de dependência |

---

## Tabela de Registro das Métricas (Modelo de Coleta)

Esta tabela será preenchida durante a execução das sessões de teste de usabilidade com os voluntários:

| ID Part. | Cenário | Conclusão (Sim/Não) | Tempo (segundos) | Quant. Erros | Satisfação (1 a 5) | Observações / Dificuldades Encontradas |
| :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **P1** | C1 | | | | | |
| **P1** | C2 | | | | | |
| **P2** | C3 | | | | | |
| **P3** | C4 | | | | | |
| **P3** | C5 | | | | | |
| **P4** | C6 | | | | | |
| **P4** | C7 | | | | | |
| **P5** | C8 | | | | | |
| **P5** | C9 | | | | | |

---

## Resultados Esperados

*   A taxa de sucesso média dos cenários deve ser superior a 85%;
*   Participantes com menor afinidade digital (como no perfil P4) devem concluir o cenário C6 de acessibilidade de forma intuitiva;
*   O tempo médio de execução deve se manter abaixo de 60 segundos por cenário;
*   O índice médio de satisfação subjetiva deve ser igual ou superior a 4 (Bom) na escala utilizada.

---

## Considerações sobre a LGPD

Para garantir a privacidade dos participantes:
*   As informações coletadas serão utilizadas exclusivamente para fins acadêmicos na disciplina;
*   Nenhum dado real de identificação civil (como nome completo, CPF ou endereço) será associado aos relatórios.

---

## Observações Finais

Este documento apresenta o planejamento dos testes de usabilidade da aplicação. Os resultados obtidos durante a execução dos testes serão documentados posteriormente no registro de testes de usabilidade do projeto.

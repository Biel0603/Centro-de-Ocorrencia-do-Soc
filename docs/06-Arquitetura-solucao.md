# Arquitetura da solução

## Diagrama de classes

Diagrama de classes ClearMind
![Diagrama de Classes](images/diagrama%20de%20classes%20de%20uso.png)

##  Modelo de dados

Modelo de dados ClearMind 

### Modelo conceitual 

![DiagramaClearMind](https://github.com/user-attachments/assets/05bd7c46-570b-4c88-a9e1-2797c7231464)

---

### Modelo relacional

![DiagramaClearMind-Relacional](https://github.com/user-attachments/assets/08bae609-0682-492c-85c9-1c8fd8833fb6)

---

### Modelo físico



```sql
CREATE DATABASE clearmind;
USE clearmind;

CREATE TABLE Usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    email VARCHAR(100),
    senhaHash VARCHAR(100),
    dataCriacao DATETIME
);

CREATE TABLE HabitoRastreado (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuarioId INT,
    tipoHabito VARCHAR(100),
    dataInicio DATETIME,
    nivelMotivacao VARCHAR(50), -- Mais simples que ENUM
    FOREIGN KEY (usuarioId) REFERENCES Usuario(id)
);

CREATE TABLE Postagem (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuarioId INT,
    titulo VARCHAR(100),
    conteudo TEXT,
    dataPublicacao DATETIME,
    tags VARCHAR(255), -- Lista salva como texto simples aqui
    FOREIGN KEY (usuarioId) REFERENCES Usuario(id)
);

CREATE TABLE AnotacaoDiario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuarioId INT,
    titulo VARCHAR(100),
    conteudo TEXT,
    dataCriacao DATETIME,
    FOREIGN KEY (usuarioId) REFERENCES Usuario(id)
);
```
Esse script deverá ser incluído em um arquivo .sql na pasta [de scripts SQL](../src/db).


## Tecnologias Utilizadas

Para o desenvolvimento da solução proposta, denominada ClearMind, foram utilizadas tecnologias modernas voltadas para aplicações web, buscando desempenho, escalabilidade, segurança e boa experiência do usuário.

No front-end, a aplicação utiliza HTML, CSS, JavaScript e React.
O HTML é responsável pela estruturação das páginas, organizando os elementos visuais e o conteúdo exibido ao usuário.
O CSS é utilizado para a estilização da interface, proporcionando um design limpo, intuitivo e acolhedor, fundamental para um sistema voltado ao suporte emocional e saúde mental.
O JavaScript atua na interatividade da aplicação, permitindo respostas dinâmicas às ações do usuário, como check-ins emocionais, registros de progresso e interação na timeline.

Além disso, foi utilizado o framework React, que facilita a criação de componentes reutilizáveis e melhora a organização do código, tornando a interface mais dinâmica e responsiva.

No back-end, a tecnologia escolhida foi Node.js, responsável pelo processamento das regras de negócio, autenticação de usuários, integração entre front-end e banco de dados, além do gerenciamento das informações relacionadas aos registros de sobriedade, interações e privacidade.

Como Sistema Gerenciador de Banco de Dados (SGBD), foi utilizado MySQL, que armazena de forma estruturada os dados dos usuários, histórico emocional, tempo de abstinência, publicações e demais informações necessárias para o funcionamento da plataforma.

Para o deploy e hospedagem, foi utilizada a plataforma Vercel, permitindo a publicação da aplicação na web, com facilidade de atualização, escalabilidade e integração com o ambiente de desenvolvimento.

As ferramentas de apoio incluem IDEs como Visual Studio Code, utilizada no desenvolvimento e manutenção do código-fonte, além de bibliotecas auxiliares do ecossistema React e Node.js.

| Dimensão  | Tecnologia                      |
| --------- | ------------------------------- |
| Front-end | HTML + CSS + JavaScript + React |
| Back-end  | Node.js                         |
| SGBD      | MySQL                           |
| Deploy    | Vercel                          |



## Hospedagem

A presente aplicação será desenvolvida com o objetivo de oferecer suporte a indivíduos que convivem com condições de saúde específicas, demandando, portanto, uma infraestrutura confiável, segura e escalável. Para atender a esses requisitos, serão utilizadas ferramentas amplamente consolidadas no desenvolvimento de software moderno: GitHub, Replit e Heroku.

O processo de desenvolvimento e disponibilização da aplicação será estruturado em três etapas principais: desenvolvimento, versionamento e hospedagem.

Inicialmente, o desenvolvimento da aplicação será realizado por meio da plataforma Replit, que oferece um ambiente de programação baseado em nuvem. Essa ferramenta permitirá a escrita, execução e testes do código diretamente no navegador, facilitando a prototipagem rápida e a colaboração entre os membros da equipe, sem a necessidade de configurações locais complexas.

Em seguida, o código-fonte será armazenado e versionado utilizando o GitHub. Essa etapa será fundamental para garantir o controle de versões, rastreabilidade de alterações e colaboração entre desenvolvedores. Por meio de repositórios remotos, será possível manter um histórico detalhado das modificações realizadas, além de possibilitar integrações contínuas com outras plataformas.

Por fim, a aplicação será implantada (deploy) na plataforma Heroku, que atuará como um serviço de hospedagem em nuvem (Platform as a Service – PaaS). O Heroku permitirá a integração direta com repositórios do GitHub, automatizando o processo de publicação da aplicação. A cada atualização no repositório, o sistema poderá ser reimplantado automaticamente, garantindo que a versão mais recente esteja disponível aos usuários finais.

A arquitetura adotada proporcionará um fluxo contínuo e eficiente, no qual o desenvolvimento, armazenamento e disponibilização da aplicação estarão interligados. Esse modelo contribuirá para maior agilidade na entrega de novas funcionalidades, além de facilitar a manutenção e evolução do sistema.

Considerando que a aplicação será destinada a usuários que poderão lidar com dados sensíveis relacionados à saúde, aspectos como segurança da informação, privacidade e confiabilidade serão tratados como prioridades. Dessa forma, serão adotadas boas práticas como o uso de conexões seguras (HTTPS), controle de acesso e gerenciamento adequado dos dados armazenados, em conformidade com legislações vigentes, como a Lei Geral de Proteção de Dados (LGPD).

Em síntese, a utilização integrada das plataformas Replit, GitHub e Heroku viabilizará um ecossistema robusto para o desenvolvimento e hospedagem da aplicação, garantindo eficiência operacional, escalabilidade e segurança para os usuários. 


## Métricas de Qualidade

Com base na norma ISO/IEC 25010, foram definidas as seguintes características de qualidade e seus respectivos critérios de avaliação para o sistema ClearMind.

| Característica | Descrição | Métrica | Meta |
|---------------|-----------|---------|------|
| Usabilidade | Facilidade de utilização da plataforma pelos usuários | Taxa de sucesso na execução das tarefas principais | Pelo menos 90% dos usuários devem concluir as tarefas sem auxílio |
| Confiabilidade | Capacidade do sistema de operar sem falhas | Disponibilidade da aplicação | Disponibilidade mínima de 95% durante os testes |
| Desempenho | Tempo de resposta das funcionalidades | Tempo médio de carregamento das páginas | Até 3 segundos |
| Segurança | Proteção das informações dos usuários | Controle de acesso e autenticação | Apenas usuários autenticados podem acessar dados pessoais |
| Compatibilidade | Funcionamento em diferentes navegadores | Testes em múltiplos navegadores | Funcionamento correto no Chrome, Firefox e Edge |
| Manutenibilidade | Facilidade de correção e evolução do sistema | Organização e documentação do código | Código documentado e versionado no GitHub |
| Responsividade | Adaptação a diferentes dispositivos | Testes em diferentes resoluções de tela | Interface funcional em desktop, tablet e smartphone |

## Avaliação da Qualidade

A verificação da qualidade será realizada por meio de testes funcionais, testes de usabilidade e validações manuais executadas pela equipe de desenvolvimento. Os resultados obtidos serão comparados com as metas definidas na tabela anterior, permitindo identificar possíveis melhorias antes da entrega final do sistema.

Além disso, serão utilizados os casos de teste documentados no Plano de Testes para validar o comportamento esperado das principais funcionalidades da aplicação.

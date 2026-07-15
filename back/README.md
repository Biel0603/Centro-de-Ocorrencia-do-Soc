# SOC Insight — Backend

API REST + tempo real (Socket.io) para a plataforma SOC Insight.

## Stack

- Node.js + Express
- Prisma ORM + MySQL
- Socket.io (atualizações em tempo real)
- JWT (autenticação) + bcrypt (hash de senha)

## Como rodar

1. **Suba o MySQL pelo XAMPP** (aba "MySQL" no painel de controle → Start).

2. **Crie o banco de dados.** Pelo phpMyAdmin (`http://localhost/phpmyadmin`) ou linha de comando:
   ```sql
   CREATE DATABASE soc_insight;
   ```

3. **Confira o `.env`.** Por padrão o XAMPP usa usuário `root` sem senha na porta `3306`:
   ```
   DATABASE_URL="mysql://root:@127.0.0.1:3306/soc_insight"
   ```
   Se seu MySQL tiver senha ou porta diferente, ajuste essa linha (formato: `mysql://USUARIO:SENHA@HOST:PORTA/NOME_DO_BANCO`).

4. **Instale as dependências e crie as tabelas:**
   ```bash
   cd back
   npm install
   npx prisma migrate dev --name init
   ```

5. **Popule com usuários de teste (senha: 123456):**
   ```bash
   npm run seed
   ```

6. **Suba o servidor:**
   ```bash
   npm run dev
   ```

A API sobe em `http://localhost:3000`.

## Usuários de teste (após rodar o seed)

| Email               | Senha  | Papel      |
|---------------------|--------|------------|
| operador@soc.com    | 123456 | OPERADOR   |
| supervisor@soc.com  | 123456 | SUPERVISOR |
| analista@soc.com    | 123456 | ANALISTA   |
| gestor@soc.com      | 123456 | GESTOR     |

## Endpoints

### Auth
- `POST /api/auth/registrar` — cria usuário `{ nome, email, senha, role }`
- `POST /api/auth/login` — retorna `{ usuario, token }`
- `GET /api/auth/me` — dados do usuário logado (requer token)

### Ocorrências (requer token)
- `GET /api/ocorrencias` — lista (filtros opcionais: `?status=&prioridade=&categoria=`)
- `GET /api/ocorrencias/:id` — detalhe com comentários
- `POST /api/ocorrencias` — cria `{ titulo, descricao, categoria, prioridade, local }`
- `PUT /api/ocorrencias/:id` — atualiza (inclusive status)
- `DELETE /api/ocorrencias/:id` — remove (apenas SUPERVISOR/GESTOR)
- `POST /api/ocorrencias/:id/comentarios` — adiciona comentário `{ texto }`

### Passagem de turno (requer token)
- `GET /api/turnos` — lista
- `GET /api/turnos/:id` — detalhe
- `POST /api/turnos` — cria `{ turno, resumo, pendencias, eventos }`

### Dashboard (requer token)
- `GET /api/dashboard/indicadores` — totais, por status, por prioridade, por categoria, últimas ocorrências

## Autenticação

Envie o token no header:
```
Authorization: Bearer <token>
```

## Tempo real (Socket.io)

Conecte no front com:
```js
const socket = io('http://localhost:3000');

socket.on('ocorrencia:nova', (ocorrencia) => { /* atualiza a tela */ });
socket.on('ocorrencia:atualizada', (ocorrencia) => { /* ... */ });
socket.on('ocorrencia:removida', ({ id }) => { /* ... */ });
socket.on('ocorrencia:comentario', ({ ocorrenciaId, comentario }) => { /* ... */ });
socket.on('turno:nova', (passagem) => { /* ... */ });
```

Inclua a lib do client no seu HTML:
```html
<script src="http://localhost:3000/socket.io/socket.io.js"></script>
```

## Papéis (roles)

`OPERADOR`, `SUPERVISOR`, `ANALISTA`, `GESTOR` — controlados via JWT e middleware `autorizar()`.

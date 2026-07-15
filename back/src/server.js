require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const authRoutes = require('./routes/authRoutes');
const ocorrenciaRoutes = require('./routes/ocorrenciaRoutes');
const turnoRoutes = require('./routes/turnoRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const socketHandler = require('./sockets/socketHandler');

const app = express();
const server = http.createServer(app);

// Configuração do Socket.io - CORS liberado pra facilitar o desenvolvimento local
// (o front está em arquivos HTML estáticos, rodando em outra porta/servidor)
const io = new Server(server, {
  cors: { origin: '*' },
});

app.set('io', io);
socketHandler(io);

app.use(cors());
app.use(express.json());

// Rota de verificação rápida
app.get('/', (req, res) => {
  res.json({ status: 'ok', servico: 'SOC Insight API' });
});

app.use('/api/auth', authRoutes);
app.use('/api/ocorrencias', ocorrenciaRoutes);
app.use('/api/turnos', turnoRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Tratamento de rota não encontrada
app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada.' });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 SOC Insight API rodando em http://localhost:${PORT}`);
});

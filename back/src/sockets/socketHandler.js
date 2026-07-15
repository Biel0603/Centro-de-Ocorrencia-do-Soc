// Configura os eventos de conexão do Socket.io
// Os eventos de negócio (ocorrencia:nova, turno:nova, etc.) são emitidos
// diretamente dos controllers via req.app.get('io').emit(...)

function socketHandler(io) {
  io.on('connection', (socket) => {
    console.log(`[socket] Cliente conectado: ${socket.id}`);

    socket.on('disconnect', () => {
      console.log(`[socket] Cliente desconectado: ${socket.id}`);
    });
  });
}

module.exports = socketHandler;

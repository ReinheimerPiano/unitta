"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const sala_routes_1 = __importDefault(require("./routes/sala.routes"));
const pacote_routes_1 = __importDefault(require("./routes/pacote.routes"));
const compra_routes_1 = __importDefault(require("./routes/compra.routes"));
const reserva_routes_1 = __importDefault(require("./routes/reserva.routes"));
const auth_1 = require("./middlewares/auth");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Rotas
app.use('/users', auth_1.auth, user_routes_1.default);
app.use('/salas', auth_1.auth, sala_routes_1.default);
app.use('/pacotes', auth_1.auth, pacote_routes_1.default);
app.use('/compras', auth_1.auth, compra_routes_1.default);
app.use('/reservas', auth_1.auth, reserva_routes_1.default);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

const express = require ("express");

const app = express();

app.use (express.json());

const usuariosRoutes = require("./Routes/usuarios");
app.use("/usuarios", usuariosRoutes);

const PORT = 3000;
app.listen (PORT, ()  => {
    console.log(`Ta Rodando mais que beyblade a ${PORT}KM por minuto kkkkk`);
});
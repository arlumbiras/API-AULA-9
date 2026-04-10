const express = require("express");
const router = express.Router();
const controller = require("../controllers/usuariosController");

router.get("/", controller.getUsuarios);
router.post("/", controller.postUsuarios);

router.delete("/:id", controller.deletarId);
router.delete("/nome/:nome", controller.deletarNome);

router.get("/:id", controller.getUsuarioPorId); 
router.get("/nome/:nome", controller.getUsuarioPorNome);

module.exports = router;
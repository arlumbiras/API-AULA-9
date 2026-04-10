const { getConnection, sql } = require("../db");

exports.getUsuarios = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM Usuarios");

    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

exports.postUsuarios = async (req, res) => {
  try {
    const pool = await getConnection();
    var {nome, email} = req.body;
    const result = await pool.request()
      .input("nome", sql.VarChar, nome)
      .input("email", sql.VarChar, email)
      .query(`
        INSERT INTO Usuarios (nome, email)
        VALUES (@nome, @email)
      `);
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};
exports.deletarId = async (req, res) => {
  try {
    const pool = await getConnection();
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ erro: "id é obrigatório" });
    }

    const result = await pool.request()
      .input("id", sql.Int, id)
      .query(`
        DELETE FROM Usuarios
        WHERE id = @id
      `);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ erro: "usuario_nao_encontrado" });
    }

    return res.status(204).send();

  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: error.message });
  }
};


exports.deletarNome = async (req, res) => {
  try {
    const pool = await getConnection();
    const { nome } = req.params;

    if (!nome) {
      return res.status(400).json({ erro: "nome é obrigatório" });
    }

    const result = await pool.request()
      .input("nome", sql.VarChar, nome)
      .query(`
        DELETE FROM Usuarios
        WHERE nome = @nome
      `);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ erro: "usuario_nao_encontrado" });
    }

    return res.status(204).send();

  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: error.message });
  }
};
exports.getUsuarioPorId = async (req, res) => {
  try {
    const pool = await getConnection();
    const { id } = req.params;

    const result = await pool.request()
      .input("id", sql.Int, id)
      .query(`
        SELECT * FROM Usuarios
        WHERE id = @id
      `);

    if (result.recordset.length === 0) {
      return res.status(404).json({ erro: "usuario_nao_encontrado" });
    }

    return res.json(result.recordset[0]);

  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};


exports.getUsuarioPorNome = async (req, res) => {
  try {
    const pool = await getConnection();
    const { nome } = req.params;

    const result = await pool.request()
      .input("nome", sql.VarChar, nome)
      .query(`
        SELECT * FROM Usuarios
        WHERE nome = @nome
      `);

    if (result.recordset.length === 0) {
      return res.status(404).json({ erro: "usuario_nao_encontrado" });
    }

    return res.json(result.recordset);

  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};
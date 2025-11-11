import express from "express";
import cors from "cors";
import { db } from "./db.js";

const app = express();
const port = 8800; // Porta do backend

// Middlewares
app.use(express.json()); // Habilita o parsing de JSON no corpo das requisições
app.use(cors()); // Habilita o CORS para permitir requisições do frontend

// --- ROTAS DA API ---

// Rota 1: GET /tarefas (Listar todas as tarefas)
app.get("/tarefas", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM tarefas ORDER BY id DESC");
    return res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao buscar tarefas." });
  }
});

// Rota 2: POST /tarefas (Criar nova tarefa)
app.post("/tarefas", async (req, res) => {
  const { titulo, categoria } = req.body;

  if (!titulo || !categoria) {
    return res.status(400).json({ message: "Título e categoria são obrigatórios." });
  }

  const q = "INSERT INTO tarefas (titulo, categoria) VALUES (?, ?)";
  
  try {
    const [result] = await db.query(q, [titulo, categoria]);
    const novaTarefa = { id: result.insertId, titulo, categoria, status: false };
    return res.status(201).json(novaTarefa);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao criar tarefa." });
  }
});

// Rota 3: PUT /tarefas/:id (Atualizar status da tarefa)
app.put("/tarefas/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // Espera receber { "status": true } ou { "status": false }

  if (typeof status !== 'boolean') {
    return res.status(400).json({ message: "O status deve ser um booleano." });
  }

  const q = "UPDATE tarefas SET status = ? WHERE id = ?";

  try {
    await db.query(q, [status, id]);
    return res.status(200).json({ message: "Status da tarefa atualizado." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao atualizar tarefa." });
  }
});

// Rota 4: DELETE /tarefas/:id (Deletar tarefa)
app.delete("/tarefas/:id", async (req, res) => {
  const { id } = req.params;
  const q = "DELETE FROM tarefas WHERE id = ?";

  try {
    const [result] = await db.query(q, [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Tarefa não encontrada." });
    }

    return res.status(200).json({ message: "Tarefa deletada com sucesso." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao deletar tarefa." });
  }
});


// Iniciar o servidor
app.listen(port, () => {
  console.log(`Backend rodando na porta ${port}. Acesse http://localhost:${port}`);
});
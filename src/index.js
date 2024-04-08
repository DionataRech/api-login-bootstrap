import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import verificacaoLogin from "./middleware/verificacaoLogin";
import verificacaoCriarContas from "./middleware/verificacaoCriarContas";

const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());

app.listen(port, () => console.log("Servidor iniciado porta 8080"));

app.get("/", (request, response) => {
  return response.json("OK");
});

// registro de usuarios //

const registroUsuarios = [];
export default registroUsuarios;
let contadorId = 1;

app.post("/usuarios", verificacaoCriarContas, async (req, res) => {
  const data = req.body;
  const hashSenha = await bcrypt.hash(data.senha, 10);
  registroUsuarios.push({
    id: contadorId,
    email: data.email,
    senha: hashSenha,
  });
  contadorId++;
  res.status(201).json({ mensagem: "Usuario cadastrado com sucesso !!!" });
});

// listando usuarios criados //

app.get("/usuarios", (req, res) => {
  res.status(200).json({ message: "Usuarios Criados", data: registroUsuarios });
  return;
});

// login usuarios //

app.post("/login", verificacaoLogin, (req, res) => {
  res.status(200).send("Login Bem Sucedido !!!");
});

//////////////////CRIAR-RECADOS/////////////////////////////

const recadosCriados = [];
let contadorRecados = 1;

app.post("/recados", (req, res) => {
  const data = req.body;

  recadosCriados.push({
    id: contadorRecados,
    titulo: data.titulo,
    descricao: data.descricao,
  });
  res.status(201).send("Mensagem Criada Com Sucesso");
  contadorRecados++;
  return;
});

// listando recados //

app.get("/recados", (req, res) => {
  res.status(201).json({
    mensagem: "Seus Recados",
    data: recadosCriados,
  });
});

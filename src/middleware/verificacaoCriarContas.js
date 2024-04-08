import registroUsuarios from "..";

function verificacaoCriarContas(req, res, next) {
  const data = req.body;
  if (registroUsuarios.find((nomeConta) => nomeConta.email === data.email)) {
    res.status(409).send("Email ja cadastrado ! Use outro email.");
  } else {
    return next();
  }
}

export default verificacaoCriarContas;

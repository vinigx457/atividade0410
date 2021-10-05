const http = require("http");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const porta = 3000;
app.set("port", porta);

let contador = 2;

const produtos = [
  {
    ProdId: 1,
    ProdNome: "Televisao",
    ProdUnidade: "1",
    ProdValorUnit: "2.500",
  },
];
app.get("/produto", (req, res, next) => {
  res.json(produtos);
});
app.post("/produto", (req, res, next) => {
  const produto = req.body;
  produtos.push({
    ProdId: (contador += 1),
    ProdNome: produto.ProdNome,
    ProdUnidade: produto.ProdUnidade,
    ProdValorUnit: produto.ProdValorUnit,
  });
  console.log(produtos);
  res.end();
});
app.put("/produto/:ProdId", (req, res, next) => {
  const produtoComDadosNovos = req.body;
  const index = produtos.findIndex(
    (c) => c.ProdId === parseInt(req.params.ProdId)
  );
  const produtoParaAtualizar = produtos[index];

  produtoParaAtualizar.ProdNome = produtoComDadosNovos.ProdNome;
  produtoParaAtualizar.ProdUnidade = produtoComDadosNovos.ProdUnidade;

  res.status(204).send();
});
app.delete("/produto/:ProdId", (req, res, next) => {
  const ProdIdParam = req.params.ProdId;
  const index = produtos.findIndex((c) => c.ProdId === parseInt(ProdIdParam));
  produtos.splice(index, 1);
  res.status(204).send();
});

const server = http.createServer(app);
server.listen(3000);

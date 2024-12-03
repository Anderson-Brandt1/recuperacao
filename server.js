const express = require('express');
const server = express();
const porta = 3000;

server.use(express.json());

let clientes = [];

server.get("/clientes", (req, res) => {
    res.json(clientes);
})
server.post("/clientes", (req, res) => {
    const { nome, telefone } = req.body;
    const erros = validacao({ nome, telefone });
    if (erros.length > 0) {
        return res.status(400).json({ erros });
    }
    clientes.push({ id, nome, telefone });
    res.status(201).json({ message: "Cliente criado com sucesso !!" });
});
server.get("/clientes/:id", (req, res) => {
    const id = parseInt(req.params.id);
    res.status(200).json(clientes.find(clientes => clientes.id === id))
});
server.put("/clientes/:id", (req, res) => {
    const { id } = req.params;
    const { nome, telefone } = req.body;
    const cliente = clientes.find(u => u.id === parseInt(id));
    if (cliente) {
        cliente.nome = nome;
        cliente.telefone = telefone;
        res.status(201).json({ message: "cliente atualizado com sucesso !" });
    } else {
        res.status(404).json({ message: "cliente não encontrado !" })
    }
});
server.delete("/clientes/:id", (req, res) => {
    const { id } = req.params;
    const index = clientes.findIndex(u => u.id === parseInt(id));
    if (index !== -1) {
        clientes.splice(index, 1);
        res.status(200).json({ message: "cliente removido com sucesso !" });
    } else {
        res.status(404).json({ message: "cliente não encontrado !" })
    }
});
 

let carros = [];

server.get("/carros", (req, res) => {
    res.json(carros);
});

server.get("/carros/:id", (req, res) => {
    const id = parseInt(req.params.id);
    res.status(200).json(carros.find(carros => carros.id === id))

});
server.post("/carros", (req, res) => {
    const { marca, modelo, tamanho } = req.body;
    const idcliente = clientes.find(u => u.id === parseInt(id));
    const id = parseInt(req.body.id, 10);
    const erros = validacao({ marca, modelo, tamanho });
    if (erros.length > 0) {
        res.status(400).json(erros);
    }
    clientes.push({ idcliente, marca, modelo, tamanho });
    res.status(201).json({ message: "Carro criado com sucesso !!" });

});


server.put("/carros/:id", (req, res) => {
    const { id } = req.params;
    const { marca, modelo, tamanho } = req.body;
    const carro = carros.find(u => u.id === parseInt(id));
    if (carro) {
        carro.marca = marca;
        carro.modelo = modelo;
        carro.tamanho = tamanho;
        res.status(201).json({ message: "carro atualizado com sucesso !" });
    } else {
        res.status(404).json({ message: "carro não encontrado !" })
    }

});
server.delete("/carros/:id", (req, res) => {
    const { id } = req.params;
    const index = carros.findIndex(u => u.id === parseInt(id));
    if (index !== -1) {
        carros.splice(index, 1);
        res.status(200).json({ message: "carro removido com sucesso !" });
    } else {
        res.status(404).json({ message: "carro não encontrado !" })
    }
});

let servicos = [];

server.get("/servicos", (req, res) => {
    res.json(servicos);
});
server.get("/servicos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    res.status(200).json(servicos.find(servicos => servicos.id === id));
});

server.post("/servicos", (req, res) => {
    const { descricao, valores } = req.body;
    const id = parseInt(req.body.id, 10);
    const tamCarro = carros.find(carros => carros.tamanho === (tamCarro));
    const erros = validacao({ descricao, valores });
    if (erros.length > 0) {
        res.status(400).json(erros);
    }
    servicos.push({ id, descrição, valores });
    res.status(201).json({ message: "Serviço criado com sucesso !!" });
});

server.put("/servicos/:id", (req, res) => {
    const { id } = req.params;
    const { descricao, valores } = req.body;
    const servicos = servicos.find(u => u.id === parseInt(id));
    if (servicos) {
        servicos.descricao = descricao;
        servicos.valores = valores;
        res.status(201).json({ message: "serviço atualizado com sucesso !" });
    } else {
        res.status(404).json({ message: "serviço não encontrado !" })
    }

});
server.delete("/servicos/:id", (req, res) => {
    const { id } = req.params;
    const index = servicos.findIndex(u => u.id === parseInt(id));
    if (index !== -1) {
        servicos.splice(index, 1);
        res.status(200).json({ message: "serviço removido com sucesso !" });
    } else {
        res.status(404).json({ message: "serviço não encontrado !" })
    }

});

let agendamentos = [];


server.get("/agendamentos", (req, res) => {
    res.json(agendamentos);
});

server.post("/agendamentos", (req, res) => {
    const { data, hora } = req.body;
    const idServico = servico.find(u => u.id === parseInt(id));
    const idCarro = carros.find(u => u.id === parseInt(id));
    agendamentos.push({ data, hora, idServico, idCarro });
    res.status(201).json({ message: "Agendamento criado com sucesso !!" });

});


function validacao(clientes, carros, servicos) {
    let erros = [];
    //clientes

    if (clientes.nome && clientes.nome.lengt > 3 && clientes.nome || clientes.nome.lengt < 100) {
        console.log({ message: "o nome deve conter entre 3 e 100 caracteres" });
    }
    if (!clientes.telefone || clientes.nome.lengt == 11) {
        console.log({ message: "o telefone deve conter 11 digitos" });
    };

    //  Carros
    if (carros.marca || carros.modelo || carros.tamanho){
                console.log({message:"Marca, modelo e tamanho do carro são obrigatórios."});
    };

    // Serviços
    if (servicos.descricao || servicos.valores) {
       console.log({message:"Descrição e valores do serviço são obrigatórios."});
    };
};

  
server.listen(porta, () => { console.log("Servidor rodando na porta 3000") });
module.exports = server;
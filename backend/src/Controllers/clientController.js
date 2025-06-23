const clientController = {};

import clientModel from "../Models/ClientModel.js";

// SELECT
clientController.getClient = async (req, res) => {
  const client = await clientModel.find();
  res.json(client);
};

// INSERT
clientController.insertClient = async (req, res) => {
  const { fullname, email, username, password, birth, phone } = req.body;
  const newClient = new ClientModel({fullname, email, username, password, birth, phone});

  await newClient.save();
  res.json({ message: "Client saved" });
};

// DELETE

clientController.deleteClient = async (req, res) => {
  await clientModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Client deleted" });
}

// UPDATE
clientController.updateClient = async (req, res) => {
  const { fullname, email, username, password, birth, phone } = req.body;
  await clientModel.findByIdAndUpdate(req.params.id,{ fullname, email, username, password, birth, phone},
    { new: true }
  );
  res.json({ message: "Client updated" });
}

// GET BY ID
clientController.getClientById = async (req, res) => {
  try {
    const client = await clientModel.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    res.json(client);
  } catch (error) {
    res.status(400).json({ message: "ID inválido o error en la consulta" });
  }
};

// GET ME (usuario autenticado)
clientController.getClientMe = async (req, res) => {
  try {
    const client = await clientModel.findById(req.user.id);
    if (!client) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    res.json(client);
  } catch (error) {
    res.status(400).json({ message: "ID inválido o error en la consulta" });
  }
};

export default clientController;

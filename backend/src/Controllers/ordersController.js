import Orders from "../Models/Orders.js";

const ordersController = {};

// Obtener todos los pedidos
ordersController.getOrders = async (req, res) => {
  try {
    const orders = await Orders.find()
      .populate("client_id")
      .populate("items.product_id");
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener pedidos" });
  }
};

// Crear un pedido
ordersController.insertOrder = async (req, res) => {
  try {
    const { client_id, items, total_price, state, payment_method, delivery_address } = req.body;

    // Validaciones básicas
    if (!client_id || !items || !Array.isArray(items) || items.length === 0 || !total_price || !payment_method || !delivery_address) {
      return res.status(400).json({ message: "Faltan campos obligatorios o son incorrectos" });
    }

    // Validar cada item
    for (const item of items) {
      if (!item.product_id || typeof item.quantity !== "number" || typeof item.price !== "number") {
        return res.status(400).json({ message: "Datos inválidos en items" });
      }
    }

    const newOrder = new Orders({
      client_id,
      items,
      total_price,
      state: state || "Pendiente",
      payment_method,
      delivery_address,
      order_date: new Date()
    });

    await newOrder.save();
    res.status(201).json({ message: "Pedido guardado correctamente", orderId: newOrder._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el pedido" });
  }
};

// Eliminar un pedido
ordersController.deleteOrder = async (req, res) => {
  try {
    const order = await Orders.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: "Pedido no encontrado" });
    res.json({ message: "Pedido eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el pedido" });
  }
};

// Actualizar un pedido
ordersController.updateOrder = async (req, res) => {
  try {
    const { client_id, items, total_price, state, payment_method, delivery_address } = req.body;

    if (!client_id || !items || !Array.isArray(items) || items.length === 0 || !total_price || !payment_method || !delivery_address) {
      return res.status(400).json({ message: "Faltan campos obligatorios o son incorrectos" });
    }

    // Validar cada item
    for (const item of items) {
      if (!item.product_id || typeof item.quantity !== "number" || typeof item.price !== "number") {
        return res.status(400).json({ message: "Datos inválidos en items" });
      }
    }

    const updatedOrder = await Orders.findByIdAndUpdate(
      req.params.id,
      {
        client_id,
        items,
        total_price,
        state,
        payment_method,
        delivery_address,
        order_date: new Date()
      },
      { new: true }
    );

    if (!updatedOrder) return res.status(404).json({ message: "Pedido no encontrado" });

    res.json({ message: "Pedido actualizado correctamente", order: updatedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el pedido" });
  }
};

export default ordersController;

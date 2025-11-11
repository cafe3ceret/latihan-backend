import Order from "../models/Order.js";

export const getOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.id });
  res.json(orders);
};

export const createOrder = async (req, res) => {
  const order = await Order.create({ ...req.body, user: req.user.id });
  res.json(order);
};

export const updateOrder = async (req, res) => {
  const { id } = req.params;
  const updated = await Order.findByIdAndUpdate(id, req.body, { new: true });
  res.json(updated);
};

export const deleteOrder = async (req, res) => {
  const { id } = req.params;
  await Order.findByIdAndDelete(id);
  res.json({ message: "Pesanan dihapus" });
};

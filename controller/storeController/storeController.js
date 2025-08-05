const StoreModel = require("../../model/storeModel/storeModel");

const getStores = async (_, res) => {
  try {
    const stores = await StoreModel.getAllStores();
    res.status(200).json(stores);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch stores" });
  }
};

const getStoreById = async (req, res) => {
  try {
    const store = await StoreModel.getStoreById(req.params.id);
    if (!store) return res.status(404).json({ message: "Store not found" });
    res.status(200).json(store);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch store" });
  }
};

const createStore = async (req, res) => {
  console.log("reqBody", req.body);
  try {
    const newStore = await StoreModel.createStore(req.body);
    
    res.status(201).json({ message: "Store created", store: newStore });
  } catch (error) {
    res.status(500).json({ message: "Failed to create store" });
  }
};

const updateStore = async (req, res) => {
  try {
    const updatedStore = await StoreModel.updateStore(req.params.id, req.body);
    if (!updatedStore)
      return res.status(404).json({ message: "Store not found" });
    res.status(200).json({ message: "Store updated", store: updatedStore });
  } catch (error) {
    res.status(500).json({ message: "Failed to update store" });
  }
};

const deleteStore = async (req, res) => {
  try {
    const deletedStore = await StoreModel.deleteStore(req.params.id);
    if (!deletedStore)
      return res.status(404).json({ message: "Store not found" });
    res.status(200).json({ message: "Store deleted", store: deletedStore });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete store" });
  }
};

module.exports = {
  getStores,
  getStoreById,
  createStore,
  updateStore,
  deleteStore,
};

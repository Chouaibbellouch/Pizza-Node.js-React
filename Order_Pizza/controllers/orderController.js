const Order = require('../models/order');
const Pizza = require('../models/pizza');
const mongoose = require('mongoose');

exports.createOrder = async (req, res) => {
    try {
        const order = await Order.create(req.body);
        res.status(200).json({ message: 'Order créé', order });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de la commande', error: error.message });
    }
};

exports.getOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        res.status(200).json({order});
    } catch (error) {
        res.status(500).json({message: 'erreur lors de la recuperation de la commande'});
    }
}

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find({});
        res.status(200).json({orders});
    } catch (error) {
        res.status(500).json({message: 'erreur lors de la recuperation de les commandes'});
    }
}


exports.updateOrder = async (req, res) => {
    const { id } = req.params;  
    const updateData = req.body;  

    try {
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ message: "Commande non trouvée" });
        }

        order.commandesPizza = updateData.commandesPizza || order.commandesPizza;
        order.adresseLivraison = updateData.adresseLivraison || order.adresseLivraison;
        order.status = updateData.status || order.status;

        let prixTotals = 0;
        for (let item of order.commandesPizza) {
            const pizza = await Pizza.findById(item.pizzaId).exec();
            if (pizza) {
                item.prixTotal = pizza.prix * item.quantite;
                prixTotals += item.prixTotal;
            }
        }
        order.prixTotal = prixTotals;

        const updatedOrder = await order.save();
        res.status(200).json({ message: 'Commande mise à jour', order: updatedOrder });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la modification de la commande', error: error.message });
    }
};


exports.deleteOrder = async  (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'La commande a été supprimé' })
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la supprission de la commande', error: error.message });
    }
}
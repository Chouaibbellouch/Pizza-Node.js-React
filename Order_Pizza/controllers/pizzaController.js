const Pizza = require('../models/pizza')
const mongoose = require('mongoose')

exports.createPizza = async (req, res) => {
    try{
        const pizza = await Pizza.create(req.body);
        res.status(201).json({ message: 'Pizza Crée', pizza });
        
    } catch(error){
        res.status(500).json({ message: "Erreur lors de la création du Pizza" });
    }
}

exports.getPizza = async (req, res) => {
    try {
        const pizza = await Pizza.findById(req.params.id);
        res.status(200).json({ pizza });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récuperation de la Pizza' });
    }
}

exports.getPizzas = async (req, res) => {
    try {
        const pizzas = await Pizza.find({});
        res.status(200).json({ pizzas })
    } catch (error) {
        res.status(500).json({ message: 'Erreur lorsde la récuperation des Pizzas' })
    }
}

exports.updatePizza = async (req, res) => {
    const { id } = req.params;
    const { ...body } = req.body;
    try {
        const pizza = await Pizza.findByIdAndUpdate(id, body, {new:true});
        res.status(200).json({ message: 'Pizza updated', pizza });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la modification' });
    }
}

exports.deletePizza = async (req, res) => {
    try {
        await Pizza.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Le Pizza a été supprimé' })
    } catch(error) {
        res.status(404).json({ message: "Ce Pizza n'existe pas."})
    }
}



const User = require('../models/User');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

exports.signup = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.motDePasse, 12);

        const newUser = await User.create({
            nom: req.body.nom,
            email: req.body.email,
            motDePasse: hashedPassword,
            adresse: req.body.adresse,
            telephone: req.body.telephone
        });

        res.status(201).json({ message: 'Utilisateur créé', userId: newUser._id });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création de l'utilisateur" });
    }
};

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ message: 'Utilisateur non trouvé' });
        }

        const isValid = await bcrypt.compare(req.body.motDePasse, user.motDePasse);
        if (!isValid) {
            return res.status(401).json({ message: 'Mot de passe incorrect' });
        }

        res.status(200).json({ message: 'Connexion réussie', userId: user._id });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la connexion' });
    }
};

exports.getUser = async (req, res) => {
    const id = req.params.userId;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'ID d\'utilisateur non valide' });
    }
    
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération de l\'utilisateur' });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs'});
    }
}


exports.updateUser = async (req, res) => {
    const { userId } = req.params;
    const { motDePasse, ...otherUpdates } = req.body;
    try {
        let update = otherUpdates;
        if (motDePasse) {
            const hashedPassword = await bcrypt.hash(motDePasse, 12);
            update = { ...otherUpdates, motDePasse: hashedPassword };
        }

        const user = await User.findByIdAndUpdate(userId, update, { new: true, runValidators: true });
        
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        
        res.status(200).json({ message: 'Utilisateur mis à jour', user });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.userId);
        res.status(200).json({ message: 'Utilisateur supprimé' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur' });
    }
};

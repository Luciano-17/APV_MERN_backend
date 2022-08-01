import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import generarId from '../helpers/generarId.js';

// MongoDB asigna automaticamente los ID
const veterinarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true, // Validando del lado del servidor
        trim: true // Elimina espacios en blanco
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    telefono: {
        type: String,
        default: null,
        trim: true
    },
    web: {
        type: String,
        default: null
    },
    token: {
        type: String,
        default: generarId()
    },
    confirmado: {
        type: Boolean,
        default: false
    }
});

// Hashear el password antes de guardarlo ("SAVE") en la DB
veterinarioSchema.pre('save', async function(next) {
    // Si un password ya esta hasheado, no volverlo a hashear
    if(!this.isModified('password')) {
        next(); // Con express, un next hace que el codigo salte al siguiente middleware
    }
    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Comprobar password - Se le puede agregar el metodo que quieras de esta forma:
veterinarioSchema.methods.comprobarPassword = async function(passwordFormulario) {
    return await bcrypt.compare(passwordFormulario, this.password);
};

const Veterinario = mongoose.model('Veterinario', veterinarioSchema);
export default Veterinario;
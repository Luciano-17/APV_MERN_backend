// BACKEND
// Express para crear un servidor
// Nodemon para que reinicie el servidor en cada cambio que se realice
// Mongoose para conectarlo con MongoDB
// Dotenv para poder usar variables de entorno
// Bcrypt para hashear los password y comprobar un password con lo hasheado en la DB
// Jsonwebtoken permite generar un token aleatorio para autenticar a los usuarios
// cors para permitir peticion desde la url del frontend
// nodemailer para enviar emails

// FRONTEND
// npm init vite@latest - Para crear el frontend inicial con react
// tailwindcss para instalar tailwind en el proyecto
// postcss y autoprefixer son dependencias q requiere tailwind
// react-router-dom para usar el router con react
// Axios es para comunicar el frontend con el backend

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import conectarDB from './config/db.js';
import veterinarioRoutes from './routes/veterinarioRoutes.js';
import pacienteRoutes from './routes/pacienteRoutes.js';

const app = express();
app.use(express.json()); // Con esto le decimos a express que vamos a enviarle datos de tipo json
dotenv.config();

conectarDB();

const dominiosPermitidos = [process.env.FRONTEND_URL]
const corsOptions = {
    origin: function(origin, callback) {
        if(dominiosPermitidos.indexOf(origin) !== -1) {
            // El origen del request esta permitido
            callback(null, true)
        } else {
            callback(new Error('No permitido por CORS'))
        }
    }
}
app.use(cors(corsOptions))

// Router
app.use('api/veterinarios', veterinarioRoutes);
app.use('api/pacientes', pacienteRoutes);

// Leer el puerto del hosting o el del localhost
const PORT = process.env.PORT || 4000;

// Puerto 4000 para el backend
app.listen(PORT, () => {
    console.log(`Servidor funcionando ${PORT}`);
})
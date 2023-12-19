// import mongoose from 'mongoose';
// import { getServerSession } from 'next-auth';
// import { Buffer } from 'buffer';
// import { authOptions } from '@/app/api/auth/[...nextauth]/route';
// import { User } from '@/models/User';

// export const config = {
//     api: {
//         bodyParser: {
//             sizeLimit: '1mb', // Limita el tamaño del cuerpo de la solicitud
//         },
//     },
// };

// export const POST = async (req, res) => {
//     mongoose.connect(process.env.MONGO_URL);
//     const session = await getServerSession(authOptions);
//     const email = session?.user?.email;

//     if (!email) {
//         return 'mail unaunthenticated';
//     }

//     try {
//         // Verificar si req.body es un búfer o una cadena y convertirlo a un búfer
//         const imageBuffer = Buffer.isBuffer(req.body)
//             ? req.body
//             : Buffer.from(req.body.toString(), 'base64');

//         // Actualizar la imagen en User
//         const result = await User.findOneAndUpdate({ email }, { image: imageBuffer.toString('base64') }, { upsert: true });

//         if (result) {
//             return Response.json(true);
//         } else {
//             return Response.status(500).json({ error: 'Failed to update image.' });
//         }

//     } catch (error) {
//         console.error(error);
//         return Response.status(500).json({ error: 'Internal server error.' });
//     }
// }

# VitalByte:
VitalByte es una tienda en línea dedicada a ofrecer snacks saludables, libres de ingredientes dañinos, pensados para quienes desean cuidar su alimentación sin renunciar al sabor.
Es una plataforma moderna, desarrollada con el stack Mern, que permite a los usuarios explorar, seleccionar y adquirir productos de forma segura y sencilla.

📦 Backend
Ubicado en la carpeta backend, se utilizan las siguientes librerías:
dotenv ^16.5.0 – Carga variables de entorno desde un archivo .env.
multer ^2.0.0 – Manejo de subida de archivos, útil para imágenes de productos.
nodemailer ^7.0.3 – Envío de correos electrónicos (por ejemplo, confirmaciones de pedido).
cloudinary ^2.6.1 – Almacenamiento en la nube para imágenes.
cors ^2.8.5 – Permite peticiones entre dominios, necesario para conectar frontend y backend.

💻 Frontend
Ubicado en la carpeta frontend, las dependencias principales son:
react-router-dom ^7.5.0 – Navegación entre rutas en React.
react-icons ^5.5.0 – Iconografía visual moderna.
sweetalert ^2.1.2 y sweetalert2 ^11.22.0 – Ventanas emergentes personalizadas para alertas e interacciones con el usuario.

Clonar el respositorio :
git clone https://github.com/tu-usuario/vitalbyte.git
cd vitalbyte

Se debe colocar el .env en backend

Para encender el proyecto se deben ejecutar estos comandos :
´´´´bash
cd backend
npm i 
npm run dev´´´

´´´´bash
cd frontend
npm i 
npm run dev´´´´.

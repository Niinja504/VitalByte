import ClientsModel from "../Models/ClientModel.js";
import EmployeesModel from "../Models/Employee.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../config.js";

const loginController = {};

loginController.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let userFound;
    let userType;

    // Login Admin
    if (email === config.EmailAdmin.user && password === config.EmailAdmin.pass) {
      userType = "admin";
      userFound = { _id: "admin", name: "Administrador", email };
    } else {
      // Buscar en empleados
      userFound = await EmployeesModel.findOne({
        $or: [{ email }, { username: email }],
      });
      userType = "employee";

      // Si no es empleado, buscar en clientes
      if (!userFound) {
        userFound = await ClientsModel.findOne({
          $or: [{ email }, { username: email }],
        });
        userType = "client";
      }

      // Si no se encontró en ningún lado
      if (!userFound) {
        return res.status(400).json({ message: "Usuario no encontrado" });
      }

      // Validar contraseña
      const matchPassword = await bcryptjs.compare(password, userFound.password);
      if (!matchPassword) {
        return res.status(400).json({ message: "Contraseña incorrecta" });
      }
    }

    // Firmar token JWT
    jwt.sign(
      { id: userFound._id, userType },
      config.JWT.secret,
      { expiresIn: config.JWT.expiresIn },
      (error, token) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ message: "Error al generar token" });
        }

        res.cookie("authToken", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        });

        // Eliminar campo password antes de enviar al cliente
        const { password, ...userWithoutPassword } =
          userFound._doc || userFound; // Mongoose usa _doc

        return res.json({
          message: "User logged in",
          userType,
          user: userWithoutPassword,
        });
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export default loginController;

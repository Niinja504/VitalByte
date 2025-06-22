import express from "express";
import cors from "cors";

import ordersRoutes from "./src/Routes/orders.js";
import clientRoutes from "./src/Routes/client.js";
import salesRoutes from "./src/Routes/sales.js";

import productsRoutes from "./src/Routes/products.js"
import employeeRoutes from "./src/Routes/employee.js"
import categoryRoutes from "./src/Routes/category.js"
import registerClientRoutes from "./src/Routes/registerClient.js"
import registerEmployeesRoutes from "./src/Routes/registerEmployees.js";
import cookieParser from "cookie-parser";
import "./database.js";
import passwordRecoveryRoutes from "./src/Routes/passwordRecovery.js";
import loginRoutes from "./src/Routes/login.js";
import logoutRoutes from "./src/Routes/logout.js";


const app = express();

app.use(express.json());
 
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use("/api/products",productsRoutes)
app.use("/api/employee",employeeRoutes)
app.use("/api/category",categoryRoutes)

app.use("/api/orders", ordersRoutes);
app.use("/api/client", clientRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/registerClient", registerClientRoutes);
app.use("/api/registerEmployees", registerEmployeesRoutes);
app.use("/api/passwordRecovery", passwordRecoveryRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/logout", logoutRoutes);
app.get("/api/registerClient", (req, res) => {
  res.json({ message: "Usa POST para registrar un cliente." });
});
app.get("/api/registerClient/:id", (req, res) => {
  res.status(400).json({ message: "GET no implementado. Usa POST para registrar o consulta /api/client/:id para obtener un cliente." });
});


export default app;

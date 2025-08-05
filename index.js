const express = require("express");
const app = express();
const PORT = 4000;
const cors = require("cors");
app.use(cors());
app.use(express.json());

const userRoutes = require("./routes/userRoutes");
const storeRoutes=require("./routes/storeRoutes.js")
const roleRoutes=require("./routes/roleRoutes.js")
const superAdminRoutes=require("./routes/superAdmin.js")
app.use("/api/users", userRoutes);
app.use("/api/roles",roleRoutes)
app.use("/api/store",storeRoutes)
app.use("/api/super-admin", superAdminRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

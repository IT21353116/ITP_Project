import express from "express";
import { login, register } from "../controllers/auth.js";
//need to import express and initialize express router function
const router = express.Router();

/*router.get("/", (req,res) => {
    res.send("Hello, this is auth endpoint");
})*/
router.post("/register", register)
router.post("/login", login)
/*router.get("/register", (req,res) => {
    res.send("Hello, this is auth register endpoint");
})*/

//export the router so we can access it from index.js

export default router;
import * as dotenv from "dotenv";
import app from "./server";
dotenv.config();
const PORT = process.env.PORT || '8080'
app.listen(PORT, function(){
    console.log('Listening on port: ' + PORT)
})
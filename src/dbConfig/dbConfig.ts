import mongoose from "mongoose";

export async function connect(){
    try {
      mongoose.connect("mongodb+srv://akshaychavhan676:PosUFkhClmAYdCB9@cluster0.w12kfo0.mongodb.net/app");
      const connection = mongoose.connection;
      
      connection.on('connected' , () =>{
        console.log("MongoDB Connected Successfully");
      })

      connection.on('error' , (err) => {
        console.log("Mongo connectino error , please make sure db up and running : " , err);
        process.exit();
      })
    } catch (error) {
        console.log("Something went wrong in connection with database");
        console.error(error);
    }
}
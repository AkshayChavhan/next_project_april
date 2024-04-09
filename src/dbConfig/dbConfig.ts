import mongoose from "mongoose";

export async function connect(){
    try {
      mongoose.connect(process.env.MONGO_URI!);
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
import mongoose from 'mongoose';

export const connect_database = async () => {
    try{
        const connect = await mongoose.connect(process.env.DATABASE_URL || "");
        const url = `${connect.connection.host}:${connect.connection.port}`
        console.log("Connection successfully",url)
    }catch(error){
        console.log(error);
        process.exit(1);
    }
}
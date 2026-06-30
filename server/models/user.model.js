// this file is for defining the user model for the MongoDB database using Mongoose. A model is a representation of a collection in the database and defines the structure of the documents in that collection.user name , user authhentication, credits ena mate use thai
import mongoose from mongoose;

const userSchema = new mongoose.Schema({
    name : {
        type:string,
        required:true
    },
    email : {
        type:String,
        unique:true,
        required:true
    },
    passeord : {// mari rite add krelu che 
        type:String,
        required:true
    },
    credits : {
        type:Number,
        default:100
    }

} , {timestamps: true})// this will automatically add createdAt and updatedAt fields to the documents in the collection

const User = mongoose.model("User", userSchema)// this will create a model called User based on the userSchema that we defined above. The first argument is the name of the model and the second argument is the schema that we defined above.

export default User// this will export the User model so that we can use it in other files.
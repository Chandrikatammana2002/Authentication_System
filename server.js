const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Registeruser=require('./model');
const jwt=require("jsonwebtoken");
const middleware=require("./middleware");
const cors=require('cors');


app.use(express.json());
app.use(cors({origin:"*"}));


mongoose.connect("mongodb+srv://chandrikatammana2002:chandrika2002@cluster0.tzm23qv.mongodb.net/CompanyDB?retryWrites=true&w=majority",
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
}).then(()=>{console.log("connected")}).catch((err)=>{console.log({err})});


app.post('/register', async(req,res)=>{
    try{
        const {username,email,password,confirmpassword}=req.body;
        let exist=await Registeruser.findOne({email:email});  //checking email presented in registeruser collection or not
        if(exist){
            return res.status(400).send("user already exists");  //400 means authentication related errors
        }
        if(password != confirmpassword){
            return res.status(400).send("password not matching");

        }
        //creating the new user and adding the user to the database
        let newuser=new Registeruser({
            username,
            email,
            password,
            confirmpassword
        });
        await newuser.save(); //saving new user to the data base if email not exists and password and confirm are same
        res.status(200).send("registered successfully");

    }
    catch(err){
        console.log(err);
        return res.status(500).send("internal server error");
    }
})

//login route
app.post("/login", async (req,res)=>{
    try{

        const {email,password}=req.body;
        let exist=await Registeruser.findOne({email});  //if user details exists in data base
        if(!exist){
            return res.status(400).send("user not found");
        }
        if(exist.password != password){
            return res.status(400).send("invalid details");
        }

        // as user is valid we need to generate the jwt token 
        let payload={
            user:{ 
                id:exist.id         //the id in the data base is encoded as token by using the secrete key in this case the key is "jwtsecret"
                                    //exist.id represents that existed user id 
            }
        }
        jwt.sign(payload,'jwtsecret',{expiresIn:3600000},
            (err,token)=>{
                if(err) throw err;
                return res.json({token})
            }
        )

    }
    catch(err){
        console.log("error");
        return res.status(400).send('server error');
    }

})

//protected route
app.get("/myprofile",middleware, async(req,res)=>{
    try{

        let exist=await Registeruser.findById(req.user.id); //middle ware lo unna user id anedi schema lo undo ledo chustamu
        if(!exist){
            return res.status(400).send("user not found");
        }
        res.json({exist})

    }
    catch(err){
        console.log("error");
        return res.status(400).send('server error');
    }

})

app.listen(5000,()=>{
    console.log("server is running...")
})
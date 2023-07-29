const jwt=require("jsonwebtoken");


//middleware lo manam token in check chestamu okavaela verify ayite appudu protected router anedi open avutadi
// ekkuva security undadaniki manam token ni kuda verify chesi appudu protected router ayina dashbord page ni open chestamu
// manam token ni header lo pass chestamu
module.exports=function(req,res,next){
    try{
        let token=req.header('x-token');
        //token vastene decode chesi original id ni provide chestamu lekapote token not found ani cheptamu
        if(!token){  //token lekapote
            return res.status(400).send("token not found");
        }
        //token unte verify chestamu aa token ni
        let decode=jwt.verify(token,'jwtsecret');
        
        req.user=decode.user;  //fetching user associated with token
        console.log(req.user)
        next();  //req.user lo unna data ni server lo unna  myprofile route lo unna call back function ni execute chestu aa user details ni aa function lo ki pampistaniki
    }
    catch(err){
        console.log(err);
        res.status(500).send("server error");
    }
}
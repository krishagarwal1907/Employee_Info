const express = require("express");
const router = express.Router();
const users = require("../models/userSchema")

// router.get("/",(req,res) =>{
//     console.log("connect")
// });

router.post("/register",async(req,res) => {
    // router.post("/register",(req,res) => {
    // console.log(req.body);
    // })
    //values added in db
    const {name, email, age, phone, department, location, salary} = req.body;
    
    // if user didn't fill, then it shows the error
    if(!name || !email || !age || !phone || !department || !location || !salary) {
        res.status(422).json("plzz fill the data");
    }
    try {
        //checks whether user is present or not, 1 email is of db email and the other was the email that was taken by user 
        const preuser = await users.findOne({email:email});
        console.log(preuser)

        //user is already present in db
        if(preuser){
            res.status(422).json("This user is already present!");
        }
        //user's first time in db
        else{
            const adduser = new users({
                name, email, age, phone, department, location, salary
            })
            //paases the upi
            await adduser.save();
            res.status(201).send(adduser);
            console.log(adduser);
        }
    } catch (error) {
        res.status(422).json(error);
    }
})
//get userdata
router.get("/getdata",async(req,res)=>{
    try {
        const userdata= await users.find();
        res.status(201).send(userdata)
        console.log(userdata);
    } catch (error) {
        res.status(422).json(error);
    }
})

//get individual user
router.get("/getuser/:id",async(req,res)=>{
    try {
        console.log(req.params);
        const {id} = req.params;

        const userindividual = await users.findById({_id:id});
        console.log(userindividual);
        res.status(201).json(userindividual)

    } catch (error) {
        res.status(422).json(error);
    }
})

//update user data
router.patch("/updateuser/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        const updateduser = await users.findByIdAndUpdate(id,req.body,{
            new:true
        });

        console.log(updateduser);
        res.status(201).json(updateduser);

    } catch (error) {
        res.status(422).json(error);
    }
})

//delete user
router.delete("/deleteuser/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        const deletuser = await users.findByIdAndDelete({_id:id})
        console.log(deletuser);
        res.status(201).json(deletuser);

    } catch (error) {
        res.status(422).json(error);
    }
})

module.exports = router;
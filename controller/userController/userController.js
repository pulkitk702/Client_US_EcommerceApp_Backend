const UserModel = require("../../model/userModel/userModel");
const getAllUser = async (_, res) => {
  try {
    const users = await UserModel.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).send("something went wrong while fetching the users");
  }
};

const createUser =async(req,res)=>{
    try{
        const {
            first_name,
            last_name,
            gender,
            age,
            address,
            city,
            country,
            zip_code,
            email,
            password,
            contact_number
          } = req.body;
          const newUser =await UserModel.createUser({
            first_name,
            last_name,
            gender,
            age,
            address,
            city,
            country,
            zip_code,
            email,
            password,
            contact_number
          })
          res.status(200).json({message:"User Created Successfully",user:newUser})
    }
    catch(error){
res.status(500).send("something went wrong")
    }
}  
module.exports = {
  getAllUser,
  createUser
};

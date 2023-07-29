const express = require("express");
const router = express.Router();
const users = require("../models/userSchema");

//register user
router.post("/register", async (req, res) => {
  const { name, email, age, mobile, work, address, description } = req.body;
  if (!name || !email || !age || !mobile || !work || !address || !description) {
    res.status(422).json("Please fill all the details");
  }
  try {
    const preUser = await users.findOne({ email });
    if (preUser) {
      return res.status(422).json("user already present");
    }
    const addUser = new users({
      name,
      email,
      age,
      mobile,
      work,
      address,
      description,
    });
    await addUser.save();
    return res.status(201).json(addUser);
  } catch (error) {
    return res.status(500).json("Internal server error");
  }
});

// get user data
router.get("/getData", async (req, res) => {
  try {
    const userData = await users.find();
    return res.status(201).json(userData);
  } catch (error) {
    res.status(500).json("internal server error");
  }
});

//  check about the return statement when to include or not
// get single user detail
router.get("/getUserData/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const userData = await users.findById({ _id: id });
    if (!userData) {
      res.status(422).json({error: "Invalid Id"});
    } else {
      res.status(201).json(userData);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// update user
router.patch('/updateuser/:id', async (req, res) => {
  try {
    const _id = req.params.id
    const { name, email, age, mobile, work, address, description } = req.body;
    const data = await users.updateOne({_id}, {
        $set : {
          name: name,
          email: email,
          age: age,
          mobile: mobile,
          work: work,
          address: address,
          description: description
        }
    })
    res.status(201).json(data)
  } catch (error) {
    res.status(422).json("internal server error")
  }
})

// delete user
router.delete('/deleteuser/:id', async (req, res) => {
  const _id = req.params.id
  try {
     const data = await users.deleteOne({_id})
     res.status(201).json(data)
  } catch (error) {
    const statusCode = error.code || 500
    const statusMessage = statusCode == 500? "Internal server error" : "not found"
    res.status(statusCode).json({error : statusMessage})
  }
})


module.exports = router;

// const express = require("express");
// const router = express.Router();
// const users = require("../models/userSchema");

// // router.get('/', (req, res) => {
// //     console.log("connected")
// // })

// // register user
// router.post("/register", async (req, res) => {
//   const { name, email, age, mobile, work, address, description } = req.body;

//   if (!name || !email || !age || !mobile || !work || !address || !description) {
//     return res.status(400).json("Please fill all the details");
//   }

//   try {
//     const preuser = await users.findOne({ email: email });
//     console.log(preuser);
//     if (preuser) {
//       return res.status(409).json("User already present");
//     } else {
//       const addUser = new users({
//         name,
//         email,
//         age,
//         mobile,
//         work,
//         address,
//         description,
//       });
//       await addUser.save();
//       console.log(addUser);
//       return res.status(201).json(addUser);
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json("Internal Server Error");
//   }
// });

// // get user data
// router.get("/getdata", async (req, res) => {
//   try {
//     const userData = await users.find();
//     res.status(201).json(userData);
//   } catch (error) {
//     res.status(500).json("Internal server error");
//   }
// });

// // get single user detail
// router.get('/getUserData/:id', async (req, res) => {
//   const {id} = req.params
//   try {
//     const data = await users.findById({_id:id})
//     if(!data){
//       res.status(404).json("Invalid id")
//     }else{
//       res.status(201).json(data)
//     }
//   } catch (error) {
//     res.status(500).json("Internal Server Error")
//   }
// })

// // update data
// router.patch('/updateData/:id', async (req, res) => {
//   try {
//     const { id } = this.param.id
//     const updatedUser = await users.findByIDAndUpdate(id, req.body,{
//       new:true
//     })
//     console.log(updatedUser, "ok")
//     res.status(201).json(updatedUser)
//   } catch (error) {
//     res.status(422).json(error)
//   }
// })

// module.exports = router;

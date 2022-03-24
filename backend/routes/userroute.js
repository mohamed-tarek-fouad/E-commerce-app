
const express =require('express');
const router=express.Router()
const {register,login,allUseres,deleteUser,updateUser, getUser, states  }=require('../controller/users');
const { verifyAuthrisation, verifyadmin } = require('../middleware/authnticate');



//register 
router.route('/registerUser').post(register)
//login
router.route('/loginUser').post(login)

router.route('/').get(verifyadmin,allUseres)

router.route('/find/:id').delete(verifyAuthrisation,deleteUser)

router.route('/:id').put(verifyAuthrisation,updateUser)

router.route('/find/:id').get(verifyadmin,getUser)

router.route('/stats').get(verifyadmin,states)

module.exports = router;
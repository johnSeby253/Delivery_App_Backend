const express=require('express');
const router=express.Router();
const jwtMiddleware=require('../Middlewares/jwtMiddleware');
const agentJWT=require('../Middlewares/agentJwt');
const multerConfig=require('../Middlewares/multerMiddleware')
const userController=require('../Controllers/UserController');
const AdminController=require('../Controllers/AdminController');
const AgentController=require('../Controllers/AgentController');
const OrderController=require('../Controllers/OrderController');

// <<<<<......UserRouter......>>>>>

// userRegisteration
router.post('/userRegister',userController.userRegister);
// userLogin
router.post('/userLogin',userController.userLogin);
// getUserprofileData
router.get('/getuserProfile',jwtMiddleware,userController.getuserProfile);
// EditUserProfile
router.put('/editUserProfile',jwtMiddleware,multerConfig.single('userProfile'),userController.editUserProfile);



// <<<<<<......AdminRouter......>>>>>>

// adminRegister
router.post('/adminRegister',AdminController.adminRegistration);
// adminLogin
router.post('/adminLogin',AdminController.adminlogin);



// <<<<<<......AgentRouter......>>>>>>

// agentRegister
router.post('/agentRegister',AgentController.agentRegistration);
// agentLogin
router.post('/agentLogin',AgentController.agentLogin);
// getAgentLocation
router.get('/getAgentLocation',AgentController.getAgentLocation);
// editPendingAgentOrder
router.put('/editPendingOrder',agentJWT,AgentController.editPendingAgentOrders)


// <<<<<.....OrderRouter......>>>>>

// createOrder
router.post('/createOrder',jwtMiddleware,OrderController.createOrder);
// getOrder
router.get('/getUserOrder',jwtMiddleware,OrderController.getUserOrders);
// editOrder
router.put('/editUserOrder/:order_id',jwtMiddleware,OrderController.editUserOrder);
// getOrderById
router.get('/getOrderById/:order_id',OrderController.getUserOrderById);
// CancelOrder
router.put('/cancelOrder/:order_id',OrderController.cancelTheOrder);
// getAgentOrder
router.get('/getAgentOrder',agentJWT,OrderController.getAgentOrder);
// editstatus
router.put('/editStatus/:order_id',OrderController.editStatus);
// getAgentOrderPickuped
router.get('/getAgentOrderbyPickup',agentJWT,OrderController. getAgentOrderPickuped);




module.exports=router
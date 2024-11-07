const order = require('../Models/OrderSchema');
const agent = require('../Models/AgentSchema');

exports.createOrder = async (req, res) => {
    const { fromAddress, toAddress } = req.body;
    const UserId = req.payload;
    try {
        const newOrder = new order({
            fromAddress: {
                customerName: fromAddress.customerName,
                address: fromAddress.address,
                MobNo: fromAddress.MobNo,
                fromLocation: fromAddress.fromLocation,
                pinCode: fromAddress.pinCode,
                nearestHub: fromAddress.nearestHub,
            },
            toAddress: {
                customerName: toAddress.customerName,
                address: toAddress.address,
                MobNo: toAddress.MobNo,
                toLocation: toAddress.toLocation,
                pinCode: toAddress.pinCode
            },
            UserId
        });
        const savedOrder = await newOrder.save();
        const assignedAgent = await agent.findOne({ agentLocation: fromAddress.nearestHub });
        if (assignedAgent) {
            assignedAgent.order_id.push(savedOrder._id);
            await assignedAgent.save();
        } else {
            console.log("Error at Assigin order id into agent::::::");
        }
        res.status(201).json(savedOrder);
    } catch (err) {
        console.log("Error at the OrderController/createOrder::::::");
        res.status(401).json(err);
    }
}

exports.getUserOrders = async (req, res) => {
    const userId = req.payload;

    try {
        const allUserOrders = await order.find({ UserId: userId });
        if (allUserOrders) {
            res.status(200).json(allUserOrders);
        } else {
            res.status(406).json("Couldn't find the userOrder:::::: ")
        }
    } catch (err) {
        console.log("Error at catch in OrderContrller/getUserOrder:::::");
        res.status(401).json(err);
    }
}

exports.editUserOrder = async (req, res) => {
    const { order_id } = req.params;
    const { fromAddress, toAddress } = req.body
    console.log("hello:", req.body);

    try {
        const updatedOrder = await order.findByIdAndUpdate(order_id, {
            fromAddress: {
                customerName: fromAddress.customerName,
                address: fromAddress.address,
                fromLocation: fromAddress.fromLocation,
                MobNo: fromAddress.MobNo,
                pinCode: fromAddress.pinCode,
            },
            toAddress: {
                customerName: toAddress.customerName,
                address: toAddress.address,
                toLocation: toAddress.toLocation,
                MobNo: toAddress.MobNo,
                pinCode: toAddress.pinCode
            },
        }, { new: true });
        console.log("data", updatedOrder);

        res.status(200).json(updatedOrder)

    } catch (err) {
        console.log("Error at catch in OrderContrller/editUserOrder:::::");
        res.status(401).json(err);
    }
}

exports.getUserOrderById = async (req, res) => {
    const { order_id } = req.params;

    try {
        const getOrderById = await order.findOne({ _id: order_id });
        if (getOrderById) {
            res.status(200).json(getOrderById);
        } else {
            res.status(406).json("Cannot get the OrderById:::::")
        }
    } catch (err) {
        console.log("Error at catch in OrderContrller/getUserOrderById:::::");
        res.status(401).json(err);
    }
}

exports.cancelTheOrder = async (req, res) => {
    const { order_id } = req.params;
    try {
        const updateStatus = await order.findByIdAndUpdate(order_id, { status: "Cancelled" }, { new: true });
        res.status(200).json(updateStatus)
    } catch (err) {
        console.log("Error at catch in OrderContrller/cancelTheOrder:::::");
        res.status(401).json(err);
    }
}

exports.getAgentOrder = async (req, res) => {
    const agentId = req.payload;
    console.log(agentId);

    try {
        const agentOrders = await agent.findById(agentId).populate(
            { path: 'order_id', model: order, match: { status: 'Pending' } });
        console.log(agentOrders);

        res.status(200).json(agentOrders);
    } catch (err) {
        console.log("Error at orderController/getAgentOrder::::", err);

    }
}

exports.editStatus = async (req, res) => {
    const { order_id } = req.params;
    const {status}=req.body;    

    if (!status) {
        return res.status(400).json({ message: 'Status is required.' });
    }
    try {
        let updateStatus;
        
        // Validate the status and update accordingly
        switch (status) {
            case 'Pickuped':
                updateStatus = await order.findByIdAndUpdate(order_id, { status: 'Pickuped' }, { new: true });
                break;
            case 'Delivered':
                updateStatus = await order.findByIdAndUpdate(order_id, { status: 'Delivered' }, { new: true });
                break;
            case 'Completed':
                updateStatus = await order.findByIdAndUpdate(order_id, { status: 'Completed' }, { new: true });
                break;
            default:
                return res.status(400).json({ message: 'Invalid status value.' });
        }

        if (updateStatus) {
            res.status(200).json(updateStatus);  // Return the updated order
        } else {
            res.status(404).json({ message: 'Order not found' });  // Order not found
        }
    } catch (err) {
        console.log("Error at catch in OrderContrller/cancelTheOrder:::::");
        res.status(401).json(err);
    }
}

exports.getAgentOrderPickuped = async (req, res) => {
    const agentId = req.payload;
    console.log(agentId);

    try {
        const agentOrders = await agent.findById(agentId).populate(
            { path: 'order_id', model: order, match: { status: 'Pickuped' } });
        console.log(agentOrders);

        res.status(200).json(agentOrders);
    } catch (err) {
        console.log("Error at orderController/getAgentOrderPickuped::::", err);

    }
}
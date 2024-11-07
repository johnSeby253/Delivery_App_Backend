const agent = require('../Models/AgentSchema');
const order = require('../Models/OrderSchema');
const jwt = require('jsonwebtoken');

exports.agentRegistration = async (req, res) => {
    const { agentname, agentEmail, accessCode, agentLocation } = req.body;

    try {
        const existingAgent = await agent.findOne({ agentEmail });
        if (existingAgent) {
            res.status(406).json("Agent Already Existing...")
        } else {
            const newAgent = new agent({
                agentname, agentEmail, accessCode, agentLocation
            });
            await newAgent.save();
            res.status(200).json(newAgent)
        }
    } catch (err) {
        console.log("Error at catch in agentController.js/agentRegistration:::::", err);

    }
}


exports.agentLogin = async (req, res) => {
    const { agentEmail, accessCode } = req.body;
    try {
        const existingAgent = await agent.findOne({ agentEmail, accessCode });
        if (existingAgent) {
            const agentToken = jwt.sign({ agentId: existingAgent._id }, process.env.JWT_SECRETKEY);
            res.status(200).json({ agentToken, existingAgent });
        } else {
            res.status(406).json("Invalid Email or AccessCode Please check it::::")
        }
    } catch (err) {
        console.log("Error at catch in agentController.js/agentLogin:::::", err);

    }
}

exports.getAgentLocation = async (req, res) => {
    try {
        const locations = await agent.find({}, { agentLocation: 1, _id: 1 });
        res.status(200).json(locations)
    } catch (err) {
        console.log("Error at AgentController/getAgentLocation:::::::", err);
    }
}

exports.editPendingAgentOrders = async (req, res) => {
    try {
        const { orderId, newStatus, newAgentId } = req.body;
        if (!orderId || !newAgentId || !newStatus) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const findOrder = await order.findById(orderId);
        if (!findOrder) {
            return res.status(404).json({ message: "Order not found" });
        } else {
            findOrder.status = newStatus;
            await findOrder.save();
        }

        const currentAgent = await agent.findOne({ order_id: orderId });
        if (!currentAgent) {
            return res.status(404).json({ message: "Current agent not found" });
        }
        currentAgent.order_id = currentAgent.order_id.filter(order => order.toString() !== orderId);

        const newAgent = await agent.findById(newAgentId);
        if (!newAgent) {
            return res.status(404).json({ message: "New agent not found" });
        }
        newAgent.order_id.push(orderId);
        await newAgent.save();

        res.status(200).json({
            message: "Order transferred successfully",
            order: findOrder,
            currentAgent: currentAgent,
            newAgent: newAgent
        });

    } catch (err) {
        console.log("Error in transferOrderToNewAgent:", err);
        res.status(500).json({ message: "Internal server error" });
    }

}
const Ordermodel = require('../models/Order.model')
const Product = require('../models/Product.model')
const Crypto = require('crypto')
async function toCheckStock(product_id, stock, isVarientTrue = false, Varient_id) {
    try {
        const product = await Product.findById(product_id);
        if (!product) {
            throw new Error('Product Not Found');
        }

        if (isVarientTrue === false) {
            if (product.stock < stock) {
                throw new Error(`Not enough stock for the product: ${product.name}. Available stock: ${product.stock}`);
            }
        } else {
            const varient = product.Varient.find((item) => item._id.toString() === Varient_id);
            if (!varient) {
                throw new Error('Variant Not Found');
            }
            if (varient.stock_quantity < stock) {
                throw new Error(`Not enough stock for the variant: ${varient.quantity}. Available stock: ${varient.stock_quantity}`);
            }
        }

        return true;
    } catch (error) {
        throw new Error(error.message);
    }
}
async function generateUniqueOrderId() {
    const startString = 'ORD';
    let order_id;
    let orderExists = true;

    while (orderExists) {

        const OrderNo = Crypto.randomInt(1000000, 9999999);
        order_id = startString + OrderNo;

        const order = await Ordermodel.findOne({ orderId: order_id });

        if (!order) {
            orderExists = false;
        }
    }

    return order_id;
}


exports.createOrderOfProduct = async (req, res) => {
    try {
        const user = req.user.id?._id || null
        const order_id = await generateUniqueOrderId();

        const { items, totalAmount, payAmt, isVarientInCart, paymentType, offerId, shipping } = req.body;

        for (let item of items) {
            const { productId, quantity, varient_id } = item;

            const isVarientTrue = isVarientInCart && varient_id ? true : false;

            const stockCheck = await toCheckStock(productId, quantity, isVarientTrue, varient_id);

            if (!stockCheck) {
                return res.status(400).json({
                    success: false,
                    message: 'Stock check failed for one or more products. Please try again later.'
                });
            }
        }
        const orderItems = items.map(item => ({
            productId: item.productId,
            varient_type: {
                id: item.varient_id || null,
                text: item.quantity || ''
            },
            name: item.name,
            quantity: item.quantity,
            price: item.price,
        }));

        const newOrder = new Ordermodel({
            userId: user,
            orderId: order_id,
            items: orderItems,
            totalAmount,
            payAmt,
            paymentType,
            offerId,
            shipping,
            status: 'pending',
            totalquantity: items.length || 0
        });


        const savedOrder = await newOrder.save();

        // Send confirmation response
        return res.status(201).json({
            success: true,
            order: newOrder,
            message: 'Order placed successfully! Your items are in the cart.'
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Internal Server Error'
        });
    }
};

exports.ChangeOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;

        const Order = await Ordermodel.findById(orderId);
        if (!Order) {
            return res.status(404).json({
                success: false,
                message: 'Sorry, we couldn\'t find the order. Please check the order ID and try again.'
            });
        }

        if (Order.status === 'confirmed' || Order.status === 'delivered') {
            return res.status(400).json({
                success: false,
                message: `The order has already been marked as ${Order.status}. It cannot be updated at this time.`
            });
        }

        if (status === 'confirmed') {
            for (let item of Order.items) {
                const { productId, quantity, varient_type } = item;

                const isVarientTrue = varient_type.id ? true : false;
                console.log(isVarientTrue)

                const stockCheck = await toCheckStock(productId, quantity, isVarientTrue, varient_type?.id);

                if (!stockCheck) {
                    return res.status(400).json({
                        success: false,
                        message: 'Stock check failed for one or more products. Please try again later.'
                    });
                }


                const product = await Product.findById(productId);
                if (isVarientTrue) {
                    const varient = product.Varient.find((item) => item._id.toString() === varient_type?.id);
                    if (varient) {
                        varient.stock_quantity -= quantity;
                    }
                } else {
                    product.stock -= quantity;
                }
                await product.save();
            }
        }


        if (status === 'cancelled') {

            Order.status = status;
            await Order.save();

            return res.status(200).json({
                success: true,
                message: 'The order has been cancelled successfully!'
            });
        }


        Order.status = status;
        await Order.save();

        return res.status(200).json({
            success: true,
            message: 'The order status has been updated successfully!'
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Oops! Something went wrong. Please try again later.'
        });
    }
};


exports.getAllOrder = async (req, res) => {
    try {
        const { page = 1, search = '', startDate, endDate, orderStatus } = req.query;
        let query = {};

        if (search) {
            query.$or = [
                { 'userId.Name': { $regex: search, $options: 'i' } },
                { orderId: { $regex: search, $options: 'i' } },
            ];
        }

        if (startDate && endDate) {
            query.createdAt = { 
                $gte: new Date(startDate), 
                $lte: new Date(endDate)
            };
        }

        if (orderStatus) {
            query.status = orderStatus;
        }

        const limit = 2;
        const orders = await Ordermodel.find(query)
            .populate('userId')
            .skip((page - 1) * limit)
            .limit(limit); 

        return res.status(200).json({
            success: true,
            totalPages: Math.ceil(await Ordermodel.countDocuments(query) / limit),
            total: orders.length,
            currentPage: page,
            data: orders,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Oops! Something went wrong. Please try again later.'
        });
    }
}

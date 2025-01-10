const ProductModel = require('../models/Product.model');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_API_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Helper function to upload image buffer to Cloudinary
const uploadBufferToCloudinary = (buffer, fileName) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                resource_type: 'auto',
                folder: 'dryfruit/products',
                public_id: fileName
            },
            (error, result) => {
                if (error) {
                    console.error("Error uploading image to Cloudinary:", error);
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );
        streamifier.createReadStream(buffer).pipe(uploadStream);
    });
};

exports.createProduct = async (req, res) => {
    try {
        const {
            product_name,
            product_description,
            isVarient,
            price,
            discount,
            afterDiscountPrice,
            stock,
            Varient,
            category,
            extra_description,
            tag,
            isShowOnHomeScreen
        } = req.body;

        const uploadedImages = [];

        // Upload all files to Cloudinary
        for (const file of req.files) {
            const result = await uploadBufferToCloudinary(file.buffer, file.originalname);
            uploadedImages.push({
                public_id: result.public_id,
                url: result.secure_url
            });
        }

        // Map uploaded images to specific fields
        const productData = {
            product_name,
            product_description,
            isVarient: JSON.parse(isVarient || false),
            Varient: isVarient === 'false' ? [] : JSON.parse(Varient || "[]"),
            category,
            extra_description,
            tag,
            price,
            discount,
            afterDiscountPrice,
            stock,
            isShowOnHomeScreen: JSON.parse(isShowOnHomeScreen || false),
            ProductMainImage: uploadedImages[0] || null,
            SecondImage: uploadedImages[1] || null,
            ThirdImage: uploadedImages[2] || null,
            FourthImage: uploadedImages[3] || null,
            FifthImage: uploadedImages[4] || null,
        };

        console.log("Product Data:", productData);

        // Create product in the database
        const product = await ProductModel.create(productData);

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            product: product, // Return the created product data for confirmation
        });
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({
            success: false,
            message: "Error creating product",
            error: error.message,
        });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await ProductModel.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            products,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching products",
            error: error.message,
        });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await ProductModel.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Product fetched successfully",
            product,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching product",
            error: error.message,
        });
    }
};

exports.deleteProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await ProductModel.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });

        }
        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting product",
            error: error.message,
        });
    }
}
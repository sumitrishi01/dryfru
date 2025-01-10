import React, { useState } from 'react';
import { FiMinus, FiPlus, FiShoppingCart } from 'react-icons/fi';
import p1 from './peanut1.jpg'
import p2 from './peanut2.jpg'

function ProductPage() {
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Sample product data (replace with actual data)
  const product = {
    product_name: "Premium Peanuts",
    product_description: "Best quality of peanuts",
    ProductMainImage: p1,
    SecondImage: p1,
    ThirdImage: p2,
    price: 299.99,
    discount: 10,
    afterDiscountPrice: 269.99,
    stock: 50,
    isVarient: true,
    Varient: [
      { quantity: "1L", price: 299.99, price_after_discount: 269.99, discount_percentage: 10, isStock: true, stock_quantity: 50 },
      { quantity: "2L", price: 399.99, price_after_discount: 359.99, discount_percentage: 10, isStock: true, stock_quantity: 30 }
    ],
    category: "Appliances",
    extra_description: "Includes 2-year warranty and free maintenance",
    tag: "Featured",
  };

  const handleQuantityChange = (increment) => {
    const newQuantity = quantity + increment;
    if (newQuantity >= 1 && newQuantity <= (product.isVarient ? product.Varient[selectedVariant].stock_quantity : product.stock)) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    // Implement cart functionality here
    console.log('Added to cart:', {
      product: product.product_name,
      quantity,
      variant: product.isVarient ? product.Varient[selectedVariant].quantity : null,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg">
                <img
                  src={product.ProductMainImage}
                  alt={product.product_name}
                  className="h-96 w-full object-cover object-center hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[product.SecondImage, product.ThirdImage].map((image, index) => (
                  image && (
                    <img
                      key={index}
                      src={image}
                      alt={`Product view ${index + 2}`}
                      className="h-24 w-full object-cover rounded-lg cursor-pointer hover:opacity-75 transition-opacity"
                    />
                  )
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{product.product_name}</h1>
                <p className="mt-4 text-gray-600">{product.product_description}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-4">
                  <span className="text-3xl font-bold text-gray-900">
                  ₹{product.isVarient 
                      ? product.Varient[selectedVariant].price_after_discount 
                      : product.afterDiscountPrice}
                  </span>
                  {(product.isVarient ? product.Varient[selectedVariant].discount_percentage : product.discount) > 0 && (
                    <>
                      <span className="text-xl text-gray-400 line-through">
                      ₹{product.isVarient ? product.Varient[selectedVariant].price : product.price}
                      </span>
                      <span className="text-sm font-semibold text-green-500">
                        {product.isVarient ? product.Varient[selectedVariant].discount_percentage : product.discount}% OFF
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Variants */}
              {product.isVarient && (
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-900">Size Options</h3>
                  <div className="flex space-x-4">
                    {product.Varient.map((variant, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedVariant(index)}
                        className={`px-4 py-2 rounded-lg border ${
                          selectedVariant === index
                            ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                            : 'border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        {variant.quantity}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="p-2 rounded-full border border-gray-200 hover:bg-gray-50"
                  >
                    <FiMinus className="w-4 h-4" />
                  </button>
                  <span className="text-lg font-medium">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="p-2 rounded-full border border-gray-200 hover:bg-gray-50"
                  >
                    <FiPlus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-indigo-600 text-white py-3 px-8 rounded-lg flex items-center justify-center space-x-2 hover:bg-indigo-700 transition-colors"
              >
                <FiShoppingCart className="w-5 h-5" />
                <span>Add to Cart</span>
              </button>

              {/* Additional Information */}
              <div className="border-t border-gray-200 pt-6 space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Category</h3>
                  <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                </div>
                {product.extra_description && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Additional Information</h3>
                    <p className="mt-1 text-sm text-gray-500">{product.extra_description}</p>
                  </div>
                )}
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Stock Status</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {product.isVarient
                      ? `${product.Varient[selectedVariant].stock_quantity} units available`
                      : `${product.stock} units available`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
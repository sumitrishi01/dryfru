import React from 'react';
import almonds from './almonds.webp';
import pecan from './pecan.jpg';
import cashew from './cashew.webp';
import kismish from './kismish.jpg';
import walnuts from './walnuts.jpg';
import pistachios from './pistachios.webp';
import peanuts from './peanuts.jpg';
import mixed from './mixed.jpg';
import productBg from './productBg.jpg'
import Card from '../Card/Card';
import Button from '../Button/Button';
import { ArrowRight } from 'lucide-react';


function ProductCard() {
    const productData = [
        {
            id: 1,
            name: 'PECAN NUTS',
            tag: 'New',
            discount: 10,
            image: pecan,
            shopBtn: "Add To Cart",
            price: "500",
            afterDisPrice: "AfterDis",
        },
        {
            id: 2,
            name: 'CALIFORNIA ALMONDS',
            tag: 'New',
            discount: 20,
            image: almonds,
            shopBtn: "Add To Cart",
            price: "500",
            afterDisPrice: "AfterDis",
        },
        {
            id: 3,
            name: 'CASHEW',
            tag: 'New',
            discount: 30,
            image: cashew,
            shopBtn: "Add To Cart",
            price: "500",
            afterDisPrice: "AfterDis",
        },
        {
            id: 4,
            name: 'PISHTACHIO',
            tag: 'New',
            discount: 15,
            image: pistachios,
            shopBtn: "Add To Cart",
            price: "500",
            afterDisPrice: "AfterDis",
        },
        {
            id: 5,
            name: 'MIXED DRY FRUITS',
            tag: 'New',
            discount: 25,
            image: mixed,
            shopBtn: "Add To Cart",
            price: "500",
            afterDisPrice: "AfterDis",
        },
        {
            id: 6,
            name: 'WALNUTS',
            tag: 'New',
            discount: 25,
            image: walnuts,
            shopBtn: "Add To Cart",
            price: "500",
            afterDisPrice: "AfterDis",
        },
        {
            id: 7,
            name: 'KISHMISH',
            tag: 'New',
            discount: 25,
            image: kismish,
            shopBtn: "Add To Cart",
            price: "500",
            afterDisPrice: "AfterDis",
        },
        {
            id: 8,
            name: 'PEANUTS',
            tag: 'New',
            discount: 25,
            image: peanuts,
            shopBtn: "Add To Cart",
            price: "500",
            afterDisPrice: "AfterDis",
        },

    ]

    return (
        <section className="relative py-16 bg-gradient-to-b from-green-50 to-white">
            {/* Background Pattern */}
            <div style={{ backgroundImage: `url(https://i.ibb.co/fD23zLF/autumn-composition-with-nuts-leaves.png)` }} className="absolute inset-0  opacity-30" />

            <div className="max-w-[1400px] mx-auto px-4">
                <div className="flex flex-col space-y-8">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div className="relative">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                                Explore Our Categories
                            </h2>
                            <div className="absolute -bottom-2 left-0 w-2/3 h-1 bg-gradient-to-r from-green-600 to-green-400" />
                        </div>
                        <button className="group flex items-center gap-2 text-green-600 font-semibold hover:text-green-700 transition-colors">
                            View All
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    {/* Product Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        {productData.map((product) => (
                            <Card key={product.id} {...product} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductCard

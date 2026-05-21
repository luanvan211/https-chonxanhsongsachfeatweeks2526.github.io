import React, { useState } from 'react';
import { ShoppingCart, Check, Star, RefreshCw } from 'lucide-react';

const Shop: React.FC = () => {
  const [selectedSize, setSelectedSize] = useState('500ml');
  const [selectedColor, setSelectedColor] = useState('Forest Green');

  const sizes = ['350ml', '500ml', '750ml'];
  const colors = [
    { name: 'Forest Green', class: 'bg-emerald-800' },
    { name: 'Ocean Blue', class: 'bg-blue-800' },
    { name: 'Slate Gray', class: 'bg-gray-700' },
    { name: 'Sunset Orange', class: 'bg-orange-600' }
  ];

  const handlePurchase = () => {
    alert(`Purchased ${selectedSize} ${selectedColor} ReBottle!`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Preview */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 rounded-3xl flex items-center justify-center relative overflow-hidden">
             {/* Mock Bottle Image */}
             <div className={`w-32 h-64 rounded-t-3xl rounded-b-xl border-4 border-gray-800 relative shadow-2xl transition-colors duration-500 ${
               colors.find(c => c.name === selectedColor)?.class
             }`}>
               <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-4 bg-gray-800 rounded-full opacity-20"></div>
               <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-4 w-16 h-8 bg-gray-800 rounded-t-lg"></div>
             </div>

             <div className="absolute top-6 right-6 bg-white px-3 py-1 rounded-full shadow-md flex items-center">
               <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
               <span className="text-sm font-bold">4.9</span>
             </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1,2,3,4].map(i => (
              <div key={i} className="aspect-square bg-gray-100 rounded-xl"></div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Original ReBottle</h2>
          <p className="text-2xl font-bold text-green-600 mb-6">$29.00</p>

          <div className="space-y-6 flex-1">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">Select Size</label>
              <div className="flex gap-3">
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`flex-1 py-2 rounded-lg border-2 transition-all ${
                      selectedSize === size
                        ? 'border-green-600 bg-green-50 text-green-700'
                        : 'border-gray-200 text-gray-500 hover:border-gray-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">Select Color</label>
              <div className="flex gap-4">
                {colors.map(color => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedColor === color.name ? 'border-gray-900 ring-2 ring-gray-200' : 'border-transparent'
                    } ${color.class}`}
                  >
                    {selectedColor === color.name && <Check className="w-5 h-5 text-white" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <RefreshCw className="w-4 h-4 mr-2 text-green-500" />
                Infinite refills at partner shops
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Check className="w-4 h-4 mr-2 text-green-500" />
                BPA Free & Eco-friendly
              </div>
            </div>
          </div>

          <button
            onClick={handlePurchase}
            className="mt-8 w-full bg-gray-900 text-white py-4 rounded-xl font-bold flex items-center justify-center hover:bg-gray-800 transition-colors shadow-lg active:scale-95"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Subscription Section */}
      <section className="bg-linear-to-r from-green-600 to-emerald-700 rounded-3xl p-8 md:p-12 text-white text-center shadow-2xl">
        <h3 className="text-3xl font-bold mb-4">Go Unlimited</h3>
        <p className="text-green-50 mb-8 max-w-xl mx-auto">Get exclusive deals, free extras, and priority support with our monthly subscription plan.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <h4 className="text-xl font-bold mb-2">Basic</h4>
            <p className="text-3xl font-black mb-4">Free</p>
            <ul className="text-sm space-y-2 mb-6 opacity-80">
              <li>• Standard refill rewards</li>
              <li>• Access to all locations</li>
            </ul>
            <button className="w-full bg-white/20 hover:bg-white/30 py-2 rounded-lg transition-colors">Current Plan</button>
          </div>
          <div className="bg-white text-green-700 rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-[10px] font-black px-4 py-1 rotate-45 translate-x-4 translate-y-2 uppercase">Best Value</div>
            <h4 className="text-xl font-bold mb-2 text-green-800">Pro</h4>
            <p className="text-3xl font-black mb-4 text-green-900">$9.99<span className="text-sm font-normal">/mo</span></p>
            <ul className="text-sm space-y-2 mb-6 text-green-800/80">
              <li>• 2x Refill Tokens</li>
              <li>• 1 Free Monthly Coffee</li>
              <li>• Priority Map markers</li>
            </ul>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors shadow-md">Upgrade Now</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shop;

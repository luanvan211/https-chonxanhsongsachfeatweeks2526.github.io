import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Package, CreditCard, ChevronRight, CheckCircle2, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Shop = () => {
  const { cart, addToCart, removeFromCart, clearCart, total } = useCart();
  const [step, setStep] = useState<'browse' | 'checkout' | 'success'>('browse');

  const products = [
    { id: 1, name: 'Chọn xanh sống sạch Metal - Midnight', price: 450000, desc: 'Premium stainless steel with laser engraving support.' },
    { id: 2, name: 'Chọn xanh sống sạch Tritan - Crystal', price: 250000, desc: 'Eco-friendly BPA-free Tritan with charm slots.' },
    { id: 3, name: 'Chọn xanh sống sạch Metal - Ocean', price: 450000, desc: 'Durable 500ml bottle for extreme environments.' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black mb-2">Aqua Store</h2>
          <p className="text-slate-500 font-medium">Buy your customizable Chọn xanh sống sạch bottle today.</p>
        </div>
        <div className="relative">
          <button
            className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all relative"
            onClick={() => cart.length > 0 && setStep('checkout')}
          >
            <ShoppingCart size={24} className="text-slate-600" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">
                {cart.reduce((a, b) => a + b.qty, 0)}
              </span>
            )}
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 'browse' ? (
          <motion.div
            key="browse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {products.map(product => (
              <div key={product.id} className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm flex flex-col group">
                <div className="h-64 bg-slate-100 flex items-center justify-center relative">
                   <Package size={80} className="text-slate-200 group-hover:scale-110 transition-transform duration-500" />
                   <div className="absolute top-6 right-6 bg-white/80 backdrop-blur px-3 py-1 rounded-full text-xs font-black">
                      {product.price.toLocaleString('vi-VN')}₫
                   </div>
                </div>
                <div className="p-8 space-y-4 flex-1 flex flex-col">
                   <div>
                      <h3 className="text-xl font-black">{product.name}</h3>
                      <p className="text-sm text-slate-400 font-medium leading-relaxed mt-2">{product.desc}</p>
                   </div>
                   <div className="pt-4 mt-auto">
                      <button
                        onClick={() => addToCart({ ...product, id: product.id.toString(), qty: 1 })}
                        className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors"
                      >
                        Add to Cart
                        <ChevronRight size={18} />
                      </button>
                   </div>
                </div>
              </div>
            ))}
          </motion.div>
        ) : step === 'checkout' ? (
          <motion.div
            key="checkout"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-12"
          >
            <div className="lg:col-span-2 space-y-8">
               <div className="bg-white rounded-[2rem] border border-slate-100 p-8">
                  <h3 className="text-xl font-black mb-6">Shopping Cart</h3>
                  <div className="divide-y divide-slate-50">
                    {cart.map(item => (
                      <div key={item.id} className="py-4 flex justify-between items-center">
                        <div>
                          <p className="font-bold">{item.name}</p>
                          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{item.price.toLocaleString('vi-VN')}₫ x {item.qty}</p>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
               </div>

               <div className="bg-white rounded-[2rem] border border-slate-100 p-8">
                  <h3 className="text-xl font-black mb-6">Shipping Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                     <input type="text" placeholder="Full Name" className="p-4 rounded-xl border border-slate-100 bg-slate-50 outline-none focus:border-blue-500 transition-colors col-span-2" />
                     <input type="text" placeholder="Phone Number" className="p-4 rounded-xl border border-slate-100 bg-slate-50 outline-none focus:border-blue-500 transition-colors" />
                     <input type="text" placeholder="Email" className="p-4 rounded-xl border border-slate-100 bg-slate-50 outline-none focus:border-blue-500 transition-colors" />
                     <input type="text" placeholder="Address" className="p-4 rounded-xl border border-slate-100 bg-slate-50 outline-none focus:border-blue-500 transition-colors col-span-2" />
                  </div>
               </div>
            </div>

            <div className="space-y-6">
               <div className="bg-slate-900 rounded-[2rem] p-8 text-white">
                  <h3 className="text-xl font-black mb-6">Order Summary</h3>
                  <div className="space-y-4 text-sm font-medium">
                     <div className="flex justify-between text-slate-400">
                        <span>Subtotal</span>
                        <span>{total.toLocaleString('vi-VN')}₫</span>
                     </div>
                     <div className="flex justify-between text-slate-400">
                        <span>Shipping</span>
                        <span>Free</span>
                     </div>
                     <div className="h-px bg-white/10 my-4" />
                     <div className="flex justify-between text-xl font-black">
                        <span>Total</span>
                        <span>{total.toLocaleString('vi-VN')}₫</span>
                     </div>
                  </div>
                  <button
                    onClick={() => setStep('success')}
                    className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs mt-8 flex items-center justify-center gap-2 hover:bg-blue-500 transition-colors"
                  >
                    <CreditCard size={18} />
                    Complete Order
                  </button>
                  <button
                    onClick={() => setStep('browse')}
                    className="w-full text-slate-400 py-4 font-bold text-xs hover:text-white transition-colors"
                  >
                    Continue Shopping
                  </button>
               </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[3rem] p-20 text-center border border-slate-100 shadow-xl max-w-2xl mx-auto"
          >
             <div className="w-20 h-20 bg-green-100 rounded-3xl flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 size={40} className="text-green-600" />
             </div>
             <h2 className="text-4xl font-black mb-4">Order Successful!</h2>
             <p className="text-slate-500 font-medium mb-12">Thank you for joining the sustainable revolution. Your Chọn xanh sống sạch bottle will be ready for customization soon.</p>
             <button
               onClick={() => {clearCart(); setStep('browse');}}
               className="bg-slate-900 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs"
             >
               Back to Store
             </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Shop;

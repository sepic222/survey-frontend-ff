import React, { useEffect, useState } from 'react';

const BottomSheet = ({ isOpen, onClose, title, children }) => {
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsAnimating(true);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
            setTimeout(() => setIsAnimating(false), 300);
        }
    }, [isOpen]);

    if (!isOpen && !isAnimating) return null;

    return (
        <div className={`fixed inset-0 z-[100] flex flex-col justify-end transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Sheet */}
            <div
                className={`relative w-full max-h-[85vh] bg-zinc-900 border-t border-zinc-800 rounded-t-[2.5rem] shadow-[0_-20px_50px_rgba(0,0,0,0.5)] transform transition-transform duration-500 ease-out p-8 overflow-y-auto ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
            >
                {/* Handle */}
                <div className="flex justify-center mb-6">
                    <div className="w-12 h-1.5 bg-zinc-700 rounded-full" onClick={onClose} />
                </div>

                <div className="space-y-6">
                    {title && (
                        <h3 className="text-2xl font-black text-white tracking-tight border-b border-zinc-800 pb-4">
                            {title}
                        </h3>
                    )}

                    <div className="text-zinc-300 text-lg leading-relaxed whitespace-pre-wrap font-light">
                        {children}
                    </div>

                    <button
                        onClick={onClose}
                        className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl transition-all shadow-lg shadow-orange-500/20 active:scale-[0.98]"
                    >
                        Got it
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BottomSheet;

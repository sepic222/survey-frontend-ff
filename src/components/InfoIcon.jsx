import React from 'react';

const InfoIcon = ({ onClick, className = "" }) => {
    return (
        <button
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClick();
            }}
            className={`inline-flex items-center justify-center w-6 h-6 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-400 hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-[0_0_10px_rgba(249,115,22,0.1)] group ${className}`}
            title="Tap for Inspo"
        >
            <span className="text-[10px] font-black group-hover:scale-110 transition-transform">i</span>
        </button>
    );
};

export default InfoIcon;

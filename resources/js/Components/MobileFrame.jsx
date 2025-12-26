import React from "react";

const MobileFrame = ({ children }) => {
    // scale factor: 320 / 430 ≈ 0.744
    const scale = 295 / 430;

    return (
        <div className="relative w-[320px] max-w-full h-[640px] mx-auto">
            {/* Phone frame image */}
            <img
                src="/images/mobile-frame.png"
                alt="Phone Frame"
                className="absolute inset-0 w-full h-full pointer-events-none select-none"
            />

            {/* Notch image */}
            <img
                src="/images/mobile-notch.png"
                alt="Phone Notch"
                className="absolute top-6 left-1/2 -translate-x-1/2 w-auto h-[24px] z-20 pointer-events-none select-none"
            />

            {/* Content area (430px wide but scaled down to fit 320px) */}
            <div className="absolute inset-0 m-[12px] bg-white rounded-[36px] overflow-hidden shadow-inner z-10 ">
                <div
                    className="origin-top-left"
                    style={{
                        width: "430px",
                        height: "145%",
                        transform: `scale(${scale})`,
                    }}
                >
                    {children}
                </div>
            </div>
        </div>
    );
};

export default MobileFrame;

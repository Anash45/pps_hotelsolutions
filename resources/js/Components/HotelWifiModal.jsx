import { useContext, useEffect, useState } from "react";
import LightButton from "./LightButton";
import { PageContext } from "@/context/PageProvider";
import { QRCodeSVG } from "qrcode.react";

export default function HotelWifiModal({
    onClose,
    wifiName,
    wifiPassword,
    title = "Wifi Details",
    description = "",
}) {
    const [show, setShow] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const { brandingFormData } = useContext(PageContext);

    useEffect(() => {
        requestAnimationFrame(() => setShow(true));
    }, []);

    const handleClose = () => {
        setShow(false);
        setTimeout(onClose, 200);
    };

    const wifiQRValue = `WIFI:T:WPA;S:${wifiName};P:${wifiPassword};;`;

    return (
        <div
            className={`transform rounded-xl bg-white py-4 px-6 shadow-xl transition-all duration-200 w-[624px] max-w-full 
        ${show ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
        >
            <div className="space-y-3">
                <div className="space-y-1">
                    <h2 className="text-lg text-[#201A20] font-semibold">
                        {title}
                    </h2>
                    {description && (
                        <p className="text-xs font-medium text-[#475569]">
                            {description}
                        </p>
                    )}
                </div>

                <div className="space-y-3 text-center font-semibold">
                    <h3 className="text-2xl">SSID: {wifiName}</h3>
                    <h3 className="text-2xl">Password: {wifiPassword}</h3>
                    {/* QR Code */}
                    <div className="flex justify-center mt-4">
                        <QRCodeSVG value={wifiQRValue} size={180} />
                    </div>
                </div>

                <div className="flex items-center gap-2 justify-end flex-wrap">
                    <LightButton onClick={handleClose}>Close</LightButton>
                </div>
            </div>
        </div>
    );
}

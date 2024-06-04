import QRISLogo from "@/../public/assets/images/QRISLogo.png";
import Logo from "@/../public/assets/images/Logo.png";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";

const PaymentPage = () => {
    const [qrUrl, setQrUrl] = useState("");

    const handlePayment = () => {
        axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/v1/transaction/create-payment", {
            orderId: localStorage.getItem("orderId"),
        },
        {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
        .then((res) => {
            setQrUrl(res.data.qrLink);
            console.log(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-3xl w-full mx-auto p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-8">
                    <div className="flex flex-col items-center p-6">
                        <Image
                            src={QRISLogo}
                            alt="QRIS Logo"
                            className="mb-6"
                        />
                        {qrUrl ? (
                            <Image
                                src={qrUrl}
                                alt="QR Code"
                                className="size-[300px]"
                                width={160}
                                height={160}
                            />
                        ) : (
                            <div className="bg-slate-300 animate-pulse size-[300px]" />
                        )}
                    </div>
                    <div className="flex flex-col justify-center p-6  border-gray-200">
                        <h2 className="text-3xl font-semibold mb-1">Pembayaran DP</h2>
                        <p className="text-4xl text-red font-bold mb-4">Rp15.000</p>
                        <p className="font-light text-justify mt-1 max-w-full sm:max-w-[600px]">Untuk menyelesaikan pemesanan, lakukan pembayaran melalui QRIS dengan men-scan QR Code di samping menggunakan bank atau e-wallet yang telah support dengan QRIS.</p>
                        <button
                            onClick={handlePayment}
                            className="mt-4 bg-red text-white py-2 px-4 rounded-lg hover:bg-red-600"
                        >
                            Generate QR Code
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;

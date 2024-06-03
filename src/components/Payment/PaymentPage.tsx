import QRISLogo from "@/../public/assets/images/QRISLogo.png";
import QRExample from "@/../public/assets/images/QRExample.png";
import Image from "next/image";


const PaymentPage = () => {

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
                        <Image
                            src={QRExample}
                            alt="QRIS Example"
                            className="w-40 h-40"
                        />
                    </div>
                    <div className="flex flex-col justify-center p-6  border-gray-200">
                        <h2 className="text-3xl font-semibold mb-1">Pembayaran DP</h2>
                        <p className="text-4xl text-red font-bold mb-4">Rp15.000</p>
                        <p className="font-light text-justify mt-1 max-w-full sm:max-w-[600px]">Untuk menyelesaikan pemesanan, lakukan pembayaran melalui QRIS dengan men-scan QR Code di samping menggunakan bank atau e-wallet yang telah support dengan QRIS.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default PaymentPage;
import QRISLogo from "@/../public/assets/images/QRISLogo.png";
import Logo from "@/../public/assets/images/Logo.png";
import Image from "next/image";
import axios from "axios";
import { useState } from "react";

const PaymentPage = () => {
  const [qrUrl, setQrUrl] = useState("");
  const [qrGenerated, setQrGenerated] = useState(false);

  const handlePayment = () => {
    axios
      .post(
        process.env.NEXT_PUBLIC_BACKEND_URL +
          "/api/v1/transaction/create-payment",
        {
          orderId: localStorage.getItem("orderId")
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
      )
      .then((res) => {
        console.log(res);
        setQrUrl(res.data.qrLink);
        setQrGenerated(true);
        console.log(res.data);
      })
      .catch((err) => {
        setQrUrl("error");
        setQrGenerated(false);
        console.log(err);
      });
  };

  const handleStatusCheck = () => {
    const orderId = localStorage.getItem("orderId");
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/transaction/check-payment?orderId=${orderId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
      )
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          alert("Payment Success");
        } else {
          alert("Payment not yet completed!");
        }
      })
      .catch((err) => {
        alert("Payment not yet completed!");
        console.log(err);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-3xl w-full mx-auto p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-8">
          <div className="flex flex-col items-center p-6">
            <Image src={QRISLogo} alt="QRIS Logo" className="mb-6" />
            {qrUrl === "error" ? (
              <div className="bg-white size-[300px] flex justify-center items-center">
                <span className="text-red">An Error Occured</span>
              </div>
            ) : qrUrl === "" ? (
              <div className="bg-slate-300 size-[300px] flex justify-center items-center animate-pulse">
                <span className="text-black">Press Button to Generate QR</span>
              </div>
            ) : (
              <Image
                src={qrUrl}
                alt="QR Code"
                width={300}
                height={300}
                className="size-[300px] w-auto h-auto"
              />
            )}
          </div>
          <div className="flex flex-col justify-center p-6 border-gray-200">
            <h2 className="text-3xl font-semibold mb-1">Pembayaran DP</h2>
            <p className="text-4xl text-red font-bold mb-4">Rp15.000</p>
            <p className="font-light text-justify mt-1 max-w-full sm:max-w-[600px]">
              Untuk menyelesaikan pemesanan, lakukan pembayaran melalui QRIS
              dengan men-scan QR Code di samping menggunakan bank atau e-wallet
              yang telah support dengan QRIS.
            </p>
            {qrGenerated ? (
              <button
                onClick={handleStatusCheck}
                className="mt-4 bg-red text-white py-2 px-4 rounded-lg hover:bg-red-600"
              >
                Check Status
              </button>
            ) : (
              <button
                onClick={handlePayment}
                className="mt-4 bg-red text-white py-2 px-4 rounded-lg hover:bg-red-600"
              >
                Generate QR Code
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;

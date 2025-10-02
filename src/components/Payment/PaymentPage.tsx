import QRISLogo from "@/../public/assets/images/QRISLogo.png";
import Logo from "@/../public/assets/images/Logo.png";
import Image from "next/image";
import { useState } from "react";
import { api } from "@/lib/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PaymentPage = () => {
  const [qrUrl, setQrUrl] = useState("");
  const [qrGenerated, setQrGenerated] = useState(false);

  const handlePayment = async () => {
    try {
      // Get orderId from sessionStorage (stored during request submission)
      const orderId = sessionStorage.getItem("orderId");
      
      if (!orderId) {
        toast.error("Order ID not found. Please submit a request first.");
        return;
      }

      const response = await api.post("/api/v1/transaction/create-payment", {
        orderId,
      });

      console.log(response);
      setQrUrl(response.qrLink);
      setQrGenerated(true);
    } catch (err) {
      setQrUrl("error");
      setQrGenerated(false);
      console.error(err);
      toast.error("Failed to generate QR code. Please try again.");
    }
  };

  const handleStatusCheck = async () => {
    try {
      const orderId = sessionStorage.getItem("orderId");
      
      if (!orderId) {
        toast.error("Order ID not found.");
        return;
      }

      const response = await api.get(
        `/api/v1/transaction/check-payment?orderId=${orderId}`
      );

      console.log(response);
      toast.success("Payment successful!");
    } catch (err: any) {
      // Check if it's a 404 or payment not completed
      if (err.response?.status === 404 || err.response?.status === 400) {
        toast.warning("Payment not yet completed. Please complete the payment.");
      } else {
        toast.error("Failed to check payment status. Please try again.");
      }
      console.error(err);
    }
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
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default PaymentPage;

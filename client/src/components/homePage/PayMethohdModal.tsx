import BkashLogo from "@/assets/bkash.png";
import sslLogo from "@/assets/sslcommerz.png";
import Image from "next/image";
const PayMethohdModal = ({ showModal, handlePayment, paymentMethod, setPaymentMethod, setShowModal }) => {
    return (
        <>
            {showModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-center">
                            পেমেন্ট মেথড নির্বাচন করুন
                        </h3>

                        <div className="flex flex-col gap-3">
                            <button
                                onClick={() => setPaymentMethod("bkash")}
                                className={`px-4 py-3 rounded-lg border cursor-pointer ${paymentMethod === "bkash"
                                    ? "bg-primary text-white"
                                    : "bg-gray-100"
                                    } flex justify-center`}
                            >
                                <Image src={BkashLogo} alt="bkash" width={40} height={40} />

                                {/* বিকাশ (bKash) */}
                            </button>

                            <button
                                onClick={() => setPaymentMethod("ssl")}
                                className={`px-4 flex justify-center py-3 rounded-lg border cursor-pointer ${paymentMethod === "ssl"
                                    ? "bg-primary text-white"
                                    : "bg-gray-100"
                                    }`}
                            >
                                <Image src={sslLogo} alt="bkash" width={80} height={80} />
                            </button>
                        </div>

                        <div className="flex justify-between mt-6">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-300 rounded-lg cursor-pointer"
                            >
                                বাতিল
                            </button>

                            <button
                                onClick={handlePayment}
                                className="px-4 py-2 bg-primary text-white rounded-lg cursor-pointer"
                            >
                                চালিয়ে যান
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default PayMethohdModal;
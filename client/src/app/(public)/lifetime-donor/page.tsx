"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCreateLifetimeDonorMutation } from "@/redux/features/lifetimeDonor/lifetimedonorApi"
import toast from "react-hot-toast"
import { useCreateBkashMutation, useCreatePaymentMutation } from "@/redux/features/payment/paymentApi"
import PayMethohdModal from "@/components/homePage/PayMethohdModal"
import { se } from "date-fns/locale"

export default function LifetimeDonorPage() {
    const [createPayment] = useCreatePaymentMutation()
    const [bkashDonation] = useCreateBkashMutation()
    const [createLifetimeDonor, { isLoading }] = useCreateLifetimeDonorMutation();
    const [showModal, setShowModal] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState<"sslcommerz" | "bkash">("sslcommerz")
    const [formData, setFormData] = useState({
        amount: "10000",
        name: "",
        phone: "",
        profession: "",
        address: "",
        email: "",
        termsAccepted: false,
        paymentMethod: "sslcommerz" as "sslcommerz" | "bkash",
    })
    const [errors, setErrors] = useState<Record<string, string>>({})

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target
        const checked = (e.target as HTMLInputElement).checked

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }))

        if (errors[name]) {
            setErrors((prev) => {
                const newErrors = { ...prev }
                delete newErrors[name]
                return newErrors
            })
        }
    }

    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault()
    //     // check if checkbox is checked
    //     if (!formData.termsAccepted) {
    //         toast.error("Please accept the terms and conditions before submitting the form.");
    //         return;
    //     }
    //     const finalData = {
    //         name: formData.name,
    //         email: formData.email,
    //         phone: formData.phone,
    //         amount: Number(formData.amount),
    //         occupation: formData.profession,
    //         address: formData.address,
    //         termsAccepted: formData.termsAccepted,
    //     }
    //     try {
    //         const res: any = await createLifetimeDonor(finalData).unwrap();
    //         if (res.status === 201) {
    //             toast.success("your lifetime donation has been submitted successfully!");
    //             setFormData({
    //                 amount: "10000",
    //                 name: "",
    //                 phone: "",
    //                 profession: "",
    //                 address: "",
    //                 email: "",
    //                 termsAccepted: false,
    //             });
    //         } else {
    //             toast.error("your lifetime donation has been failed. Please try again.");
    //         }
    //     } catch (error: any) {
    //         console.error("Failed to submit contact:", error);
    //         toast.error("your lifetime donation has been failed. Please try again.");
    //     }
    // }
    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.termsAccepted) {
            toast.error("Please accept the terms and conditions.");
            return;
        }
        const paymentData = {
            name: formData.name,
            email: formData.email || "",
            phone: formData.phone,
            amount: Number(formData.amount),
            donationType: "lifetime",
            method: formData.paymentMethod, // include method

        }
        const payload = {
            name: formData.name,
            email: formData.email || "",
            phone: formData.phone,
            amount: Number(formData.amount),
            occupation: formData.profession,
            address: formData.address,
            termsAccepted: false, // Always go as false from user
        };

        try {
            const res: any = await createLifetimeDonor(payload).unwrap();
            console.log("Lifetime Donor Response:", res);
            if (formData.paymentMethod === "bkash") {
                const response = await bkashDonation(payload).unwrap()
                window.location.href = response.data.url
            } else {
                const response = await createPayment(paymentData).unwrap()
                window.location.href = response.data.url
                toast.success("SSLCommerz selected! Redirect to payment gateway.")
            }
        } catch (error: any) {
            console.error("Failed:", error);
            toast.error(error?.message || "Something went wrong!");
        }
    };
    return (
        <div className="min-h-screen bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                    {/* Left Column - Content */}
                    <div className="lg:col-span-2 space-y-6">
                        <h1 className="text-4xl font-bold text-primary mb-4">দান করুন, গড়ুন উত্তম উম্মাহ</h1>
                        <p className="text-xl text-black leading-relaxed">
                            খাইরুল উম্মাহ ফাউন্ডেশন-এর বিভিন্ন সেবামূলক কার্যক্রমকে টেকসই ও বিস্তৃত করার লক্ষ্যে আমরা গঠন করেছি আজীবন দাতা সদস্য প্রোগ্রাম। এই প্রোগ্রামে অংশগ্রহণ করে আপনি হতে পারেন আমাদের এই মহতী যাত্রার স্থায়ী অংশীদার।
                        </p>

                        <div className="bg-gray-100 rounded-lg p-6 border-l-4 border-primary space-y-4">
                            <h2 className="text-lg font-semibold text-gray-800">🎯 আজীবন দাতা সদস্য হওয়ার লক্ষ্য ও উদ্দেশ্য:</h2>
                            <ul className="list-disc list-inside text-md text-gray-700 space-y-1">
                                <li>দীন ও মানবতার খেদমতে নিবেদিত থাকা</li>
                                <li>ফাউন্ডেশনের বিভিন্ন প্রজেক্টে নিয়মিত অবদান রাখা</li>
                                <li>অসহায় মানুষের পাশে দাঁড়ানো</li>
                                <li>দুনিয়া ও আখিরাতে সাদকায়ে জারিয়ার ফায়দা লাভ করা</li>
                            </ul>

                            <h2 className="text-lg font-semibold text-gray-800">🧾 সদস্যপদ গ্রহণের শর্তাবলী:</h2>
                            <ul className="list-disc list-inside text-md text-gray-700 space-y-1">
                                <li>সদস্য ফি: ৳১০,০০০ (এককালীন)</li>
                                <li>নাম, মোবাইল নাম্বার ও ঠিকানা প্রদান করতে হবে</li>
                                <li>ইচ্ছুক সদস্য নিজে কিংবা অন্যের নামে দান করতে পারবেন</li>
                                <li>সদস্যপদ আজীবনের জন্য কার্যকর থাকবে</li>
                            </ul>

                            <h2 className="text-lg font-semibold text-gray-800">🎁 সদস্য হিসেবে যা পাবেন:</h2>
                            <ul className="list-disc list-inside text-md text-gray-700 space-y-1">
                                <li>আজীবন দাতা সদস্য কার্ড</li>
                                <li>বিশেষ দোয়া ও দুআ মাহফিলে অগ্রাধিকার</li>
                                <li>বছরে একবার আমাদের কার্যক্রমের বিস্তারিত রিপোর্ট</li>
                                <li>ফাউন্ডেশনের বিশেষ দোয়ার তালিকায় আপনার নাম সংযুক্ত</li>
                            </ul>

                            <h2 className="text-lg font-semibold text-gray-800">📝 সদস্য হতে চাইলে:</h2>
                            <p className="text-sm text-gray-700">আমাদের অফিসে সরাসরি যোগাযোগ করুন অথবা নিচের ফর্মটি পূরণ করুন।</p>
                        </div>
                    </div>

                    {/* Right Column - Form */}
                    <div className="lg:col-span-1 border p-3 rounded-lg border-border">
                        <form onSubmit={handlePayment} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-primary mb-2">সদস্যপদ প্যাকেজ</label>
                                <div className="bg-primary text-white rounded-lg p-3 text-center font-semibold">আজীবন সদস্য</div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-800 mb-2">
                                    বিনিয়োগের পরিমাণ <span className="text-red-500">*</span>
                                </label>
                                <Input
                                    type="number"
                                    name="amount"
                                    value={formData.amount}
                                    min={10000}
                                    onChange={handleInputChange}
                                    className="border-2 rounded-lg p-2 text-sm border-gray-200"
                                />
                                <p className="text-xs text-gray-500 mt-1">ন্যূনতম 10,000 টাকা, বেশি দিতে পারেন।</p>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-800 mb-2">
                                    নাম <span className="text-red-500">*</span>
                                </label>
                                <Input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="আপনার পূর্ণ নাম"
                                    className={`border-2 rounded-lg p-2 text-sm ${errors.name ? "border-red-500" : "border-gray-200"}`}
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-800 mb-2">
                                    ফোন নম্বর <span className="text-red-500">*</span>
                                </label>
                                <Input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="01XXXXXXXXX"
                                    className={`border-2 rounded-lg p-2 text-sm ${errors.phone ? "border-red-500" : "border-gray-200"}`}
                                />
                                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-800 mb-2">
                                    পেশা <span className="text-red-500">*</span>
                                </label>
                                <Input
                                    type="text"
                                    name="profession"
                                    value={formData.profession}
                                    onChange={handleInputChange}
                                    placeholder="আপনার পেশা"
                                    className={`border-2 rounded-lg p-2 text-sm ${errors.profession ? "border-red-500" : "border-gray-200"}`}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-800 mb-2">
                                    ঠিকানা
                                </label>
                                <Input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    placeholder="আপনার ঠিকানা"
                                    className="border-2 rounded-lg p-2 text-sm border-gray-200"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-800 mb-2">ইমেইল</label>
                                <Input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="your@email.com"
                                    className={`border-2 rounded-lg p-2 text-sm ${errors.email ? "border-red-500" : "border-gray-200"}`}
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>

                            <div>
                                <label className="flex items-start gap-2">
                                    <input
                                        type="checkbox"
                                        name="termsAccepted"
                                        checked={formData.termsAccepted}
                                        onChange={handleInputChange}
                                        className="w-4 h-4 mt-1"
                                    />
                                    <span className="text-xs text-gray-700">আমি সকল শর্তাবলী এবং গোপনীয়তা নীতি স্বীকার করি</span>
                                </label>
                                {errors.terms && <p className="text-red-500 text-xs mt-1">{errors.terms}</p>}
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-primary hover:bg-primary/80 text-white font-semibold py-2 rounded-lg text-sm"
                                onClick={() => setShowModal(true)}
                            >
                                দান করুন →
                            </Button>

                        </form>

                        <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <p className="text-xs text-gray-600 leading-relaxed">
                                আপনার দান সম্পূর্ণভাবে ধর্মীয় কাজে ব্যয় হবে। আমরা সম্পূর্ণ স্বচ্ছতা এবং জবাবদিহিতার সাথে কাজ করি।
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <PayMethohdModal showModal={showModal} handlePayment={handlePayment} paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} setShowModal={setShowModal} />
        </div>
    )
}

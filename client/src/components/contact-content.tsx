"use client"

import type React from "react"
import { useState } from "react"
import { Phone, Mail, MapPin } from "lucide-react"
import {useCreateMessageMutation } from "@/redux/features/contacts/massegeApi";
import toast from "react-hot-toast";

export function ContactContent() {
  const [createMessage, { isLoading }] = useCreateMessageMutation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res: any = await createMessage(formData).unwrap();

      console.log("Contact created:", res);

      toast.success("আপনার বার্তা সফলভাবে পাঠানো হয়েছে!");

      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error: any) {
      console.error("Failed to submit contact:", error);
      toast.error("দুঃখিত! বার্তা পাঠানো যায়নি। আবার চেষ্টা করুন।");
    }
  };

  return (
    <div className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-primary">আমাদের সাথে যোগাযোগ করুন</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">আপনার নাম</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">ইমেইল ঠিকানা</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">বিষয়</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">বার্তা</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition"
              >
                বার্তা পাঠান
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-primary">আমাদের তথ্য</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">ফোন</h3>
                  <p className="text-muted-foreground"> +8801811-448843</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">ইমেইল</h3>
                  <p className="text-muted-foreground"> khairulummahfoundation.com</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">ঠিকানা</h3>
                  <p className="text-muted-foreground"> ময়মনসিংহ, বাংলাদেশ</p>
                </div>
              </div>

              {/* Map */}
              {/* Google Map */}
              <div className="mt-8 rounded-lg overflow-hidden border border-border">
                <iframe
                  title="Khairul Ummah Foundation Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.1234567890!2d90.4234567890!3d24.750123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c1234567890%3A0xabcdef1234567890!2sKhairul%20Ummah%20Foundation!5e0!3m2!1sen!2sbd!4v1699999999999!5m2!1sen!2sbd"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-8 text-primary">প্রায়শ জিজ্ঞাসিত প্রশ্ন</h2>
          <div className="space-y-4">
            {[
              {
                q: "আস-সুন্নাহ ফাউন্ডেশন কি?",
                a: "আস-সুন্নাহ ফাউন্ডেশন একটি দাতব্য সংস্থা যা সমাজের উন্নয়ন এবং মানুষের সেবায় নিয়োজিত।",
              },
              {
                q: "আমরা কিভাবে যোগদান করতে পারি?",
                a: "আপনি আমাদের সাথে যোগাযোগ করে বা আমাদের ওয়েবসাইট থেকে নিবন্ধন করে যোগদান করতে পারেন।",
              },
              {
                q: "আমাদের তহবিল কোথায় ব্যয় করা হয়?",
                a: "আমাদের তহবিল শিক্ষা, স্বাস্থ্য এবং দক্ষতা উন্নয়ন প্রোগ্রামে ব্যয় করা হয়।",
              },
              {
                q: "খাইরুল উম্মাহ ফাউন্ডেশন কি?",
                a: "খাইরুল উম্মাহ ফাউন্ডেশন একটি দাতব্য সংস্থা যা সমাজের উন্নয়ন এবং মানুষের সেবায় নিয়োজিত।",
              },
            ].map((faq, idx) => (
              <div key={idx} className="bg-card p-6 rounded-lg border border-border">
                <h3 className="font-semibold text-primary mb-2">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

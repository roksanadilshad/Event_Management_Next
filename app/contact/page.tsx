"use client";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

export default function ContactPage() {
     const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message);
        setForm({ name: "", email: "", message: "" });
      } else {
        toast.error(data.error || "Failed to send message");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="bg-[#FCF5EE] text-[#850E35] min-h-screen">
         <Toaster position="top-right" />
      {/* Hero / Banner */}
      <section className="bg-[#EE6983] text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Evenify</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Have questions or feedback? We’d love to hear from you. Reach out and our team will respond promptly.
        </p>
      </section>

      {/* Contact Form + Info */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Form */}
         <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
          <form className="bg-white p-8 rounded-xl shadow-lg space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 font-medium mb-1" htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#EE6983]"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1" htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#EE6983]"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1" htmlFor="message">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Your message..."
                rows={5}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#EE6983]"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#EE6983] text-white px-6 py-3 font-semibold rounded-md shadow-md hover:bg-[#FFC4C4] transition"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </motion.div>

        {/* Contact Info + Map */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <h2 className="text-3xl font-bold mb-6">Contact Info</h2>
          <div className="bg-white p-8 rounded-xl shadow-lg space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-1">Email</h3>
              <p className="text-gray-700">support@evenify.com</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Phone</h3>
              <p className="text-gray-700">+880 123-4567891</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Address</h3>
              <p className="text-gray-700">123 Event Street, Cityville, USA</p>
            </div>
          </div>

          {/* Google Map */}
          <div className="rounded-xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019784678711!2d-122.41941508468121!3d37.7749292797591!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064d0f5e0d1%3A0x7e3d02f07f06c6e6!2sCity%20Hall%2C%20San%20Francisco%2C%20CA%2094102!5e0!3m2!1sen!2sus!4v1699384951623!5m2!1sen!2sus"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </motion.div>
      </section>
    </main>
  );
}

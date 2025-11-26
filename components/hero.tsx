"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { FaCalendarAlt, FaUsers, FaChartLine, FaRocket } from "react-icons/fa";
import { useState } from "react";
import UpcomingEvents from "./Upcoming";
import Image from "next/image";

const slides = [
 {
   image: "https://i.pinimg.com/736x/1f/f4/22/1ff422ba4ffed80c1640dfa287500e43.jpg",
   headline: "Manage Your Events Effortlessly",
   subheadline: "Plan, organize, and track all your events in one place.",
 },
 {
   image: "https://i.pinimg.com/736x/92/97/10/9297109aaec9d070268e8bac830d4157.jpg",
   headline: "Track Attendance & Performance",
   subheadline: "Monitor registrations and analyze your event success easily.",
 },
 {
   image: "https://i.pinimg.com/1200x/8f/1a/16/8f1a1635e6ac2c77469d2257e5694d6f.jpg",
   headline: "Boost Engagement & Reach",
   subheadline: "Promote events and connect with participants efficiently.",
 },
];

export default function Hero() {
   const [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
    <div className="bg-[#FCF5EE]">

      {/* Hero Section */}
      <section className="relative bg-[#FCF5EE] text-[#850E35]">
      <div className="max-w-7xl mx-auto px-6 lg:py-32 py-10 flex flex-col md:flex-row md:items-center md:justify-between relative z-10">
        {/* Text Content */}
        <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0 transition-all duration-500">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {slides[activeIndex].headline}
          </h1>
          <p className="text-lg md:text-xl mb-6">
            {slides[activeIndex].subheadline}
          </p>
          <div className="flex justify-center md:justify-start gap-4">
            <Link
              href="/items"
              className="px-6 py-3 bg-[#EE6983] text-[#FCF5EE] font-semibold rounded-md shadow-md hover:text-gray-100 hover:bg-[#FFC4C4] transition"
            >
              Get Started
            </Link>
            <Link
              href="/items"
              className="px-6 py-3 border border-[#FFC4C4] text-[#850E35] rounded-md hover:bg-[#FFC4C4] hover:text-white transition"
            >
              Browse Events
            </Link>
          </div>
          
        </div>

        {/* Banner Slider */}
        <div className="md:w-1/2">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation
            loop
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="rounded-lg shadow-lg overflow-hidden"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <Image
                  src={slide.image}
                  alt={slide.headline}
                   width={800} // adjust to your desired size
                   height={400}
                  className="w-full h-80 md:h-96 object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        
      </div>
      
    </section>

      <section className="lg:py-20 bg-[#FCF5EE]">
              <div className="max-w-7xl mx-auto px-6 text-center">

    <UpcomingEvents  />
              </div>
  </section>
      {/* Features Section */}
      <section className="lg:py-20 py-10 text-[#850E35]">
        <div className="max-w-7xl mx-auto px-6 text-center">

          <h2 className="text-3xl md:text-4xl font-bold mb-12">Why Choose Our App?</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div whileHover={{ scale: 1.05 }} className="bg-[#FCF5EE] p-6 rounded-xl shadow hover:shadow-lg transition">

              <FaCalendarAlt className="text-4xl mb-4 text-[#EE6983] mx-auto" />

              <h3 className="font-semibold text-xl mb-2">Schedule Easily</h3>
              <p className="text-[#850E35] text-sm">Create, track, and manage your event schedules with ease.</p>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} className="bg-[#FCF5EE] p-6 rounded-xl shadow hover:shadow-lg transition">

              <FaUsers className="text-4xl mb-4 text-[#EE6983] mx-auto" />

              <h3 className="font-semibold text-xl mb-2">Engage Participants</h3>
              <p className="text=[#850E35] text-sm">Communicate with attendees and keep them updated on your events.</p>

            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="bg-[#FCF5EE] p-6 rounded-xl shadow hover:shadow-lg transition">

              <FaChartLine className="text-4xl mb-4 text-[#EE6983] mx-auto" />

              <h3 className="font-semibold text-xl mb-2">Track Performance</h3>
              <p className="text=[#850E35] text-sm">Monitor registrations, ticket sales, and overall event performance.</p>

            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="bg-[#FCF5EE] p-6 rounded-xl shadow hover:shadow-lg transition">
              <FaRocket className="text-4xl mb-4 text-[#EE6983] mx-auto" />
              <h3 className="font-semibold text-xl mb-2">Boost Growth</h3>
              <p className="text=[#850E35] text-sm">Promote your events efficiently and reach a wider audience.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/*Testimonials Section */}
      <section className="lg:py-20 py-10 text-[#850E35] bg-[#FCF5EE]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">What Our Users Say</h2>
          <Swiper spaceBetween={10} slidesPerView={1} loop autoplay={{ delay: 1000 }}>
            <SwiperSlide>
              <motion.div whileHover={{ scale: 1.02 }} className="bg-white p-8 rounded-xl shadow-md max-w-xl mx-auto">
                <p className="text-gray-700 mb-4">“This app made organizing my events so easy and fun!”</p>
                <h4 className="font-semibold text-lg">- Alex Johnson</h4>
              </motion.div>
            </SwiperSlide>
            <SwiperSlide>
              <motion.div whileHover={{ scale: 1.02 }} className="bg-white p-8 rounded-xl shadow-md max-w-xl mx-auto">
                <p className="text-gray-700 mb-4">“The dashboard is clean and simple, everything I need in one place.”</p>
                <h4 className="font-semibold text-lg">- Maria Smith</h4>
              </motion.div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>

      {/* Categories / Event Types Section */}
      <section className="lg:py-20 py-10 text-[#850E35] ">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Explore Event Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {["Tech", "Music", "Art", "Business"].map((category) => (
              <motion.div key={category} whileHover={{ scale: 1.05 }} className="bg-[#FCF5EE] p-6 rounded-xl shadow hover:shadow-lg transition">
                <h3 className="font-semibold text-xl mb-2">{category}</h3>
                <p className="text=[#850E35] text-sm">Discover upcoming {category.toLowerCase()} events.</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4️⃣ Call-to-Action Section */}
      <section className="lg:py-20 py-10 bg-[#EE6983] text-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Start Managing Your Events Today</h2>
          <p className="text-lg md:text-xl mb-8">Join thousands of organizers using our platform to simplify event management.</p>
          <Link
            href="/register"
            className="px-8 py-4 bg-white text-[#EE6983] font-semibold rounded-md shadow hover:bg-[#850E35] hover:text-[#FCF5EE] transition"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
    </>
  );
}

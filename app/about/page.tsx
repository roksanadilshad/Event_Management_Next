"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="bg-[#FCF5EE] text-[#850E35] min-h-screen">
      {/* Hero / Banner */}
      <section className="bg-[#EE6983] text-white py-24 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Evenify</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Evenify is your ultimate platform to manage, organize, and track all your events effortlessly. We help organizers and attendees connect seamlessly.
        </p>
      </section>

      {/* Our Story Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 50 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className="text-center md:text-left md:flex md:items-center md:gap-12"
        >
          <div className="md:w-1/2 mb-8 md:mb-0">
            <Image
              src="https://i.pinimg.com/736x/40/6f/9d/406f9dfe137cca05f3830229db822840.jpg"
              alt="Our Story"
               width={800} // adjust to your desired size
               height={400}
              className="rounded-xl shadow-lg "
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-700 leading-relaxed">
              Evenify was founded with the mission to simplify event management for everyone. From small workshops to large conferences, our platform provides organizers with the tools they need to create seamless experiences and engage attendees effectively.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="bg-white py-20 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 50 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Mission</h2>
          <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed text-lg">
            Our mission is to empower organizers with intuitive tools that streamline event planning, improve attendee engagement, and deliver memorable experiences. We aim to make event management simple, transparent, and efficient.
          </p>
        </motion.div>
      </section>

      {/* Team Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Meet the Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { name: "Alex Johnson", role: "Founder & CEO", img: "https://i.pinimg.com/736x/c4/d8/f8/c4d8f8f64e1f00a5ca02253f5ecc27d0.jpg" },
            { name: "Maria Smith", role: "CTO", img: "https://i.pinimg.com/736x/ce/32/2f/ce322ff5e85c6d107fee008193271512.jpg" },
            { name: "John Doe", role: "Lead Developer", img: "https://i.pinimg.com/736x/32/72/fd/3272fdbde5f3f2a613b4bfa3bc3f9135.jpg" },
            { name: "Sarah Lee", role: "Marketing Head", img: "https://i.pinimg.com/1200x/63/f3/a0/63f3a0fe0c318b623d9a431e2817b515.jpg" },
          ].map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="bg-[#FCF5EE] rounded-xl shadow-lg p-6 flex flex-col items-center text-center"
            >
              <Image 
              src={member.img} 
              alt={member.name}  
              width={800} // adjust to your desired size
              height={400} className="rounded-full mb-4 object-cover" />
              <h3 className="font-semibold text-xl mb-1">{member.name}</h3>
              <p className="text-gray-600 text-sm">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-[#EE6983] text-white py-20 px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Core Values</h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { title: "Innovation", desc: "We continuously improve our platform to provide cutting-edge solutions for event management." },
            { title: "Integrity", desc: "We operate with transparency, trust, and accountability in all that we do." },
            { title: "Customer Focus", desc: "Our users are at the heart of everything we build." },
          ].map((value, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="bg-white text-[#850E35] rounded-xl p-6 shadow-lg"
            >
              <h3 className="font-bold text-xl mb-3">{value.title}</h3>
              <p className="text-gray-700">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
      {/* Stats Section */}
<section className="bg-[#FCF5EE] py-20 px-6">
  <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Impact</h2>
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
    {[
      { label: "Events Organized", value: 1200 },
      { label: "Active Users", value: 8500 },
      { label: "Tickets Sold", value: 15000 },
    ].map((stat, idx) => (
      <motion.div
        key={idx}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: idx * 0.2 }}
        className="bg-white rounded-xl p-8 shadow-lg"
      >
        <h3 className="text-4xl font-bold mb-2 text-[#EE6983]">
          {stat.value.toLocaleString()}
        </h3>
        <p className="text-gray-700 text-lg">{stat.label}</p>
      </motion.div>
    ))}
  </div>
</section>

    </main>
  );
}

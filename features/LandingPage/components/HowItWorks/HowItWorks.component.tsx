"use client";

import { motion } from "motion/react";

import { howItWorksSteps } from "../../constants";

export default function HowItWorksComponent() {
  return (
    <section className="py-24 pb-48 bg-gradient-to-b">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            How it works
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Simple 3-step process to discover who doesn't follow you back
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {howItWorksSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full hover:bg-white/10 transition-colors duration-300 group"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="w-8 h-8 text-indigo-400" />
                </div>
                <span className="text-2xl font-bold text-gray-400 group-hover:text-white transition-colors duration-300">
                  {step.step}
                </span>
              </div>

              <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-indigo-300 transition-colors duration-300">
                {step.title}
              </h3>

              <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

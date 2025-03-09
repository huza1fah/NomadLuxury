import { motion } from "framer-motion";

export function LogoSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-b from-[#a0c4ff] to-[#ffffff] relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523467327888-a8a425992901')] bg-cover bg-center opacity-10" />

      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="relative z-10 text-center"
      >
        <img 
          src="/assets/nomad-logo.png"
          alt="Nomad Luxury Travel"
          className="w-64 md:w-96 mx-auto mb-8"
        />
        <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto px-4">
          Curating extraordinary journeys for the discerning traveler
        </p>
      </motion.div>
    </motion.section>
  );
}
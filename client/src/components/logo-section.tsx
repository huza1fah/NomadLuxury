import { motion } from "framer-motion";

export function LogoSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center justify-center min-h-[50vh] bg-[#a0c4ff] relative overflow-hidden pb-8"
    >
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523467327888-a8a425992901')] bg-cover bg-center opacity-10" />

      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="relative z-10 text-center"
      >
        <img 
          src="/assets/nomad-logo-white.png"
          alt="Nomad Luxury Travel"
          className="w-64 md:w-96 mx-auto"
        />
      </motion.div>
    </motion.section>
  );
}
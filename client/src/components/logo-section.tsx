import { motion } from "framer-motion";
import { Plane, Palmtree, Mountain, Building2, Sailboat, MapPin } from "lucide-react";

export function LogoSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center justify-center min-h-[40vh] bg-[#a0c4ff] relative overflow-hidden pb-4"
    >
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523467327888-a8a425992901')] bg-cover bg-center opacity-30" />

      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="relative z-10 text-center"
      >
        <img 
          src="/assets/NOMAD LUXURY TRAVEL (1).png"
          alt="Nomad Luxury Travel"
          className="w-64 md:w-96 mx-auto"
        />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex justify-center gap-4 mt-8 mb-6"
        >
          <Plane className="h-8 w-8 text-[#ffadaf]" />
          <Palmtree className="h-8 w-8 text-[#fed6a5]" />
          <Mountain className="h-8 w-8 text-[#bdb2ff]" />
          <Building2 className="h-8 w-8 text-[#ffc6ff]" />
          <Sailboat className="h-8 w-8 text-[#fdffb6]" />
          <MapPin className="h-8 w-8 text-[#cafec0]" />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
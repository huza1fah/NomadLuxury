import { motion } from "framer-motion";

export function LogoSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-b from-background to-accent/5 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523467327888-a8a425992901')] bg-cover bg-center opacity-10" />
      
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="relative z-10 text-center"
      >
        <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-4">
          Nomad Luxury Travel
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto px-4">
          Curating extraordinary journeys for the discerning traveler
        </p>
      </motion.div>
    </motion.section>
  );
}

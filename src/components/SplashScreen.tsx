import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/syncED.png";

const SplashScreen = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [greeting, setGreeting] = useState("");

  const getGreeting = () => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) return "Good morning";
    if (currentHour < 18) return "Good afternoon";
    return "Good evening";
  };

  useEffect(() => {
    setGreeting(getGreeting());

    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!showSplash) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-900"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo placeholder */}
        <motion.div
          className="w-16 h-16 mb-6 rounded-lg bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.1,
          }}
        >
          <span className="text-white text-lg font-semibold">
            <img src={logo} alt="" />
          </span>
        </motion.div>

        {/* Welcome text */}
        <motion.h1
          className="text-4xl font-bold text-slate-100 mb-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Welcome to Synced
        </motion.h1>

        {/* Greeting text */}
        <motion.p
          className="text-lg text-slate-300"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {greeting}
        </motion.p>

        {/* Loading indicator */}
        <motion.div
          className="mt-8 w-32 h-1 bg-slate-700 rounded-full overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: 128 }}
          transition={{ duration: 3, ease: "linear" }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-slate-500 to-slate-400"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 3, ease: "linear" }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SplashScreen;

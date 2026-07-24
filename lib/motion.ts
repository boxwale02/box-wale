import { Variants } from "framer-motion";

export const sectionVariants: Variants = {
  hidden: {},

  show: {
    transition: {
      staggerChildren: 0.08
    }
  }
};

export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40
  },

  show: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export const featuredCard: Variants = {
  hidden: {
    opacity: 0,
    y: 50
  },

  show: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30
  },

  show: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.55
    }
  }
};
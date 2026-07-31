import Link from "next/link";
 import {CheckCircle2 } from 'lucide-react'
export default function Hero() {
  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      aria-categoryledby="hero-heading"
    >
      {/* Background Video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source
          src="https://res.cloudinary.com/gpto0thu/video/upload/v1785349844/hero-packagingmp4_1ksFWJ7y_ky1dq5.mp4"
          type="video/mp4"
        />
      </video>

      {/* Premium Dark Overlay */}
      <div className="absolute inset-0 bg-black/65" />

      {/* Gold Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-amber-900/20" />

      {/* Decorative Glow */}
      <div className="absolute left-1/2 top-1/2 h-[550px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/10 blur-3xl" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-5x5 flex-col items-center px-6 text-center">
        <h2
          id="hero-heading"
          className="max-w-4x4 text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Handmade {" "}
          <span className="text-amber-400">
            Cardboard  & Premium {" "}
          </span>
          Hamper
        </h2>

        <p className="mt-4 max-w-3xl text-sm sm:text-sm sm:text-base leading-8 text-gray-200 md:text-xl">
          Crafted for Businesses, Brands & Every Special Occasion.
        </p>

        {/* Audience */}
        <div className="mt-10 flex max-w-4x2 flex-wrap justify-center gap-3">
          {[
            "Hampers",
            "Sweet Box",
            "Nikah Nama",
            "Ittar Box",
            "Customize Hampers",
          ].map((item) => (
            <span  key={item} className="flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-gray-100 backdrop-blur-md transition hover:border-amber-400 hover:text-amber-300" ><CheckCircle2 className="h-5 w-5 text-green-600" />
              {item}
            </span>
          ))}
        </div>

        {/* CTA Buttons - Redesigned smaller version */}
        <div className="mt-10 flex flex-row justify-between gap-3.5">
          <Link
            href="/products"
            className="rounded-full bg-amber-400 px-6 py-3 text-sm sm:text-base font-semibold text-black transition-all duration-300 hover:scale-105 hover:bg-amber-300 focus:outline-none focus:ring-3 focus:ring-amber-300"
          >
            Explore Products
          </Link>

          <Link
            href="/contact"
            className="rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm sm:text-base font-semibold text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-amber-400 hover:bg-white/20 focus:outline-none focus:ring-3 focus:ring-white/40"
          >
            Get Free Quote
          </Link>
        </div>

        {/* Trust Section */}
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 h-40 w-full bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}

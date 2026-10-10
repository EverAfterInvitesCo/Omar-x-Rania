import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Shirt, Info, Wind } from 'lucide-react';

export const DressCode: React.FC = () => {
  const colorPalette = [
    { name: 'Champagne Gold', hex: '#C8A85D' },
    { name: 'Midnight Navy', hex: '#1B263B' },
    { name: 'Emerald Velvet', hex: '#1B4D3E' },
    { name: 'Dusty Rose', hex: '#BA7A8C' },
    { name: 'Rich Burgundy', hex: '#581825' },
    { name: 'Classic Charcoal', hex: '#2C2C2C' },
  ];

  return (
    <section className="py-24 px-6 bg-[#FAF7F2] relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#C8A85D_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03]" />

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        {/* Header Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-3 inline-flex items-center gap-2 text-[#C8A85D]"
        >
          <Sparkles className="w-4 h-4" />
          <span className="font-sans text-xs uppercase tracking-[0.3em] font-semibold">
            Wedding Attire
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#2C2C2C] tracking-wide mb-3"
        >
          Dress Code
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-script text-3xl sm:text-4xl text-[#C8A85D] mb-4"
        >
          Formal Evening & Black Tie Optional
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="font-sans text-sm sm:text-base text-[#2C2C2C]/70 max-w-lg mx-auto mb-16"
        >
          We invite our guests to dress in elegant formal attire to celebrate this unforgettable milestone with us.
        </motion.p>

        {/* Two-Column Visual Cards for Gentlemen and Ladies */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 text-left">
          {/* 1. Gentlemen */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="glass-card rounded-3xl p-8 sm:p-10 border border-[#C8A85D]/30 shadow-xl relative overflow-hidden group hover:border-[#C8A85D] transition-colors"
          >
            {/* Top Accent Icon */}
            <div className="flex items-center justify-between mb-6">
              <div className="w-16 h-16 rounded-2xl bg-[#FAF7F2] border border-[#C8A85D]/30 flex items-center justify-center text-[#C8A85D] shadow-sm">
                {/* Custom Tuxedo / Bow Tie Icon */}
                <svg
                  className="w-8 h-8 fill-none stroke-current stroke-[1.5]"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {/* Tuxedo lapels & Bow Tie */}
                  <path d="M4 4l5 6v10h6V10l5-6H4z" />
                  <path d="M9 4l3 4 3-4" />
                  <circle cx="12" cy="7.5" r="1.5" className="fill-current" />
                  <path d="M10 7.5L7 6v3l3-1.5z" />
                  <path d="M14 7.5L17 6v3l-3-1.5z" />
                </svg>
              </div>

              <span className="font-sans text-[11px] uppercase tracking-widest text-[#8A6218] font-bold px-3 py-1 rounded-full bg-[#C8A85D]/15 border border-[#C8A85D]/30">
                Gentlemen
              </span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl text-[#2C2C2C] mb-3">
              Tuxedo or Dark Formal Suit
            </h3>

            <p className="font-sans text-sm text-[#2C2C2C]/75 leading-relaxed mb-6">
              A classic black, charcoal, or midnight navy tuxedo or sharp dark tailored suit. Paired with a formal dress shirt, bow tie or silk necktie, and polished leather shoes.
            </p>

            <ul className="space-y-2.5 font-sans text-xs text-[#2C2C2C]/80">
              <li className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C8A85D]" />
                <span>Black tie or midnight navy tuxedo</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C8A85D]" />
                <span>Crisp white collared evening shirt</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C8A85D]" />
                <span>Silk bow tie, formal tie & dress shoes</span>
              </li>
            </ul>
          </motion.div>

          {/* 2. Ladies */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glass-card rounded-3xl p-8 sm:p-10 border border-[#C8A85D]/30 shadow-xl relative overflow-hidden group hover:border-[#C8A85D] transition-colors"
          >
            {/* Top Accent Icon */}
            <div className="flex items-center justify-between mb-6">
              <div className="w-16 h-16 rounded-2xl bg-[#FAF7F2] border border-[#C8A85D]/30 flex items-center justify-center text-[#C8A85D] shadow-sm">
                {/* Custom Evening Gown Icon */}
                <svg
                  className="w-8 h-8 fill-none stroke-current stroke-[1.5]"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {/* Elegant Evening Gown Silhouette */}
                  <path d="M9 3l3 2 3-2v3l-2 3v12H11V9L9 6V3z" />
                  <path d="M10 11l-3 10h10l-3-10" />
                  <path d="M9 6c1 1 2 1 3 1s2 0 3-1" />
                </svg>
              </div>

              <span className="font-sans text-[11px] uppercase tracking-widest text-[#8A6218] font-bold px-3 py-1 rounded-full bg-[#C8A85D]/15 border border-[#C8A85D]/30">
                Ladies
              </span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl text-[#2C2C2C] mb-3">
              Floor-Length Gown or Formal Dress
            </h3>

            <p className="font-sans text-sm text-[#2C2C2C]/75 leading-relaxed mb-6">
              Floor-length evening gowns or sophisticated formal cocktail silhouettes. Jewel tones, warm earth neutrals, and autumnal evening hues are warmly encouraged.
            </p>

            <ul className="space-y-2.5 font-sans text-xs text-[#2C2C2C]/80">
              <li className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C8A85D]" />
                <span>Floor-length gowns or formal evening midi dresses</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C8A85D]" />
                <span>Jewel tones, pastels, or metallic accents</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C8A85D]" />
                <span>Block heels or dress wedges recommended for terrace</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Color Palette Inspiration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-12"
        >
          <div className="font-sans text-xs uppercase tracking-[0.25em] text-[#C8A85D] font-bold mb-4">
            Suggested Color Palette
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {colorPalette.map((item) => (
              <div key={item.name} className="flex flex-col items-center group">
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white shadow-md transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: item.hex }}
                />
                <span className="font-sans text-[11px] text-[#2C2C2C]/70 mt-2 font-medium">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Notes & Reminders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto text-left"
        >
          {/* Note 1: White Reserved */}
          <div className="p-5 rounded-2xl bg-white border border-[#C8A85D]/25 shadow-sm flex items-start gap-3.5">
            <div className="p-2 rounded-xl bg-[#FAF7F2] text-[#C8A85D] shrink-0 mt-0.5">
              <Info className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-serif text-base text-[#2C2C2C] font-semibold mb-1">
                Reserved for the Bride
              </h4>
              <p className="font-sans text-xs text-[#2C2C2C]/70 leading-relaxed">
                We kindly request that guests graciously refrain from wearing shades of white, ivory, or cream.
              </p>
            </div>
          </div>

          {/* Note 2: Terrace Breeze */}
          <div className="p-5 rounded-2xl bg-white border border-[#C8A85D]/25 shadow-sm flex items-start gap-3.5">
            <div className="p-2 rounded-xl bg-[#FAF7F2] text-[#C8A85D] shrink-0 mt-0.5">
              <Wind className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-serif text-base text-[#2C2C2C] font-semibold mb-1">
                Terrace & Autumn Weather
              </h4>
              <p className="font-sans text-xs text-[#2C2C2C]/70 leading-relaxed">
                The sunset ceremony is held outdoors on the terrace. A light shawl or jacket is recommended for the late evening Cairo breeze.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

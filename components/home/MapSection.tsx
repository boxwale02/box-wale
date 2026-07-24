// components/home/MapSection.tsx
'use client';

import React from 'react';

interface MapSectionProps {
  title?: string;
  address?: string;
}

const MapSection: React.FC<MapSectionProps> = ({
  title = "Find Us Here",
  address = "Box Wale"
}) => {
  return (
    <section className="py-12 bg-white">
      <div className="flex justify-center">
        <div className="w-[90vw] h-[80vh] overflow-hidden rounded-2xl">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3576.97786118407!2d73.021532!3d26.294817699999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39418d970a9ec10d%3A0xa8cac26a0291f589!2sBox%20Wale!5e0!3m2!1sen!2sin!4v1784063061823!5m2!1sen!2sin"
            className="w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            title="Google Maps - Box Wale Location"
            aria-label="Google Maps showing Box Wale location"
          />
        </div>
      </div>
    </section>
  );
};

export default MapSection;
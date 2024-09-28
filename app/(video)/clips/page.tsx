'use client';

import React, { useEffect, useState } from 'react';
import Clips from "@/components/video/clips";

export default function GeneratePage() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Generate content */}
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="pb-12 text-center">
            <h1
                className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text pb-5 font-nacelle text-4xl font-semibold text-transparent md:text-5xl"
                data-aos="fade-up"
            >
              Генерация виральных клипов
            </h1>
          </div>
        </div>
        <Clips />
      </div>
    </section>
  );
}

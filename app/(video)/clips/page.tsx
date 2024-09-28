'use client';

import React, { useEffect, useState } from 'react';
import Clips from "@/components/video/clips";

export default function GeneratePage() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Generate content */}
        <div className="py-12 md:py-20"></div>
        <Clips />
      </div>
    </section>
  );
}

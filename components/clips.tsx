import React, { useEffect, useState } from 'react';
import CustomVideoPlayer from "@/components/custom-video-player";
import VideoThumb from "@/public/images/hero-image-01.jpg";

export default function Clips() {
  const [clips, setClips] = useState<string[]>([]);

  useEffect(() => {
    console.log('useEffect called'); // Лог для проверки вызова useEffect

    const fetchClips = async () => {
      console.log('fetchClips function called'); // Лог для проверки вызова функции

      const storedVideoId = sessionStorage.getItem('videoId');
      const storedClipsNum = sessionStorage.getItem('clipsNum');
      if (storedVideoId && storedClipsNum) {
        console.log(`videoId: ${storedVideoId}`);
        console.log(`clipsNum: ${storedClipsNum}`);
        
        const clipsNum = parseInt(storedClipsNum, 10);
        const fetchedClips: string[] = [];
        for (let i = 1; i <= clipsNum; i++) {
          const response = await fetch(`http://localhost:8000/api/part?videoId=${storedVideoId}&clipsNum=${i}`);
          const videoBlob = await response.blob();
          const videoUrl = URL.createObjectURL(videoBlob);
          fetchedClips.push(videoUrl);
        }
        setClips(fetchedClips);
        console.log(`Number of fetched clips: ${fetchedClips.length}`);
      } else {
        console.log('VideoId or ClipsNum not found in sessionStorage');
      }
    };

    fetchClips();
  }, []);

  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="pb-12 md:pb-20">
          {/* Section header */}
          <div className="mx-auto max-w-3xl pb-12 text-center md:pb-20">
            <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-gradient-to-r before:from-transparent before:to-indigo-200/50 after:h-px after:w-8 after:bg-gradient-to-l after:from-transparent after:to-indigo-200/50">
              <span className="inline-flex bg-gradient-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent">
                Tailored Workflows
              </span>
            </div>
            <h2 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              Map your product journey
            </h2>
            <p className="text-lg text-indigo-200/65">
              Simple and elegant interface to start collaborating with your team
              in minutes. It seamlessly integrates with your code and your
              favorite programming languages.
            </p>
          </div>
          {/* Video grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {clips.map((clip, index) => (
              <CustomVideoPlayer
                key={index}
                videoSrc={clip}
                videoWidth={1920}
                videoHeight={1080}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
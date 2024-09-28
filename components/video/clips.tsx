import React, { useEffect, useState } from 'react';
import VideoPlayer from "@/components/video/video-player";

export default function Clips() {
  const [clips, setClips] = useState<string[]>([]);
  const [videoId, setVideoId] = useState<string | null>(null);

  useEffect(() => {
    console.log('useEffect called'); // Лог для проверки вызова useEffect

    const fetchClips = async () => {
      console.log('fetchClips function called'); // Лог для проверки вызова функции

      const storedVideoId = sessionStorage.getItem('videoId');
      const storedClipsNum = sessionStorage.getItem('clipsNum');
      if (storedVideoId && storedClipsNum) {
        console.log(`videoId: ${storedVideoId}`);
        console.log(`clipsNum: ${storedClipsNum}`);
        
        setVideoId(storedVideoId); // Устанавливаем videoId

        const clipsNum = parseInt(storedClipsNum, 10);
        const fetchedClips: string[] = [];
        for (let i = 1; i <= clipsNum; i++) {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/part?videoId=${storedVideoId}&clipsNum=${i}`);
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
            <div
                className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-gradient-to-r before:from-transparent before:to-indigo-200/50 after:h-px after:w-8 after:bg-gradient-to-l after:from-transparent after:to-indigo-200/50">
              <span
                  className="inline-flex bg-gradient-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent">
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
            {/* Buttons */}
            <div className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center">
              <div data-aos="fade-up" data-aos-delay={400}>
                <a
                    className="btn group mb-4 w-full bg-gradient-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_theme(colors.white/.16)] hover:bg-[length:100%_150%] sm:mb-0 sm:w-auto"
                    href={`${process.env.NEXT_PUBLIC_EDITOR_URL}/editor?videoId=${videoId}&clipsNum=${clips.length}`}
                    target="_blank" // Открываем в новой вкладке
                    rel="noopener noreferrer" // Безопасность
                >
                  <span className="relative inline-flex items-center">
                    Редактировать клипы
                    <span
                        className="ml-1 tracking-normal text-white/50 transition-transform group-hover:translate-x-0.5">
                      -&gt;
                    </span>
                  </span>
              </a>
              </div>
              <div data-aos="fade-up" data-aos-delay={600}>
                <a
                    className="btn relative w-full bg-gradient-to-b from-gray-800 to-gray-800/60 bg-[length:100%_100%] bg-[bottom] text-gray-300 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,theme(colors.gray.800),theme(colors.gray.700),theme(colors.gray.800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-[length:100%_150%] sm:ml-4 sm:w-auto"
                    href="#0"
                >
                  Скачать
                </a>
              </div>
            </div>
          </div>
          {/* Video grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {clips.map((clip, index) => (
                <VideoPlayer
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
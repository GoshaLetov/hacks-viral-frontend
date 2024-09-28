export const metadata = {
  title: "Home - Tsukizard",
  description: "Page description",
};

import PageIllustration from "@/components/page-illustration";
import WelcomeHome from "@/components/welcome-home";


export default function Home() {
  return (
    <>
      <PageIllustration />
      <WelcomeHome />
    </>
  );
}

import WelcomeComp from "@/components/welcomeComp";
import ClickSpark from "@/components/ClickSpark";
import PixelBlast from "@/components/PixelBlast";
import UrlTester from "@/components/UrlTester";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* PixelBlast Background */}
      <div className="fixed inset-0 z-0 bg-[#060010]">
        <PixelBlast
          variant="circle"
          pixelSize={7}
          color="#22c55e"
          patternScale={3}
          patternDensity={0.6}
          enableRipples={true}
          rippleIntensityScale={1.2}
          rippleThickness={0.2}
          rippleSpeed={0.6}
          edgeFade={0.1}
          speed={0.8}
          transparent={true}
          pixelSizeJitter={0.3}
        />
      </div>
      
      {/* Content Layer */}
      <div className="relative z-10">
        <ClickSpark>
          <WelcomeComp />
        </ClickSpark>
      </div>
      
      {/* Debug Tools */}
      <UrlTester />
    </main>
  );
}

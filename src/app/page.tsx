import WelcomeComp from "@/components/welcomeComp";
import ClickSpark from "@/components/ClickSpark";

export default function Home() {
  return (
    <main>
      <ClickSpark>
        <WelcomeComp />
      </ClickSpark>
    </main>
  );
}

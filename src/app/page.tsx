import Hero from "@/components/Hero";
import MethodSection from "@/components/MethodSection";
import GlossarySection from "@/components/GlossarySection";
import BonusSection from "@/components/BonusSection";
import AudienceSection from "@/components/AudienceSection";
import NextStepSection from "@/components/NextStepSection";
import AuthorSection from "@/components/AuthorSection";
import FAQ from "@/components/FAQ";
import SocialProofSection from "@/components/SocialProofSection";
import OfferSection from "@/components/OfferSection";
import SectionNavigator from "@/components/SectionNavigator";
import ScrollProgress from "@/components/ScrollProgress";
import StickyCTA from "@/components/StickyCTA";

export default function Page() {
  return (
    <>
      <div className="noise-overlay" aria-hidden="true" />
      <ScrollProgress />
      <SectionNavigator />
      <main id="conteudo-principal">
        <Hero />
        <GlossarySection />
        <MethodSection />
        <BonusSection />
        <AudienceSection />
        <NextStepSection />
        <AuthorSection />
        <FAQ />
        <SocialProofSection />
        <OfferSection />
      </main>
      <StickyCTA />
    </>
  );
}

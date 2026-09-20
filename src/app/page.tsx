import Hero from "@/components/Hero";
import DiagnosisSection from "@/components/DiagnosisSection";
import MethodSection from "@/components/MethodSection";
import GlossarySection from "@/components/GlossarySection";
import BonusSection from "@/components/BonusSection";
import AudienceSection from "@/components/AudienceSection";
import AuthorSection from "@/components/AuthorSection";
import FAQ from "@/components/FAQ";
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
        <DiagnosisSection />
        <MethodSection />
        <GlossarySection />
        <BonusSection />
        <AudienceSection />
        <AuthorSection />
        <FAQ />
        <OfferSection />
      </main>
      <StickyCTA />
    </>
  );
}

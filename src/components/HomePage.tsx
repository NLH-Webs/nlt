import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { CoreValuesSection } from './sections/CoreValuesSection';
import { MemberJourneySection } from './sections/MemberJourneySection';
import { RegistrationFormSection } from './sections/RegistrationFormSection';
import { ExploreCommunitiesSection } from './sections/ExploreCommunitiesSection';
import { useState } from 'react';

export const HomePage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleNavigate = (target: string) => {
    const sectionElement = document.getElementById(target);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <HeroSection />
      <AboutSection />
      <CoreValuesSection />
      <MemberJourneySection />
      <RegistrationFormSection />
      <ExploreCommunitiesSection onNavigate={handleNavigate} />
      <section className="nlh-lead" id="lien-he">
        <nlh-contact site="nlt" lang="vi" topics="Tham gia NhiLe Team / tình nguyện|Hợp tác dự án|Tài trợ – đồng hành|Truyền thông – báo chí" />
      </section>
    </div>
  );
};
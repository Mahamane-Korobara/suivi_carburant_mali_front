
import  {
  WelcomeSection,
  WelcomeTitle,
  WelcomeSubtitle,
  SectionTitle,
} from "@/components/Styles_pages/StyleCommun";
"use client";

import React from "react";

export default function PageHeader({ title, subtitle, sectionTitle }) {
  return (
    <>
      <WelcomeSection>
        <WelcomeTitle>{title}</WelcomeTitle>
        <WelcomeSubtitle>{subtitle}</WelcomeSubtitle>
      </WelcomeSection>

      {sectionTitle && <SectionTitle>{sectionTitle}</SectionTitle>}
    </>
  );
}

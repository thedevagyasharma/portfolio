export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Devagya Sharma",
    "url": "https://devagyasharma.com",
    "jobTitle": "UX Engineer & Product Designer",
    "description": "UX Engineer with 3 years of experience crafting scalable, accessible web and mobile experiences. Specializing in design systems, product design, and user-centered digital solutions.",
    "sameAs": [
      "https://github.com/thedevagyasharma",
      "https://linkedin.com/in/devagyasharma",
      "https://x.com/n0tdevs"
    ],
    "knowsAbout": [
      "UX Design",
      "UI Design",
      "Design Systems",
      "Frontend Development",
      "Product Design",
      "User Experience",
      "Web Development",
      "Accessibility"
    ],
    "alumniOf": {
      "@type": "Organization",
      "name": "University of Michigan - Ann Arbor"
    },
    // "worksFor": {
    //   "@type": "Organization",
    //   "name": "Your Company Name"
    // }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

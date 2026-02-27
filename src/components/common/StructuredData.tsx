// Structured data for SEO optimization

const StructuredData = () => {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Suresh Suthar",
    "alternateName": ["sksuthar", "suresh-suthar"],
    "jobTitle": "Full Stack Developer",
    "description": "Skilled Full Stack Developer specializing in MERN stack, Next.js, and modern web technologies. Building fast, scalable, and innovative web applications.",
    "url": "https://www.sureshsuthar.in/",
    "image": "https://www.sureshsuthar.in/og-image.png",
    "sameAs": [
      "https://github.com/suthar-suresh",
      "https://www.linkedin.com/in/suresh-suthar-9838b2255/",
      "https://www.instagram.com/suresh_suthar_73/",
      "https://t.me/sureshksuthar"
    ],
    "email": "sureshksuthar002@gmail.com",
    "knowsAbout": [
      "Full Stack Development",
      "React.js",
      "Next.js",
      "Node.js",
      "MongoDB",
      "PostgreSQL",
      "TypeScript",
      "JavaScript",
      "AWS",
      "Docker",
      "DevOps",
      "Web Development",
      "Backend Development",
      "Database Management"
    ],
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Full Stack Developer",
      "occupationLocation": {
        "@type": "Place",
        "name": "India"
      },
      "skills": [
        "React.js",
        "Next.js",
        "Node.js",
        "MongoDB",
        "PostgreSQL",
        "TypeScript",
        "JavaScript",
        "AWS",
        "Docker"
      ]
    },
    "worksFor": {
      "@type": "Organization",
      "name": "Sparkle Infotech",
      "url": "https://sparkleinfotech.com"
    },
    "alumniOf": {
      "@type": "Organization",
      "name": "Toshal Infotech"
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Suresh Suthar - Full Stack Developer",
    "url": "https://www.sureshsuthar.in/",
    "description": "Portfolio website of Suresh Suthar, a skilled Full Stack Developer specializing in modern web technologies and building scalable applications.",
    "author": {
      "@type": "Person",
      "name": "Suresh Suthar"
    },
    "inLanguage": "en-US",
    "copyrightYear": new Date().getFullYear(),
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.sureshsuthar.in/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Suresh Suthar - Full Stack Development Services",
    "description": "Professional full stack development services including web development, backend development, DevOps, database management, and product strategy.",
    "url": "https://www.sureshsuthar.in/",
    "provider": {
      "@type": "Person",
      "name": "Suresh Suthar",
      "email": "sureshksuthar002@gmail.com"
    },
    "serviceType": [
      "Web Development",
      "Backend Development", 
      "DevOps",
      "Database Management",
      "Product Strategy"
    ],
    "areaServed": {
      "@type": "Country",
      "name": "India"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Development Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Web Development",
            "description": "Custom web application development using React.js, Next.js, and modern frameworks"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Backend Development",
            "description": "Scalable backend infrastructure development using Node.js, Express.js, and cloud technologies"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "DevOps",
            "description": "CI/CD pipeline implementation, cloud infrastructure management, and containerization"
          }
        }
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(professionalServiceSchema),
        }}
      />
    </>
  );
};

export default StructuredData;

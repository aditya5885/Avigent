import { company, services } from "@/lib/site";

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Escape "<" so content can never break out of the script tag
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/** LocalBusiness schema — only verified company details. */
export function LocalBusinessJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": ["LocalBusiness", "Electrician"],
        "@id": `${company.url}/#organization`,
        name: company.name,
        url: company.url,
        image: `${company.url}/images/hero-energy.jpg`,
        logo: `${company.url}/icon.svg`,
        description:
          "AVIGENT Technologies provides electrical maintenance, electrical safety audits, engineering consultancy, engineering services and renewable energy EPC from Kakkanad, Kochi.",
        telephone: "+91-9620094100",
        email: company.email,
        foundingDate: String(company.foundedYear),
        founder: { "@type": "Person", name: company.founder },
        address: {
          "@type": "PostalAddress",
          streetAddress: `${company.address.line1}, ${company.address.line2}`,
          addressLocality: "Kakkanad, Kochi",
          addressRegion: company.address.region,
          postalCode: company.address.postalCode,
          addressCountry: company.address.country,
        },
        areaServed: { "@type": "State", name: "Kerala" },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Electrical & Renewable Energy Services",
          itemListElement: services.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s.title, url: `${company.url}/services/${s.slug}` },
          })),
        },
      }}
    />
  );
}

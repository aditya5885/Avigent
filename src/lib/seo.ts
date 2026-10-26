import type { Metadata } from "next";
import { company } from "@/lib/site";

const DEFAULT_IMAGE = "/images/hero-energy.jpg";

/** Per-page metadata with canonical URL + Open Graph + Twitter. */
export function pageMetadata({
  title,
  description,
  path,
  image = DEFAULT_IMAGE,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  absoluteTitle?: boolean;
}): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${company.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: company.name,
      url: path,
      title: fullTitle,
      description,
      images: [{ url: image, width: 1376, height: 768, alt: `${company.name} — electrical & renewable energy solutions` }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}

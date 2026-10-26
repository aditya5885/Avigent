import { ServiceDetail } from "@/components/services/ServiceBlocks";
import { getService } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

const service = getService("engineering-services");

export const metadata = pageMetadata({
  title: service.seoTitle,
  description: service.seoDescription,
  path: "/services/engineering-services",
  image: service.image,
});

export default function Page() {
  return <ServiceDetail service={service} />;
}

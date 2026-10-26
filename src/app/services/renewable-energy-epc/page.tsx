import { ServiceDetail } from "@/components/services/ServiceBlocks";
import { getService } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

const service = getService("renewable-energy-epc");

export const metadata = pageMetadata({
  title: service.seoTitle,
  description: service.seoDescription,
  path: "/services/renewable-energy-epc",
  image: service.image,
});

export default function Page() {
  return <ServiceDetail service={service} />;
}

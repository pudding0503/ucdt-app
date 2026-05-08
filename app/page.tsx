import { DownloadPage } from "@/components/download-page";
import { getProductsWithGitHubReleases } from "@/lib/github-releases";

export const revalidate = 3600;

export default async function Home() {
  const products = await getProductsWithGitHubReleases();

  return <DownloadPage products={products} />;
}

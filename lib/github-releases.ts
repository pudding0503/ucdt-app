import { products, type Product } from "@/data/products";

export const githubReleaseSyncRevalidateSeconds = 3600;

type GitHubLatestRelease = {
  tag_name?: string;
  html_url?: string;
  body?: string | null;
};

export type ProductReleaseOverride = {
  version?: string;
  releaseUrl?: string;
  releaseMarkdown?: string;
  windowsDownloadHref?: string;
};

export type ReleaseOverridesByProductId = Record<string, ProductReleaseOverride>;

function isReleasedGitHubProduct(product: Product) {
  return product.status === "released" && Boolean(product.repoUrl);
}

function extractGitHubRepo(repoUrl: string) {
  try {
    const url = new URL(repoUrl);

    if (url.hostname !== "github.com") {
      return null;
    }

    const [owner, repo] = url.pathname.replace(/^\/+|\/+$/g, "").split("/");

    if (!owner || !repo) {
      return null;
    }

    return { owner, repo };
  } catch {
    return null;
  }
}

async function fetchLatestGitHubRelease(owner: string, repo: string) {
  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/releases/latest`, {
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      next: { revalidate: githubReleaseSyncRevalidateSeconds },
    });

    if (!response.ok) {
      return null;
    }

    const release = await response.json() as GitHubLatestRelease;

    if (!release.tag_name || !release.html_url) {
      return null;
    }

    return release;
  } catch {
    return null;
  }
}

function buildProductReleaseOverride(product: Product, release: GitHubLatestRelease): ProductReleaseOverride {
  return {
    version: release.tag_name ?? product.version,
    releaseUrl: release.html_url ?? product.releaseUrl,
    releaseMarkdown: release.body?.trim() ? release.body : product.releaseMarkdown,
    windowsDownloadHref: release.html_url ?? product.releaseUrl,
  };
}

export async function getGitHubReleaseOverrides(): Promise<ReleaseOverridesByProductId> {
  const releasedProducts = products.filter(isReleasedGitHubProduct);
  const overrideEntries = await Promise.all(
    releasedProducts.map(async (product) => {
      if (!product.repoUrl) {
        return null;
      }

      const repo = extractGitHubRepo(product.repoUrl);

      if (!repo) {
        return null;
      }

      const release = await fetchLatestGitHubRelease(repo.owner, repo.repo);

      if (!release) {
        return null;
      }

      return [product.id, buildProductReleaseOverride(product, release)] as const;
    }),
  );

  return Object.fromEntries(
    overrideEntries.filter((entry): entry is readonly [string, ProductReleaseOverride] => Boolean(entry)),
  );
}

export async function getProductsWithGitHubReleases(): Promise<Product[]> {
  const overrides = await getGitHubReleaseOverrides();

  return products.map((product) => {
    const override = overrides[product.id];

    if (!override) {
      return product;
    }

    return {
      ...product,
      version: override.version ?? product.version,
      releaseUrl: override.releaseUrl ?? product.releaseUrl,
      releaseMarkdown: override.releaseMarkdown ?? product.releaseMarkdown,
      downloads: product.downloads.map((download) => {
        if (download.platform !== "Windows") {
          return download;
        }

        return {
          ...download,
          href: override.windowsDownloadHref ?? download.href,
        };
      }),
    };
  });
}

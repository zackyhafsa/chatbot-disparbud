export const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
};

// Cari foto di Wikimedia Commons berdasarkan query (tanpa API key)
async function searchCommonsImages(query: string, limit = 6) {
  const url = new URL("https://commons.wikimedia.org/w/api.php");
  url.search = new URLSearchParams({
    action: "query",
    format: "json",
    origin: "*",
    generator: "search",
    gsrsearch: query,
    gsrlimit: String(limit),
    gsrnamespace: "6", // File namespace
    prop: "imageinfo|info",
    iiprop: "url|extmetadata",
    iiurlwidth: "1600",
    inprop: "url",
    uselang: "id",
  }).toString();

  const res = await fetch(url.toString(), { next: { revalidate: 60 * 60 * 24 } }); // cache 1 hari
  if (!res.ok) return [];
  const data = await res.json();

  const pages = Object.values<any>(data?.query?.pages || {});
  return pages
    .map((p: any) => {
      const ii = p?.imageinfo?.[0];
      return ii
        ? {
            src: ii.thumburl || ii.url,
            title: p.title as string,
            pageUrl: p.fullurl as string,
            author: ii.extmetadata?.Artist?.value?.replace(/<[^>]+>/g, "") || "",
            license: ii.extmetadata?.LicenseShortName?.value || "",
          }
        : null;
    })
    .filter(Boolean) as {
    src: string;
    title: string;
    pageUrl: string;
    author: string;
    license: string;
  }[];
}

// Cari gambar untuk item tertentu dengan beberapa fallback query
export async function getImagesForItem(itemNama: string) {
  const queries = [`${itemNama} Majalengka`, `${itemNama} Jawa Barat`, itemNama];

  const results: any[] = [];
  for (const q of queries) {
    const chunk = await searchCommonsImages(q, 6);
    for (const img of chunk) {
      if (!results.find((r) => r.src === img.src)) results.push(img);
    }
    if (results.length >= 6) break;
  }
  return results;
}

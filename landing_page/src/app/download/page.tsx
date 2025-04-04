import React from "react";
import DownloadPageClient from "./client";

const DownloadPage = async () => {
  const res = await fetch(
    "https://api.github.com/repos/kpi-tuke/nakladovy-controlling/releases"
  );

  const data = (await res.json()) ?? [];

  const metadata = data.map((item: any) => ({
    tag: item.tag_name,
    windowsUrl: item.assets.find((asset: any) =>
      (asset.name as string).endsWith(".exe")
    )?.browser_download_url,
    linuxUrl: item.assets.find((asset: any) =>
      (asset.name as string).endsWith(".AppImage")
    )?.browser_download_url,
  }));

  return <DownloadPageClient metadata={metadata} />;
};

export default DownloadPage;

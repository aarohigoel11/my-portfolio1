import { readFile } from "node:fs/promises";
import { join } from "node:path";
import PortfolioClient from "./portfolio-client";

export default async function Home() {
  const markup = await readFile(
    join(process.cwd(), "app", "portfolio-content.html"),
    "utf8",
  );

  return <PortfolioClient markup={markup} />;
}

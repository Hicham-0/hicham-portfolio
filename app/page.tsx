import { Preloader } from "@/components/portfolio/preloader";
import { Enquiries } from "@/components/portfolio/enquiries";
import { Foreword } from "@/components/portfolio/foreword";
import { Hero } from "@/components/portfolio/hero";
import { Inventory } from "@/components/portfolio/inventory";
import { LotsIndex } from "@/components/portfolio/lots-index";
import { Provenance } from "@/components/portfolio/provenance";
import { SiteHeader } from "@/components/portfolio/site-header";
import { SkyPassage } from "@/components/portfolio/sky-passage";

export default function Page() {
  return (
    <>
      <Preloader />
      <SiteHeader />
      <main>
        <Hero />
        <Foreword />
        <LotsIndex />
        <SkyPassage />
        <Inventory />
        <Provenance />
        <Enquiries />
      </main>
    </>
  );
}

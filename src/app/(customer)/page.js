import Banner from "@/Components/Customer/Banner";
import BannerText from "@/Components/Customer/BannerText";

export default function home() {
  return (
    <div className="relative">
  <Banner />

  {/* Dark gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />

  {/* Banner text */}
  <div className="absolute inset-0 z-10 flex items-center">
    <div className="ml-10 max-w-xl">
      <BannerText />
    </div>
  </div>
</div>
  );
}

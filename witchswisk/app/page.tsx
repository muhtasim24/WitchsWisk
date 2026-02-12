import Card from "@/components/card";
import ProductGrid from "@/components/productGrid";
import { getProducts } from "@/lib/getProducts";
import Image from "next/image";

export default async function Home() {
  const products = await getProducts();
  const firstThree = products.slice(0,3);
  return (
    <div>
      <div className="bg-brand mt-5">
        <h1><strong>Events</strong></h1>
        <p>Come see us at this festival Woohoo</p>
        <p>June 6-8 2025</p>
        <p> @ </p>
        <p> Tangar Outlets Deer Park</p>
      </div>

      <div className="flex gap-3 justify-center">
        <ProductGrid products={firstThree} />
      </div>

      <div className="flex justify-center">
        <div className="bg-brand mt-5 w-md">
          <div className="flex flex-row">
            <h1><strong>About Me</strong></h1>
            <p>IG LINK</p>
          </div>
          <p>WORLDS GREATEST BAKER</p>
        </div>
      </div>
    </div>
  );
}

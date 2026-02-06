import Card from "@/components/card";
import { getProducts } from "@/lib/getProducts";
import Image from "next/image";

export default async function Home() {
  const products = await getProducts();
  return (
    <div>
      <div className="bg-purple-700 mt-5">
        <h1><strong>Events</strong></h1>
        <p>Come see us at this festival Woohoo</p>
        <p>June 6-8 2025</p>
        <p> @ </p>
        <p> Tangar Outlets Deer Park</p>
      </div>

      <div className="flex justify-center">
        <div className="bg-purple-700 mt-5 w-md">
          <div className="flex flex-row">
            <h1><strong>About Me</strong></h1>
            <p>IG LINK</p>
          </div>
          <p>Hi my na=me is Mia, WORLDS GREATEST BAKER</p>
        </div>
      </div>

      <div className="flex gap-3 justify-center">
        {products.map( (product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

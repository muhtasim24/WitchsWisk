import Card from "@/components/product/card";
import ProductGrid from "@/components/product/productGrid";
import { getProducts } from "@/lib/getProducts";
import Image from "next/image";
import { Mail, User, Phone } from "lucide-react";
import CustomForm from "@/components/customForm";
import Link from "next/link";

export default async function Home() {
  const products = await getProducts();
  const firstThree = products.slice(0,3);

  return (
    <div className="flex flex-col items-center">
      <div className="mt-5 flex flex-col items-center">
        <h1 className="text-4xl"><strong>WELCOME TO A WITCHS WHISK</strong></h1>
        <h2 className="text-2xl font-bold">Sweets so good, they're practically magic!</h2>
        <h3>Check us out in person at conventions in the NYC, NJ, PA Area!</h3>
      </div>

      <div className="flex mt-4 mb-4 flex-col items-center">
        <h1 className="text-lg w-full flex justify-center rounded-lg font-semibold bg-white text-brand">FEATURED COOKIES</h1>
        <ProductGrid products={firstThree} />
        <Link href={"/cookies"} className="text-lg px-6 py-2 rounded-lg font-semibold transition-all active:scale-95 bg-white text-brand hover:text-bg-brand">SHOP ALL COOKIES</Link>
      </div>


      {/* ABOUT ME SECTION*/}
      <div className="flex justify-center">
        <div className="bg-brand w-1/2 rounded-xl p-6 flex gap-10 items-center mt-6">

            {/* Left Side */}
            <div className="flex-shrink-0">
                <h1>IMG HERE</h1>
            </div>

            {/* Right Side */}
            <div className="flex-1">

                {/* Header */}
                <div className="flex justify-between items-center mb-4">

                    <h1 className="text-2xl font-bold">
                        About Me
                    </h1>

                    <div className="flex gap-4">
                        <a href="https://www.instagram.com/a_witchs_whisk/" target="_blank"><User/></a>
                        <a href="#"><Mail/></a>
                    </div>

                </div>
                {/* Bio */}
                <p className="text-lg leading-relaxed">
                    Hello! My name is Mia. I bake stuff. I AM THEE WORLDS GREATEST BAKER.
                </p>
              </div>
          </div>
      </div>

    {/* <div className="flex justify-center w-full mt-6 mb-10">
      <div className="bg-brand w-1/3 flex justify-center items-center rounded-xl">
          <CustomForm />
      </div>
    </div> */}





    </div>
  );
}

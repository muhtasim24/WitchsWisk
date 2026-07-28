import Card from "@/components/product/card";
import ProductGrid from "@/components/product/productGrid";
import { getProducts } from "@/lib/getProducts";
import Image from "next/image";
import { Mail, User, Phone } from "lucide-react";
import CustomForm from "@/components/customForm";

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
                        <a href="#"><Phone/></a>
                    </div>

                </div>
                {/* Bio */}
                <p className="text-lg leading-relaxed">
                    Hello! My name is Mia. I bake stuff. I AM THEE WORLDS GREATEST BAKER. I TALK MY SHIT HERE FK IS U TAHM BOUT
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

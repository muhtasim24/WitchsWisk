import Card from "@/components/product/card";
import ProductGrid from "@/components/product/productGrid";
import { getProducts } from "@/lib/getProducts";
import Image from "next/image";
import { FaInstagram } from "react-icons/fa";
import { Mail, User, Phone } from "lucide-react";
import CustomForm from "@/components/customForm";
import Link from "next/link";

export default async function Home() {
  const products = await getProducts();
  const firstThree = products.slice(0,3);

  return (
    <div className="flex flex-col items-center px-4 sm:px-6">

    {/* BANNER SECTION*/}
      <div className="mt-8 sm:mt-12 flex flex-col lg:flex-row items-center lg:items-center justify-center gap-4 lg:gap-10 max-w-2xl lg:max-w-4xl text-center lg:text-left">
        <Image
          src="/witchCookie.webp"
          alt="witch"
          width={160}
          height={160}
          className="shrink-0"
        />

        <div className="flex flex-col items-center lg:items-start gap-2">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-dancing font-bold">
            A Witch's Whisk
          </h1>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-dancing text-white/90">
            "Sweets so good, they're practically magic!"
          </h2>

          <div className="flex flex-col items-center lg:items-start gap-1 mt-2">

            <a
              href="https://www.instagram.com/a_witchs_whisk/"
              target="_blank"
              className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
            >
              <FaInstagram size={18} />
              <span>@a_witchs_whisk</span>
            </a>

            <a
              href="mailto:awitchswhisk@gmail.com"
              className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
            >
              <Mail size={18} />
              <span>awitchswhisk@gmail.com</span>
            </a>
          </div>
        </div>
  </div>

      {/* FEATURED SECTION*/}
      <div className="flex mt-10 mb-4 flex-col items-center w-full">
        <h1 className="text-lg font-semibold bg-white text-brand px-6 py-2 rounded-full mb-4">
          PERSONAL FAVORITES
        </h1>
        <ProductGrid products={firstThree} />
        <Link href={"/cookies"} className="mt-6 text-lg px-6 py-2 rounded-lg font-semibold transition-all active:scale-95 bg-white text-brand hover:opacity-90 hover:scale-105">SHOP ALL COOKIES</Link>
      </div>


      {/* ABOUT ME SECTION*/}
      <div className="flex justify-center w-full mt-4">
        <div className="bg-brand w-full max-w-2xl rounded-xl p-6 flex flex-col sm:flex-row gap-6 sm:gap-10 items-center">

            {/* Left Side */}
            <div className="shrink-0">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-white/20 flex items-center justify-center text-white/70 text-sm">
                <h1>IMG HERE</h1>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex-1 text-center sm:text-left">

                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-4">

                    <h1 className="text-2xl font-bold font-dancing uppercase">
                        About Me
                    </h1>

                    <div className="flex gap-4">
                        <a href="https://www.instagram.com/a_witchs_whisk/" target="_blank"><FaInstagram size={25}/></a>
                        <a href="mailto:awitchswhisk@gmail.com"><Mail size={25}/></a>
                    </div>

                </div>
                {/* Bio */}
                <p className="text-base sm:text-lg leading-relaxed">
                    Hello! My name is Mia. I bake stuff. I AM THEE WORLDS GREATEST BAKER.
                </p>
              </div>
          </div>
      </div>

    <div className="flex justify-center w-full mt-10 mb-10">
      <div className="bg-brand w-full rounded-xl max-w-2xl">
          <CustomForm />
      </div>
    </div>





    </div>
  );
}

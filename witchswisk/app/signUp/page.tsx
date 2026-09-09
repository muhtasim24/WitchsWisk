import UserForm from "@/components/userForm";
import Image from "next/image";


export default function SignUp() {


    return (
        <div className="flex flex-col items-center">
            
            <div className="flex flex-col items-center mt-4 gap-4">
                <Image 
                    src="/logo.webp"
                    alt="Witch Whisk Logo"
                    width = {150}
                    height = {150}
                />
                <h1 className="text-xl mb-4 font-dancing font-extrabold text-center lg:text-4xl">"SWEETS SO GOOD, THEY'RE PRACTICALLY MAGIC"</h1>
            </div>

            <div className="bg-brand p-4 rounded-xl">
                <UserForm/>
            </div>
        </div>
    )
}
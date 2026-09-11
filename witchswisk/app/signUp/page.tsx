import UserForm from "@/components/userForm";
import Image from "next/image";


export default function SignUp() {


    return (
        <div className="lg:flex lg:min-h-[calc(100vh-4rem)]">
            
            <div className="flex flex-col items-center justify-center gap-4 px-4 py-8 lg:flex-1 lg:py-0">
                <Image 
                    src="/logo.webp"
                    alt="Witch Whisk Logo"
                    width = {400}
                    height = {400}
                    className="w-40 sm:w-56 lg:w-80 h-auto"
                />
                <h1 className="text-xl font-dancing font-extrabold text-center lg:text-4xl max-w-md">"SWEETS SO GOOD, THEY'RE PRACTICALLY MAGIC"</h1>
            </div>
            
            <div className="flex items-center justify-center bg-brand p-4 mx-auto max-w-sm rounded-xl lg:mx-0 lg:max-w-none lg:w-1/4 lg:rounded-none lg:p-8">
                <div className="w-full max-w-sm">
                    <UserForm/>
                </div>
            </div>
        </div>
    )
}
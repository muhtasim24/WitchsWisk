import UserForm from "@/components/userForm";


export default function SignUp() {


    return (
        <div className="min-h-screen flex">
            
            <div className="flex-1">
                <h1>LOGO HERE</h1>
            </div>

            <div className="w-1/4 bg-brand flex flex-col items-center justify-center">
            <h1 className="text-lg font-bold flex items-center justify-center">WELCOME TO A WITCH'S WHISK</h1>
                <UserForm/>
            </div>
        </div>
    )
}
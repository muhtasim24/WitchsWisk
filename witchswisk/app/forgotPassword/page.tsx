'use client';

export default function ForgotPassword() {
   
    <div className="flex flex-col gap-6">
        <h1 className="text-lg font-bold flex items-center justify-center">LOGIN TO YOUR ACCOUNT</h1>
        {/* <form onSubmit={handleSignIn}>
        <label>Email:</label>
        <input className={`w-full bg-purple-400 rounded-md h-8 text-black border px-2 ${errors.email ? "border-red-500" : "border-black"}`} type="email" value={userEmail} onChange={ (e) => setUserEmail(e.target.value)}></input> */}
        <input type="email">HEllo</input>
        <button type="submit" className="px-6 py-2 rounded-lg font-semibold transition-all active:scale-95 bg-white text-brand">Log In</button>
        {/* </form> */}
    </div>
}
import {Link} from "react-router-dom"

export default function Register() {
    return  <div className="w-full h-screen flex items-center justify-center">
    <div className="-mt-24 w-72 px-4 py-4 max-w-sm">
        <div className="border border-red-100 px-4 py-4 rounded-md bg-red-50">
            <p className="text-sm text-red-500">user already exists</p>    
        </div>     
        <form>
        <div className="mt-4">
                <label className="sr-only" htmlFor="name">Name</label>
                <input className="w-full border border-gray-400 rounded-md px-4 py-2 text-gray-800 outline-none focus:ring-2 focus:ring-blue-600" type="text" name="name" placeholder="name" />
            </div>
            <div className="mt-4">
                <label className="sr-only" htmlFor="email">Email</label>
                <input className="w-full border border-gray-400 rounded-md px-4 py-2 text-gray-800 outline-none focus:ring-2 focus:ring-blue-600" type="email" name="email" placeholder="email" />
            </div>
            <div className="mt-4">
                <label className="sr-only" htmlFor="username">Username</label>
                <input className="w-full border border-gray-400 rounded-md px-4 py-2 text-gray-800 outline-none focus:ring-2 focus:ring-blue-600" type="text" name="username" placeholder="username" />
            </div>
            <div className="mt-4">
                <label className="sr-only" htmlFor="password">Password</label>
                <input className="w-full border border-gray-400 rounded-md px-4 py-2 text-gray-800 outline-none focus:ring-2 focus:ring-blue-600" type="password" name="password" placeholder="password" />
            </div>
            <button className="mt-4 w-full border border-transparent rounded-md px-4 py-2 text-white font-semibold leading-tight text-sm bg-blue-600 outline-none hover:bg-blue-500 focus:ring-2 focus:ring-blue-600">Register</button>
        </form>

        <div className="mt-2">
            <p className="text-sm text-gray-600">Already have an account?  <Link to="/login"><strong>Login</strong></Link> </p>
        </div>
    </div>
</div>
}
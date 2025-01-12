export default function Home() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
            <div className="p-8 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg max-w-md w-full">
                <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text">
                    Welcome to Our Magical Space
                </h1>

                <form className="space-y-4">
                    <div className="space-y-2">
                        <label
                            htmlFor="name"
                            className="block text-purple-700 font-medium"
                        >
                            What's your name?
                        </label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Enter your magical name..."
                            className="w-full px-4 py-2 rounded-lg border border-pink-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-300 focus:outline-none transition-all placeholder:text-pink-300"
                        />
                    </div>
                    <a href="/api/auth/login">
                        <button className="w-full py-2 px-4 bg-gradient-to-r from-pink-400 to-purple-500 text-white rounded-lg hover:opacity-90 transition-opacity font-medium shadow-md hover:shadow-lg">
                            Begin the Journey ✨
                        </button>
                    </a>
                </form>
            </div>
        </div>
    );
}

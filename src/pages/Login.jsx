import React from 'react';

const Login = () => {
  return (
    <div className="max-w-md mx-auto min-h-screen bg-white flex flex-col justify-center items-center px-6">

      {/* Logo */}
      <img src="/icon.png" alt="Woodland Ways Logo" className="w-32 h-auto mb-6" />

      {/* App Name */}
      <h1 className="text-2xl font-bold text-orange-600 mb-1">Woodland Ways</h1>
      <p className="text-sm text-gray-500 mb-8">Staff Portal</p>

      {/* Login Form */}
      <form className="w-full space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none"
        />
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded-full text-sm font-medium hover:bg-orange-600 transition"
        >
          Log In
        </button>
      </form>

      {/* Optional Footer */}
      <p className="text-xs text-gray-400 mt-6">Having trouble? Contact your supervisor.</p>
    </div>
  );
};

export default Login;

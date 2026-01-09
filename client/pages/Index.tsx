import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 sm:px-6 py-8">
      <div className="w-full max-w-sm sm:max-w-md mx-auto flex flex-col items-center text-center space-y-4 sm:space-y-6">
        {/* Logo */}
        <div className="space-y-1 sm:space-y-2">
          <h1 className="font-inknut font-semibold text-4xl sm:text-5xl lg:text-6xl text-letzo-red drop-shadow-lg">
            Letzzo
          </h1>
          <p className="font-istok text-sm sm:text-base lg:text-lg text-black">
            Find your kind of people anywhere
          </p>
        </div>

        {/* Character Illustration */}
        <div className="w-72 sm:w-80 lg:w-96 h-80 sm:h-96 lg:h-[28rem] my-6 sm:my-8 flex items-center justify-center">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2Ffb7ff9279a904877a95359181d759227%2F0eb06fde05514cc6a07de40a2c4296d4"
            alt="Letzo character sitting cross-legged with phone"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Legal Text */}
        <p className="font-inclusive text-xs sm:text-sm text-black leading-tight max-w-64 sm:max-w-72 lg:max-w-80 px-2">
          By tapping Sign in or Create account, you agree to our Terms of
          Service. Learn how we process your data in our Privacy Policy and
          Cookies Policy.
        </p>

        {/* Create Account Button */}
        <Link
          to="/signup"
          className="w-56 sm:w-60 lg:w-64 bg-letzo-red text-white font-inknut font-semibold text-sm lg:text-base py-3 sm:py-4 px-6 sm:px-8 rounded-full shadow-lg hover:bg-red-600 transition-colors inline-flex items-center justify-center"
        >
          Create Account
        </Link>

        {/* Sign In Link */}
        <Link
          to="/signin"
          className="font-inknut font-semibold text-sm lg:text-base text-black hover:text-letzo-red transition-colors mt-2 sm:mt-4"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}

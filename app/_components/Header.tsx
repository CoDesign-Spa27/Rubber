import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";
import Logo from "./Logo";
import { motion } from "framer-motion";
import "../_styles/styles.css"
const Header = () => {
  const headerVariant = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };
  return (
    <motion.div
      variants={headerVariant}
      initial="hidden"
      animate="visible"
      className="max-w-6xl mx-auto w-full my-2 rounded-full bg-white/5 backdrop-blur-sm "
    >
      <header className="bg-transparent">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="md:flex md:items-center md:gap-12">
              <a className="block text-teal-600" href="#">
                <Logo />
              </a>
            </div>

            <div className="flex items-center gap-4">
              <div className="sm:flex gap-4 hidden">
                <LoginLink>
                  <button className="login">
                    Login
                  </button>
                </LoginLink>

                <div className="hidden sm:flex">
                  <RegisterLink>
                   <button className="register">Register</button>
                  </RegisterLink>
                </div>
              </div>

              <div className="block sm:hidden">
                <button className="rounded p-2 text-white transition hover:text-yellow-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </motion.div>
  );
};

export default Header;

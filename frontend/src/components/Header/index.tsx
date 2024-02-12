import { FC } from "react";
import Logo from "../Logo/Logo";

const LayoutHeader: FC = () => {
  return (
    <>
      <header>
        <nav className="bg-white border-gray-200 py-2.5 dark:bg-gray-900 py-2.5">
          <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
              <Logo />
          </div>
        </nav>
      </header>
    </>
  );
};

export default LayoutHeader;

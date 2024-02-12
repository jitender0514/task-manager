import { FC } from "react";
import LOGO_SVG from '../../assets/images/logos/logo.svg'

const LayoutFooter: FC = () => {
  return (
    <>
      <footer className="footer items-center p-4 bg-neutral text-neutral-content">
        <aside className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
        <img src={LOGO_SVG} alt="" />
          <p>Copyright © 2024 - All right reserved</p>
        </aside>
      </footer>
    </>
  );
};

export default LayoutFooter;

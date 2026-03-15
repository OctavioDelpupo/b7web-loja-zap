import { ToggleTheme } from "@/components/theme/toggle-button";
import { Logo } from "@/components/logo";
import { CartSidebar } from "@/components/cart/sidebar";

export const Header = () => {
  return (
    <div className="flex justify-between items-center my-5 mx-3 ">
      <div className="flex items-center gap-3">
        <Logo />
        <ToggleTheme />
      </div>
      <div className="flex items-center gap-3">
        <CartSidebar />
      </div>
    </div>
  );
};

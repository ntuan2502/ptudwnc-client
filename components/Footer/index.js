import { memo } from "react";
function Footer() {
  return (
    <footer className="p-4 footer bg-base-300 text-base-content footer-center">
      <div>
        <p>Copyright © 2021 - All right reserved by NAT</p>
      </div>
    </footer>
  );
}

export default memo(Footer);

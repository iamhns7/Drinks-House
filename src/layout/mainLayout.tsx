// src/layouts/MainLayout.tsx

import type { LayoutProps } from "../interfaces/LayoutPropsInterface";



export default function MainLayout({ children, backgroundImage }: LayoutProps) {
  return (
    <div
      className="main-layout"
      style={
        backgroundImage
          ? { backgroundImage: `url(${backgroundImage})` }
          : undefined
      }
    >
      <div className="main-layout-content">{children}</div>
    </div>
  );
}

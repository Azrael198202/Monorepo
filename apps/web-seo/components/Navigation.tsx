// apps/web-seo/components/Navigation.tsx
"use client";

import Link from "next/link";
import React from "react";

export default function Navigation() {
  return (
    <section
      className="framer-13z6h2p"
      data-framer-layout-hint-center-x="true"
      data-framer-name="Navigation"
    >
      {/* Desktop */}
      <div className="ssr-variant hidden-4rqgi hidden-jdn3fb">
        <div
          className="framer-y8o7ap-container"
          data-framer-appear-id="y8o7ap"
          style={{ opacity: 1, transform: "translateY(-80px)" }}
        >
          <nav
            className="framer-RK0PF framer-1t8rwe4 framer-v-1t8rwe4"
            data-framer-name="Desktop Light"
            style={{ width: "100%" }}
          >
            {/* Brand / Logo */}
            <Link
              className="framer-1lc2b43 framer-118bnz5"
              data-framer-name="Brand"
              href="/"
              data-framer-page-link-current="true"
              style={{ opacity: 1 }}
            >
              <div className="framer-1xom0ny-container">
                <div
                  className="framer-UMHUZ framer-b3x0a7 framer-v-b3x0a7"
                  data-framer-name="Light"
                >
                  <div
                    className="framer-18tiu0g"
                    data-framer-name="Logo"
                    style={{ position: "relative", borderRadius: "inherit" }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        borderRadius: "inherit",
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                      }}
                      data-framer-background-image-wrapper="true"
                    >
                      <img
                        decoding="async"
                        width={1280}
                        height={376}
                        sizes="(min-width: 1200px) max(150px, 258px), (min-width: 810px) and (max-width: 1199.98px) max(150px, 258px), (max-width: 809.98px) max(150px, 108px)"
                        srcSet="
                          /images/logo-main.png 512w,
                          /images/logo-main.png 1024w,
                          /images/logo-main.png 1280w
                        "
                        src="/images/logo-main.png"
                        alt="禅旅プラットフォーム"
                        style={{
                          display: "block",
                          width: "100%",
                          height: "100%",
                          borderRadius: "inherit",
                          objectPosition: "left center",
                          objectFit: "cover",
                        }}
                        data-framer-original-sizes="150px"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            {/* 右侧三条线菜单 Icon（桌面版其实可以隐藏，只当装饰，用 CSS 控制） */}
            <div className="framer-xr6c7d" data-framer-name="Menu">
              <div className="framer-1vgyfso-container">
                <div
                  className="framer-2P8sj framer-1ft6nj3 framer-v-1ft6nj3"
                  data-framer-name="Desktop Light"
                  data-highlight="true"
                  tabIndex={0}
                >
                  {/* 三条线：Line1 */}
                  <div
                    className="framer-1ie2pnd"
                    data-framer-name="Line"
                    style={{ transform: "none" }}
                  >
                    <div
                      data-framer-component-type="SVG"
                      data-parentsize="0"
                      data-_constraints="[object Object]"
                      data-rotation={0}
                      className="framer-1k4fgb5"
                      aria-hidden="true"
                      style={{
                        imageRendering: "pixelated",
                        flexShrink: 0,
                      }}
                    >
                      <div
                        className="svgContainer"
                        style={{
                          width: "100%",
                          height: "100%",
                          aspectRatio: "inherit",
                        }}
                      >
                        <svg
                          style={{
                            width: "100%",
                            height: "100%",
                            overflow: "visible",
                          }}
                        >
                          <use href="#svg-882702865_297" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Line2 */}
                  <div
                    className="framer-3orbd2"
                    data-framer-name="Line"
                    style={{ transform: "none" }}
                  >
                    <div
                      data-framer-component-type="SVG"
                      data-parentsize="0"
                      data-_constraints="[object Object]"
                      data-rotation={0}
                      className="framer-1iu524j"
                      aria-hidden="true"
                      style={{
                        imageRendering: "pixelated",
                        flexShrink: 0,
                      }}
                    >
                      <div
                        className="svgContainer"
                        style={{
                          width: "100%",
                          height: "100%",
                          aspectRatio: "inherit",
                        }}
                      >
                        <svg
                          style={{
                            width: "100%",
                            height: "100%",
                            overflow: "visible",
                          }}
                        >
                          <use href="#svg-882702865_297" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Line3 */}
                  <div
                    className="framer-30sfav"
                    data-framer-name="Line"
                    style={{ opacity: 1 }}
                  >
                    <div
                      data-framer-component-type="SVG"
                      data-parentsize="0"
                      data-_constraints="[object Object]"
                      data-rotation={0}
                      className="framer-y83hku"
                      aria-hidden="true"
                      style={{
                        imageRendering: "pixelated",
                        flexShrink: 0,
                      }}
                    >
                      <div
                        className="svgContainer"
                        style={{
                          width: "100%",
                          height: "100%",
                          aspectRatio: "inherit",
                        }}
                      >
                        <svg
                          style={{
                            width: "100%",
                            height: "100%",
                            overflow: "visible",
                          }}
                        >
                          <use href="#svg-882702865_297" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/* Tablet / Mobile 的 nav 结构可以同样再写两个分支，复用上面的菜单 icon */}
      {/* 这里就不全部展开了，方法相同：class => className，style="" => style={{}}，tabindex => tabIndex */}
    </section>
  );
}

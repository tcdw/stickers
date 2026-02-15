import React, { useState, useEffect, useRef } from "react";
import { SITE_MENU } from "../consts";
import { cn } from "../utils/cn";
import "./Navigation.css";

// 移动端菜单 a11y ID
const mobileMenuId = "koi-mobile-menu-list";

// 高度基准数值 (rem)
const mobileNavBaseHeight = 4.5;
const mobileMenuBaseHeight = 1.5;
const mobileMenuItemHeight = 3.5;

interface Props {
  avatar?: React.ReactNode;
}

export default function Navigation({ avatar }: Props) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileNavHeight, setMobileNavHeight] = useState(mobileNavBaseHeight);

  const [menuStep, setMenuStep] = useState(1);
  const [menuStepMiddle, setMenuStepMiddle] = useState(1);
  const [menuItemHidden, setMenuItemHidden] = useState(true);

  const menuTimer = useRef<any>(null);
  const menuItemTimer = useRef<any>(null);

  // 为什么要这么麻烦的计算导航栏的高度呢？
  // 因为如果不手动指定高度，浏览器不知道你要过渡到什么高度，就会导致 transition 失效
  useEffect(() => {
    if (mobileMenuOpen) {
      setMobileNavHeight(mobileNavBaseHeight + mobileMenuBaseHeight + mobileMenuItemHeight * SITE_MENU.length);
    } else {
      setMobileNavHeight(mobileNavBaseHeight);
    }
  }, [mobileMenuOpen]);

  // useEffect(() => {
  //   function handleScroll() {
  //     const navBackground = document.getElementById("navBackground");
  //     const navScrollNotice = document.getElementById("navScrollNotice");

  //     if (navBackground && window.scrollY > navBackground.getBoundingClientRect().height * (1 / 1.618)) {
  //       setIsScrolled(true);
  //     } else {
  //       setIsScrolled(false);
  //     }

  //     if (navScrollNotice) {
  //       if (window.scrollY > 64) {
  //         navScrollNotice.classList.add("opacity-0");
  //       } else {
  //         navScrollNotice.classList.remove("opacity-0");
  //       }
  //     }
  //   }

  //   if (typeof window !== "undefined") {
  //     window.addEventListener("scroll", handleScroll);
  //     handleScroll();
  //   }

  //   return () => {
  //     if (typeof window !== "undefined") {
  //       window.removeEventListener("scroll", handleScroll);
  //     }
  //   };
  // }, []);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      clearTimeout(menuTimer.current);
      clearTimeout(menuItemTimer.current);
    };
  }, []);

  function handleMobileMenuToggle(to?: boolean) {
    const nextState = to === undefined ? !mobileMenuOpen : to;
    setMobileMenuOpen(nextState);

    clearTimeout(menuTimer.current);
    clearTimeout(menuItemTimer.current);
    setMenuStep(2);

    // 如果菜单已经打开，执行开启动画，反之执行关闭动画
    if (nextState) {
      setMenuStepMiddle(1);
      menuTimer.current = setTimeout(() => {
        setMenuStep(3);
        setMenuStepMiddle(2);
      }, 200);
      setMenuItemHidden(false);
    } else {
      setMenuStepMiddle(2);
      menuTimer.current = setTimeout(() => {
        setMenuStep(1);
        setMenuStepMiddle(1);
      }, 200);
      menuItemTimer.current = setTimeout(() => {
        setMenuItemHidden(true);
      }, 400);
    }
  }

  return (
    <nav className="fixed w-full top-0 z-40">
      <div
        id="navBar"
        className={cn(
          "absolute -translate-x-2/4 left-2/4 h-(--navBar-height) md:h-[inherit] backdrop-blur-xl bg-white/80 shadow-xl [transition:top_150ms,height_400ms_cubic-bezier(.47,1.64,.41,.8)] overflow-clip",
          isScrolled
            ? "w-full top-0 shadow-[rgba(0,0,0,0.15)]"
            : "rounded-[2.25rem] top-4 w-[calc(100dvw-2rem)] md:w-max",
        )}
        style={
          {
            "--navBar-height": `${mobileNavHeight}rem`,
          } as React.CSSProperties
        }
      >
        <div className="flex justify-between md:justify-center items-center gap-1 ps-3 pe-3 py-3 h-18 md:h-16">
          {/* <a href="./" className="block flex-none" title="首页">
            {avatar}
          </a> */}
          <ul className="hidden md:contents">
            {SITE_MENU.map(e => {
              const isPlaceholder = e.href === "#";
              return (
                <li className="contents" key={e.title}>
                  <a
                    className={cn(
                      "text-base leading-6 flex items-center justify-center rounded-full px-4 h-10 transition-colors duration-150 flex-none",
                      isPlaceholder
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-950 hover:text-amber-400 hover:bg-gray-950",
                    )}
                    href={e.href}
                    target={e.target}
                    onClick={event => {
                      if (isPlaceholder) {
                        event.preventDefault();
                        alert("敬请期待");
                      }
                    }}
                  >
                    {e.title}
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="flex flex-none w-full justify-end md:hidden">
            <button
              onClick={() => handleMobileMenuToggle()}
              aria-label="打开菜单"
              aria-controls={mobileMenuId}
              aria-expanded={mobileMenuOpen}
              className="w-12 h-12 flex items-center justify-center rounded-full md:-ms-3 transition-colors bg-white/0 active:bg-white/10"
            >
              <span className="block relative w-5 h-5" aria-hidden="true">
                <span
                  className={`duration-200 block w-5 h-[0.225rem] bg-black rounded-full burger-bar-1 burger-bar-1--s${menuStep} absolute left-1/2`}
                ></span>
                <span
                  className={`duration-200 block w-5 h-[0.225rem] bg-black rounded-full burger-bar-2 burger-bar-2--s${menuStepMiddle} absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`}
                ></span>
                <span
                  className={`duration-200 block w-5 h-[0.225rem] bg-black rounded-full burger-bar-3 burger-bar-3--s${menuStep} absolute left-1/2`}
                ></span>
              </span>
            </button>
          </div>
        </div>
        <div className={`flex flex-col items-center md:hidden ${menuItemHidden ? "hidden" : ""}`} id={mobileMenuId}>
          <hr
            className={`w-[calc(100%-1.5rem)] transition-colors duration-400 ${
              mobileMenuOpen ? "border-black/10" : "border-transparent"
            }`}
          />
          <ul className="w-full p-3">
            {SITE_MENU.map(e => {
              const isPlaceholder = e.href === "#";
              return (
                <li className="contents" key={e.title}>
                  <a
                    onClick={event => {
                      if (isPlaceholder) {
                        event.preventDefault();
                        alert("敬请期待");
                      } else {
                        handleMobileMenuToggle(false);
                      }
                    }}
                    className={cn(
                      "text-xl leading-6 h-14 flex items-center justify-center transition-colors duration-200 flex-none",
                      isPlaceholder ? "text-black/40 cursor-not-allowed" : "text-black hover:text-accent-600",
                    )}
                    href={e.href}
                    target={e.target}
                  >
                    {e.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}

import Image from "next/image";
import Link from "next/link";
import Logo from "~/public/img/logo/blue-logo.svg";
import footerBg from "~/public/img/footer-bg.png";

export default function Footer() {
  const footerNavs = [
    {
      label: "Products",
      items: [
        {
          href: "/",
          name: "Marketplace",
        },
        {
          href: "/",
          name: "Vendor Signin",
        },
        {
          href: "",
          name: "Plan event",
        },
      ],
    },
    {
      label: "Socials",
      items: [
        {
          href: "/",
          name: "Instagram",
        },
        {
          href: "/",
          name: "Twitter (X)",
        },
        {
          href: "/",
          name: "Facebook",
        },
        {
          href: "/",
          name: "Youtube",
        },
      ],
    },
    {
      label: "Support",
      items: [
        {
          href: "/",
          name: "Help centre",
        },
        {
          href: "/",
          name: "Contact",
        },
      ],
    },
  ];
  const bottomNav = [
    {
      href: "/",
      name: "Terms of Service",
    },
    {
      href: "/",
      name: "Privacy Policy",
    },
    {
      href: "/",
      name: "Privacy",
    },
    {
      href: "/",
      name: "Sitemap",
    },
  ];
  return (
    <footer
      style={{
        backgroundImage: `url(${footerBg.src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="py-5 mt-[5rem] mx-auto w-full px-4"
    >
      <div className="mx-auto w-full max-w-screen-lg justify-between gap-6 py-5 align-top md:flex flex flex-col">
        <div className="md:flex gap-6 align-top">
        <div className="">
          <div className="max-w-[270px]">
            <Image
              src={Logo}
              alt={"Eventgizmo Logo"}
              height={100}
              width={100}
              className="w-[270px]"
            />
          </div>
        </div>

        <div className=" grid grid-cols-2 md:grid-cols-3 pt-5 md:pt-0 gap-3 w-full align-top place-items-start">
          {footerNavs.map((item, idx) => (
            <ul className="flex flex-col justify-end w-full" key={idx}>
              <h4 className="satoshi text-base font-normal text-[#98A2B3]">
                {item.label}
              </h4>
              {item.items.map((el, idx) => (
                <li key={idx} className="py-2">
                  <Link
                    href={el.href}
                    className="satoshi text-base font-medium text-[#667185]"
                  >
                    {el.name}
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </div>
        </div>
        <div className="mt-10 items-center justify-between border-t py-10 sm:flex">
          <ul className="mt-6 flex flex-wrap items-center gap-4 sm:mt-0 sm:text-sm">
            {bottomNav.map((item, idx) => (
              <li key={idx} className="font-medium text-[#667185] duration-150 hover:text-gray-400">
                <Link href={item.href}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-sm pt-5 sm:pt-0 font-normal text-[#667185]">
            © 2024 EventGizmo. All rights reserved.
          </p>
        </div>
      </div>

    </footer>
  );
}

import { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Avatar,
} from "@nextui-org/react";
import { logOff } from "./logOff";
import { useNavigate } from "react-router";

export default function NavBar() {
  const menuItems = ["Dashboard", "digest"];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Navbar
      className="bg-background"
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      shouldHideOnScroll
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <p className="font-bold text-inherit">
            <a href={"/"}>Nuclei</a>
          </p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <p className="font-bold text-inherit">
            <a href={"/"}>Nuclei</a>
          </p>
        </NavbarBrand>
        <NavbarItem isActive>
          <Link style={{ color: "#F7B750" }} href="/">
            gallery
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link style={{ color: "#F7B750" }} href="/upload">
            Upload
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent as="div" justify="end">
        <NavbarItem>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            color="secondary"
            onClick={() => {
              navigate("/profile");
            }}
            size="sm"
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          />
        </NavbarItem>
        <NavbarItem>
          <Button
            variant="bordered"
            color="danger"
            onClick={() => {
              logOff();
            }}
          >
            Log Off
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              style={{ color: "#F7B750" }}
              href={index === 1 ? "/transactions" : "/accounts"}
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

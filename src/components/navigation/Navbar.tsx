"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Mail, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const services = [
  {
    title: "Tours",
    href: "/tours",
    description: "Luxury tours and safari experiences",
  },
  {
    title: "Cab Booking",
    href: "/cab-booking",
    description: "Premium cab services across Rwanda",
  },
  {
    title: "Car Rental",
    href: "/car-rental",
    description: "Self-drive and chauffeur options",
  },
  {
    title: "Air Travel Assistance",
    href: "/air-travel-assistance",
    description: "Visa, pickup, and hotel support",
  },
  {
    title: "Upcoming Events",
    href: "/upcoming-events",
    description: "Group tours and cultural events",
  },
];

const resources = [
  {
    title: "Blog",
    href: "/blog",
    description: "Travel tips and stories",
  },
  {
    title: "Gallery",
    href: "/gallery",
    description: "Stunning photos from our tours",
  },
  {
    title: "FAQ",
    href: "/faq",
    description: "Common questions answered",
  },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-border shadow-sm">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container-elegant">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+250 788 123 456</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@elegantrwanda.com</span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <span>Mon - Fri: 8:00 AM - 6:00 PM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-white border-b border-border">
        <div className="container-elegant">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-0">
              <div className="leading-tight">
                <span className="text-2xl font-display block font-semibold text-primary">
                  Elegant Travel & Tours
                </span>
                <span className="text-xl font-display block font-semibold text-black">ET&E</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link href="/" passHref>
                      <NavigationMenuLink
                        className={cn(
                          "group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                          isActive("/") && "bg-accent text-accent-foreground"
                        )}
                      >
                        Home
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger
                      className={cn(
                        "group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                        pathname.startsWith("/tours") || 
                        pathname.startsWith("/cab-booking") || 
                        pathname.startsWith("/car-rental") || 
                        pathname.startsWith("/air-travel-assistance") || 
                        pathname.startsWith("/upcoming-events") && "bg-accent text-accent-foreground"
                      )}
                    >
                      Services
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[600px] grid-cols-2 gap-3 p-4">
                        {services.map((service) => (
                          <li key={service.title}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={service.href}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <div className="text-sm font-medium leading-none">
                                  {service.title}
                                </div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  {service.description}
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger
                      className={cn(
                        "group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                        pathname.startsWith("/blog") || 
                        pathname.startsWith("/gallery") || 
                        pathname.startsWith("/faq") && "bg-accent text-accent-foreground"
                      )}
                    >
                      Resources
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] grid-cols-1 gap-3 p-4">
                        {resources.map((resource) => (
                          <li key={resource.title}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={resource.href}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <div className="text-sm font-medium leading-none">
                                  {resource.title}
                                </div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  {resource.description}
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <Link href="/about" passHref>
                      <NavigationMenuLink
                        className={cn(
                          "group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                          isActive("/about") && "bg-accent text-accent-foreground"
                        )}
                      >
                        About Us
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <Link href="/contact" passHref>
                      <NavigationMenuLink
                        className={cn(
                          "group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                          isActive("/contact") && "bg-accent text-accent-foreground"
                        )}
                      >
                        Contact
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Right Side Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              <button className="border-2 border-primary text-primary rounded-full px-4 py-2 hover:bg-primary hover:text-white">
                <Link href="/contact" className="rounded-full px-4 py-2">Request Quote</Link>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-border">
          <div className="container-elegant py-4">
            <div className="space-y-4">
              {/* Mobile Navigation Links */}
              <div className="space-y-2">
                <Link
                  href="/"
                  className={cn(
                    "block px-4 py-2 rounded-lg transition-colors",
                    isActive("/")
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>

                {/* Services Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-between px-4 py-2 h-auto"
                    >
                      Services
                      <span className="ml-2">
                        <ChevronDown className="h-4 w-4" />
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full">
                    {services.map((service) => (
                      <DropdownMenuItem key={service.title} asChild>
                        <Link
                          href={service.href}
                          className="w-full"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {service.title}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Resources Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-between px-4 py-2 h-auto"
                    >
                      Resources
                      <span className="ml-2">
                        <ChevronDown className="h-4 w-4" />
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full">
                    {resources.map((resource) => (
                      <DropdownMenuItem key={resource.title} asChild>
                        <Link
                          href={resource.href}
                          className="w-full"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {resource.title}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <Link
                  href="/about"
                  className={cn(
                    "block px-4 py-2 rounded-lg transition-colors",
                    isActive("/about")
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About Us
                </Link>

                <Link
                  href="/contact"
                  className={cn(
                    "block px-4 py-2 rounded-lg transition-colors",
                    isActive("/contact")
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </div>

              {/* Mobile Actions */}
              <div className="pt-4 border-t border-border">
                <div className="space-y-2">
                  <Button className="btn-primary w-full" asChild>
                    <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                      Request Quote
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

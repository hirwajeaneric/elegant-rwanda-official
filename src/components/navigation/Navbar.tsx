"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Mail, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const services = [
  {
    title: "Tours",
    href: "/tours",
    description: "Unique tours and safari experiences",
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
    href: "/events",
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
  const [expandedMenus, setExpandedMenus] = useState<{
    services: boolean;
    resources: boolean;
  }>({
    services: false,
    resources: false,
  });
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  const toggleMenu = (menuType: 'services' | 'resources') => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuType]: !prev[menuType]
    }));
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setExpandedMenus({ services: false, resources: false });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-border shadow-sm">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container-elegant">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>‭+250 787 095 392‬</span>
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
                <span className="text-xl font-display block font-semibold text-black">ET&T</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      className={cn(
                        "group inline-flex h-10 w-max items-center hover:border-b-2 hover:border-primary hover:bg-primary/10 justify-center px-4 py-2 text-sm rounded-none font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
                        isActive("/") && "border-b-2 border-primary"
                      )}
                      href="/"
                    >
                      Home
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem className="dropdown-menu-item">
                    <NavigationMenuTrigger
                      className={cn(
                        "group inline-flex h-10 w-max items-center hover:border-b-2 hover:border-primary hover:bg-primary/10 focus:bg-primary/10 justify-center px-4 py-2 text-sm rounded-none font-medium disabled:pointer-events-none disabled:opacity-50",
                        pathname.startsWith("/tours") ||
                        pathname.startsWith("/cab-booking") ||
                        pathname.startsWith("/car-rental") ||
                        pathname.startsWith("/air-travel-assistance") ||
                        pathname.startsWith("/events") && "border-b-2 border-primary hover:bg-primary/10 focus:bg-primary/10"
                      )}
                    >
                      Services
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[600px] grid-cols-2 gap-3 p-4">
                        {services.map((service) => (
                          <li key={service.title}>
                            <NavigationMenuLink asChild className="rounded-none">
                              <Link
                                href={service.href}
                                className="block select-none space-y-1 p-3 rounded-none leading-none no-underline outline-none transition-colors hover:border-b-2 hover:border-primary focus:border-b-2 focus:border-primary hover:bg-primary/10"
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
                        "group inline-flex h-10 w-max items-center hover:border-b-2 hover:bg-primary/10 focus:bg-primary/10 hover:border-primary justify-center px-4 py-2 text-sm rounded-none font-medium disabled:pointer-events-none disabled:opacity-50",
                        pathname.startsWith("/blog") ||
                        pathname.startsWith("/gallery") ||
                        pathname.startsWith("/faq") && "border-b-2 border-primary hover:bg-primary/10 focus:bg-primary/10 rounded-none"
                      )}
                    >
                      Resources
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] grid-cols-1 gap-3 p-4">
                        {resources.map((resource) => (
                          <li key={resource.title}>
                            <NavigationMenuLink asChild className="rounded-none">
                              <Link
                                href={resource.href}
                                className="block select-none space-y-1 p-3 rounded-none leading-none no-underline outline-none transition-colors hover:border-b-2 hover:border-primary focus:border-b-2 focus:border-primary hover:bg-primary/10"
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
                    <NavigationMenuLink
                      className={cn(
                        "group inline-flex h-10 w-max items-center hover:border-b-2 hover:bg-primary/10 focus:bg-primary/10 hover:border-primary justify-center px-4 py-2 text-sm rounded-none font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
                        isActive("/about") && "border-b-2 border-primary hover:bg-primary/10"
                      )}
                      href="/about"
                    >
                      About Us
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink
                      className={cn(
                        "group inline-flex h-10 w-max items-center hover:border-b-2 hover:bg-primary/10 focus:bg-primary/10 hover:border-primary justify-center px-4 py-2 text-sm rounded-none font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
                        isActive("/contact") && "border-b-2 border-primary hover:bg-primary/10"
                      )}
                      href="/contact"
                    >
                      Contact
                    </NavigationMenuLink>
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
              className="lg:hidden border-2 border-primary text-primary rounded-full px-1 py-4 hover:bg-primary hover:text-white"
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
                    "block px-4 py-3 text-base font-medium rounded-none transition-colors",
                    isActive("/")
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  )}
                  onClick={closeMobileMenu}
                >
                  Home
                </Link>

                {/* Services Expandable Menu */}
                <div className="space-y-1">
                  <button
                    onClick={() => toggleMenu('services')}
                    className={cn(
                      "w-full flex items-center justify-between px-4 py-3 text-base font-medium rounded-none transition-colors",
                      expandedMenus.services
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    )}
                  >
                    <span>Services</span>
                    <span className="transition-transform duration-200">
                      {expandedMenus.services ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </span>
                  </button>
                  
                  {/* Services Submenu */}
                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-300 ease-in-out",
                      expandedMenus.services ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    )}
                  >
                    <div className="pl-6 space-y-1 border-l-2 border-primary/20 ml-4">
                      {services.map((service) => (
                        <Link
                          key={service.title}
                          href={service.href}
                          className={cn(
                            "block px-4 py-3 text-sm rounded-none transition-colors hover:bg-primary/10",
                            isActive(service.href) && "bg-primary/10 text-primary font-medium"
                          )}
                          onClick={closeMobileMenu}
                        >
                          <div className="font-medium">{service.title}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {service.description}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Resources Expandable Menu */}
                <div className="space-y-1">
                  <button
                    onClick={() => toggleMenu('resources')}
                    className={cn(
                      "w-full flex items-center justify-between px-4 py-3 text-base font-medium rounded-none transition-colors",
                      expandedMenus.resources
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    )}
                  >
                    <span>Resources</span>
                    <span className="transition-transform duration-200">
                      {expandedMenus.resources ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </span>
                  </button>
                  
                  {/* Resources Submenu */}
                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-300 ease-in-out",
                      expandedMenus.resources ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    )}
                  >
                    <div className="pl-6 space-y-1 border-l-2 border-primary/20 ml-4">
                      {resources.map((resource) => (
                        <Link
                          key={resource.title}
                          href={resource.href}
                          className={cn(
                            "block px-4 py-3 text-sm rounded-none transition-colors hover:bg-primary/10",
                            isActive(resource.href) && "bg-primary/10 text-primary font-medium"
                          )}
                          onClick={closeMobileMenu}
                        >
                          <div className="font-medium">{resource.title}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {resource.description}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                <Link
                  href="/about"
                  className={cn(
                    "block px-4 py-3 text-base font-medium rounded-none transition-colors",
                    isActive("/about")
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  )}
                  onClick={closeMobileMenu}
                >
                  About Us
                </Link>

                <Link
                  href="/contact"
                  className={cn(
                    "block px-4 py-3 text-base font-medium rounded-none transition-colors",
                    isActive("/contact")
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  )}
                  onClick={closeMobileMenu}
                >
                  Contact
                </Link>
              </div>

              {/* Mobile Actions */}
              <div className="pt-4 border-t border-border">
                <div className="space-y-2">
                  <Button className="btn-primary w-full" asChild>
                    <Link href="/contact" onClick={closeMobileMenu}>
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

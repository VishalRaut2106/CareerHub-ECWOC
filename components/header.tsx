"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "./theme-toggle"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Helper: generate correct href for hash links
  const getHref = (hash: string) => (pathname === "/" ? `#${hash}` : `/#${hash}`)

  // Smooth scroll when already on homepage
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1)
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: "smooth" })
    }
  }, [pathname])

  return (
    <header className="sticky top-0 z-50 glassmorphic border-b shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-300">
          <div className="w-8 h-8 rounded-lg bg-foreground/20 flex items-center justify-center font-bold text-lg shadow-sm">
            C
          </div>
          <span className="font-bold text-lg text-foreground hidden sm:inline tracking-wide">CareerHub</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href={getHref("features")} className="text-muted-foreground hover:text-foreground transition-colors duration-300">
            Browse
          </Link>
          <Link href="/assessments" className="text-muted-foreground hover:text-foreground transition-colors duration-300">
            Assessments
          </Link>
          <Link href={getHref("testimonials")} className="text-muted-foreground hover:text-foreground transition-colors duration-300">
            Success Stories
          </Link>
          <Link href={getHref("pricing")} className="text-muted-foreground hover:text-foreground transition-colors duration-300">
            Plans
          </Link>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Link href="/login">
            <Button variant="ghost" className="text-foreground hover:bg-foreground/10 transition duration-300">
              Sign In
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="glassmorphic-button-primary text-black shadow-md hover:scale-105 transition-transform duration-300">
              Sign Up
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-foreground" aria-label="Toggle menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="absolute top-16 left-0 right-0 glassmorphic border-b p-4 md:hidden slide-up shadow-lg">
            <div className="flex flex-col gap-4">
              <Link href={getHref("features")} className="text-foreground hover:text-muted-foreground transition-colors duration-300">
                Browse
              </Link>
              <Link href="/assessments" className="text-foreground hover:text-muted-foreground transition-colors duration-300">
                Assessments
              </Link>
              <Link href={getHref("testimonials")} className="text-foreground hover:text-muted-foreground transition-colors duration-300">
                Success Stories
              </Link>
              <Link href={getHref("pricing")} className="text-foreground hover:text-muted-foreground transition-colors duration-300">
                Plans
              </Link>
              <div className="flex gap-2 pt-4">
                <ThemeToggle />
                <Link href="/login" className="flex-1">
                  <Button variant="outline" className="w-full bg-transparent hover:opacity-80 transition duration-300">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup" className="flex-1">
                  <Button className="w-full glassmorphic-button-primary text-black shadow-md hover:scale-105 transition-transform duration-300">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

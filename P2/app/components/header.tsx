"use client"

import { useState, useEffect, FormEvent } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { BookHeart, SearchIcon, XIcon } from "lucide-react"

import { useFilters } from "@/context/filter-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ModeToggle } from "@/components/mode-toggle"

export function Header() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState("")
  const { filter, printType, orderBy } = useFilters()

  useEffect(() => {
    setSearchQuery(searchParams.get("q") || "")
  }, [searchParams])

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!searchQuery.trim()) {
      router.push("/")
      return
    }

    const params = new URLSearchParams()
    params.set("q", searchQuery.trim())

    if (filter && filter !== "none") {
      params.set("filter", filter)
    }
    if (printType && printType !== "all") {
      params.set("printType", printType)
    }
    if (orderBy && orderBy !== "relevance") {
      params.set("orderBy", orderBy)
    }

    router.push(`/search?${params.toString()}`)
  }

  return (
    <header className="p-4 border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="w-full grid grid-cols-[auto_1fr_auto] items-center gap-4 md:relative">

        <div className="justify-self-start">
          <Link href="/" className="text-xl font-bold shrink-0 flex items-center gap-2">
            <BookHeart className="h-6 w-6 text-primary" />
            <span className="hidden [@media(min-width:860px)]:inline">BookFindr</span>
          </Link>
        </div>

        <div className="w-full max-w-lg min-w-0 justify-self-center md:absolute md:left-1/2 md:-translate-x-1/2">
          <form onSubmit={handleSearchSubmit} className="flex w-full items-center gap-2">
            <div className="relative w-full">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                type="search"
                placeholder="Search books..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-9 flex-grow"
              />
              {searchQuery && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8"
                  tabIndex={-1}
                  aria-label="Clear search"
                >
                  <XIcon className="h-4 w-4 text-muted-foreground" />
                </Button>
              )}
            </div>
          </form>
        </div>

        <div className="justify-self-end md:absolute md:right-0 md:top-0 md:h-full md:flex md:items-center">
          <ModeToggle />
        </div>

      </div>
    </header>
  )
}

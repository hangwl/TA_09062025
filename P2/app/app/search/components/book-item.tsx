"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { BookIcon, Star } from "lucide-react";

import type { BookSearchResult } from "../../../types/google-books-search";

interface BookItemProps {
  book: BookSearchResult;
}

export function BookItem({ book }: BookItemProps) {
  return (
    <Link href={`/book/${book.id}`} className="block">
      <Card className="h-full transition-shadow hover:shadow-md">
        <CardContent className="px-4 pt-4 flex gap-4 items-start">
          <div className="w-32 flex-shrink-0">
            <AspectRatio ratio={2 / 3} className="bg-muted rounded relative">
              {book.volumeInfo.imageLinks?.thumbnail ? (
                <Image
                  src={book.volumeInfo.imageLinks.thumbnail.replace(/^http:/, "https:")}
                  alt={`Cover of ${book.volumeInfo.title}`}
                  fill
                  className="object-contain rounded"
                  sizes="(max-width: 640px) 100vw, 200px"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-muted-foreground">
                  <BookIcon size={48} />
                </div>
              )}
            </AspectRatio>
          </div>

          <div className="flex-1 self-stretch flex flex-col justify-start gap-1 min-w-0">
            <h2 className="text-lg font-semibold truncate break-words" title={book.volumeInfo.title}>
              {book.volumeInfo.title || "No Title"}
            </h2>

            {book.volumeInfo.authors && (
              <p className="text-sm text-muted-foreground truncate break-words">
                {book.volumeInfo.authors.join(", ")}
              </p>
            )}

            {book.volumeInfo.publishedDate && (
              <p className="text-xs text-muted-foreground">
                {book.volumeInfo.publishedDate}
              </p>
            )}

            <div className="flex gap-2 text-xs text-muted-foreground">
              {book.volumeInfo.language && (
                <span className="uppercase font-medium">
                  {book.volumeInfo.language}
                </span>
              )}
              {typeof book.volumeInfo.pageCount === "number" && book.volumeInfo.pageCount > 0 && (
                <span>{book.volumeInfo.pageCount} pages</span>
              )}
              {typeof book.volumeInfo.averageRating === "number" && (
                <span className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" />
                  {book.volumeInfo.averageRating}
                </span>
              )}

            </div>

            {book.volumeInfo.description && (
              <p className="text-xs text-muted-foreground mt-2 line-clamp-5 break-words">
                {book.volumeInfo.description.replace(/<[^>]+>/g, "")}
              </p>
            )}

          </div>
        </CardContent>

        {/* disabled so that users will navigate to the more detailed book page instead */}
        {/* <CardFooter className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground px-4 mt-auto">
          <div className="ml-auto flex gap-2">
            {book.accessInfo?.epub?.isAvailable && (
              <Image src="/epub.svg" alt="EPUB available" width={64} height={64} />
            )}
            {book.accessInfo?.pdf?.isAvailable && (
              <Image src="/pdf.svg" alt="PDF available" width={64} height={64} />
            )}
          </div>
        </CardFooter> */}
      </Card>
    </Link>
  );
}

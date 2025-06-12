# BookFindr

**BookFindr** is a [Next.js](https://nextjs.org/docs) web application that uses [Shadcn UI](https://ui.shadcn.com/docs/installation) components built with [Radix UI](https://www.radix-ui.com/themes/docs/overview/getting-started) primitives and [Tailwind CSS](https://tailwindcss.com/) for styling. Users can use it to search for books using the [Google Books API](https://developers.google.com/books). It is designed to be clean, responsive and user-friendly for both desktop and mobile users.

## Features

The application showcases the following features:

### Search Function

Users can search for books by entering search terms in the search bar in the header.

Details on how to use the search function are as follows:

#### Basic Search
   - Search terms can be separated via `spaces` or `+` symbols in the search bar.
   - To search for an exact phrase, enclose the phrase in `"quotation"` marks.
   - Terms can be excluded by prefixing them with a `-` symbol.

#### Advanced Search

To apply advanced search queries, users can prepend the following operators to their search terms.

| Operator    | Description                                                                                  |
|-------------|----------------------------------------------------------------------------------------------|
| **`intitle:`**  | Returns results where the text following this keyword is found in the **title**.                 |
| **`inauthor:`** | Returns results where the text following this keyword is found in the **author's name**.         |
| **`inpublisher:`**| Returns results where the text following this keyword is found in the **publisher's name**.      |
| **`subject:`**  | Returns results where the text following this keyword is listed in the **category** list of the volume. |
| **`isbn:`**     | Returns results where the text following this keyword is the **ISBN number**.                    |
| **`lccn:`**     | Returns results where the text following this keyword is the **Library of Congress Control Number**. |
| **`oclc:`**     | Returns results where the text following this keyword is the **Online Computer Library Center number**. |

#### **Filters**

Users may apply the following filters to narrow their search query:

##### Book Filters

| Filter | Description |
|--------|-------------|
| **`Full Preview`** | Returns results where the book is available for full preview. |
| **`Partial Preview`** | Returns results where the book is available for partial preview. |
| **`Free eBooks`** | Returns results where the book is available for free. |
| **`Paid eBooks`** | Returns results where the book is available for purchase. |
| **`All eBooks`** | Returns results where the book is an ebook. |

#### Print Type

| Print Type | Description |
|------------|-------------|
| **`Books`** | Return results that are books. |
| **`Magazines`** | Return results that are magazines. |

### Results Page

The results page displays a list of books based on the search query. The results are paginated and include data pre-fetching and caching to improve user experience. 

Each page displays a list of 10 book items, each displaying the following information if available:
- Book Cover Thumbnail
- Title
- Authors
- Published Date
- Language
- Page Count
- Average Rating
- Truncated Description

User can click on a book item card to navigate to its detailed book page.

### Detailed Book Page

The detailed book page displays the full details of a book, including the following information if available:
- Higher Resolution Book Cover Image
- Title
- Authors
- Publisher
- Published Date
- Page Count
- ISBN Codes
- Categories
- Subtitle
- Description
- Google Books Link
- Google Play Store Link

## Installation

To install the dependencies, run the following command:

```bash
pnpm install
```

To run the application in development mode, run the following command:

```bash
pnpm run dev
```

For production, run the following command:

```bash
pnpm run build
pnpm run start
```
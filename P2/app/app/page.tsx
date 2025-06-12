import { Badge } from "@/components/ui/badge"

export default function HomePage() {
  return (
    <div className="text-center py-4">
      <h1 className="text-4xl font-bold mb-4 px-4">Welcome to BookFindr!</h1>
      <h2 className="text-lg text-muted-foreground px-4 pb-4">
        Use the search bar above to find your next favorite book.
      </h2>

      <div className="text-left max-w-3xl mx-auto p-4">
        <div className="flex flex-col gap-8">
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="text-xl font-medium mb-4">Basic Search Terms <span className="inline-block">(<i>Case-Insensitive</i>)</span></h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>
                Search terms are separated by spaces.
              </li>
              <li>
                To search for an <b><u>exact phrase</u></b>, wrap your phrase in quotation marks. <Badge variant="secondary"><b>&quot;exact phrase&quot;</b></Badge>
              </li>
              <li>
                To <b><u>exclude terms</u></b>, use prepend a minus symbol (-) like this! <Badge variant="secondary"><b>-term</b></Badge>
              </li>
            </ul>
          </div>

          <div className="bg-card p-6 rounded-lg border">
            <h3 className="text-xl font-medium mb-4">Advanced Search Terms <span className="inline-block">(<i>Case-Sensitive</i>)</span></h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground uppercase">
                  <tr>
                    <th scope="col" className="px-4 py-3">Keyword</th>
                    <th scope="col" className="px-4 py-3">Description</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="px-4 py-3 whitespace-nowrap"><Badge variant="secondary"><b>intitle:</b></Badge></td>
                    <td className="px-4 py-3">Returns results where the text following this keyword is found in the <b><u>title</u></b>.</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3 whitespace-nowrap"><Badge variant="secondary"><b>inauthor:</b></Badge></td>
                    <td className="px-4 py-3">Returns results where the text following this keyword is found in the <b><u>author</u></b>.</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3 whitespace-nowrap"><Badge variant="secondary"><b>inpublisher:</b></Badge></td>
                    <td className="px-4 py-3">Returns results where the text following this keyword is found in the <b><u>publisher</u></b>.</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3 whitespace-nowrap"><Badge variant="secondary"><b>subject:</b></Badge></td>
                    <td className="px-4 py-3">Returns results where the text following this keyword is listed in the <b><u>category</u></b> list of the volume.</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3 whitespace-nowrap"><Badge variant="secondary"><b>isbn:</b></Badge></td>
                    <td className="px-4 py-3">Returns results where the text following this keyword is the <b><u>ISBN number</u></b>.</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3 whitespace-nowrap"><Badge variant="secondary"><b>lccn:</b></Badge></td>
                    <td className="px-4 py-3">Returns results where the text following this keyword is the <b><u>Library of Congress Control Number</u></b>.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 whitespace-nowrap"><Badge variant="secondary"><b>oclc:</b></Badge></td>
                    <td className="px-4 py-3">Returns results where the text following this keyword is the <b><u>Online Computer Library Center number</u></b>.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


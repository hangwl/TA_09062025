import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Footer() {
    return (
        <footer className="p-4 border-t text-center text-sm text-muted-foreground">
            <Button variant="link"><Link href="https://github.com/hangwl" target="_blank">&#169; hangwl</Link></Button>
        </footer>
    )
}
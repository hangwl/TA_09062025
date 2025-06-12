"use client"

import * as React from "react"
import { SlidersHorizontal, ListRestart } from "lucide-react"

import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useFilters } from "@/context/filter-context"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function FilterDialog() {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const formProps = useFilters()

  const TriggerButton = (
    <Button
      variant="outline"
      className="fixed bottom-6 right-6 h-14 w-14 md:w-36 shadow-md backdrop-blur flex items-center justify-center gap-2 md:gap-2"
    >
      <SlidersHorizontal strokeWidth={2.5} />
      <span className="font-bold text-lg hidden md:inline">FILTERS</span>
    </Button>
  )

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{TriggerButton}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Filter Books</DialogTitle>
            <DialogDescription>
              Your filter settings will be applied to your next search.
            </DialogDescription>
          </DialogHeader>
          <FilterForm {...formProps} />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{TriggerButton}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Filter Books</DrawerTitle>
          <DrawerDescription>
            Your filter settings will be applied to your next search.
          </DrawerDescription>
        </DrawerHeader>
        <FilterForm className="px-4 pb-4" {...formProps} />
      </DrawerContent>
    </Drawer>
  )
}

interface FilterFormProps {
  className?: string
  filter: string
  setFilter: (value: string) => void
  printType: string
  setPrintType: (value: string) => void
  // orderBy: string
  // setOrderBy: (value: string) => void
}

function FilterForm({
  className,
  filter,
  setFilter,
  printType,
  setPrintType,
  // orderBy,
  // setOrderBy,
}: FilterFormProps) {
  const filterOptions = [
    { value: "none", label: "None" },
    { value: "partial", label: "Partial Preview" },
    { value: "full", label: "Full Preview" },
    { value: "free-ebooks", label: "Free eBooks" },
    { value: "paid-ebooks", label: "Paid eBooks" },
    { value: "ebooks", label: "All eBooks" },
  ]

  const printTypeOptions = [
    { value: "all", label: "All" },
    { value: "books", label: "Books" },
    { value: "magazines", label: "Magazines" },
  ]

  // const orderByOptions = [
  //   { value: "relevance", label: "Relevance" },
  //   { value: "newest", label: "Newest" },
  // ]

  // Track which accordion items are open. Initially open if corresponding filter is non-default.
  const [openItems, setOpenItems] = React.useState<string[]>(() => {
    const init: string[] = [];
    if (filter !== "none") init.push("filter");
    if (printType !== "all") init.push("printType");
    return init;
  });

  // Keep accordion state in sync with current selections.
  React.useEffect(() => {
    setOpenItems((prev) => {
      const updated = new Set(prev);

      // Ensure "filter" is open when a non-default option is selected, closed otherwise.
      if (filter !== "none") {
        updated.add("filter");
      } else {
        updated.delete("filter");
      }

      // Ensure "printType" is open when a non-default option is selected, closed otherwise.
      if (printType !== "all") {
        updated.add("printType");
      } else {
        updated.delete("printType");
      }

      return Array.from(updated);
    });
  }, [filter, printType]);

  return (
    <div className={cn("grid items-start gap-6", className)}>
      <Accordion
        type="multiple"
        className="w-full"
        value={openItems}
        onValueChange={setOpenItems}
      >

        <AccordionItem value="filter">
          <AccordionTrigger className="text-base">Book Filter</AccordionTrigger>
          <AccordionContent>
            <RadioGroup
              value={filter}
              onValueChange={setFilter}
              className="grid grid-cols-2 gap-3 pt-2"
            >
              {filterOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-3">
                  <RadioGroupItem value={option.value} id={`filter-${option.value}`} />
                  <Label htmlFor={`filter-${option.value}`} className="font-normal">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </AccordionContent>

        </AccordionItem>
        <AccordionItem value="printType">
          <AccordionTrigger className="text-base">Print Type</AccordionTrigger>
          <AccordionContent>
            <RadioGroup
              value={printType}
              onValueChange={setPrintType}
              className="grid grid-cols-3 gap-3 pt-2"
            >
              {printTypeOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-3">
                  <RadioGroupItem value={option.value} id={`printType-${option.value}`} />
                  <Label htmlFor={`printType-${option.value}`} className="font-normal">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>

        {/* orderBy accordion disabled because the API isn't properly working for this param*/}
        {/* <AccordionItem value="orderBy">
          <AccordionTrigger className="text-base">Order By</AccordionTrigger>
          <AccordionContent>
            <RadioGroup
              value={orderBy}
              onValueChange={setOrderBy}
              className="grid gap-3 pt-2"
            >
              {orderByOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-3">
                  <RadioGroupItem value={option.value} id={`orderBy-${option.value}`} />
                  <Label htmlFor={`orderBy-${option.value}`} className="font-normal">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </AccordionContent>
        </AccordionItem> */}

      </Accordion>
      <Button
        variant="destructive"
        onClick={() => {
          setFilter('none');
          setPrintType('all');
          // setOrderBy('relevance');
        }}
        className="flex items-center gap-2"
      >
        <ListRestart className="h-4 w-4" />
        Reset Filters
      </Button>
    </div>
  )
}

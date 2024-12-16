"use client";

import { useChangeLocale } from "../hooks/useChangeLocale";
import { useLocale, useTranslations } from "next-intl";
import { HoverCard, HoverCardContent } from "@/components/ui/hover-card";
import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuItem,
 DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LoadingState } from "@/components/ui/loadingState";

interface Props {
 variant?:
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link"
  | null;
 size?: "default" | "sm" | "lg" | "icon" | null;
 alignHover?: "center" | "start" | "end";
 alignDropdown?: "center" | "start" | "end";
 textSize?: "text-lg" | "text-base";
}

export const LocaleSwitcher = ({
 size = "default",
 variant = "default",
 alignHover = "center",
 alignDropdown = "center",
 textSize = "text-base",
}: Props) => {
 const locale = useLocale();

 const t = useTranslations("COMMON");

 const { isLoading, isPending, onSelectChange } = useChangeLocale();

 return (
  <HoverCard openDelay={250} closeDelay={250}>
   <DropdownMenu>
    <DropdownMenuTrigger asChild>
     <Button
      disabled={isLoading}
      variant={variant}
      size={size}
      className={textSize}
     >
      {isLoading ? <LoadingState className="mr-0" /> : locale.toUpperCase()}
      <span className="sr-only">{t("LANG_HOVER")}</span>
     </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align={alignDropdown}>
     <DropdownMenuItem
      onClick={() => {
       onSelectChange("vi");
      }}
      className="cursor-pointer"
     >
      Vietnamese
     </DropdownMenuItem>
     <DropdownMenuItem
      onClick={() => {
       onSelectChange("en");
      }}
      className="cursor-pointer"
     >
      English
     </DropdownMenuItem>
    </DropdownMenuContent>
   </DropdownMenu>
   <HoverCardContent align={alignHover}>
    <span>{t("LANG_HOVER")}</span>
   </HoverCardContent>
  </HoverCard>
 );
};

"use client";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/store/use-sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { UserAvator } from "@/components/user-avator";
import { LiveBadge } from "@/components/live-badge";

interface UserItemProps {
  username: string;
  imageUrl: string;
  isLive?: boolean;
}
export const UserItem = ({ username, imageUrl, isLive }: UserItemProps) => {
  const pathName = usePathname();
  const { collapsed } = useSidebar((state) => state);
  const href = `/${username}`;
  const isActive = pathName === href;
  return (
    <Button
      asChild
      variant="ghost"
      className={cn(
        "w-full h-12",
        collapsed ? "justify-center" : "justify-start",
        isActive && "bg-accent"
      )}
    >
      <Link href={href}>
        <div
          className={cn(
            "flex items-center w-full gap-x-4 ",
            collapsed && "justify-center"
          )}
        >
          <UserAvator imageUrl={imageUrl} username={username} isLive={isLive} />
          {!collapsed && <p className="turncate">{username}</p>}
          {!collapsed && isLive && <LiveBadge className="ml-auto" />}
        </div>
      </Link>
    </Button>
  );
};
export const UserItemSkeleton = () => {
  return (
    <li className="flex items-center gap-x-4 px-3 py-2 ">
      <Skeleton className="min-h-[32px] min-w-[32px] rounded-full" />
      <div className="flex-1">
        <Skeleton className="h-6" />
      </div>
    </li>
  );
};

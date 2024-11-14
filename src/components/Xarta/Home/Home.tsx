
"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { NEXT_XARTA_BASE_URL } from "@/config/config";
import { InnerHome } from "./InnerHome";
import { GhostPost } from "@/components/types/GhostPost";
import { axiosXarta } from "@/components/ghost-auth/axios";
import { getPosts } from "@/components/ghost-api/getPosts";

// Main component that fetches the posts
export function Home() {
  // Use TanStack Query to fetch data
  const { data, error, isLoading, isSuccess } = useQuery<{
    posts: GhostPost[]
  }>({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await getPosts();
      return response;
    }
  });

  const posts = data?.posts ?? [];

  return (
    <div>
        <InnerHome posts={posts} isLoading={isLoading} isSuccess={isSuccess} error={error} />
    </div>
  );
}



"use client";
import { useQuery } from "@tanstack/react-query";
import { InnerHome } from "./InnerHome";
import { GhostPost } from "@/components/types/GhostPost";
import { getPosts } from "@/components/ghost-api/getPosts";
import { useState } from "react";
import { useTags } from "../WrapEditarCard";
import { GhostTag } from "@/components/types/GhostTag";
import { XartaConfig } from "@/config/XartaConfig";
import { ConfigGhostApiTagsUrl } from "@/components/ghost-api/admin/fetchTags";
import { ConfigGhostAuth } from "@/components/ghost-auth/axios";
import { ConfigPublicRootUrl } from "@/components/ghost-api/admin/fetchPost";

// Main component that fetches the posts
export function Home({config}: {
  config: Pick<XartaConfig, "PUBLIC_GHOST_TAGS_PANEL_URL"> & ConfigGhostApiTagsUrl & ConfigGhostAuth & ConfigPublicRootUrl}) {
  // Use TanStack Query to fetch data
  const [titleParam, setTitleParam] = useState('');
  const [statusParam, setStatusParam] = useState('');
  const [selectedTags, setSelectedTags] = useState<GhostTag[]>([]);
  const tagsParam = selectedTags.map(tag => `'${tag.id}'`).join(',');

  const getFilterQuery = (items: string[]) => {
    const fields = ['title', 'status', 'tags.id'];
    const operator = [`~`, '', ''];
    const stringify = [true, true, false];
    return items.map((i, index) => i ? `${fields[index]}:${operator[index]}${stringify[index] ? `'` : ``}${i}${stringify[index] ? `'` : ``}` : ``).filter(i => i).join(`%2b`)
  }

  const params = (
    titleParam ||
    statusParam ||
    selectedTags.length > 0
  ) ? `&filter=${getFilterQuery([
      titleParam, 
      statusParam, 
      (selectedTags.length > 0) ? `[${tagsParam}]` : ''
  ])}` : ``

  const { data, error, isLoading, isSuccess } = useQuery<{
    posts: GhostPost[]
  }>({
    queryKey: ['posts', { params }],
    queryFn: async () => {
      const response = await getPosts(params, {config});
      return response;
    }
  });

  const { data: tagsData } = useTags({config});

  const posts = data?.posts ?? [];

  return (
    <div>
      <InnerHome 
        posts={posts}
        isLoading={isLoading}
        isSuccess={isSuccess} 
        error={error} 
        tags={tagsData?.tags} 
        selectedTags={selectedTags} 
        setSelectedTags={(e) => {
          console.log(e);
          setSelectedTags(e);
        }} 
        setTitleParam={setTitleParam}
        setStatusParam={setStatusParam} 
        config={config} />
    </div>
  );
}


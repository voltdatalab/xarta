import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { HOME } from "@/config/config";
import { GhostPost } from "@/components/types/GhostPost";
import { SendIcon } from "./Icons/SendIcon";
import { TrashIcon } from "./Icons/TrashIcon";
import { EditarCardProps } from "../functional/EditarCard/EditarCardProps";
import { cn } from "@/lib/utils";
import { Save, SquarePen } from 'lucide-react'
import { buttonTransitionStyles } from "./Home/RoundedFullButton";
import { Dispatch, SetStateAction } from "react";
import { ActionType } from "../functional/EditarCard/EditarCard";
import { deletePost } from '../ghost-api/deletePost';
import { updatePost } from '../ghost-api/updatePost';
import { createPost } from '../ghost-api/createPost';
import { useToast } from "../ui/use-toast";
import { useTranslations } from "next-intl";
import { ConfigPublicRootUrl } from "../ghost-api/admin/fetchPost";



export default function PublicarCard(
    { id, checked, onChange, post, mode, currentAction, setCurrentAction, config }: 
    { id?: GhostPost["id"], mode: EditarCardProps["mode"], currentAction?: ActionType, 
        setCurrentAction?: Dispatch<SetStateAction<ActionType>>, checked: boolean, 
        onChange?: (v: boolean) => void, post: EditarCardProps["post"], config: ConfigPublicRootUrl }) {
    const t = useTranslations('strings');
    
    const router = useRouter();
    const queryClient = useQueryClient();
    const { toast } = useToast();

    const deletePostMutation = useMutation({
        mutationFn: async () => {
            setCurrentAction?.('erase');
            await deletePost(post.id, {config});
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['post', id] }); // Assuming 'posts' is the query key for fetching posts
            router.push(HOME);
        },
        onError: (error) => {
            toast({
                title: t('ERROR_WHILE_REMOVING_POST'),
                description: error.message
            });
        },
        onSettled: () => {
            setCurrentAction?.(null);
        }
    });

    const updatePostMutation = useMutation({
        mutationFn: async (status?: GhostPost["status"]) => {
            const response = await updatePost({
                ...post,
                status: status ?? post.status ?? 'published', // Assuming you want to update the post to 'published'
            }, {config});
            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['post', id] }); // Assuming 'posts' is the query key for fetching posts
            router.push(`/view-card/${id}`);
            // Use router refresh to clear cache, see: https://stackoverflow.com/a/76672793/2924099
            router.refresh();
        },
        onError: (error) => {
            console.error('Error updating post:', error);
            toast({
                title: t('ERROR_WHILE_UPDATING_POST'),
                description: error.message
            });            
        },
        onSettled: () => {
            setCurrentAction?.(null);
        }
    });

    const createPostMutation = useMutation({
        mutationFn: async (status?: GhostPost["status"]) => {

            try {
                const response = await createPost(
                    {
                        ...post,
                        status: status ?? post.status ?? 'published', // Assuming you want to update the post to 'published'
                    },
                    {config}
                );

                // Handle response if it's successful
                return response; // Axios stores the response body in `data`
            } catch (error) {
                // Handle the error response
                throw new Error('Failed to update post');
            }
        },
        onSuccess: (post: GhostPost) => {
            queryClient.invalidateQueries({ queryKey: ['posts'] }); // Assuming 'posts' is the query key for fetching posts
            queryClient.invalidateQueries({ queryKey: ['post', post.id] });
            router.push(`/view-card/${post.id}`);
            // Use router refresh to clear cache, see: https://stackoverflow.com/a/76672793/2924099
            router.refresh();
        },
        onError: (error) => {
            console.error('Error creating post:', error);
            toast({
                title: t('ERROR_WHILE_CREATING_POST'),
                description: error.message
            });            
        },
        onSettled: () => {
            setCurrentAction?.(null);
        }
    });

    const canSaveOrPublish = post.title && post.html;

    const unpublishPostMutation = useMutation({
        mutationFn: async () => {
            setCurrentAction?.('unpublish');

            const response = await updatePost(
                {
                    ...post,
                    status: 'draft', // Force post back to draft to unpublish it
                },
                {config}
            );

            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['post', id] }); // Invalidate to fetch updated post data
            router.push(`/view-card/${post.id}`);
            // Use router refresh to clear cache, see: https://stackoverflow.com/a/76672793/2924099
            router.refresh();
        },
        onError: (error) => {
            console.error('Error unpublishing post:', error);
            toast({
                title: t('ERROR_WHILE_UNPUBLISHING_POST'),
                description: error.message
            });            
        },
        onSettled: () => {
            setCurrentAction?.(null);
        }
    });

    return (
        <div className="pt-5 gap-y-4">
            <div className="text-center">
                <span className="text-[14px]">
                    <input type="checkbox" id="cc-attribution" className={"rounded-full w-[14px] h-[14px] text-[#4B31DD] border-[#4B31DD] border-2 mr-2 relative bottom-[2px] focus:ring-[#4B31DD] align-middle"}
                        checked={checked} onChange={(e) => onChange?.(e.target.checked)} />
                    <label htmlFor="cc-attribution">{t.rich('AGREE_CREATIVE_COMMONS_LABEL', {
                        b: (chunks) => <span className="font-bold">{chunks}</span>,
                        light: (chunks) => <span className="font-light">{chunks}</span>
                    })}</label>
                </span>
            </div>
            <div className="flex space-x-4 mt-9 justify-center text-[15px]">
                <button
                    disabled={!(post.id) || !!(currentAction)}
                    title={!(post.id) ? t('CANNOT_DELETE_UNSAVED_XARTA_TEXT') : undefined}
                    onClick={() => {
                        if (window.confirm(t('DIALOG_CONFIRM_ACTION', {
                            mode
                        }))) {
                            if (mode === 'edit') {
                                deletePostMutation.mutate();
                            }
                        }
                    }}
                    className={cn("bg-red-500 text-white flex items-center space-x-2 rounded-full px-4 py-2", (mode === 'create') ? "opacity-50 grayscale" : "", buttonTransitionStyles)}
                >
                    <TrashIcon className={cn("w-5 h-5", currentAction === 'erase' ? "animate-ping" : null)} />
                    <span>{t('DELETE_BUTTON_TEXT')} </span>
                </button>
                {!(post.status) || (post.status === 'draft') ? <button
                    disabled={!(canSaveOrPublish) || !!(currentAction)}
                    title={!(canSaveOrPublish) ? t('INCLUDE_TITLE_AND_CONTEXT_TO_SAVE') : undefined}
                    onClick={() => {
                        setCurrentAction?.('save');
                        post.id ? updatePostMutation.mutate("draft") : createPostMutation.mutate("draft")
                    }}
                    className={cn("bg-[#4B31DD] text-white flex items-center space-x-2 rounded-full px-4 py-2", buttonTransitionStyles)}
                >
                    <Save className={cn("w-5 h-5", currentAction === 'save' ? "animate-ping" : null)} strokeWidth={1.75} />
                    <span>{t('SAVE_BUTTON_TEXT')}</span>
                </button>
                    :
                    <button
                        disabled={!!(currentAction)}
                        onClick={() => {
                            if (post.id) {
                                if (window.confirm(t('DIALOG_CONFIRM_UNPUBLISH'))) {
                                    unpublishPostMutation.mutate(); // Call unpublish mutation
                                }
                            }
                        }}
                        className={cn("flex items-center space-x-2 rounded-full px-4 py-2 mx-auto", "bg-white", "text-[#888888]", buttonTransitionStyles)}
                    >
                        <SquarePen strokeWidth={1.75} className={cn("w-5 h-5", currentAction === 'unpublish' ? "animate-ping" : null)} />
                        <span>{t('UNPUBLISH_BUTTON_TEXT')}</span>
                    </button>
                }
                <button
                    disabled={!(canSaveOrPublish) || !!(currentAction)}
                    title={!(canSaveOrPublish) ? 
                        t('TITLE_MISSING_FOR_ACTION', {
                            postStatus: post.status ?? ''
                        }) 
                        : undefined
                    }
                    onClick={() => {
                        setCurrentAction?.('publish');
                        post.id ? updatePostMutation.mutate("published") : createPostMutation.mutate("published");
                    }}
                    className={cn("bg-green-500 text-white flex items-center space-x-2 rounded-full px-4 py-2", buttonTransitionStyles)}
                >
                    <SendIcon className={cn("w-5 h-5", currentAction === 'publish' ? "animate-ping" : null)} />
                    <span>{post.status !== 'published' ? t('PUBLISH_BUTTON_TEXT') : t('UPDATE_BUTTON_TEXT')}</span>
                </button>
            </div>

            { process.env.NEXT_PUBLIC_DEMO_USERNAME ? <div className="mt-3 font-bold">
                    {t('DEMO_MODE_WARNING_TEXT')}
                </div> : null }

            <div className="mt-5 text-center text-[15px] text-[#888888]">
            </div>

        </div>
    );
}



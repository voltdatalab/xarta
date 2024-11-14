import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { HOME } from "@/config/config";
import { GhostPost } from "@/components/types/GhostPost";
import { PUBLIC_NEXT_API_BASE_URL } from "@/config/config";
import { SendIcon } from "./Icons/SendIcon";
import { TrashIcon } from "./Icons/TrashIcon";
import { EditarCardProps } from "../functional/EditarCard/EditarCardProps";
import { cn } from "@/lib/utils";
import { NotepadTextDashed, Save, SquarePen } from 'lucide-react'
import { buttonTransitionStyles } from "./Home/RoundedFullButton";
import { Dispatch, SetStateAction } from "react";
import { ActionType } from "../functional/EditarCard/EditarCard";
import { deletePost } from '../ghost-api/deletePost';
import { updatePost } from '../ghost-api/updatePost';
import { createPost } from '../ghost-api/createPost';
import { useToast } from "../ui/use-toast";

export default function PublicarCard({ id, checked, onChange, post, mode, currentAction, setCurrentAction }: { id?: GhostPost["id"], mode: EditarCardProps["mode"], currentAction?: ActionType, setCurrentAction?: Dispatch<SetStateAction<ActionType>>, checked: boolean, onChange?: (v: boolean) => void, post: EditarCardProps["post"] }) {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { toast } = useToast();

    const deletePostMutation = useMutation({
        mutationFn: async () => {
            setCurrentAction?.('erase');
            await deletePost(post.id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['post', id] }); // Assuming 'posts' is the query key for fetching posts
            router.push(HOME);
        },
        onError: (error) => {
            toast({
                title: 'Erro ao remover o post',
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
            });
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
                title: 'Erro ao atualizar o post',
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
                title: 'Erro ao criar o post',
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
                title: 'Erro ao despublicar o post',
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
                    <label htmlFor="cc-attribution">Eu <span className="font-bold">concordo</span> em reproduzir esse contexto em outros sites sob licença
                        Creative Commons <span className="font-light">(opcional).</span></label>
                </span>
            </div>
            <div className="flex space-x-4 mt-9 justify-center text-[15px]">
                <button
                    disabled={!(post.id) || !!(currentAction)}
                    title={!(post.id) ? "Não é possível apagar o seu Xarta pois ele ainda não foi salvo ou publicado." : undefined}
                    onClick={() => {
                        if (window.confirm(`Você tem certeza que deseja ${mode === 'create' ? "descartar" : "apagar"} esse card?`)) {
                            if (mode === 'edit') {
                                deletePostMutation.mutate();
                            }
                        }
                    }}
                    className={cn("bg-red-500 text-white flex items-center space-x-2 rounded-full px-4 py-2", (mode === 'create') ? "opacity-50 grayscale" : "", buttonTransitionStyles)}
                >
                    <TrashIcon className={cn("w-5 h-5", currentAction === 'erase' ? "animate-ping" : null)} />
                    <span>Apagar </span>
                </button>
                {!(post.status) || (post.status === 'draft') ? <button
                    disabled={!(canSaveOrPublish) || !!(currentAction)}
                    title={!(canSaveOrPublish) ? "Por favor inclua um título e contexto para salvar o seu Xarta" : undefined}
                    onClick={() => {
                        setCurrentAction?.('save');
                        post.id ? updatePostMutation.mutate("draft") : createPostMutation.mutate("draft")
                    }}
                    className={cn("bg-[#4B31DD] text-white flex items-center space-x-2 rounded-full px-4 py-2", buttonTransitionStyles)}
                >
                    <Save className={cn("w-5 h-5", currentAction === 'save' ? "animate-ping" : null)} strokeWidth={1.75} />
                    <span>{`Salvar`}</span>
                </button>
                    :
                    <button
                        disabled={!!(currentAction)}
                        onClick={() => {
                            if (post.id) {
                                if (window.confirm(`Você tem certeza que deseja despublicar esse card?`)) {
                                    unpublishPostMutation.mutate(); // Call unpublish mutation
                                }
                            }
                        }}
                        className={cn("flex items-center space-x-2 rounded-full px-4 py-2 mx-auto", "bg-white", "text-[#888888]", buttonTransitionStyles)}
                    >
                        <SquarePen strokeWidth={1.75} className={cn("w-5 h-5", currentAction === 'unpublish' ? "animate-ping" : null)} />
                        <span>Despublicar</span>
                    </button>
                }
                <button
                    disabled={!(canSaveOrPublish) || !!(currentAction)}
                    title={!(canSaveOrPublish) ? `Por favor inclua um título e contexto para ${post.status !== 'published' ? "publicar" : 'atualizar'} o seu Xarta` : undefined}
                    onClick={() => {
                        setCurrentAction?.('publish');
                        post.id ? updatePostMutation.mutate("published") : createPostMutation.mutate("published");
                    }}
                    className={cn("bg-green-500 text-white flex items-center space-x-2 rounded-full px-4 py-2", buttonTransitionStyles)}
                >
                    <SendIcon className={cn("w-5 h-5", currentAction === 'publish' ? "animate-ping" : null)} />
                    <span>{post.status !== 'published' ? `Publicar` : `Atualizar`}</span>
                </button>
            </div>

            { process.env.NEXT_PUBLIC_DEMO_USERNAME ? <div className="mt-3 font-bold">
                    Atenção: Este é apenas um usuário de teste e não possui permissão para atualizar, publicar ou remover posts.
                </div> : null }

            <div className="mt-5 text-center text-[15px] text-[#888888]">
            </div>

        </div>
    );
}



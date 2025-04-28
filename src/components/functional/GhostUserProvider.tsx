"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ChildrenProps } from '@/lib/utils';
import { fetchGhostUser } from '../ghost-auth/fetchGhostUser';
import { XartaConfig } from "@/config/XartaConfig";
import { ConfigPublicRootUrl } from '../ghost-api/admin/fetchPost';


export async function fetchSettings(
    {config}: 
    {config: Pick<XartaConfig, "PUBLIC_NEXT_API_BASE_URL"> & ConfigPublicRootUrl}) {
    const response = await fetch(`${config.PUBLIC_NEXT_API_BASE_URL}/get-settings`);
    if (!response.ok) {
        throw new Error('Failed to fetch tags');
    }
    return response.json();
}

// Create a Context for the user data
const UserContext = createContext<any>(null);

// Custom hook to consume the UserContext
export const useGhostUser = () => {
    return useContext(UserContext);
};

// UserProvider component to fetch user data and provide it to children
export const UserProvider = (
    { children, config }: 
    ChildrenProps & {config: Pick<XartaConfig, "PUBLIC_NEXT_API_BASE_URL"> & ConfigPublicRootUrl} ) => {
    // Fetch user data using TanStack Query
    // const { data: user, error: isErrorUser, isLoading: isLoadingUser } = useQuery({
    //     queryKey: ['user'],
    //     queryFn: fetchGhostUser
    // });

    const [{user, isLoadingUser, isErrorUser}, setUser] = useState<{
        user: any,
        isErrorUser: any,
        isLoadingUser: any
    }>({
        user: undefined,
        isErrorUser: undefined,
        isLoadingUser: true
    });

    useEffect(() => {
        setUser({
            user: undefined,
            isErrorUser: false,
            isLoadingUser: true
        })
        fetchGhostUser({config}).then(data => {
            setUser({
                user: data,
                isErrorUser: false,
                isLoadingUser: false
            })
        })
        .catch(() => {
            setUser({
                user: undefined,
                isErrorUser: true,
                isLoadingUser: false
            })
        })
    }, [])

    console.log('in UserProvider', {
        user,
        isLoadingUser,
        isErrorUser
    })

    // const { data: user, error: isErrorUser, isLoading: isLoadingUser } = useQuery({
    //     queryKey: ['user'],
    //     queryFn: fetchGhostUser
    // });

    const {data: settings } = useQuery({
        queryKey: ['settings'],
        queryFn: () => fetchSettings({config})
    })

    // Provide user data to all children through context
    return (
        <UserContext.Provider value={{
            user,
            isLoadingUser,
            isErrorUser,
            settings
        }}>
            {children}
        </UserContext.Provider>
    );
};
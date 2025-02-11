"use client";

import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ChildrenProps } from '@/lib/utils';
import { PUBLIC_NEXT_API_BASE_URL } from '@/config/config';
import { fetchGhostUser } from '../ghost-auth/fetchGhostUser';


export async function fetchSettings() {
    const response = await fetch(`${PUBLIC_NEXT_API_BASE_URL}/get-settings`);
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
export const UserProvider = ({ children }: ChildrenProps) => {
    // Fetch user data using TanStack Query
    const { data: user, error: isErrorUser, isLoading: isLoadingUser } = useQuery({
        queryKey: ['user'],
        queryFn: fetchGhostUser
    });

    const {data: settings } = useQuery({
        queryKey: ['settings'],
        queryFn: fetchSettings
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
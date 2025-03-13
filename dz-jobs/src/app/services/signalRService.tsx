import { createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { HubConnectionBuilder, HubConnection } from '@microsoft/signalr';

// SignalR connection setup
let connection: HubConnection | null = null;

const connectSignalR = (userId: string) => {
    connection = new HubConnectionBuilder()
        .withUrl(`https://localhost:5001/chathub`, {
            accessTokenFactory: () => localStorage.getItem('token') || ''
        })
        .build();

    connection.on('ReceiveMessage', (senderId: string, message: string) => {
        console.log(`Message from ${senderId}: ${message}`);
        // Dispatch a custom action to update state or send message to the component
    });

    connection.start().then(() => {
        console.log('SignalR Connected');
        if (connection) {
            connection.invoke('AddToGroup', userId); // Add user to SignalR group
        }
    }).catch((err) => console.error('SignalR Connection failed:', err));
};

// Define RTK API Service for SignalR
export const signalRApi = createApi({
    reducerPath: 'signalRApi',
    baseQuery: fetchBaseQuery({ baseUrl: '' }), // No base URL since this is real-time data
    endpoints: (builder) => ({
        sendMessage: builder.mutation<void, { senderId: string; receiverId: string; message: string }>({
            queryFn: async ({ senderId, receiverId, message }) => {
                try {
                    if (connection) {
                        await connection.invoke('SendMessage', senderId, receiverId, message);
                        return { data: undefined as void };
                    }
                    return { error: { status: 'CUSTOM_ERROR', data: 'Connection is not established' } as FetchBaseQueryError };
                } catch (err) {
                    return { error: { status: 'CUSTOM_ERROR', data: (err as Error).message || 'Error sending message' } as FetchBaseQueryError };
                }
            },
        }),
    }),
});

export const { useSendMessageMutation } = signalRApi;
export { connectSignalR };

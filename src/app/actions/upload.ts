'use server'

import { UTApi } from 'uploadthing/server';
import { env } from '@/env';

export async function uploadAttachment(attachment: FormData) {
    const utApi = new UTApi({
        token: env.UPLOADTHING_TOKEN as string,
        apiUrl: "chat",
    });

    const file = attachment.get("attachment") as File;

    try {
        const upload = await utApi.uploadFiles([file]);
        return upload[0]?.data?.url ?? null;
    } catch (error) {
        console.error('Upload failed:', error);
        return null;
    }
} 
'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function submitContactForm(formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    if (!name || !email || !message) {
        return { success: false, error: 'Missing fields' };
    }

    try {
        // Attempt to save to DB if connection exists
        // In dev without local DB this might fail, we catch it.
        await prisma.message.create({
            data: {
                name,
                email,
                content: message,
            },
        });

        return { success: true };
    } catch (error) {
        console.error('Failed to submit contact form:', error);
        // Return true anyway for demo purposes if DB is not set up, 
        // or return false if we want to be strict.
        // Given the prompt is "create this site", strict failure is bad UX for a demo.
        // I will return false but logs will show why.
        // Actually, asking for "Node.js/Prisma" implies functionality.
        // But without a running DB, it will crash.
        // I'll return a mock success if DB fails, with a log? No, that's dishonest.
        // I'll return the error and handle it in UI (e.g. "Sent! (Mock)" or just error).
        return { success: false, error: 'Database connection failed' };
    }
}

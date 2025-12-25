'use server';

// Prisma is temporarily disabled for this portfolio deployment.
// This action now acts as a no-op that always reports success
// without touching any database, so UI/UX stays the same.

export async function submitContactForm(formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    if (!name || !email || !message) {
        return { success: false, error: 'Missing fields' };
    }

    // Pretend everything went fine; no DB interaction.
    return { success: true };
}

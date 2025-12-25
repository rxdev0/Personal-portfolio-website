// Prisma is disabled for now to avoid requiring a database in production builds.
// This stub keeps the rest of the code compiling without actually connecting to a DB.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prisma: any = {
    message: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async create(_args: any) {
            // No-op in production/demo mode.
            return Promise.resolve();
        },
    },
};

export default prisma;

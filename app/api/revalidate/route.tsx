import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        const { slug } = await request.json();

        // Log the slug for debugging purposes
        console.log(`Revalidating path: /${slug.join('/')}`);

        // Revalidate the specified path
        await revalidatePath(`/${slug.join('/')}`, "page");

        return NextResponse.json({ message: `Path /${slug.join('/')} revalidated successfully` });
    } catch (error) {
        console.error('Error revalidating path:', error);
        return NextResponse.json({ message: 'Error revalidating path' }, { status: 500 });
    }
}   
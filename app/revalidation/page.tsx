"use client";

import { useState } from "react";

// text input to revalidate a particular page
export default function RevallidationPage() {

    const [result, setResult] = useState<string | null>(null);

    const handleRevalidate = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const slug = formData.get("slug") as string;

        try {
            const response = await fetch("/api/revalidate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ slug: slug.split("/") }),
            });

            const data = await response.json();
            setResult(data.message);
        } catch (error) {
            console.error("Error revalidating path:", error);
            setResult('Error revalidating path');
        }
    };

    return (
    <div className="space-y-3">
        
        <h1>Revalidation Page</h1>

        <form onSubmit={handleRevalidate}>
            <input type="text" name="slug" placeholder="Enter slug (e.g., en/blog/)" required />
            <button type="submit">Revalidate</button>
        </form>

        {result && <p>{result}</p>}

    </div>);
}
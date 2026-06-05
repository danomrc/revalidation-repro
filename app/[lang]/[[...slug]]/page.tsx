interface GeneratedPath {
	lang?: string;
	slug: string[];
}

export const dynamicParams = true;

export const dynamic = "force-static";

export async function generateStaticParams(): Promise<GeneratedPath[]> {

	// Add locale URLs to the generated paths
	const generatedPathsWithLocales: GeneratedPath[] = [
        {lang: 'en', slug: []}, 
        {lang: 'en', slug: ['example']}, 
        {lang: 'en', slug: ['blog', 'post-1']},
        {lang: 'en', slug: ['blog', 'post-2']},
    ];

	
	return generatedPathsWithLocales;
}


export default async function Page(props: {
	params: Promise<GeneratedPath>;
}): Promise<React.JSX.Element> {
    const params = await props.params;

    console.log('Received params:', params); // Log the received parameters for debugging
	const { slug, lang } = params;

    // Timestamp when the page is generated
    const generationTime = new Date().toISOString();
    console.log(`Page generated at: ${generationTime}`);

    return (<div>
        <h1>Generated Page</h1>
        <p>Language: {lang || 'default'}</p>
        <p>Slug: {slug?.join('/') || 'home'}</p>
        <p>Page generated at: {generationTime}</p>
    </div>);
}
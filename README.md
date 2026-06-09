## Testing the revalidation behaviour of this nextjs 15 project's internationalised + optional catch all routes.

The project pre-renders 5 pages at build time using `generateStaticParams`.

All routes are composed of `lang` and `slug` segments.

After the build completes and the app is started, we expect all pre-rendered pages to be served statically. This is the case.

We now want to invalidate the cache for one specific page. In a real app this would happen autimatically after some data update. Here, we have two methods to trigger the revalidation; using the text box on the `/revalidation` page, or sending a POST request to `/api/revalidate` with a body like this:

{
  "slug": ["en","blog"]
}

Note: if sending a POST request from postman or bruno to Vercel, you'll need to add an `x-vercel-protection-bypass` deployment protection token on the header.

In the deployment's logs, confirm that the `revalidate` route was hit. Now visit the revalidated page, in this case `/en/blog`. Look at the logs and you'll see that a Vercel function instance was used to render the page (i.e. the page was re-rendered).

Now visit a prerendered subpage like `/en/blog/post-1`. Observe the logs, this page is also re-rendered which is behaviour we don't want.


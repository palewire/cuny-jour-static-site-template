<!--
  This is your PAGE!
-->
<script>
  // Import all the news furniture components
  import ArticleHeader from '$lib/components/ArticleHeader.svelte';
  import ArticleBody from '$lib/components/ArticleBody.svelte';
  import ImageWithCaption from '$lib/components/ImageWithCaption.svelte';
  import RelatedLinks from '$lib/components/RelatedLinks.svelte';

  // Article metadata
  let headline = 'City Council Approves $2.5 Billion Budget for Parks Expansion';
  let byline = 'Jane Smith';
  let pubDate = '2024-01-15';

  // Related stories
  const relatedStories = [
    { headline: 'Mayor Announces New Transit Plan for Downtown Area', href: '#' },
    { headline: 'Budget Talks Continue as Deadline Approaches', href: '#' },
    { headline: 'Local Schools See Record Enrollment This Fall', href: '#' },
  ];
</script>

<!-- This sets the page title in the browser tab -->
<svelte:head>
  <title>{headline} | NYCity News Service</title>
  <meta name="description" content="The City Council voted 8-3 Tuesday night to approve a $2.5 billion parks expansion plan." />
</svelte:head>

<!-- Your page content goes here -->
<div class="container">
  
  <!-- Article Header: Headline, byline, and publication date -->
  <ArticleHeader
    {headline}
    {byline}
    {pubDate}
  />

  <!-- Lead Image: Main photo for the story -->
  <ImageWithCaption
    src="https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?w=800&q=80"
    alt="Aerial view of a city park with walking paths and green spaces"
    caption="The new budget includes funding for three new parks across the city, including expanded green spaces in underserved neighborhoods."
    credit="Photo by Unsplash"
  />

  <!-- Article Body: The main story text with proper typography -->
  <ArticleBody dropCap={true}>
    <p>
      The City Council voted 8-3 Tuesday night to approve a landmark $2.5 billion parks expansion plan, the largest investment in public green spaces in the city's history. The measure, which had been debated for nearly six months, will fund the creation of three new parks and the renovation of 15 existing ones over the next decade.
    </p>

    <p>
      "This is a transformative moment for our city," said Mayor Eleanor Vance after the vote. "Every resident, regardless of their neighborhood, deserves access to quality green spaces. This budget makes that a reality."
    </p>

    <p>
      The plan allocates $1.2 billion for new park construction, with the remaining funds dedicated to infrastructure improvements, maintenance facilities, and community programming. Critics of the measure, including Council Member Robert Chen, argued that the spending was excessive given other pressing city needs.
    </p>

    <blockquote>
      <p>"While I support parks in principle, we have roads crumbling and schools that need repair. This is a question of priorities."</p>
    </blockquote>

    <p>
      The three new parks will be located in the Eastside, Northgate, and Riverside districtsareas that currently have the least green space per capita. Environmental advocates praised the decision as a crucial step toward climate resilience and public health.
    </p>

    <h2>What's Next</h2>

    <p>
      Construction on the first new park is expected to begin in spring 2025, with completion targeted for late 2027. The Parks Department will hold community input sessions next month to gather feedback on design priorities.
    </p>

    <p>
      Residents can submit comments through the city's online portal through February 28. The full budget breakdown is available on the city's website.
    </p>
  </ArticleBody>

  <!-- Related Stories: Links to other articles -->
  <RelatedLinks
    title="Related Stories"
    links={relatedStories}
  />

</div>

<style>
  /* Styles here only apply to this page */
  .container {
    padding: var(--spacing-xl) var(--spacing-md);
  }
</style>
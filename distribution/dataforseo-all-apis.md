https://docs.dataforseo.com/v3/
Below is a practical catalog of the main DataForSEO APIs, their available functionality, the outcomes they return, and example datapoints suitable for dashboards or visualizations.

    DataForSEO has many individual endpoints, so this is organized by API family and endpoint capability rather than listing every URL parameter. The complete endpoint directory is available in the .

1. SERP API

Documentation:

The SERP API returns search results for a keyword, search engine, location, language, device, and operating system.
Supported search engines and search types

    Google Organic
    Google AI Mode
    Google Maps
    Google Local Finder
    Google News
    Google Events
    Google Images
    Google Search by Image
    Google Jobs
    Google Autocomplete
    Google Dataset Search
    Google Dataset Info
    Google Ads Advertisers
    Google Ads Search
    Google Finance Explore
    Google Finance Markets
    Google Finance Quote
    Google Finance Ticker Search
    Bing
    YouTube
    Yahoo
    Baidu
    Naver
    Seznam

Main functions
Function	Outcome
Regular	Organic and paid results, primarily for Google Organic
Advanced	Complete structured SERP, including SERP features
HTML	Raw SERP HTML
Screenshot	SERP screenshot
AI Summary	AI-generated summary from compatible SERPs
Example datapoints for visualization
json

{
  "keyword": "best running shoes",
  "location": "United States",
  "device": "desktop",
  "rank_absolute": 1,
  "rank_group": 1,
  "type": "organic",
  "domain": "example.com",
  "title": "Best Running Shoes",
  "url": "https://example.com/running-shoes",
  "etv": 12500,
  "pixel_position": 420,
  "serp_feature": "organic"
}

Useful visualizations:

    Ranking-position line chart
    Share of SERP by domain
    SERP-feature distribution
    Organic versus paid-result ratio
    Pixel-visibility chart
    Local-pack map
    AI Overview presence by keyword
    Search-result screenshot gallery

Google SERP can provide both traditional rank sequence using rank_group and rank_absolute, and pixel ranking when calculate_rectangles is enabled.
2. Keywords Data API

Documentation:

This API provides keyword metrics primarily from Google Ads, Bing Ads, Google Trends, and related DataForSEO sources.
Google Ads endpoints

    Search Volume
    Keywords for Site
    Keywords for Keywords
    Ad Traffic by Keywords
    Google Trends Explore

Bing Ads endpoints

    Search Volume
    Keywords for Site
    Keywords for Keywords
    Keyword Performance

Main outcomes

    Search volume
    Monthly search volume history
    Cost per click
    Competition
    Competition index
    Keyword ideas
    Keywords associated with a website
    Estimated advertising traffic
    Estimated advertising cost
    Bing keyword performance

Example datapoints
json

{
  "keyword": "running shoes",
  "location_code": 2840,
  "language_code": "en",
  "search_volume": 110000,
  "cpc": 1.82,
  "competition": 0.74,
  "monthly_searches": [
    {
      "year": 2026,
      "month": 1,
      "search_volume": 90500
    },
    {
      "year": 2026,
      "month": 2,
      "search_volume": 110000
    }
  ]
}

Useful visualizations:

    Search-volume trend chart
    CPC versus search-volume bubble chart
    Keyword opportunity matrix
    Competition heatmap
    Monthly demand seasonality chart
    Keyword-group comparison
    Paid-traffic forecast

Keyword restrictions imposed by Google and Microsoft advertising policies may prevent results for certain categories. If one prohibited keyword is included in a batch, the whole batch may fail to return data.
3. DataForSEO Trends API

Documentation:

DataForSEO Trends provides keyword popularity data over time and across locations. It covers:

    Google Search
    Google News
    Google Shopping

The documentation also recommends considering both the Google Trends API and DataForSEO Trends API when keyword-trend data is required.
Endpoints

    Explore
    Subregion Interests
    Demography
    Merged Data

Main outcomes

    Relative keyword popularity over time
    Comparison between keywords
    Popularity by subregion
    Age distribution
    Gender distribution
    Search, News, and Shopping trend data

Up to five keywords can be compared on a relative scale.
Example datapoints
json

{
  "keyword": "running shoes",
  "date": "2026-02-01",
  "value": 82,
  "location": "United States",
  "source": "google_search"
}

Example demographic data:
json

{
  "keyword":running shoes",
  "age_group": "25-34",
  "gender": "female",
  "relative_interest": 61
}

Useful visualizations:

    Trend line chart
    Keyword comparison chart
    Regional choropleth map
    Age-distribution bar chart
    Gender-distribution chart
    Search versus News versus Shopping trend chart
    Seasonal-interest calendar

4. Clickstream Data API

Documentation:

Clickstream Data API provides an alternative source of search-volume data to Google Ads.
Endpoints

    Global Search Volume
    DataForSEO Search Volume
    Bulk Clickstream Search Volume
    Locations and Languages

Main outcomes

    Clickstream-based search volume
    Global geographic distribution
    Search-volume history for up to 12 months
    Search volume normalized with Bing or clickstream data
    Location and language availability

Example datapoints
json

{
  "keyword": "running shoes",
  "search_volume": 98000,
  "location": "United States",
  "month": "2026-02",
  "source": "clickstream"
}

Useful visualizations:

    Global search-demand map
    Twelve-month trend chart
    Clickstream versus Google Ads comparison
    Geographic demand table
    Location-by-keyword heatmap

5. DataForSEO Labs API

Documentation:

DataForSEO Labs is designed for keyword research, competitor research, ranking analysis, and search analytics. It uses DataForSEO’s in-house keyword, SERP, and domain databases.

It supports:

    Google
    Amazon
    Google Play
    App Store

5.1 Google Labs

Documentation:
Keyword research

    Keywords for Site
    Related Keywords
    Keyword Suggestions
    Keyword Ideas
    Bulk Keyword Difficulty
    Search Intent
    Keyword Overview
    Historical Keyword Data

Market-specific analysis

    Categories for Domain
    Keywords for Categories
    Domain Metrics by Categories
    Top Searches

Competitor research

    Ranked Keywords
    SERP Competitors
    Competitors Domain
    Domain Intersection
    Subdomains
    Relevant Pages
    Domain Rank Overview
    Historical SERPs
    Historical Rank Overview
    Page Intersection
    Bulk Traffic Estimation

Example Google Labs datapoints
json

{
  "keyword": "running shoes",
  "search_volume": 110000,
  "keyword_difficulty": 67,
  "search_intent": "commercial",
  "cpc": 1.82,
  "competition": 0.74,
  "ranked_position": 4,
  "etv": 8400,
  "domain_rank": 71,
  "page_rank": 65
}

Useful visualizations:

    Keyword difficulty versus traffic-potential chart
    Competitor overlap Venn diagram
    Ranking distribution histogram
    Domain visibility comparison
    Historical traffic line chart
    Keyword-intent distribution
    Category opportunity dashboard
    Top-ranking pages table
    traffic leaderboard

5.2 Amazon Labs

Documentation:
Endpoints

    Bulk Search Volume
    Related Keywords
    Ranked Keywords
    Product Rank Overview
    Product Competitors
    Product Keyword Intersections

Example datapoints
json

{
  "keyword": "wireless headphones",
  "search_volume": 74000,
  "asin": "B000EXAMPLE",
  "rank": 7,
  "rating": 4.6,
  "review_count": 12840
}

Useful visualizations:

    Product-ranking history
    ASIN competitor matrix
    Keyword intersection chart
    Search-volume opportunity table
    Product rating versus ranking chart

5.3 Google Play Labs

Documentation:
Endpoints

    App Competitors
    Keywords for App
    Bulk App Metrics
    App Intersection

Example datapoints
json

{
  "app_id": "com.example.app",
  "keyword": "budget planner",
  "rank": 3,
  "search_volume": 12000,
  "rating": 4.5,
  "reviews": 8430
}

Useful visualizations:

    App keyword-ranking chart
    App visibility comparison
    Competitor intersection matrix
    Rating and review comparison
    App ranking distribution

5.4 App Store Labs

Documentation:

The App Store functionality includes:

    App Competitors
    Keywords for App
    Bulk App Metrics
    App Intersection

Example visualization datapoints are similar to Google Play:

    App ID
    Keyword
    Keyword ranking
    Search volume
    Rating
    Review count
    Competitor app
    Ranking change

6. OnPage API

Documentation:

OnPage API crawls websites and pages to evaluate technical and on-page SEO performance.
Crawling and audit endpoints

    Task Post
    Summary
    Pages
    Pages by Resource
    Resources
    Duplicate Tags
    Duplicate Content
    Links
    Redirect Chains
    Non-indexable
    Waterfall
    Keyword Density
    Raw HTML
    Instant Pages
    Page Screenshot
    Force Stop

Main outcomes

    Crawl progress
    HTTP status codes
    Page titles and descriptions
    Duplicate title and description tags
    Duplicate content
    Broken links
    Internal and external links
    Redirect chains
    Non-indexable pages
    Resource usage
    Page-speed data
    Core Web Vitals
    Keyword frequency and density
    Raw HTML
    Page screenshots

Example datapoints
json

{
  "url": "https://example.com/running-shoes",
  "status_code": 200,
  "title": "Running Shoes | Example",
  "title_length": 26,
  "description_length": 142,
  "is_indexable": true,
  "internal_links_count": 38,
  "external_links_count": 12,
  "largest_contentful_paint": 2.4,
  "cumulative_layout_shift": 0.08,
  "load_time": 1.9,
  "word_count": 1240
}

Useful visualizations:

    Technical issue severity chart
    Crawl-progress chart
    URL status-code breakdown
    Core Web Vitals distribution
    Page-speed waterfall
    Internal-link graph
    Redirect-chain table
    Duplicate-content cluster diagram
    Keyword-density table
    Indexability report

Additional crawling parameters can load resources, execute JavaScript, enable browser rendering, calculate keyword density, apply custom JavaScript, and store raw HTML. Some parameters incur additional charges.
7. Backlinks API

Documentation:

Backlinks API provides live-index backlink data for domains, subdomains, and webpages.
Main endpoints

    Summary
    History
    Backlinks
    Anchors
    Domain Pages
    Domain Pages Summary
    Referring Domains
    Referring Networks
    Competitors
    Domain Intersection
    Page
    Timeseries Summary
    New & Lost Timeseries

Bulk endpoints

    Bulk Ranks
    Bulk Backlinks
    Bulk Spam Score
    Bulk Referring Domains
    Bulk New Backlinks
    Bulk Lost Backlinks
    Bulk New Referring Domains
    Bulk Lost Referring Domains

Main outcomes

    Total backlinks
    Referring domains
    Referring pages
    Anchor text
    Link attributes
    New and lost links
    New and lost referring domains
    Spam score
    Domain rank
    Page rank
    Backlink history
    Competitor overlap
    Referring networks

Example datapoints
json

{
  "target": "example.com",
  "backlinks": 245000,
  "referring_domains": 3840,
  "referring_pages": 15700,
  "domain_rank": 71,
  "page_rank": 65,
  "spam_score": 4,
  "new_backlinks_30d": 820,
  "lost_backlinks_30d": 210
}

Useful visualizations:

    Backlink-growth line chart
    New-versus-lost backlinks chart
    Referring-domain trend
    Anchor-text distribution
    Spam-score histogram
    Link-type breakdown
    Referring-country map
    Competitor backlink comparison
    Domain-intersection matrix
    Top-linked-pages table

8. Domain Analytics API

Documentation:

Domain Analytics provides website technology intelligence and Whois data enriched with SEO metrics.
8.1 Technologies API

Documentation:
Endpoints

    Aggregation Technologies
    Technologies Summary
    Technology Stats
    Domains by Technology
    Domains by HTML Terms
    Domain Technologies

Main outcomes

    Technologies used by a domain
    Domains using a specific technology
    Technology adoption by country
    Technology adoption by language
    Historical technology usage
    Technology categories and groups
    Related or commonly co-occurring technologies
    Domains matching homepage HTML terms

Example datapoints
json

{
  "technology": "Shopify",
  "category": "Ecommerce",
  "country": "United States",
  "domains_count": 184000,
  "share": 12.4,
  "date": "2026-02-01"
}

Useful visualizations:

    Technology market-share chart
    Technology adoption timeline
    Country-by-technology heatmap
    Technology co-occurrence network
    Domains using a technology table
    Technology-category treemap

8.2 Whois API

Documentation:
Main outcomes

    Whois details
    Domain status
    Registration and expiration dates
    Nameservers
    Backlink metrics
    Organic rankings
    Paid rankings
    Organic traffic
    Paid traffic
    Domain visibility

Example datapoints
json

{
  "domain": "example.com",
  "registrar": "Example Registrar",
  "created_date": "2010-05-12",
  "expiration_date": "2027-05-12",
  "domain_status": ["clientTransferProhibited"],
  "organic_traffic": 185000,
  "paid_traffic": 9200,
  "backlinks": 245000
}

Useful visualizations:

    Domain-registration timeline
    Domain-status table
    Organic-versus-paid traffic chart
    Domain visibility leaderboard
    Whois and backlink profile summary

9. Content Analysis API

Documentation:

Content Analysis is designed for brand monitoring, citation discovery, sentiment analysis, and content trends.
Endpoints

    Search
    Summary
    Sentiment Analysis
    Rating Distribution
    Phrase Trends
    Category Trends

Main outcomes

    Citations of a keyword or brand
    Citation URLs and source information
    Positive, negative, and neutral sentiment
    Sentiment connotations:
        Anger
        Happiness
        Love
        Sadness
        Share
        Fun
    Content ratings
    Citation trends over time
    Category-level trends

Example datapoints
json

{
  "keyword": "example brand",
  "date": "2026-02-15",
  "citations": 1380,
  "positive": 820,
  "neutral": 410,
  "negative": 150,
  "rating": 4.2
}

Useful visualizations:

    Brand-mention trend chart
    Sentiment-stacked area chart
    Positive/negative sentiment ratio
    Citation-source leaderboard
    Rating distribution
    Phrase-trend chart
    Category-trend chart
    Citation network graph

Filtering and sorting rules can be applied to Search results without additional fees.
10. AI Optimization API

Documentation:

AI Optimization API provides data for AI-search optimization, LLM benchmarking, conversational search, and AI keyword research.
10.1 LLM Responses API

Documentation:

Supports structured responses from leading LLMs, including:

    ChatGPT
    Claude
    Gemini
    Perplexity

Possible outcomes:

    Model response
    Prompt-response comparison
    Model latency
    Token usage
    Response metadata
    Structured answer content

Visualization datapoints:
json

{
  "model": "chatgpt",
  "prompt": "What are the best running shoes?",
  "response_length": 1840,
  "input_tokens": 18,
  "output_tokens": 412,
  "latency_ms": 2450
}

Visualizations:

    Response-latency comparison
    Token-usage chart
    Model-output comparison
    Prompt-performance dashboard

10.2 LLM Scraper API

Documentation:

Provides results from scraped ChatGPT searches based on keywords and other parameters.

Possible outcomes:

    Search response
    Mentioned brands
    Referenced domains
    Cited URLs
    Position or appearance in the response
    Response text
    Search context

Visualization datapoints:
json

{
  "keyword": "best project management software",
  "brand": "Example Brand",
  "mentioned": true,
  "mention_position": 2,
  "cited_url": "https://example.com",
  "competitor_count": 5
}

Visualizations:

    AI-brand visibility chart
    Mention-share chart
    Cited-domain leaderboard
    Competitor comparison
    AI-response monitoring timeline

10.3 AI Keyword Data API

Documentation:

Provides search-volume estimates and intent insights based on keyword usage in AI tools.

Possible outcomes:

    AI search volume
    Keyword usage estimates
    User intent
    Keyword popularity
    AI-search opportunity

Example:
json

{
  "keyword": "best accounting software for freelancers",
  "ai_search_volume": 4200,
  "intent": "commercial",
  "competition": 0.61
}

Visualizations:

    AI keyword-demand chart
    Intent distribution
    AI opportunity matrix
    Traditional-search versus AI-search comparison

10.4 LLM Mentions API

Documentation:

Provides keyword, brand, and website mentions in LLM responses.

Possible outcomes:

    AI search volume
    Impressions
    Mentions count
    Brand visibility
    Website visibility
    Citation information
    Competitor mentions

Example:
json

{
  "brand": "Example Brand",
  "ai_search_volume": 12500,
  "impressions": 7400,
  "mentions": 1830,
  "visibility_rate": 0.586
}

Visualizations:

    AI mention-share chart
    Brand visibility trend
    Impressions versus mentions
    Competitor visibility chart
    LLM-by-LLM comparison

11. Merchant API

Documentation:

Merchant API provides e-commerce data from Google Shopping and Amazon.
Google Shopping

    Product listings
    Product details
    Product specifications
    Prices
    Sellers
    Product URLs
    Advertised-product data
    Seller ad URLs

Amazon

    Organic product results
    Paid product results
    Product information
    ASINs
    Product variations
    Prices
    Ratings
    Reviews

Example datapoints
json

{
  "product_name": "Wireless Headphones",
  "price": 89.99,
  "currency": "USD",
  "seller": "Example Store",
  "rating": 4.6,
  "reviews": 12840,
  "rank": 3,
  "availability": "in_stock"
}

Useful visualizations:

    Price-monitoring line chart
    Seller-price comparison
    Product-ranking chart
    Rating-versus-price scatter plot
    Product-availability table
    Marketplace share comparison

Merchant API supports Advanced and HTML functions and uses the Standard retrieval method.
12. Business Data API

Documentation:

Business Data API provides publicly available business information and reviews from:

    Google
    Trustpilot
    Tripadvisor
    Social Media
    Business Listings Database

Main outcomes

    Business name
    Address
    Phone
    Website
    Business category
    Opening hours
    Popular hours
    Rating
    Review count
    Review text
    Review author
    Review date
    Review sentiment, where supported
    Business coordinates

Example datapoints
json

{
  "business_name": "Example Coffee",
  "category": "Coffee shop",
  "city": "New York",
  "rating": 4.6,
  "review_count": 1840,
  "phone": "+1-212-555-0100",
  "latitude": 40.7128,
  "longitude": -74.0060,
  "open_now": true
}

Useful visualizations:

    Business-location map
    Rating distribution
    Review-volume timeline
    Competitor comparison
    Popular-hours chart
    Category-density map
    Review sentiment dashboard

13. App Data API

Documentation:

App Data API provides information about apps listed on Google Play and the App Store.
Main outcomes

    App rankings
    App ratings
    Review counts
    Review content
    App descriptions
    App collections
    App category
    App price
    App identifiers
    App metadata
    Search results for app-related keywords

Example datapoints
json

{
  "app_id": "com.example.app",
  "app_name": "Example Planner",
  "category": "Productivity",
  "rank": 8,
  "rating": 4.5,
  "review_count": 8430,
  "price": 0,
  "platform": "Google Play"
}

Useful visualizations:

    App-ranking timeline
    Rating-versus-review-count chart
    Category-ranking table
    App-feature comparison
    Review-volume chart
    App collection network

The Advanced function provides structured app results. HTML is available only for Google App Data endpoints.
14. DataForSEO Databases

Documentation:

Databases are designed for large-scale or recurring data requirements.
Available databases
Google

    Regular Google SERP Database
    Advanced Google SERP Database
    Historical Google SERP Database
    Google Keyword Database
    Historical Google Keyword Database
    Unified Search Google Database
    Unified Search Historical Google Database

Bing

    Bing Keyword Database

Amazon

    Amazon Products Database

Google Play

    Google Play SERPs Database
    Google Play Listings Database

App Store

    App Store SERPs Database
    App Store Listings Database

Other

    Backlink Summary Database
    Business Listings Database
    Whois Domains Database

Example database datapoints

SERP database:
json

{
  "keyword": "running shoes",
  "date": "2026-02-01",
  "rank": 1,
  "domain": "example.com",
  "serp_element": "organic",
  "page_rank": 65,
  "domain_rank": 71
}

Keyword database:
json

{
  "keyword": "running shoes",
  "search_volume": 110000,
  "cpc": 1.82,
  "competition": 0.74
}

Backlink database:
json

{
  "domain": "example.com",
  "backlinks": 245000,
  "referring_domains": 3840,
  "spam_score": 4
}

Business Listings database:
json

{
  "business_name": "Example Coffee",
  "category": "Coffee shop",
  "city": "New York",
  "rating": 4.6,
  "review_count": 1840
}

Databases are especially suitable for:

    Bulk analytics
    Historical reporting
    Internal data warehouses
    Recurring exports
    Large-scale dashboards
    Strict data-storage requirements

If you need a custom database, contact . Custom database terms can be discussed according to data scope, geography, update frequency, and delivery method.
15. Appendix API

Documentation:

The Appendix API provides supporting API functionality.
Typical functions

    API status
    User data
    Locations
    Languages
    Errors
    Sandbox support
    Endpoint metadata
    Task-management utilities

The status endpoint returns information such as:

    API name
    Endpoint status
    Current outage state
    Execution time
    Task count
    Error count

Example:
json

{
  "api": "serp",
  "status": "ok",
  "endpoints": [
    {
      "endpoint": "live",
      "status": "ok"
    },
    {
      "endpoint": "task_post",
      "status": "ok"
    }
  ]
}

Useful visualizations:

    API-health dashboard
    Endpoint-availability matrix
    Error-rate chart
    Request-volume chart
    API-cost monitoring

Retrieval methods and integration patterns

Across the API families, DataForSEO generally supports:
Live

Results are returned immediately in the response.

Commonly used by:

    SERP Live endpoints
    DataForSEO Labs
    Trends
    Clickstream Data
    Backlinks
    Content Analysis
    Domain Analytics
    OnPage Instant Pages and Page Screenshot
    AI Keyword Data
    LLM Mentions

Standard

A task is posted first and retrieved later.

Typical workflow:

    Submit tasks with task_post.
    Receive task IDs.
    Retrieve results with task_get, or use postback_url/pingback_url.
    Store the result and transform it for visualization.

For production integrations, webhooks through postback_url or pingback_url are preferable when available.

Important: for Live endpoints, the POST array must contain exactly one task. If multiple tasks are included, the first is processed and subsequent tasks return:
text

You can set only one task at a time.

Suggested unified visualization schema

To combine data from multiple APIs, normalize results into a common structure:
json

{
  "source_api": "dataforseo_labs",
  "endpoint": "ranked_keywords",
  "entity_type": "domain",
  "entity": "example.com",
  "keyword": "running shoes",
  "location": "United States",
  "date": "2026-02-01",
  "metric": "rank",
  "value": 4,
  "unit": "position",
  "metadata": {
    "search_volume": 110000,
    "cpc": 1.82,
    "keyword_difficulty": 67,
    "search_intent": "commercial"
  }
}

This allows you to build reusable:

    Time-series charts
    Geographic maps
    Leaderboards
    Scatter plots
    Heatmaps
    Funnel reports
    Competitor matrices
    Sentiment dashboards
    Technical-audit dashboards

Example dashboard sections

    Visibility
        SERP rankings
        ETV
        Domain rank
        AI mentions
        Search visibility

    Keyword opportunity
        Search volume
        CPC
        Competition
        Keyword difficulty
        Search intent
        Trend score

    Technical health
        Indexability
        HTTP status
        Core Web Vitals
        Duplicate content
        Broken links
        Redirect chains

    Authority
        Backlinks
        Referring domains
        Spam score
        New and lost links
        Anchor-text distribution

    Market and competitors
        Ranking overlap
        Traffic estimates
        Technology adoption
        Product prices
        Business ratings

    AI search
        AI search volume
        LLM mentions
        Impressions
        Citation URLs
        Competitor visibility
        Response latency

Testing and credentials

You can test supported APIs in the and use the .

For authentication, use the Base64 credential value provided in your DataForSEO email or the credential example shown in Playground. When testing credentials, use only free or sandbox-supported endpoints. API access is available through the .

The catalog above is based on the following official documentation pages:


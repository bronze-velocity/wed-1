

Google Ads API will supply you with highly accurate and up-to-date keyword data from Google Keyword Planner.

Using this API, you can obtain data for a bulk of up to 1000 keywords. Your account will be billed only for setting a task.
Learn more See Docs
Standard Queue
Queue-based system with POST and GET requests
Turnaround time
from 1 to 3 hours depending on the load
Price per task
$0.06
Price per 1M keywords
$60
for 1,000 tasks with up to 1,000 keywords in each task
Live Mode
Real-time results with a single POST request
Turnaround time
up to 7 seconds on average
Price per task
$0.09
Price per 1M keywords
$90
for 1,000 tasks with up to 1,000 keywords in each task

    

Using Google Ads Keywords Data API you can:

    Get Search Volume and other metrics for up to 1000 keywords
    Indicate a domain and obtain up to 2000 Keywords For Site
    Specify up to 20 terms and get up to 20,000 Keywords For Keywords
    Get impressions, CPC, and clicks for up to 1000 terms with Ad Traffic By Keywords

You can get the full list of available endpoints here. The returned results are specific to the parameters indicated in the POST request. We use Google Ads API as a data source. Thus, the locations supported in Google Ads Keyword Data API are identical to Google Geographical Targeting.

Subsequently the restrictions of Keywords Data API are related to Google Advertising Policy. We are not able to return data for keywords that fall into such categories as weapons, tobacco, drugs, violence, terrorism, etc. If you want to learn more about Google restrictions and prohibited categories, check the article on our blog.

Generally, Google updates keyword data in the middle of the month. Use the Google Ads Status‌ endpoint to check if Google updated keyword data for the previous month.
Methods

The cost of using Keywords Data endpoints depends on the selected method of task execution. Available methods are described below.

DataForSEO has two main methods to deliver the results: Standard and Live.

If your system requires delivering instant results, the Live method is the best solution for you. Unlike the Standard method, this method doesn’t require making separate POST and GET requests to the corresponding endpoints.
Note: you can send no more than 12 requests per minute per account using Google Ads Live endpoints.

If you don’t need to receive data in real-time, you can use the Standard method of data retrieval. This method requires making separate POST and GET requests, but it’s more affordable. Using this method, you can retrieve the results after our system collects them.

‌Alternatively, you can specify pingback_url or postback_url when setting a task, and we will notify you on completion of tasks or send them to you respectively.

If you need to set several tasks, you can receive the list of id for all completed tasks using ‘Tasks Ready’ endpoint, and then collect the results of each separate task using ‘Task GET’ endpoint.

Learn more about task completion and obtaining a list of completed tasks in this help center article.

You can send up to 2000 API calls per minute. Contact us if you would like to raise the limit.

Visit DataForSEO Help Center to get practical tips for request handling depending on your Keyword Data API payload volume.‌
Cost

The cost can be calculated on the Pricing page. You can check your spending in your account dashboard or by making a separate call to the User Data endpoint

You can test Google Ads Keywords Data API for free using DataForSEO Sandbox.

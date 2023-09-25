## Working of a browser

Majorly there are 4 events that happen when you type google.com in your browser!

1. DNS Resolution.
2. Fetching the resources.
3. Parsing and executing it.
4. Displaying the content.

Let's learn about each in brief:

## DNS Resolution

DNS Resolution is a process of converting the human redable domain name into numerical IP Address of your remote server.
This can happen in 3 places:

1. Browser's cache - Cached in a recent request.
2. Operating System Cache - Cached during previous lookups.
3. ISP - Internet Service Provider contains DNS resolver which has most common lookups cached.

If no resolution happens in the above 3 stages, the following steps are performed by ISP

- Contact the root DNS servers to resolve the TLD - top-level domains (like .com, .org, .net) and get the authoritative DNS server for the top-level domain (TLD)
- Contact the TLD DNS server to resolve the Autohrative DNS; The TLD DNS server responds with the IP address of the authoritative DNS server for the specific domain (e.g., google.com).
- The authoritative DNS server for the domain provides the IP address associated with the requested domain (e.g., the IP address of Google's servers). This information is sent back to the DNS resolver.
- The DNS resolver caches the IP address for future reference and sends the IP address to your web browser.

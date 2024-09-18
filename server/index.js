import * as dotenv from "dotenv";
import prerender from "prerender";
import cache from "prerender-memory-cache";

dotenv.config({
    path: "../.env",
});

const server = prerender({
    logRequests: true,
    followRedirects: false,
    chromeLocation: "/usr/lib/chromium/chrome",
    chromeFlags: [
        "--no-first-run",
        "--no-sandbox",
        "--headless",
        "--disable-gpu",
        "--remote-debugging-port=9222",
        "--hide-scrollbars",
        "--disable-setuid-sandbox",
        "--disable-web-security",
        "--ignore-certificate-errors",
        "--hide-scrollbars",
        "--disable-features=BlockInsecurePrivateNetworkRequests",
        "--enable-features=NetworkService",
    ],
    workers: 4,
});

server.use(prerender.sendPrerenderHeader());
server.use(prerender.browserForceRestart());
server.use(prerender.addMetaTags());
server.use(prerender.httpHeaders());
// server.use(prerender.removeScriptTags());
server.use(cache);

server.start();
import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";
import "dotenv/config";

export const aj =  arcjet({
    key:process.env.ARCJET_KEY,
    characteristics:["ip.src"],
    rules:[
        // Shield protects your app from common attacks e.g. SQL injection,Cross site scripting ,Cross site Request forgery
        shield({
            mode:"LIVE"
        }),
        // Create a bot detection rule
        detectBot({
            mode:"LIVE",
            allow:["CATEGORY:SEARCH_ENGINE"] // Google, Bing, etc
        }),
        // Create a token bucket rate limit. Other algorithms are supported.
        tokenBucket({
            mode:"LIVE",
            refillRate: 30,
            interval: 5,
            capacity: 20,  
        })
    ]
}) 
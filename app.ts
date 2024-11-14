// app.ts
import { Application, Router, send } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
// import { Client } from "https://deno.land/x/mysql@v2.10.1/mod.ts";

import fbRouter from "./back/routes/fbRoutes.ts";

const app = new Application();
const PORT = Number(Deno.env.get("PORT")) || 8000;

// Enable CORS for API requests
app.use(oakCors());

// Register API routes
app.use(fbRouter.routes());
app.use(fbRouter.allowedMethods());


// Route for serving static files (HTML, CSS, JS, images)
app.use(async (context, next) => {
    const path = context.request.url.pathname;

    // Serve files from 'front' folder for HTML/CSS/JS and 'photo' folder for images
    if (path.startsWith("/photo")) {
        await send(context, path, {
            root: `${Deno.cwd()}/`,
        });
    } else {
        await send(context, path, {
            root: `${Deno.cwd()}/front`,
            index: "index.html", // Default file to serve
        });
    }

    // Continue to the next middleware if no file is found
    await next();
});


console.log(`Server is running on port ${PORT}`);
await app.listen({ port: PORT });

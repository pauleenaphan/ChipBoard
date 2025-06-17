// !PURPPOSE: Handles tRPC requests from the client
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { type NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { env } from "~/env";
import { appRouter } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Request-Method": "*",
  "Access-Control-Allow-Methods": "OPTIONS, GET, POST",
  "Access-Control-Allow-Headers": "*",
};

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a HTTP request (e.g. when you make requests from Client Components).
 */
const createContext = async (req: NextRequest) => {
  // Passes headers to tRPC 
  const headers = Object.fromEntries(req.headers.entries());
  return createTRPCContext({
    headers,
  });
};

const handler = (req: NextRequest) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new NextResponse(null, { headers: corsHeaders });
  }
  
  // Processes incoming requests from the client
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => createContext(req),
    onError:
      env.NODE_ENV === "development"
        ? ({ path, error }) => {
            console.error(
              `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
            );
          }
        : undefined,
    responseMeta: () => {
      return {
        headers: corsHeaders,
      };
    },
  });
};

export { handler as GET, handler as POST, handler as OPTIONS };

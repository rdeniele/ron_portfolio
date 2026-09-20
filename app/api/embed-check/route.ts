import { works } from "@/lib/site";

/**
 * Whether a project's live site can be framed inside the portfolio.
 *
 * The browser gives no usable signal here: a site that refuses framing still
 * fires `load` on the iframe, it just paints a blank error document we are not
 * allowed to read. So the check happens server-side, by reading the headers the
 * browser would enforce - `X-Frame-Options` and the CSP `frame-ancestors`
 * directive - and the client only has to render the answer.
 */

export const dynamic = "force-dynamic";

/** only origins we actually publish as project links - never an open prober */
const ALLOWED_ORIGINS = new Set(
  works.flatMap((work) => (work.liveUrl ? [new URL(work.liveUrl).origin] : [])),
);

export type EmbedCheck = {
  /**
   * `blocked` is a definitive refusal; `unknown` means the probe itself failed
   * (bot protection, timeout) and the client should still try the iframe.
   */
  status: "embeddable" | "blocked" | "unknown";
  reason: string;
};

function json(body: EmbedCheck, init?: ResponseInit) {
  return Response.json(body, {
    ...init,
    headers: {
      // the answer only changes when the project site changes its headers
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      ...init?.headers,
    },
  });
}

/** the tokens of the `frame-ancestors` directive, or null when it is absent */
function frameAncestors(csp: string | null): string[] | null {
  if (!csp) return null;
  for (const directive of csp.split(";")) {
    const [name, ...values] = directive.trim().split(/\s+/);
    if (name?.toLowerCase() === "frame-ancestors") {
      return values.map((value) => value.toLowerCase());
    }
  }
  return null;
}

export async function GET(request: Request) {
  const target = new URL(request.url).searchParams.get("url");
  if (!target) {
    return json({ status: "unknown", reason: "no url given" }, { status: 400 });
  }

  let url: URL;
  try {
    url = new URL(target);
  } catch {
    return json({ status: "unknown", reason: "malformed url" }, { status: 400 });
  }

  if (!ALLOWED_ORIGINS.has(url.origin)) {
    return json(
      { status: "unknown", reason: "not a listed project site" },
      { status: 403 },
    );
  }

  let response: Response;
  try {
    response = await fetch(url, {
      // GET rather than HEAD: plenty of hosts answer HEAD with 405 and no
      // security headers at all. The body is discarded below.
      method: "GET",
      redirect: "follow",
      signal: AbortSignal.timeout(8000),
      headers: {
        // some hosts vary their headers by client; ask as a browser would
        "User-Agent":
          "Mozilla/5.0 (compatible; PortfolioEmbedCheck/1.0; +https://github.com/rdeniele)",
        Accept: "text/html",
      },
    });
  } catch {
    return json({ status: "unknown", reason: "site did not answer the probe" });
  }

  await response.body?.cancel();

  const xfo = response.headers.get("x-frame-options")?.trim().toLowerCase();
  if (xfo === "deny" || xfo === "sameorigin" || xfo?.startsWith("allow-from")) {
    return json({
      status: "blocked",
      reason: `the site sends X-Frame-Options: ${xfo}`,
    });
  }

  const ancestors = frameAncestors(
    response.headers.get("content-security-policy"),
  );
  if (ancestors) {
    const self = new URL(request.url).origin.toLowerCase();
    const allowed = ancestors.some(
      (token) =>
        token === "*" ||
        token === "https:" ||
        token === self ||
        // a bare host or a wildcard host, e.g. `example.com`, `*.example.com`
        (token.startsWith("*.") && self.endsWith(token.slice(1))),
    );
    if (!allowed) {
      return json({
        status: "blocked",
        reason: "the site's content security policy refuses outside framing",
      });
    }
  }

  return json({ status: "embeddable", reason: "no framing restrictions found" });
}

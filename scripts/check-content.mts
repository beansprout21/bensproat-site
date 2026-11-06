// Validates every file in /content against its zod schema.
// Runs before `next build`, so invalid content fails the build.
import { validateAllContent } from "../lib/content.ts";

try {
  validateAllContent();
  console.log("Content OK");
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}

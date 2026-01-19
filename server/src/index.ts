import app from "./server";
import { env } from "./env";

const port = env.port;

app.listen(port, () => {
  console.log(`API server running on http://localhost:${port}`);
});

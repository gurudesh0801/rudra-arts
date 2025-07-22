const allowedOrigins = [
  "http://localhost:5173",
  "https://rudra-arts.vercel.app",
  "https://rudraartsandhandicrafts.in",
  "https://www.rudraartsandhandicrafts.in",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (like mobile apps, Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, origin); // ✅ return the matched origin
      } else {
        return callback(new Error("CORS policy violation"));
      }
    },
    credentials: true,
  })
);

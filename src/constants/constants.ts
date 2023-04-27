let URI: string;

if (process.env.NODE_ENV === "development") {
  URI = "http://localhost:8000/graphql";
} else {
  URI = "https://archivo-server.onrender.com";
}

export { URI };

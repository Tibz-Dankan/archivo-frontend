let URI: string;

if (process.env.NODE_ENV === "development") {
  URI = "http://localhost:8000/graphql";
} else {
  URI = "some_base_production_url/graphql";
}

export { URI };

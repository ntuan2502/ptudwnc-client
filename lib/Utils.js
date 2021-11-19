export function getApiUrl(path = "") {
  return `${process.env.API_URL || "http://localhost:8000"}${path}`;
}

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
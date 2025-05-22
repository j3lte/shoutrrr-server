export function addParams(
  url: string | URL,
  parameters: { [key: string]: string | number | boolean },
): string;
export function addParams(
  url: string | URL,
  parameters: { [key: string]: string | number | boolean },
  simplify: false,
): URL;
export function addParams(
  url: string | URL,
  parameters: { [key: string]: string | number | boolean },
  simplify: true,
): string;
export function addParams(
  url: string | URL,
  // https://github.com/microsoft/TypeScript/issues/32951#issuecomment-527397109
  parameters: { [key: string]: string | number | boolean },
  simplify = true,
) {
  if (typeof url === "string") {
    url = new URL(url);
  }

  for (const key in parameters) {
    url.searchParams.append(key, parameters[key] as string);
  }

  return simplify ? url.toString() : url;
}

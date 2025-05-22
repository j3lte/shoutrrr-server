export const runShoutrrr = async (
  shouterArgs: string[],
): Promise<{ output: string; error: string; code: number }> => {
  const command = new Deno.Command("/shoutrrr", {
    args: shouterArgs,
    stdout: "piped",
    stderr: "piped",
  });

  const { stdout, stderr, code } = await command.output();
  const decoder = new TextDecoder("utf-8");

  return {
    output: decoder.decode(stdout),
    error: decoder.decode(stderr),
    code,
  };
};

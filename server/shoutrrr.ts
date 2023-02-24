export const runShoutrrr = async (
  shouterArgs: string[],
): Promise<{ output: string; error: string; code: number }> => {
  const proc = Deno.run({
    cmd: ["/shoutrrr", ...shouterArgs],
    stdout: "piped",
    stderr: "piped",
  });

  const [status, stdout, stderr] = await Promise.all([
    proc.status(),
    proc.output(),
    proc.stderrOutput(),
  ]);

  const decoder = new TextDecoder("utf-8");
  const output = decoder.decode(stdout);
  const error = decoder.decode(stderr);

  proc.close();

  return { output, error, code: status.code };
};

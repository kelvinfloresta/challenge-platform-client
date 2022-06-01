export async function to<Response>(
  promise: Promise<Response>
): Promise<[unknown, Response]> {
  try {
    const response = await promise;
    return [null, response];
  } catch (error) {
    return [error, null as any];
  }
}

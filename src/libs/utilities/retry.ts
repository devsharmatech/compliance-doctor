export async function retry<T>(
    fn: () => Promise<T>,
    retries = 3,
    delay = 1000
  ): Promise<T> {
    try {
      return await fn();
    } catch (error) {
      if (retries <= 0) {
        throw error;
      }
      console.warn(`Retrying... attempts left: ${retries}`);
      await new Promise((res) => setTimeout(res, delay));
      return retry(fn, retries - 1, delay);
    }
  }
  
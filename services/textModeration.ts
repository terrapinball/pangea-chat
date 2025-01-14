interface ModerationResult {
  flagged: boolean;
  reasons: string[];
}

export async function moderateText(text: string): Promise<ModerationResult> {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const apiKey = process.env.EXPO_PUBLIC_API_KEY;

  if (!apiKey || !apiUrl) {
    throw new Error("API not configured");
  }

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ input: text }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI API request failed: ${errorText}`);
  }

  const data = await response.json();

  const result = data.results[0];
  const flagged = result.flagged;
  const categories = result.categories;

  const reasons = Object.keys(categories).filter(
    (category) => categories[category]
  );

  return { flagged, reasons };
}

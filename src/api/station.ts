export type Station = {
  id: number;
  name: string;
  city: string;
  lat: number;
  lng: number;
};

export async function fetchStations(): Promise<Station[]> {
  try {
    const res = await fetch(
      "https://gist.githubusercontent.com/neysidev/bbd40032f0f4e167a1e6a8b3e99a490c/raw/"
    );

    if (!res.ok) {
      throw new Error(
        `Failed to fetch stations: ${res.status} ${res.statusText}`
      );
    }

    const data: Station[] = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching stations:", error);
    throw error;
  }
}

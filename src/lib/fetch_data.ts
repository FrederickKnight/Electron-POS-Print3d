export async function fetchData<T>(endpoint: string): Promise<T[] | null> {
    const apiUrl = import.meta.env.API_URL + endpoint;
    try {
        const response = await fetch(apiUrl);
        if (response.ok) {
            const json = await response.json();
            return json.response as T[];
        } else {
            console.error("Error al obtener los datos:", response.statusText);
            return null;
        }
    } catch (error) {
        console.error("Error al realizar el fetch:", error);
        return null;
    }
}

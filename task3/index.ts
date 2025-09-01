export const getUtcStringDate = (date?: Date): string => {
    const d = date ?? new Date();

    const pad = (n: number) => n.toString().padStart(2, '0');

    const yyyy = d.getUTCFullYear();
    const mm = pad(d.getUTCMonth() + 1);
    const dd = pad(d.getUTCDate());
    const hh = pad(d.getUTCHours());
    const mi = pad(d.getUTCMinutes());
    const ss = pad(d.getUTCSeconds());

    return `${yyyy}-${mm}-${dd}T${hh}:${mi}:${ss}Z`;
};

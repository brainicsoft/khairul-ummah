export const generateUniqueId = (p0: number) => Math.random().toString(36).substr(2, 6) + Date.now().toString(36);

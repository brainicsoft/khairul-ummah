export const normalizePhone = (phone: string): string => {
  const digits = phone.replace(/\D/g, '');

  if (digits.startsWith('880') && digits.length >= 13) {
    return `0${digits.slice(3, 13)}`;
  }

  if (digits.startsWith('0') && digits.length >= 11) {
    return digits.slice(0, 11);
  }

  if (digits.length === 10) {
    return `0${digits}`;
  }

  return digits;
};

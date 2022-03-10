export const NumberFormatter = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 2, maximumFractionDigits: 2
    }).format(value);
}

export const TimeFormatter = (time: number) => {
    const min = Math.trunc(time / 60000);

    return min;
}
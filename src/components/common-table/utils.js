export function formatPercentage(value) {
    return (Number(value) * 100).toFixed(2) + "%";
}

export function formatDecimal(value, n = 2) {
    return Number(value).toFixed(n);
}
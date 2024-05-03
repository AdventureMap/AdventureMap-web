export function dateToString(
    timestamp: string
){
    const date = new Date(timestamp)
    return date.toLocaleDateString("ru-US")
}
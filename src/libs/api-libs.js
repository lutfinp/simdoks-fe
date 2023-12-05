export const getCategoryResponse = async(resource) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/${resource}`
    )
    const category = await response.json()
    return category
}
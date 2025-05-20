export default function findCategoryById(categories, categoryId) {

    categoryId = Number(categoryId);

    for (const item of categories) {
        if (item.id === categoryId) {
            return item;
        }

        if (Array.isArray(item.categories)) {
            for (const category of item.categories) {
                if (category.id === categoryId) {
                    return category;
                }
            }
        }
    }
}
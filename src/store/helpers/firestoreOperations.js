import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

export async function getCartByUserId(userId) {
    const db = getFirestore();
    const cartCollection = collection(db, 'cart');

    // Створення запиту до колекції, який відфільтровує документи за полем 'userIds'
    const q = query(cartCollection, where('userIds', 'array-contains', userId));

    try {
        const querySnapshot = await getDocs(q);

        // Перевірка, чи знайдено документи
        if (!querySnapshot.empty) {
            // Отримання першого знайденого документу
            const cartDoc = querySnapshot.docs[0];

            // Повернення даних корзини користувача
            return cartDoc.data();
        } else {
            // Якщо корзина не знайдена, повернення null або відповідного значення за замовчуванням
            return null;
        }
    } catch (error) {
        console.error('Помилка при отриманні корзини користувача:', error);
    }
}
// Функція для отримання улюбдених за userId
export async function getFavoritesByUserId(userId) {
    const db = getFirestore();
    const favoritesCollection = collection(db, 'favorites');

    const q = query(cartCollection, where('userIds', 'array-contains', userId));

    try {
        const querySnapshot = await getDocs(q);

        // Перевірка, чи знайдено документи
        if (!querySnapshot.empty) {
            // Отримання першого знайденого документу
            const favoriteDoc = querySnapshot.docs[0];

            // Повернення даних корзини користувача
            return favoriteDoc.data();
        } else {
            // Якщо корзина не знайдена, повернення null або відповідного значення за замовчуванням
            return null;
        }
    } catch (error) {
        console.error('Помилка при отриманні корзини користувача:', error);
    }
}
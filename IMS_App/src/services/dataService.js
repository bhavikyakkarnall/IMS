export default class DataService {

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async getItems() {
        try {
            const response = await fetch(this.baseUrl + "/api/items/");
            const items = await response.json();
            return items;
        } catch (error) {
            throw new Error(`Failed to fetch items: ${error.message}`);
        }
    }

    async postItem(item) {
        try {
            const response = await fetch(this.baseUrl + "/api/item/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item),
            });
            const newItem = await response.json();
            return newItem;
        } catch (error) {
            throw new Error(`Failed to post item: ${error.message}`);
        }
    }

    async deleteItem(itemId) {
        try {
            const response = await fetch(this.baseUrl + `/api/item/${itemId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                return true; // Item successfully deleted
            } else {
                throw new Error(`Failed to delete item with ID ${itemId}`);
            }
        } catch (error) {
            throw new Error(`Failed to delete item: ${error.message}`);
        }
    }

    async updateItem(itemId, updatedItem) {
        try {
            const response = await fetch(this.baseUrl + `/api/item/${itemId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedItem),
            });
            const updatedItemResponse = await response.json();
            return updatedItemResponse;
        } catch (error) {
            throw new Error(`Failed to update item: ${error.message}`);
        }
    }

    async getComments(ItemID) {
        // console.log(ItemID);
        const response = await fetch(`${this.baseUrl}/api/comments/item/${ItemID}`);
        // console.log(response)
        return await response.json();
    }
    
    // Add this method in DataService.js
    async postComment(comment) {
        try {
            const response = await fetch(this.baseUrl + "/api/comment/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(comment),
            });
            const newComment = await response.json();
            return newComment;
        } catch (error) {
            throw new Error(`Failed to post comment: ${error.message}`);
        }
    }

}

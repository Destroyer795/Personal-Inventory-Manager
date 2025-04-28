import { create } from "zustand"

//using a hook
//covering the object with parenthesis means that we are returning an object
export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),
    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.price || !newProduct.image) {
            return {success: false, message: "Please fill in all fields.."}
        }
        const res = await fetch("/api/products", {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body:JSON.stringify(newProduct) //string the new product object that we created
        })
        const data = await res.json(); //to extract the data from it
        set((state) => ({ products: [...state.products, data.data ]}))
        //the above thing is getting the previous state and then return an object
        //where we skip all the previous products that we had and then also add the new product that we got from the backend
        return {success: true, message: "The new thing successfully addded go check.."}
    },
    fetchProducts: async () => {
        const res = await fetch("/api/products");
        const data = await res.json();
        set( {products: data.data }); //just updates the products completely for now
    },
    deleteProduct: async (pid) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: "DELETE",
        });
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };
        //this below line is required to update the UI immediately without needing any refresh
        set((state) => ({ products: state.products.filter((product) => product._id !== pid) }));
        return { success: true, message: data.message };
    },
    updateProduct: async (pid, updatedProduct) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedProduct),
        });
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };
        //update the ui immediately without needing a refresh
        set (state => ({
            products: state.products.map((product) => (product._id === pid ? data.data : product)),
        }));
        return { success: true, message: data.message };
    },
}));
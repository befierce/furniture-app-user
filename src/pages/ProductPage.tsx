import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

// category
// :
// "Chair"
// description
// :
// "sandle wood chair backrest reclination"
// imageUrl
// :
// "https://images.unsplash.com/photo-1712926382189-dacbc6b89a01?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
// price
// :
// "6600"
// quantity
// :
// "10"
// title
// :
// "wooden chair"
// vendor
// :
// "Glory Furnitures"
interface Product {
  category: string;
  description: string;
  imageUrl: string;
  price: number;
  quantity: number;
  title: string;
}

const ProductPage = () => {
  const [product, setProduct] = useState<Product>();
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return;
  }
  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "products-list", id);
      const querySnapshot = await getDoc(docRef);

      const data = querySnapshot.data() as Product;
      console.log("data fetched", data);
      setProduct(data);
    };
    fetchData();
  }, []);
  return (
    <>
      <h1>{product?.title}</h1>
      {product?.imageUrl && (
        <img src={product.imageUrl} alt={product.title} width={150} />
      )}
    </>
  );
};

export default ProductPage;

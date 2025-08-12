import CategorySection from "./CategorySection";
import { useState, useRef, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs, limit, query } from "firebase/firestore";
import styles from "./ProductsSection.module.css";
import { Link } from "react-router-dom";

interface Product {
  id: string;
  category: string;
  title: string;
  vendor: string;
  description: string;
  price: number;
  imageUrl: string;
}

const ProductsSection = () => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const fetchData = async () => {
        const q = query(collection(db, "products-list"), limit(6));
      const querySnapshot = await getDocs(q);

      const data = querySnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as Product)
      );
      console.log("data", data);
      setProducts(data);
    };
    console.log("products", products);
    fetchData();
  }, []);

  return (
    <>
      <CategorySection />
      <div className={styles.productsWrapperOuterMost}>
        {products.map((product) => (
          <div className={styles.productContainerOuter} key={product.id}>
            <Link
              to={`/product/${product.id}`}
              className={styles.productContainerInner}
            >
              <div className={styles.imageSectionContainer}>
                {product.imageUrl && (
                  <img src={product.imageUrl} alt={product.title} width={150} />
                )}
              </div>
              <div className={styles.productMetaDataContainer}>
                <div className={styles.productMetaDataContainerInner}>
                  <div className={styles.productTitleContainer}>
                    <h3>{product.title}</h3>
                  </div>
                  <div className={styles.productDescriptionContainer}>
                    <p>{product.description}</p>
                  </div>
                  <div className={styles.productPriceContainer}>
                    <b>Price:</b> ₹{product.price}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductsSection;

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./ProductsSection.module.css";
import CategorySection from "./CategorySection";
import { firebaseConfig } from "../firebaseConfig"; // ensure projectId is there

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
      try {
        const url = `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents/products-list?pageSize=6`;
        const res = await fetch(url);
        const json = await res.json();
        const data = json.documents.map((doc: any) => ({
          id: doc.name.split("/").pop(),
          category: doc.fields.category?.stringValue || "",
          title: doc.fields.title?.stringValue || "",
          vendor: doc.fields.vendor?.stringValue || "",
          description: doc.fields.description?.stringValue || "",
          price: Number(doc.fields.price?.integerValue || Number(doc.fields.price?.stringValue) || 0),
          imageUrl: doc.fields.imageUrl?.stringValue || "",
        }));
        console.log(data)
        setProducts(data);
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };

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

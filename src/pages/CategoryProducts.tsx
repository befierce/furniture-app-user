import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
// import styles from "./ProductPage.module.css";
import { firebaseConfig } from "../firebaseConfig";
// import "../components/ProductsSection.module.css";
import styles from "./CategoryProducts.module.css";
import Header from "../components/Header";
interface Product {
  id: string;
  category: string;
  title: string;
  vendor: string;
  description: string;
  price: number;
  imageUrl: string;
}

const CategoryProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { category } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents/products-list?pageSize=50`;
        const res = await fetch(url);
        const json = await res.json();
        console.log("raw json data", json);

        const allProducts: Product[] = json.documents.map((doc: any) => ({
          id: doc.name.split("/").pop(),
          category: doc.fields.category?.stringValue || "",
          title: doc.fields.title?.stringValue || "",
          vendor: doc.fields.vendor?.stringValue || "",
          description: doc.fields.description?.stringValue || "",
          price: Number(
            doc.fields.price?.integerValue ||
              Number(doc.fields.price?.stringValue) ||
              0
          ),
          imageUrl: doc.fields.imageUrl?.stringValue || "",
        }));
        const filtered = allProducts.filter(
          (p) => p.category.toLowerCase() === category?.toLowerCase()
        );
        setProducts(filtered);
      } catch (err) {
        console.error("Error fetching data", err);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    };

    fetchData();
  }, [category]);

  return (
    <>
      <Header />
      {isLoading ? (
        <div className={styles.loadingSpinner}>
          {" "}
          <div className={styles.spinner}></div>{" "}
        </div>
      ) : (
        <div className={styles.productsWrapperOuterMost}>
          {products.length > 0 ? (
            products.map((product) => (
              <div className={styles.productContainerOuter} key={product.id}>
                <Link
                  to={`/product/${product.id}`}
                  className={styles.productContainerInner}
                >
                  <div className={styles.imageSectionContainer}>
                    {product.imageUrl && (
                      <img
                        src={product.imageUrl}
                        alt={product.title}
                        width={150}
                      />
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
            ))
          ) : (
            <p>No products found in this category.</p>
          )}
        </div>
      )}
    </>
  );
};

export default CategoryProducts;

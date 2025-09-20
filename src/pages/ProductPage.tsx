import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CategorySection from "../components/CategorySection";
import styles from "./ProductPage.module.css";
import AddToCartButton from "../components/AddToCartButton";
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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return;
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "products-list", id);
        const querySnapshot = await getDoc(docRef);

        if (!querySnapshot.exists()) {
          return;
        }

        const data = querySnapshot.data() as Product;
        console.log("data fetched", data);
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }
    };

    fetchData();
  }, [id]);
  return (
    <>
      <Header />
      {isLoading ? (
        <div className={styles.loadingSpinner}>
          <div className={styles.spinner}></div>
        </div>
      ) : (
        <div className={styles.productWrapper}>
          <div className={styles.imageSection}>
            <div className={styles.imageSectionProduct}>
              {product?.imageUrl && (
                <img src={product.imageUrl} alt={product.title} />
              )}
            </div>
          </div>

          <div className={styles.informationSection}>
            <div className={styles.titleSection}>
              <h1>{product?.title}</h1>
            </div>
            <div className={styles.description}>
              <p>{product?.description}</p>
            </div>
            <div className={styles.price}>
              <h2>{`Price - $ ${product?.price}`}</h2>
            </div>
            <AddToCartButton product={{ product, id }}></AddToCartButton>
            <div className={styles.imageSectionLower}>
              <img src="/banner-emi-delivey.png"></img>
            </div>
            <div className={styles.buyOrAddToCart}></div>
          </div>
        </div>
      )}
      {/* <div className={styles.productWrapper}>
          <div className={styles.imageSection}>
            <div className={styles.imageSectionProduct}>
              {product?.imageUrl && (
                <img src={product.imageUrl} alt={product.title} />
              )}
            </div>
          </div>

          <div className={styles.informationSection}>
            <div className={styles.titleSection}>
              <h1>{product?.title}</h1>
            </div>
            <div className={styles.description}>
              <p>{product?.description}</p>
            </div>
            <div className={styles.price}>
              <h2>{`Price - $ ${product?.price}`}</h2>
            </div>
            <AddToCartButton product={{ product, id }}></AddToCartButton>
            <div className={styles.imageSectionLower}>
              <img src="/banner-emi-delivey.png"></img>
            </div>
            <div className={styles.buyOrAddToCart}></div>
          </div>
        </div> */}

      <CategorySection />
      <Footer></Footer>
    </>
  );
};

export default ProductPage;

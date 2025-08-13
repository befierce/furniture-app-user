import styles from "./AddToCartButton.module.css"



const AddToCartButton = (props) => {
  return (
    <div className={styles.buttonContainer}>
      <span className={styles.addToCartButtonSpan}>
        <button >
          Add to cart
          <img src="/add-product_12457780.png"></img>
        </button>
      </span>
    </div>
  );
};



export default AddToCartButton
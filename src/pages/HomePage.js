import Layout from "../layout/Layout";
import { products } from "../data"
import Product from "../components/Product/Product";
const HomePage = () => {
    console.log(products);
    return (
        <Layout>
            <main className="container">
                <div className="product-list">
                    {products.map((product) => (
                        <Product {...product} key={product.id} />
                    ))}
                </div>
            </main>
        </Layout>
    );
}

export default HomePage;
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../contexts/ProductContext';
import Banner from './Banner';

const Home = () => {
  const { state } = useContext(ProductContext)
  return (
    <>
      {/* banner */}
      <Banner />
      {/* san pham */}
      <div className="container mt-4">
        <h1 className="mb-4 text-center">Danh Sách Bán Sách</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {state.products.map((product) => (
            <div className="flex flex-col mb-4" key={product._id}>
              <div className="card h-full shadow-sm custom-card">
                <Link to={`/product-detail/${product._id}`}>
                  <div className="card-img-top-container">
                    <img src={product.image} className="card-img-top custom-img" alt={product.title} width={200} />
                  </div>
                </Link>
                <div className="card-body flex flex-col justify-between">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text text-truncate">{product.description}</p>
                  <p className="card-text"><strong>Giá:</strong> {product.price}</p>
                  <button className="px-4 py-2 rounded-[7px] bg-blue-600 hover:bg-white text-white hover:text-black ">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </>
  )
}

export default Home;

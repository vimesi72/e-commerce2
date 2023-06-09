import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isLoading } from "../store/slice/loader.slice";
import axios from "axios";
import {
  getProductsThunk,
  getProductsXNameThunk,
} from "../store/slice/product.slice";
import Aside from "../components/Aside";
import ListProducts from "../components/ListProducts";
import Categories from "../containers/Categories";

const Home = () => {
  const [category, setCategories] = useState([]);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProductsThunk());
    axios
      .get("https://e-commerce-api-v2.academlo.tech/api/v1/categories")
      .then((category) => setCategories(category.data))
      .catch(console.error);
  }, []);

  return (
    <div className="container">
      <div className="main">
        <div className="main-grid">
          <Aside>
            <Categories data={category} />
          </Aside>
          <ListProducts dataProduct={data} />
        </div>
      </div>

    </div>
  );
};

export default Home;

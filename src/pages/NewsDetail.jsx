import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import  Button  from 'react-bootstrap/Button';
import  Row  from 'react-bootstrap/Row';
import  Col  from 'react-bootstrap/Col';
import { useSelector,useDispatch } from "react-redux";
import { filterCategoryThunk } from "../store/slice/news.slice";
import ListGroup from "react-bootstrap/ListGroup";

const NewsDetail = () => {
  const { id } = useParams();
  const [ news, setNews ] = useState({});
  const [ rate,setRate ] = useState(1)
  const dispatch = useDispatch()
  const allNews = useSelector(state => state.news)
  const newsFiltered = allNews.filter( news => news.id !== Number(id) )

  useEffect(() => {
    axios.get(`https://news-app-api.academlo.tech/news/${id}/`)
    .then((resp) => {
      console.log(resp.data);
      setNews(resp.data);
      dispatch(filterCategoryThunk(resp.data.category.id))
      console.log(resp.data.category.id);
    });
  }, []);

  const increment = () => {
   
        setRate( rate + 1 )
 
  }

  const decrement = () => {
    if(rate > 1){
        setRate( rate - 1 )
    }
  }

  return (
    <div className = "py-5">
      <h1>{news.headline}</h1>
      <p>By: {news.author}</p>
      <p>{news.date}</p>

    <Button onClick={ () => decrement() }> - </Button>
        <span>{ rate }</span>
    <Button onClick={ () => increment() }> + </Button>
        
    <Button className = "primary ms-3">Agregar a favoritos</Button>
    <Row className = "pt-3">
        <Col lg={ 9 }>
            <img src={ news.image } alt=""  className = "img-fluid"/>
            <small classNam = "mb-3 d-block"> { news.image_description } </small>
            {
                news.body?.map( p => (
                    <p key={p.id}>{p.paragraph}</p>
                ) )
            }
        </Col>
        <Col lg={ 3 }>
            <h3>Noticias Relacionadas</h3>
            <ListGroup>
            {
                newsFiltered.map( news => (
                    <ListGroup.Item key={news.id}>{news.headline}</ListGroup.Item>   
                ) )
            }   
            </ListGroup>

        </Col>
    </Row>
    </div>
  );
};

export default NewsDetail;

import React,{useEffect,useRef} from 'react'
import Flickity from 'flickity'
import { Link } from 'react-router-dom';
import 'flickity/css/flickity.css'
import classes from './Carousel.module.css'
import './flickity_custom.css'


export default function Carousel({posters}) {

    const carouselRef = useRef(null)

    useEffect(()=>{
        const flk = new Flickity(carouselRef.current, {
            // cellAlign:'left',
            // contain: 'true',
            autoPlay: 3000,
            wrapAround: true
        })

        return ()=>flk.destroy();
    },[])

  return (
    <div className={classes.carousel} ref={carouselRef}>
      {posters.map((poster, index) => (
        <div className={classes.carousel_cell} key={index}>
          <img src={poster} alt={`Poster ${index}`} />
        </div>
      ))}
      
      {/* <div className={classes.carousel_cell}><img src={p} alt="" /></div>
      <div className={classes.carousel_cell}>Cell 2</div>
      <div className={classes.carousel_cell}>Cell 3</div> */}
    </div>
  )
}

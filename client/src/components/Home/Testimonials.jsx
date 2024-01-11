import testImg from '../../assets/testimonials.jpg'
import classes from './Testimonials.module.css'

function Testimonial(){
    return <section id="testimonials" className={`py-3 py-md-5 mb-3`}>
        <h6 editable="inline" className={classes.testimonial}>TESTIMONIALS</h6>
        <div className="container py-8">
      <div className="row g-0 bg-light rounded-3">
        <div className="col-lg-6 position-relative">
          <div className="d-none d-xl-block position-absolute top-100 start-0 translate-middle" style={{ width: '128px', height: '128px', backgroundSize: '16px 16px', backgroundImage: 'radial-gradient(var(--bs-purple) 2px,transparent 2.5px)', zIndex: '-1' }}></div>
          <img className="img-fluid rounded h-100 w-100" src={testImg} alt="Group Discussion" style={{ objectFit: 'cover' }} loading="lazy" />
        </div>
        <div className="col-lg-6 text-center align-self-center">
          <div className="lc-block mb-3 pt-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" fill="currentColor" viewBox="0 0 16 16" lc-helper="svg-icon" className="text-muted">
              <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z"></path>
            </svg>
          </div>
          <div className="lc-block">
                    <div id="carouselTestimonial" className="carousel slide pb-4" data-bs-ride="carousel">
                        <div className="carousel-inner px-5">
                            <div className="carousel-item active">
                                <div className="row">
                                    <div className="lc-block">
                                        <div editable="rich">
                                            <p className="rfs-8 text-muted">"ReadersNest transformed my way how I engage with the library, bringing convenience and accessibility to the forefront of my reading experience."</p>
                                        </div>
                                    </div>
                                    <div className="lc-block">
                                        <h5 editable="inline" className="mb-1">Nikolas Brooten</h5>
                                        <p editable="inline">Project Manager</p>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="row">
                                    <div className="lc-block">
                                        <div editable="rich">
                                            <p className="rfs-8">"ReadersNest has revolutionized the way we handle our resources, and I highly recommend it to fellow readers"</p>
                                        </div>
                                    </div>
                                    <div className="lc-block">
                                        <h5 editable="inline" className="mb-1">Pamela G. Stokes</h5>
                                        <p editable="inline">Content Creator</p>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="row">
                                    <div className="lc-block">
                                        <div editable="rich">
                                            <p className="rfs-8">"ReadersNest is an invaluable resource for any fiction lover who loves to create many ideas based on imagination context."</p>
                                        </div>
                                    </div>
                                    <div className="lc-block">
                                        <h5 editable="inline" className="mb-1">Joseph S. Wilcox</h5>
                                        <p editable="inline">Student</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                      
                        <div className="w-100 text-center mt-4">
                            <a className="carousel-control-prev position-relative d-inline me-4" href="#carouselTestimonial" data-bs-slide="prev">
                                <svg width="1em" height="1em" viewBox="0 0 16 16" className="text-dark" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"></path>
                                </svg>
                                <span className="visually-hidden">Previous</span>
                            </a>
                            <a className="carousel-control-next position-relative d-inline" href="#carouselTestimonial" data-bs-slide="next">
                                <svg width="1em" height="1em" viewBox="0 0 16 16" className="text-dark" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"></path>
                                </svg>
                                <span className="visually-hidden">Next</span>
                            </a>
                        </div>
                    </div>
                </div>
        </div>
      </div>
    </div>
    </section>
}

export default Testimonial;
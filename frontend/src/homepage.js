import "./homepage.css"
const HomePage = () =>{
    return(<>
    {/* <!-- three leading tutors --> */}
          <div className="row">
            <div className="col-lg-4">
                <img src={"/img/munchlax.jpg"} className="rounded-circle portrait"/> 
              <h3>Munchlax</h3>
              <p><a className="btn btn-secondary" href="#">View details &raquo;</a></p>
            </div>
            <div className="col-lg-4">
              <img src={"/img/Pikachu.jpg"} className="rounded-circle portrait"/> 
              <h3>Pikachu</h3>
              <p><a className="btn btn-secondary" href="#">View details &raquo;</a></p>
            </div>
            <div className="col-lg-4">
              <img src={"/img/Charmander.jpg"} className="rounded-circle portrait"/> 
              <h3>Charmander</h3>
              <p><a className="btn btn-secondary" href="#">View details &raquo;</a></p>
            </div>
          </div>

        <hr className="divider"/>
        {/* <!--Features--> */}
        <div className="row featurette">
            <div className="col-md-7">
              <h2 className="featurette-heading">Get frustrated?<span className="text-muted">{ } No worries!</span></h2>
              <p className="lead">Let Pokémons help you!</p>
              <p>We have various tutors here that you can choose from and each of them have their only specialties. Pick your favorite one and enjoy learning!</p>

            </div>
            <div className="col-md-5">
              <img src="/img/frustrate.jpg" style={{height: "100%", width: "100%"}}/>
            </div>
          </div>

        </>
    )
}
export default HomePage